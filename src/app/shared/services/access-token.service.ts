import { Injectable } from '@angular/core';


@Injectable()
export class AccessTokenService {

  getToken(): String {
    return window.localStorage['AccessToken'];
  }

  saveToken(token: String) {
		
		document.cookie = "accessToken=" + token + ';path=/';
		
    window.localStorage['AccessToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('AccessToken');
  }

}
