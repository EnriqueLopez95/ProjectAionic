import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isAuth: boolean = true; // Esta variable indica si el usuario está autenticado o no

  // Definición del formulario con campos email y password, ambos requeridos
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Campo de email con validación
    password: new FormControl('', [Validators.required]) // Campo de password con validación
  });

  // Inyección de dependencias para los servicios de Firebase y utilidades
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
    // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
  }

  // Método asíncrono que se llama al enviar el formulario
  async submit() {
    if (this.form.valid) { // Verifica si el formulario es válido
      const loading = await this.utilsSvc.loading(); // Muestra un indicador de carga
      await loading.present(); // Espera a que el indicador de carga se presente

      // Llama al servicio de autenticación de Firebase para iniciar sesión
      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        this.getUserInfo(res.user.uid); // Si la autenticación es exitosa, obtiene la información del usuario
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

  // Método asíncrono para obtener la información del usuario de Firebase
  async getUserInfo(uid: string) {
    if (this.form.valid) { // Verifica si el formulario es válido
      const loading = await this.utilsSvc.loading(); // Muestra un indicador de carga
      await loading.present(); // Espera a que el indicador de carga se presente

      let path = `users/${uid}`; // Define la ruta al documento del usuario en Firebase

      // Llama al servicio de Firebase para obtener el documento del usuario
      this.firebaseSvc.getDocument(path).then((user: User) => {
        this.utilsSvc.saveInLocalStorage('user', user); // Guarda la información del usuario en el almacenamiento local
        this.utilsSvc.routerLink('/main/home'); // Redirige a la página principal
        this.form.reset(); // Resetea el formulario

        // Muestra un mensaje de bienvenida en pantalla
        this.utilsSvc.presentToast({
          message: `Bienvenido ${user.name}`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        });
      }).catch(error => {
        console.log("error"); // Muestra el error en la consola

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