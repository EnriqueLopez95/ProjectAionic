import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalController } from '@ionic/angular';
import { ApiaceaeM } from 'src/app/models/apiaceae.model';
import { AddUpdateApiaceaeComponent } from 'src/app/shared/components/add-update-apiaceae/add-update-apiaceae.component';
import { ApiaceaeDetailComponent } from 'src/app/shared/components/apiaceae-detail/apiaceae-detail.component';
@Component({
  selector: 'app-apiaceae',
  templateUrl: './apiaceae.page.html',
  styleUrls: ['./apiaceae.page.scss'],
})
export class ApiaceaePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  constructor(private modalController: ModalController) {}

loading: boolean = false;
cultivos: ApiaceaeM[] = [];
cultivoSeleccionado: ApiaceaeM; // Variable para almacenar el cultivo seleccionado


  ngOnInit() {
  }


  
  //============= Agregar o Actualizar producto====================

async AddUpdateApiaceae( cultivos?: ApiaceaeM){
  let success = await this.utilsSvc.presentModal({
    component: AddUpdateApiaceaeComponent,
    cssClass: 'add-update-modal',
    componentProps: {cultivos}
  })


  if(success) this.getCultivos();
}


ionViewWillEnter() {
  this.getCultivos();
}


  // Función para abrir el detalle del cultivo seleccionado
  async ApiaceaeDetail(cultivo?: ApiaceaeM) {
    let success = await this.utilsSvc.presentModal({
      component: ApiaceaeDetailComponent,
      cssClass: 'Apiaceae-detal-modal',
      componentProps: { cultivo } // Pasa el cultivo específico al modal
    });
  
    if (success) this.getCultivos();
  }
  


  //================== Obtener Productos=====================
  getCultivos(){
    let path =`/Apiaceae`;

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


  async confirmDeleteApiaceae(cultivos: ApiaceaeM) {
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
              this.deleteApiaceae(cultivos)
            }
          }
        ]
      });
    
    }
    
    //==================== Eliminar Producto ======================
    async deleteApiaceae(cultivos: ApiaceaeM) {
    
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

