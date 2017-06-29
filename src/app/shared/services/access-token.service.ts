import { Injectable } from '@angular/core';


@Injectable()
export class AccessTokenService {

  getToken(): String {
    return window.localStorage['AccessToken'];
  }

  saveToken(token: String) {
    window.localStorage['AccessToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('AccessToken');
  }

}
