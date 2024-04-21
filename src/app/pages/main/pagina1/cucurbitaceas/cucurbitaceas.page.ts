import { Component, inject, OnInit } from '@angular/core';
import { Curcuvitacias } from 'src/app/models/curcuvitacias.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateCucurbitaceasComponent } from 'src/app/shared/components/add-update-cucurbitaceas/add-update-cucurbitaceas.component';
import { ModalController } from '@ionic/angular';
import { CurcubitaceasDetailComponent } from 'src/app/shared/components/curcubitaceas-detail/curcubitaceas-detail.component';


@Component({
  selector: 'app-cucurbitaceas',
  templateUrl: './cucurbitaceas.page.html',
  styleUrls: ['./cucurbitaceas.page.scss'],
})
export class CucurbitaceasPage implements OnInit {




  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  constructor(private modalController: ModalController) {}

loading: boolean = false;
cultivos: Curcuvitacias[] = [];
cultivoSeleccionado: Curcuvitacias; // Variable para almacenar el cultivo seleccionado


  ngOnInit() {
  }


  
  //============= Agregar o Actualizar producto====================

async AddUpdateAmarylidaceas( cultivos?: Curcuvitacias){
  let success = await this.utilsSvc.presentModal({
    component: AddUpdateCucurbitaceasComponent,
    cssClass: 'add-update-modal',
    componentProps: {cultivos}
  })


  if(success) this.getCultivos();
}


ionViewWillEnter() {
  this.getCultivos();
}


  // Función para abrir el detalle del cultivo seleccionado
  async amarylidaceasDetail(cultivo?: Curcuvitacias) {
    let success = await this.utilsSvc.presentModal({
      component: CurcubitaceasDetailComponent,
      cssClass: 'amarylidaceas-detail-modal',
      componentProps: { cultivo } // Pasa el cultivo específico al modal
    });
  
    if (success) this.getCultivos();
  }
  


  //================== Obtener Productos=====================
  getCultivos(){
    let path =`/Curcubitaceas`;

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


  async confirmDeleteAmarylidaceas(cultivos: Curcuvitacias) {
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
    async deleteAmarylidaceas(cultivos: Curcuvitacias) {
    
      let path =`/Curcubitaceas/${cultivos.aid}`
    
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
