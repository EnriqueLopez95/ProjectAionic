// Importaciones necesarias para el funcionamiento del componente
import { Component, inject, Input, OnInit } from '@angular/core'; // Importa decoradores y funciones esenciales de Angular
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Importa clases para la creación de formularios reactivos y validadores
import { AmarylidaceasM } from 'src/app/models/amarylidaceas.model'; // Importa el modelo de datos para Amarylidaceas
import { FirebaseService } from 'src/app/services/firebase.service'; // Importa el servicio para interacciones con Firebase
import { UtilsService } from 'src/app/services/utils.service'; // Importa un servicio de utilidades para manejar notificaciones y carga

// Decorador que define el componente de Angular
@Component({
  selector: 'app-add-update-amarylidaceas', // Define el nombre del componente en el HTML
  templateUrl: './add-update-amarylidaceas.component.html', // Ruta de la plantilla HTML del componente
  styleUrls: ['./add-update-amarylidaceas.component.scss'], // Ruta de los estilos CSS del componente
})
export class AddUpdateAmarylidaceasComponent implements OnInit {

  // Decorador @Input para recibir datos desde un componente padre
  @Input() cultivos: AmarylidaceasM; // Propiedad de entrada que contiene datos de cultivos

  // Definición del formulario reactivo con sus controles y validaciones
  form = new FormGroup({
    aid: new FormControl(''), // Control para el ID del cultivo, sin validaciones
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]), // Control para el nombre, requerido y con longitud mínima de 2 caracteres
    imagen: new FormControl('', [Validators.required]), // Control para la URL de la imagen, requerido
    descripcion: new FormControl('', [Validators.required, Validators.minLength(4)]), // Control para la descripción, requerido y con longitud mínima de 4 caracteres
    tiempoCosecha: new FormControl('', [Validators.required, Validators.minLength(4)]), // Control para el tiempo de cosecha, requerido y con longitud mínima de 4 caracteres
    fertilizacion: new FormControl('', [Validators.required, Validators.minLength(4)]), // Control para la fertilización, requerido y con longitud mínima de 4 caracteres
    MarcoCultivo: new FormControl('', [Validators.required, Validators.minLength(4)]), // Control para el marco de cultivo, requerido y con longitud mínima de 4 caracteres
    Riego: new FormControl('', [Validators.required, Validators.minLength(4)]), // Control para el riego, requerido y con longitud mínima de 4 caracteres
    cultivosCicloCorto: new FormControl('', [Validators.required, Validators.minLength(4)]), // Control para cultivos de ciclo corto, requerido y con longitud mínima de 4 caracteres
  });

  // Inyección de dependencias utilizando la API de inyección de Angular
  firebaseSvc = inject(FirebaseService); // Servicio de Firebase para operaciones CRUD
  utilsSvc = inject(UtilsService); // Servicio de utilidades para manejar mensajes y modales

  // Método del ciclo de vida OnInit de Angular, se ejecuta al inicializar el componente
  ngOnInit() {
    if (this.cultivos) { // Verifica si se han pasado datos de cultivos
      this.form.setValue(this.cultivos); // Si hay datos, establece los valores del formulario con esos datos
    }
  }

  // Método que se ejecuta al enviar el formulario
  submit() {
    if (this.form.valid) { // Verifica si el formulario es válido
      if (this.cultivos) { // Si hay datos de cultivos, es una actualización
        this.updateCultivos(); // Llama al método para actualizar cultivos
      } else { // Si no hay datos de cultivos, es una creación
        this.createCultivos(); // Llama al método para crear cultivos
      }
    }
  }

  // Método asíncrono para crear nuevos cultivos en Firebase
  async createCultivos() {
    let path = '/Amarylidáceas'; // Define la ruta de la colección en Firebase
    const loading = await this.utilsSvc.loading(); // Muestra un indicador de carga
    await loading.present(); // Espera a que el indicador de carga se presente

    delete this.form.value.aid; // Elimina el ID del cultivo del formulario, ya que no se necesita para crear

    // Agrega un nuevo documento en Firebase y maneja la respuesta
    this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
      this.utilsSvc.dismissModal({ successs: true }); // Cierra el modal y envía una señal de éxito
      this.utilsSvc.presentToast({
        message: 'Cultivo creado exitosamente', // Mensaje de éxito
        duration: 1500, // Duración del mensaje
        color: 'success', // Color del mensaje
        position: 'middle', // Posición del mensaje en la pantalla
        icon: 'checkmark-circle-outline' // Icono del mensaje
      });
    }).catch(error => {
      console.error(error); // Imprime el error en la consola
      this.utilsSvc.presentToast({
        message: error.message, // Mensaje de error
        duration: 2500, // Duración del mensaje
        color: 'primary', // Color del mensaje
        position: 'middle', // Posición del mensaje en la pantalla
        icon: 'alert-circle-outline' // Icono del mensaje
      });
    }).finally(() => {
      loading.dismiss(); // Oculta el indicador de carga
    });
  }

  // Método asíncrono para actualizar cultivos existentes en Firebase
  async updateCultivos() {
    let path = `/Amarylidáceas/${this.cultivos.aid}`; // Define la ruta del documento en Firebase usando el ID del cultivo
    const loading = await this.utilsSvc.loading(); // Muestra un indicador de carga
    await loading.present(); // Espera a que el indicador de carga se presente

    delete this.form.value.aid; // Elimina el ID del cultivo del formulario, ya que no se necesita para actualizar

    // Actualiza el documento en Firebase y maneja la respuesta
    this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {
      this.utilsSvc.dismissModal({ successs: true }); // Cierra el modal y envía una señal de éxito
      this.utilsSvc.presentToast({
        message: 'Producto actualizado exitosamente', // Mensaje de éxito
        duration: 1500, // Duración del mensaje
        color: 'success', // Color del mensaje
        position: 'middle', // Posición del mensaje en la pantalla
        icon: 'checkmark-circle-outline' // Icono del mensaje
      });
    }).catch(error => {
      console.error(error); // Imprime el error en la consola
      this.utilsSvc.presentToast({
        message: error.message, // Mensaje de error
        duration: 2500, // Duración del mensaje
        color: 'primary', // Color del mensaje
        position: 'middle', // Posición del mensaje en la pantalla
        icon: 'alert-circle-outline' // Icono del mensaje
      });
    }).finally(() => {
      loading.dismiss(); // Oculta el indicador de carga
    });
  }
}
