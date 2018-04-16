import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthProvider {

	url: string = 'http://localhost:8000/'

	constructor(public http: Http) {

	}

	login(username, password){

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let credentials = {
			username: username,
			password: password
		};

		return this.http.post(this.url + 'api/auth_obtain_token', credentials, {headers: headers});

	}

	reauthenticate(token){

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let credentials = {
			token: token
		};

		return this.http.post(this.url + 'api/checkToken', JSON.stringify(credentials), {headers: headers});

	}

	authGetRequest(endpoint, token){
		let header = new Headers();
		header.append('Authorization', 'Bearer '+token);
		return this.http.get(this.url + 'api/' + endpoint+'/', { headers: header});
	}

	authPostRequest(endpoint, token, data){
		let headers = new Headers();
		headers.append('Authorization', 'Bearer '+token);
		headers.append('Content-Type', 'application/json');

		return this.http.post(this.url + 'api/' + endpoint, JSON.stringify(data), {headers:headers})
	}
}
