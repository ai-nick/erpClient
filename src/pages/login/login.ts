import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loading: any;
	username: string;
	password: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
				public loadingCtrl: LoadingController, public auth: AuthProvider){

	}

	ionViewDidLoad() {

		//this.showLoader();

		this.storage.get('token').then((token) => {

			if(typeof(token) !== 'undefined'){

				console.log("authenticating with token: ", token);

				// Attempt to hack token
				// Uncommenting this will attempt to modify the payload of a valid token with a userId of 57 to have a userId of 1 instead
				// Hint: it won't work
				// token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5NjYzOTU2Mn0=.JZKf2L3usAQWsC1plSPCRcHMoSST_3_BYtF6_-rVk80';

				this.auth.reauthenticate(token).subscribe(
					(data) => {
					  console.log(data);
					  this.navCtrl.setRoot(HomePage);
					},
					(err) => {
						console.log(err);
					}
				  );

			} else {
				console.log('no token fill out and submit form to get your token');
			}

		});	

	}

	login(){

		this.auth.login(this.username, this.password).subscribe(
			(data) => {
				console.log("received token: ", data.json());
				this.storage.set('token', data.json().token);
				this.navCtrl.setRoot(HomePage);
		}, (err) => {
			console.log(err);
		});

	}

	showLoader(){
	
		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();

	}

}
