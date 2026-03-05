import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  public getToken(): string {
    return 'token123';
  }
}
