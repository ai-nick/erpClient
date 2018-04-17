import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../login/login';
import { ProdList } from '../products/products';
import { ListPage } from '../list/list';
import {OrderList} from '../orders/orders'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private t: string;
  private pageList: any[];
  constructor(public navCtrl: NavController, public storage: Storage, public auth: AuthProvider) {
    this.pageList = [{title: 'Products',
                      value: ProdList},
                    {title: 'Users',
                     value: ListPage},
                    {title: 'Orders',
                     value: OrderList}];
  }

	ionViewDidLoad() {

		//this.showLoader();

		this.storage.get('token').then((token) => {

			if(typeof(token) !== 'undefined'){

				console.log("authenticating with token: ", token);

				this.auth.reauthenticate(token).subscribe(
					(data) => {
					  console.log(data);
            this.t = token;
					},
					(err) => {
            console.log(err);
            this.navCtrl.setRoot(LoginPage)
					}
				  );

			} else {
				console.log('no token fill out and submit form to get your token');
			}

		});	

	}

  gotoPage(pg){
    this.navCtrl.setRoot(pg);
  }
  

  logout(){
    this.storage.set('token', undefined);
    this.navCtrl.setRoot(LoginPage);
  }

}
