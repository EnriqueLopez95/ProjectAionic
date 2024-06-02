import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalController } from '@ionic/angular';
import { ApiaceaeM } from 'src/app/models/apiaceae.model';
import { AddUpdateApiaceaeComponent } from 'src/app/shared/components/add-update-apiaceae/add-update-apiaceae.component';
import { ApiaceaeDetailComponent } from 'src/app/shared/components/apiaceae-detail/apiaceae-detail.component';
import { User } from 'src/app/models/user.model'; // Asegúrate de importar el modelo de usuario aquí
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NgIf } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-apiaceae',
  templateUrl: './apiaceae.page.html',
  styleUrls: ['./apiaceae.page.scss'],
})
export class ApiaceaePage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)
  constructor(private modalController: ModalController) {}
userRole: string = '';
loading: boolean = false;
cultivos: ApiaceaeM[] = [];
cultivoSeleccionado: ApiaceaeM; // Variable para almacenar el cultivo seleccionado


  ngOnInit() {    
    this.getUserRole();
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
      cssClass: 'Apiaceae-detail-modal',
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
    
      let path =`/Apiaceae/${cultivos.aid}`
    
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
          { text: 'Cultivos de Apiaceae', style: 'header' },
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
    
      pdfMake.createPdf(documentDefinition).download('cultivos_apiaceae.pdf');
    }
}

