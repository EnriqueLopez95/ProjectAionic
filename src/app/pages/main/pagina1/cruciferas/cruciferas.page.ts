import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalController } from '@ionic/angular';
import { CruciferasM } from 'src/app/models/cruciferas.model';
import { AddUpdateCruciferasComponent } from 'src/app/shared/components/add-update-cruciferas/add-update-cruciferas.component';
import { CruciferasDetailComponent } from 'src/app/shared/components/cruciferas-detail/cruciferas-detail.component';

@Component({
  selector: 'app-cruciferas',
  templateUrl: './cruciferas.page.html',
  styleUrls: ['./cruciferas.page.scss'],
})
export class CruciferasPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  constructor(private modalController: ModalController) {}

loading: boolean = false;
cultivos: CruciferasM[] = [];
cultivoSeleccionado: CruciferasM; // Variable para almacenar el cultivo seleccionado


  ngOnInit() {
  }


  
  //============= Agregar o Actualizar producto====================

async AddUpdateCruciferas( cultivos?: CruciferasM){
  let success = await this.utilsSvc.presentModal({
    component: AddUpdateCruciferasComponent,
    cssClass: 'add-update-modal',
    componentProps: {cultivos}
  })


  if(success) this.getCultivos();
}


ionViewWillEnter() {
  this.getCultivos();
}


  // Función para abrir el detalle del cultivo seleccionado
  async CruciferasDetail(cultivo?: CruciferasM) {
    let success = await this.utilsSvc.presentModal({
      component: CruciferasDetailComponent,
      cssClass: 'Cruciferas-detail-modal',
      componentProps: { cultivo } // Pasa el cultivo específico al modal
    });
  
    if (success) this.getCultivos();
  }
  


  //================== Obtener Productos=====================
  getCultivos(){
    let path =`/Cruciferas`;

    this.loading = true;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cultivos = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })

  }


  async confirmDeleteCruciferas(cultivos: CruciferasM) {
    this.utilsSvc.presentAlert({
        header: 'Eliminar Cultivo',
        message: '¿Estas seguro de quere eliminar este cultivo?',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancelar',
          }, {
            text: 'Sí, eliminar',
            handler: () => {
              this.deleteCruciferas(cultivos)
            }
          }
        ]
      });
    
    }
    
    //==================== Eliminar Producto ======================
    async deleteCruciferas(cultivos: CruciferasM) {
    
      let path =`/Cruciferas/${cultivos.aid}`
    
      const loading = await this.utilsSvc.loading();
      await loading.present();
    
      this.firebaseSvc.deleteDocument(path).then(async res => {
    
        this.cultivos = this.cultivos.filter(c => c.aid !== cultivos.aid);
    
        this.utilsSvc.presentToast({
          message: 'Cultivo eliminado exitosamente',
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

