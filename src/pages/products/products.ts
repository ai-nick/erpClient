import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
@Component({
  selector: 'product-list',
  templateUrl: 'productsList.html'
})
export class ProdList {
  tok: string;
  items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public loadingCtrl: LoadingController, public auth: AuthProvider){

}

ionViewDidLoad() {

this.storage.get('token').then((token) => {

  if(typeof(token) !== 'undefined'){

    this.getOrgs(token);
    this.tok = token;

  } else {
    this.navCtrl.setRoot(LoginPage);
  }
});	  

}

public newItem(){
  this.navCtrl.setRoot(NewProd);
}
public getOrgs(t){
  this.auth.authGetRequest('products', t).subscribe(
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
    this.navCtrl.setRoot(EditProd, pobj);
  }


  deleteItem(id){
    this.auth.authDeleteRequest('products/'+id, this.tok).subscribe(
      (data)=>{
        this.navCtrl.setRoot(ProdList);
      },
      (err)=>{
        console.log(err);
      }
    );
  }


}

@Component({
  selector: 'product-new',
  templateUrl: 'newProduct.html'
})
export class NewProd {
  tok: string;
  prod = {name: '',
            SKU: 0,
            price: 0.0,
            sold_sep: true,
          UPC: 'soidfhosudhf',
        cost: 0}
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public loadingCtrl: LoadingController, public auth: AuthProvider){

}

ionViewDidLoad() {

this.storage.get('token').then((token) => {

  if(typeof(token) !== 'undefined'){
    console.log(token);
    this.tok = token;
  } else {
    this.navCtrl.setRoot(LoginPage);
  }
});	  

}
public addProduct(){
  this.auth.authPostRequest('products', this.tok, this.prod).subscribe(
    (data) => {
      console.log(data);
      this.navCtrl.setRoot(ProdList);
    },
    (err) => {
      console.log(err);
    }
    );
}
}
@Component({
  selector: 'product-edit',
  templateUrl: 'newProduct.html'
})
export class EditProd {
  tok: string;
  prod = new Object();
  id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public loadingCtrl: LoadingController, public auth: AuthProvider){
      this.id = this.navParams.get('id');
}

ionViewDidLoad() {

this.storage.get('token').then((token) => {

  if(typeof(token) !== 'undefined'){
    console.log(token);
    this.tok = token;
    this.getProduct()
  } else {
    this.navCtrl.setRoot(LoginPage);
  }
});	  

}


public getProduct(){
  this.auth.authGetRequest('products/'+this.id, this.tok).subscribe(
    (data) => {
      console.log(data);
      this.prod = data.json();
    },
    (err) => {
      console.log(err);
    }
    );
}
public addProduct(){
  this.auth.authPutRequest('products/'+this.id, this.tok, this.prod).subscribe(
    (data) => {
      console.log(data);
      this.navCtrl.setRoot(ProdList);
    },
    (err) => {
      console.log(err);
    }
    );
}
}