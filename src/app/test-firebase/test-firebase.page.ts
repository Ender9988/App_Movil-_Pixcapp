import { Component, Inject, OnInit } from '@angular/core';
import { UsbSerial, UsbSerialResponse } from 'usb-serial-plugin';

@Component({
  selector: 'app-test-firebase',
  templateUrl: './test-firebase.page.html',
  styleUrls: ['./test-firebase.page.scss'],
})
export class TestFirebasePage implements OnInit {
  pixcappCollection: any[] = [];
  sendingData: boolean = false;

  constructor(
    @Inject(UsbSerial) private usbSerial: any // Inyecta el servicio UsbSerial
  ) { }

  ngOnInit() {
   
  }


  sendData(value: string) {
    // Si ya se está enviando datos, no hagas nada
    if (this.sendingData) return;

    this.sendingData = true;
    const options = {
      deviceId: 'USB\\VID_1A86&PID_55D4&REV_0444', // ID del dispositivo USB
      baudRate: 9600,
      portNum: 5,
      dataBits: 8,
      stopBits: 1,
      parity: 0,
      dtr: true,
      rts: true,
    };

    const charactersToSend = ['1', '0'];
    let index = 0;

    const sendNextCharacter = () => {
      if (index >= charactersToSend.length) {
        // Reinicia el índice si llegamos al final del arreglo
        index = 0;
      }

      const character = charactersToSend[index];
      this.usbSerial.openSerial(options)
        .then((response: UsbSerialResponse) => {
          console.log(`Puerto COM5 abierto correctamente. Enviando: ${character}`);
          return this.usbSerial.writeSerial({ data: character });
        })
        .then(() => {
          console.log(`Datos enviados correctamente: ${character}`);
          // Incrementa el índice para enviar el próximo carácter en el siguiente ciclo
          index++;
          // Programa el próximo envío después de un segundo
          setTimeout(sendNextCharacter, 1000);
        })
        .catch((error: any) => {
          console.error(`Error al enviar datos: ${error}`);
          this.sendingData = false; // Asegúrate de restablecer el estado en caso de error
        });
    };

    // Comienza el envío
    sendNextCharacter();
  }
}
