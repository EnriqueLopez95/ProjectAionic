import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.page.html',
  styleUrls: ['./pagina3.page.scss'],
})
export class Pagina3Page implements OnInit {
  comments: Comment[] = [];
  text: string = '';
  //attachmentUrl: string = '';
  currentUser: User;
  editingComment: Comment = null;

  constructor(
    private commentService: CommentService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    this.loadComments(); // Cargar los comentarios cuando el componente se inicializa
    this.currentUser = this.utilsSvc.getFromLocalStorage('user'); // Obtener el usuario actual del almacenamiento local
  }

  loadComments() {
    this.commentService.getComments().subscribe(comments => {
      this.comments = comments; // Cargar los comentarios desde el servicio
      console.log('Loaded comments:', this.comments);
    });
  }

  addComment() {
    if (this.currentUser && this.text) {
      const newComment: Comment = {
        user: this.currentUser.name,
        text: this.text,
        date: this.getCurrentTimestamp(), // Obtener la fecha y hora actual
        //attachments: this.attachmentUrl ? [this.attachmentUrl] : [], // Añadir URL de adjunto si existe
        id: this.currentUser.uid
      };
      this.commentService.addComment(newComment); // Añadir nuevo comentario
      this.text = '';
      //this.attachmentUrl = '';
    }
  }

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId, this.currentUser.uid).then(() => {
      console.log('Comentario eliminado con éxito.');
      this.loadComments(); // Actualizar la lista de comentarios
    }).catch(error => {
      console.error('Error al eliminar el comentario:', error);
      // Mostrar mensaje de error si no tiene permiso para eliminar el comentario
    });
  }

  canEdit(comment: Comment): boolean {
    return comment.id === this.currentUser.uid; // Verificar si el usuario actual puede editar el comentario
  }

  startEditing(comment: Comment) {
    if (this.canEdit(comment)) {
      this.editingComment = comment; // Iniciar edición del comentario
    }
  }

  cancelEditing() {
    this.editingComment = null; // Cancelar edición del comentario
  }

  saveComment() {
    if (this.editingComment) {
      this.commentService.updateComment(this.editingComment).then(() => {
        console.log('Comentario actualizado con éxito.');
        this.editingComment = null;
        this.loadComments(); // Actualizar la lista de comentarios
      }).catch(error => {
        console.error('Error al actualizar el comentario:', error);
        // Mostrar mensaje de error si la actualización falla
      });
    }
  }

  getCurrentTimestamp(): any {
    return new Date(); // Obtener la fecha y hora actual
  }
}
