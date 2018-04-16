import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from '../login/login';
import { ProdList } from '../products/products';
import { ListPage } from '../list/list';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private products: string;
  private t: string;
  private pageList: any[];
  constructor(public navCtrl: NavController, public storage: Storage, public auth: AuthProvider) {
    this.pageList = [{title: 'Products',
                      value: ProdList},
                    {title: 'Users',
                     value: ListPage},
                    {title: 'Orders',
                     value: 'OrdersHome'}];
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

  gotoPage(pg: string){
    this.navCtrl.setRoot(pg);
  }
  
  get_products_full(){
    this.auth.authGetRequest('products', this.t).subscribe(
      (data) => {
        console.log(data);
        this.products = data.json();
      },
      (err) => {
        console.log(err);
      }
      );
  }

  logout(){
    this.storage.set('token', undefined);
    this.navCtrl.setRoot(LoginPage);
  }

}
