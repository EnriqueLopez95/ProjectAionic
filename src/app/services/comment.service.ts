import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firestore: AngularFirestore) { }

  // Obtener todos los comentarios ordenados por fecha descendente
  getComments(): Observable<Comment[]> {
    return this.firestore.collection<Comment>('comments', ref => ref.orderBy('date', 'desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Comment;
        const cid = a.payload.doc.id;
        return { cid, ...data }; // Añadir el ID del documento al comentario
      }))
    );
  }

  // Añadir un nuevo comentario a la colección de Firestore
  addComment(comment: Comment): Promise<DocumentReference<Comment>> {
    return this.firestore.collection<Comment>('comments').add(comment);
  }

  // Eliminar un comentario si el usuario actual tiene permisos
  deleteComment(commentId: string, userId: string): Promise<void> {
    return this.firestore.doc(`comments/${commentId}`).ref.get().then(doc => {
      const comment = doc.data() as Comment;
      if (comment.id === userId) {
        return this.firestore.doc(`comments/${commentId}`).delete(); // Eliminar el comentario si el usuario tiene permiso
      } else {
        console.log('No tienes permiso para eliminar este comentario.');
        // Aquí puedes lanzar una alerta o devolver un error para manejar la falta de permisos.
        return Promise.reject('No tienes permiso para eliminar este comentario.');
      }
    });
  }

  // Actualizar un comentario existente en Firestore
  updateComment(comment: Comment): Promise<void> {
    const { cid, ...commentData } = comment;
    return this.firestore.doc(`comments/${cid}`).update(commentData); // Actualizar el comentario con los nuevos datos
  }
}
