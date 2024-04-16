import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.page.html',
  styleUrls: ['./humedad.page.scss'],
})
export class HumedadPage implements OnDestroy {
  minutes: number = 0;
  seconds: number = 0;
  intervalId: any;
  isTimerRunning: boolean = false;
  buttonText: string = 'Empezar';
  tiempoAgua: number = 0;
  tiempoAguaSubscription!: Subscription;

  constructor(
    private navCtrl: NavController,
    private db: AngularFirestore
  ) {
    this.tiempoAguaSubscription = new Subscription();
    // Obtener los valores de la base de datos cuando se inicializa el componente
    this.getFirestoreData();
    // Iniciar el temporizador y actualizar tiempo_agua a 1 al inicio
    this.setTimer(0); // Puedes ajustar el valor de los minutos según tu lógica
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.tiempoAguaSubscription.unsubscribe();
  }

  getFirestoreData(): void {
    this.db.doc('pixcapp/HDWoeom12hu2922YxQof').valueChanges().subscribe((data: any) => {
      this.tiempoAgua = data.tiempo_agua;
    });
  }
  


  setTimer(minutes: number): void {
    this.minutes = minutes;
    this.seconds = 0;
    this.startTimer();
    // Actualizar tiempo_agua en Firebase a 1 cuando se inicia el temporizador
    this.db.doc('pixcapp/HDWoeom12hu2922YxQof').update({ tiempo_agua: 0 });
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.clearTimer();
          // Aquí puedes agregar la lógica cuando el temporizador llega a cero
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  private clearTimer(): void {
    clearInterval(this.intervalId);
    if (this.minutes === 0 && this.seconds === 0) {
      // Aquí puedes agregar la lógica cuando el temporizador llega a cero después de cancelarlo
      console.log('El temporizador llegó a cero después de cancelarse');
      this.buttonText = 'Empezar'; // Cambiar el texto del botón a "Empezar" cuando el temporizador llega a cero
      this.isTimerRunning = false; // Establecer isTimerRunning en falso para habilitar los botones
      // Actualizar tiempo_agua en Firebase a 0 cuando se cancela el temporizador
      this.db.doc('pixcapp/HDWoeom12hu2922YxQof').update({ tiempo_agua: 0 });
    }
  }

  incrementMinutes(): void {
    this.minutes++;
  }

  decrementMinutes(): void {
    if (this.minutes > 0) {
      this.minutes--;
    }
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
     // Actualizar tiempo_agua en Firebase a 1 cuando se inicia el temporizador
     this.db.doc('pixcapp/HDWoeom12hu2922YxQof').update({ tiempo_agua: 0 });
  }

  toggleTimer(): void {
    if (this.minutes === 0 && this.seconds === 0) {
      // Si el tiempo es 0, no hacer nada
      return;
    }

    if (this.isTimerRunning) {
      this.clearTimer();
      this.minutes = 0;
      this.seconds = 0;
      // Actualizar tiempo_agua en Firebase a 0 cuando se cancela el temporizador
      this.db.doc('pixcapp/HDWoeom12hu2922YxQof').update({ tiempo_agua: 0 });
    } else {
      this.startTimer();
      this.buttonText = 'Cancelar'; // Cambiar el texto del botón a "Cancelar" al iniciar el temporizador
      // Actualizar tiempo_agua en Firebase a 1 cuando se inicia el temporizador
      this.db.doc('pixcapp/HDWoeom12hu2922YxQof').update({ tiempo_agua: 1 });
    }
    this.isTimerRunning = !this.isTimerRunning;
  }



}