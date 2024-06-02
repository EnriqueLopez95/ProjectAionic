import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalController } from '@ionic/angular';
import { CruciferasM } from 'src/app/models/cruciferas.model';
import { AddUpdateCruciferasComponent } from 'src/app/shared/components/add-update-cruciferas/add-update-cruciferas.component';
import { CruciferasDetailComponent } from 'src/app/shared/components/cruciferas-detail/cruciferas-detail.component';
import { User } from 'src/app/models/user.model'; // Asegúrate de importar el modelo de usuario aquí
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NgIf } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
userRole: string = '';

  ngOnInit() {    
    this.getUserRole();
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

    getUserRole() {
      this.firebaseSvc.getCurrentUserWithRole().subscribe((user: User) => {
        if (user) {
          // Suponemos que 'user.role' es el campo que contiene el rol del usuario en Firestore
          this.userRole = user.role;
        }
      });
    }


    generatePDF() {
      const documentDefinition = {
        content: [
          { text: 'Cultivos de Cruciferas', style: 'header' },
          ...this.cultivos.map(cultivo => ({
            table: {
              widths: ['auto', '*'],
              body: [
                [{ text: 'Nombre', style: 'tableHeader' }, { text: cultivo.nombre, style: 'tableData' }],
                [{ text: 'Descripción', style: 'tableHeader' }, { text: cultivo.descripcion, style: 'tableData' }],
                [{ text: 'Tiempo de Cosecha', style: 'tableHeader' }, { text: cultivo.tiempoCosecha, style: 'tableData' }],
                [{ text: 'Fertilización', style: 'tableHeader' }, { text: cultivo.fertilizacion, style: 'tableData' }],
                [{ text: 'Marco de Cultivo', style: 'tableHeader' }, { text: cultivo.MarcoCultivo, style: 'tableData' }],
                [{ text: 'Riego', style: 'tableHeader' }, { text: cultivo.Riego, style: 'tableData' }],
                [{ text: 'Cultivos de Ciclo Corto', style: 'tableHeader' }, { text: cultivo.cultivosCicloCorto, style: 'tableData' }]
              ]
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
              }
            },
            margin: [0, 10, 0, 10] // Separación entre tablas de cultivos
          }))
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            marginBottom: 20,
            alignment: 'center'
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            fillColor: '#4CAF50',
            color: 'white'
          },
          tableData: {
            fontSize: 10,
            margin: [0, 5, 0, 5]
          }
        },
        defaultStyle: {
          fontSize: 10,
          alignment: 'left'
        },
        pageSize: 'A4',
        pageMargins: [20, 20, 20, 20]
      };
    
      pdfMake.createPdf(documentDefinition).download('cultivos_cruciferas.pdf');
    }
  }

