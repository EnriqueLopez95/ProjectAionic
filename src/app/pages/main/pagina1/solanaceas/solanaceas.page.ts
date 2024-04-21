import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalController } from '@ionic/angular';
import { solanaceasDetailComponent } from 'src/app/shared/components/solanaceas-detail/solanaceas-detail.component.spec';
import { solanaceasM } from 'src/app/models/solanaceas.model';
import { AddUpdatesolanaceasComponent } from 'src/app/shared/components/add-update-solanaceas/add-update-solanaceas.component';

@Component({
  selector: 'app-solanaceas',
  templateUrl: './solanaceas.page.html',
  styleUrls: ['./solanaceas.page.scss'],
})
export class solanaceasPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  constructor(private modalController: ModalController) {}

loading: boolean = false;
cultivos: solanaceasM[] = [];
cultivoSeleccionado: solanaceasM; // Variable para almacenar el cultivo seleccionado


  ngOnInit() {
  }


  
  //============= Agregar o Actualizar producto====================

async AddUpdatesolanaceas( cultivos?: solanaceasM){
  let success = await this.utilsSvc.presentModal({
    component: AddUpdatesolanaceasComponent,
    cssClass: 'add-update-modal',
    componentProps: {cultivos}
  })


  if(success) this.getCultivos();
}


ionViewWillEnter() {
  this.getCultivos();
}


  // Función para abrir el detalle del cultivo seleccionado
  async solanaceasDetail(cultivo?: solanaceasM) {
    let success = await this.utilsSvc.presentModal({
      component: solanaceasDetailComponent,
      cssClass: 'solanaceas-detal-modal',
      componentProps: { cultivo } // Pasa el cultivo específico al modal
    });
  
    if (success) this.getCultivos();
  }
  


  //================== Obtener Productos=====================
  getCultivos(){
    let path =`/solanaceas`;

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


  async confirmDeletesolanaceas(cultivos: solanaceasM) {
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
              this.deletesolanaceas(cultivos)
            }
          }
        ]
      });
    
    }
    
    //==================== Eliminar Producto ======================
    async deletesolanaceas(cultivos: solanaceasM) {
    
      let path =`/solanaceas/${cultivos.aid}`
    
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
