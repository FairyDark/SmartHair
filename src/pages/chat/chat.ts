import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  ref;
  name;
  newmessage;
  messagesList;

  constructor(public navCtrl: NavController, public alert: AlertController) {
    this.ref = firebase.database().ref('messages');
  }
  ionViewDidLoad() {
    // Presenting popup
    this.alert.create({
      title: 'Username',
      inputs: [{
        name: 'username',
        placeholder: 'username'
      }],
      buttons: [{
        text: 'Continue',
        handler: username => {
          this.name = username
        }
      }]
    }).present();

    //reading data from firebase
    this.ref.on('value', data => {
      let tmp = [];
      data.forEach(data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          message: data.val().message
        })
      });
      this.messagesList = tmp;
    });
  }
  send() {
    // add new data to firebase
    this.ref.push({
      name: this.name.username,
      message: this.newmessage
    });
  }


}
