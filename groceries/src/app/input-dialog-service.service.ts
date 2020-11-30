import { Injectable } from '@angular/core';
import { GroceriesServiceService } from './groceries-service.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertController: AlertController,public dataService: GroceriesServiceService) { }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item? 'Edit item' : 'Add Item',
      message: item? 'Please edit item...': 'Please add item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name: null
        },
        {
          name: 'quantity',
          type: 'text',
          id: 'name2-id',
          placeholder: 'Quantity',
          value: item? item.quantity:null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: item => {
            console.log('Confirm Save', item);
            if (index !==undefined){
              this.dataService.editItem(item,index);
            }
            else {
              this.dataService.addItem(item);
            }

          }
        }
      ]
    });

    await alert.present();
  }

}
