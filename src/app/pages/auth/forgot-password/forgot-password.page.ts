import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  // Definición del formulario con un campo email
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Campo de email con validación
  });

  // Constructor que inyecta los servicios de Firebase y utilidades
  constructor(private firebaseSvc: FirebaseService, private utilsSvc: UtilsService) {}

  ngOnInit() {
    // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
  }

  // Método asíncrono que se llama al enviar el formulario
  async submit() {
    if (this.form.valid) { // Verifica si el formulario es válido

      const loading = await this.utilsSvc.loading(); // Muestra un indicador de carga
      await loading.present(); // Espera a que el indicador de carga se presente

      // Llama al servicio de Firebase para enviar un correo de recuperación
      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {

        // Muestra un mensaje de éxito en pantalla
        this.utilsSvc.presentToast({
          message: `Correo enviado con éxito`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        });

        this.utilsSvc.routerLink('/auth'); // Redirige a la página de autenticación
        this.form.reset(); // Resetea el formulario

      }).catch(error => {
        console.log(error); // Muestra el error en la consola

        // Muestra un mensaje de error en pantalla
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      }).finally(() => {
        loading.dismiss(); // Oculta el indicador de carga
      });

    }
  }
}