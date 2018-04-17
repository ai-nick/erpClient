import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';


@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderList {
  tok: string;
  items: any[];
  constructor(public navCtrl: NavController, public navp: NavParams, public storage: Storage, 
    public loadingCtrl: LoadingController, public auth: AuthProvider){

}

ionViewDidLoad() {

this.storage.get('token').then((token) => {

  if(typeof(token) !== 'undefined'){

    this.getOrders(token);
    this.tok = token;

  } else {
    this.navCtrl.setRoot(LoginPage);
  }
});	  

}

public newItem(){
  this.navCtrl.setRoot('new-order');
}
public getOrders(t){
  this.auth.authGetRequest('orders', t).subscribe(
    (data) => {
      console.log(data);
      this.items = data.json();
    },
    (err) => {
      console.log(err);
    }
    );
}
  itemTapped(id) {
    let pobj = {id: id};
    this.navCtrl.setRoot('edit-order', pobj);
  }


  deleteItem(id){
    this.auth.authDeleteRequest('orders/'+id, this.tok).subscribe(
      (data)=>{
        this.navCtrl.setRoot(OrderList);
      },
      (err)=>{
        console.log(err);
      }
    );
  }
}