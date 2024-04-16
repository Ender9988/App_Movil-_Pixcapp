import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.page.html',
  styleUrls: ['./temperatura.page.scss'],
})
export class TemperaturaPage {
  aireStatus: number = 0; // Inicializamos aireStatus a 0 para asegurar que tenga un valor al principio
  isAireOn: boolean = false; // Variable para rastrear el estado del aire

  constructor(
    private navCtrl: NavController,
    private db: AngularFirestore
  ) {
    // Obtener el estado del aire de la base de datos cuando se inicializa el componente
    this.getAireStatus();
  }

  getAireStatus(): void {
    this.db.doc('pixcapp/HDWoeom12hu2922YxQof').valueChanges().subscribe((data: any) => {
      this.aireStatus = data.control_aire;
      // Actualizar el estado del botón contrario cuando se obtiene el estado del aire
      this.isAireOn = this.aireStatus === 1;
    });
  }

  // Función para encender el aire
  turnOnAire() {
    if (this.aireStatus !== 1) {
      this.updateAireStatus(1); // 1 para indicar que el aire está encendido
    }
  }

  // Función para apagar el aire
  turnOffAire() {
    if (this.aireStatus !== 0) {
      this.updateAireStatus(0); // 0 para indicar que el aire está apagado
    }
  }

  // Función para actualizar el estado del aire en Firebase
  updateAireStatus(status: number) {
    this.db.doc('pixcapp/HDWoeom12hu2922YxQof').update({ control_aire: status })
      .then(() => {
        console.log('Estado del aire actualizado en Firebase:', status === 1 ? 'Encendido' : 'Apagado');
      })
      .catch((error) => {
        console.error('Error al actualizar el estado del aire en Firebase:', error);
      });
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
