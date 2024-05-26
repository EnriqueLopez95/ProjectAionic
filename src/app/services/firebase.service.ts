import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

// Decorador que define el servicio como inyectable
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación
})
export class FirebaseService {

  // Inyecciones de dependencias
  auth = inject(AngularFireAuth); // Servicio de autenticación de Firebase
  firestore = inject(AngularFirestore); // Servicio de Firestore de Firebase
  router = inject(Router); // Servicio de navegación de Angular
  utilsSvc: any; // Servicio de utilidades (suponiendo que está definido en otro lugar)


  // Obtener el usuario actual y su rol desde Firestore
  getCurrentUserWithRole(): Observable<User> {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Si hay un usuario autenticado, obtenemos el documento del usuario en Firestore
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Si no hay un usuario autenticado, devolvemos un observable que emite null
          return of(null);
        }
      })
    );
  }

  //=================== Autenticación ======================

  // Método para obtener la instancia de autenticación de Firebase
  getAuth() {
    return getAuth();
  }
  
  // Método para iniciar sesión con email y contraseña
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Método para registrar un nuevo usuario con email y contraseña
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Método para actualizar el perfil del usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // Método para enviar un correo de restablecimiento de contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Método para cerrar sesión
  signOut() {
    getAuth().signOut()
      .then(() => {
        localStorage.removeItem('user'); // Elimina los datos del usuario del almacenamiento local
        this.router.navigate(['/auth']); // Navega a la página de autenticación después de cerrar sesión
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  //===================== Base de Datos ===============================

  // Método para obtener documentos de una colección en Firestore
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), { idField: 'aid' });
  }

  // Método para establecer un documento en Firestore
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // Método para obtener un documento específico de Firestore
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // Método para agregar un nuevo documento a una colección en Firestore
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  // Método para actualizar un documento existente en Firestore
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  // Método para eliminar un documento de Firestore
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }
}
