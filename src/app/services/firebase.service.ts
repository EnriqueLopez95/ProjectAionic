import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth= inject(AngularFireAuth);
  firestore= inject(AngularFirestore);
  router= inject(Router);
  utilsSvc: any;

    // Obtener el usuario actual y su rol desde Firestore
    getCurrentUserWithRole(): Observable<User> {
      return this.auth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
            
          }
        })
      );
    }


  
  //=================== Autenticación ======================
  getAuth(){
    return getAuth();
  }
  
//================ Acceder =======================
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

//=============== Crear Usuario ======================
signUp(user: User){
  return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
}

  //============== Actualizar Usuario =================
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser,{displayName})
  }
  //============== Enviar email para restablecer contraseña =================
  sendRecoveryEmail(email: string){
    return sendPasswordResetEmail(getAuth(), email)
  }

  //===================== Cerrar Sesion ===============================
  signOut(){
    getAuth().signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/auth']); // Navega a la página de autenticación después de cerrar sesión
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
  


  //=====================Base de Datos===============================

//=================== Obtener documentos de una coleccion ================================
getCollectionData(path: string, collectionQuery?: any){
  const ref = collection(getFirestore(), path);
  return collectionData(query(ref, collectionQuery), {idField: 'aid'});
}


//=================== Setear un documento ================================
setDocument(path: string, data: any){
  return setDoc(doc(getFirestore(), path), data);
}
//===================== Obtener un Documento ===============================
async getDocument(path: string){
  return (await getDoc(doc(getFirestore(), path))).data();
}

//===================== Agregar un Documento ===============================

addDocument(path: string, data: any){
  return addDoc(collection(getFirestore(), path), data);
}
//=================== Actualizar un documento ================================
updateDocument(path: string, data: any){
  return updateDoc(doc(getFirestore(), path), data);
}

//=================== Eliminar un documento ================================
deleteDocument(path: string){
  return deleteDoc(doc(getFirestore(), path));
}

}
