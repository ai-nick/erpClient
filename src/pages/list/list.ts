import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  orgs: any[];
  tok: string;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public loadingCtrl: LoadingController, public auth: AuthProvider){

}

ionViewDidLoad() {

this.storage.get('token').then((token) => {

  if(typeof(token) !== 'undefined'){

    this.getOrgs(token);
    console.log(token);

  } else {
    this.navCtrl.setRoot(LoginPage);
  }
});	  

}

public newItem(){
  this.navCtrl.setRoot(HomePage);
}
public getOrgs(t){
  this.auth.authGetRequest('users', t).subscribe(
    (data) => {
      console.log(data);
      this.items = data.json();
    },
    (err) => {
      console.log(err);
    }
    );
}
  itemTapped(event, item) {
  }
}
