
  
  
import firebase from 'firebase/compat/app';

export interface Comment {
  cid?: string; // Identificador único del comentario
  user: string; // Nombre del usuario que realizó el comentario
  text: string; // Contenido del comentario
  date: firebase.firestore.Timestamp; // Fecha y hora en que se creó el comentario
  attachments?: string[]; // URLs de archivos adjuntos
  id: string; // ID del usuario que realizó el comentario
}
