import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable()
export class LogoutService {

  // tokensRenokeUrl = 'http://localhost:8080/tokens/revoke';

  tokensRenokeUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
