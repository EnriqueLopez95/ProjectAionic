import { Component, inject, OnInit } from '@angular/core';
import { AmarylidaceasM } from 'src/app/models/amarylidaceas.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateAmarylidaceasComponent } from 'src/app/shared/components/add-update-amarylidaceas/add-update-amarylidaceas.component';
import { ModalController } from '@ionic/angular';
import { AmarylidaceasDetailComponent } from 'src/app/shared/components/amarylidaceas-detail/amarylidaceas-detail.component';

@Component({
  selector: 'app-amarylidaceas',
  templateUrl: './amarylidaceas.page.html',
  styleUrls: ['./amarylidaceas.page.scss'],
})
export class AmarylidaceasPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  constructor(private modalController: ModalController) {}

loading: boolean = false;
cultivos: AmarylidaceasM[] = [];
cultivoSeleccionado: AmarylidaceasM; // Variable para almacenar el cultivo seleccionado


  ngOnInit() {
  }


  
  //============= Agregar o Actualizar producto====================

async AddUpdateAmarylidaceas( cultivos?: AmarylidaceasM){
  let success = await this.utilsSvc.presentModal({
    component: AddUpdateAmarylidaceasComponent,
    cssClass: 'add-update-modal',
    componentProps: {cultivos}
  })


  if(success) this.getCultivos();
}


ionViewWillEnter() {
  this.getCultivos();
}


  // Función para abrir el detalle del cultivo seleccionado
  async amarylidaceasDetail(cultivo?: AmarylidaceasM) {
    let success = await this.utilsSvc.presentModal({
      component: AmarylidaceasDetailComponent,
      cssClass: 'amarylidaceas-detal-modal',
      componentProps: { cultivo } // Pasa el cultivo específico al modal
    });
  
    if (success) this.getCultivos();
  }
  


  //================== Obtener Productos=====================
  getCultivos(){
    let path =`/Amarylidáceas`;

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


  async confirmDeleteAmarylidaceas(cultivos: AmarylidaceasM) {
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
              this.deleteAmarylidaceas(cultivos)
            }
          }
        ]
      });
    
    }
    
    //==================== Eliminar Producto ======================
    async deleteAmarylidaceas(cultivos: AmarylidaceasM) {
    
      let path =`/Amarylidáceas/${cultivos.aid}`
    
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
