import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-iluminacion',
  templateUrl: './iluminacion.page.html',
  styleUrls: ['./iluminacion.page.scss'],
})
export class IluminacionPage {
  lightStatus: number = 0; // Inicializamos lightStatus a 0 para asegurar que tenga un valor al principio

  constructor(
    private navCtrl: NavController,
    private db: AngularFirestore
  ) {
    // Obtener el estado de la luz de la base de datos cuando se inicializa el componente
    this.getLightStatus();
  }

  getLightStatus(): void {
    this.db.doc('pixcapp/HDWoeom12hu2922YxQof').valueChanges().subscribe((data: any) => {
      this.lightStatus = data.control_luz;
    });
  }

  // Función para encender la luz
  turnOnLight() {
    if (this.lightStatus !== 1) {
      this.updateLightStatus(1); // 1 para indicar que la luz está encendida
    }
  }

  // Función para apagar la luz
  turnOffLight() {
    if (this.lightStatus !== 0) {
      this.updateLightStatus(0); // 0 para indicar que la luz está apagada
    }
  }

  // Función para actualizar el estado de la luz en Firebase
  updateLightStatus(status: number) {
    this.db.doc('pixcapp/HDWoeom12hu2922YxQof').update({ control_luz: status })
      .then(() => {
        console.log('Estado de la luz actualizado en Firebase:', status === 1 ? 'Encendida' : 'Apagada');
      })
      .catch((error) => {
        console.error('Error al actualizar el estado de la luz en Firebase:', error);
      });
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
