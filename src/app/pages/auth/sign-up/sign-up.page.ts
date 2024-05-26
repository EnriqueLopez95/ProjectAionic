import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  // Definición del formulario con campos uid, email, password y name
  form = new FormGroup({
    uid: new FormControl(''), // Campo para el UID del usuario
    email: new FormControl('', [Validators.required, Validators.email]), // Campo de email con validación
    password: new FormControl('', [Validators.required]), // Campo de password con validación
    name: new FormControl('', [Validators.required, Validators.minLength(4)]) // Campo de nombre con validación
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

      // Llama al servicio de Firebase para registrar un nuevo usuario
      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        let uid = res.user.uid; // Obtiene el UID del usuario recién registrado
        this.form.controls.uid.setValue(uid); // Establece el UID en el formulario

        this.setUserInfo(uid); // Guarda la información del usuario en la base de datos

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

  // Método asíncrono para guardar la información del usuario en Firebase
  async setUserInfo(uid: string) {
    if (this.form.valid) { // Verifica si el formulario es válido
      const loading = await this.utilsSvc.loading(); // Muestra un indicador de carga
      await loading.present(); // Espera a que el indicador de carga se presente

      let path = `users/${uid}`; // Define la ruta al documento del usuario en Firebase
      delete this.form.value.password; // Elimina el campo password del formulario antes de guardar

      // Llama al servicio de Firebase para guardar el documento del usuario
      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {
        this.utilsSvc.saveInLocalStorage('user', this.form.value); // Guarda la información del usuario en el almacenamiento local
        this.utilsSvc.routerLink('places'); // Redirige a la página 'places'
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