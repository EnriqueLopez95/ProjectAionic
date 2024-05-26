import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CruciferasM } from 'src/app/models/cruciferas.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-cruciferas',
  templateUrl: './add-update-cruciferas.component.html',
  styleUrls: ['./add-update-cruciferas.component.scss'],
})
export class AddUpdateCruciferasComponent  implements OnInit {

  @Input() cultivos: CruciferasM;

  form = new FormGroup({
    aid: new FormControl(''),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    imagen: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(4)]),
    tiempoCosecha: new FormControl('', [Validators.required, Validators.minLength(4)]),
    fertilizacion: new FormControl('', [Validators.required, Validators.minLength(4)]),
    MarcoCultivo: new FormControl('', [Validators.required, Validators.minLength(4)]),
    Riego: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cultivosCicloCorto: new FormControl('', [Validators.required, Validators.minLength(4)]),

  });

  firebaseSvc= inject(FirebaseService);
  utilsSvc= inject(UtilsService)


  ngOnInit() {
    if (this.cultivos) this.form.setValue(this.cultivos);

  }

  submit(){
    if (this.form.valid) {
      if(this.cultivos) this.updateCultivos();
      else this.createCultivos();
    }   
  }
 
  
  ////////// CREAR CULTIVOS /////////////
  async createCultivos(){


      let path = `/Cruciferas`
      const loading = await this.utilsSvc.loading();
      await loading.present();
      
      delete this.form.value.aid;

      this.firebaseSvc.addDocument(path, this.form.value).then(async res =>{
        
        this.utilsSvc.dismissModal({ successs: true});

        this.utilsSvc.presentToast({
          message: 'Cultivo creado exitosamente',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })     

      }).catch(error=>{
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })


      }).finally(()=> {
        loading.dismiss();
      })



  }


//==================== Actualizar Producto ======================
async updateCultivos() {


  let path =`/Cruciferas/${this.cultivos.aid}`

  const loading = await this.utilsSvc.loading();
  await loading.present();

  delete this.form.value.aid;


  this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {
    
    this.utilsSvc.dismissModal({ successs: true});

    this.utilsSvc.presentToast({
      message: 'Producto actualizado exitosamente',
      duration: 1500,
      color: 'success',
      position: 'middle',
      icon: 'checkmark-circle-outline'
    })


  }).catch(error=>{
    console.log("error");

    this.utilsSvc.presentToast({
      message: error.message,
      duration: 2500,
      color: 'primary',
      position: 'middle',
      icon: 'alert-circle-outline'
    })

  }).finally(()=> {
    loading.dismiss();
  })

}




}

