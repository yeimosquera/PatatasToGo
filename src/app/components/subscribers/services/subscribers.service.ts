import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  urlBase = 'https://lab.invertebrado.co/api/'

  constructor(private http: HttpClient) { }

  login(data:any):Observable<any>{
    return this.http.post(
      this.urlBase + 'account/login',
      data,
      {
        headers: new HttpHeaders({'Authorization':'Bear jwttoken'})
      }
    )
  }

  getSubscribers(page:number=1, count:number = 10):Observable<any>{
    const query = `subscribers?criteria=&page=${page}&count=${count}&sortOrder=Name&sortType=0`;
    const Token = localStorage.getItem('Token');
    return this.http.get(this.urlBase + query,
    {
      headers: new HttpHeaders({'Authorization':`Bearera ${Token}`})
    } )
  }

  getCountries(page:number=1, count:number = 255):Observable<any>{
    const query = `countries?page=${page}&count=${count}&sortType=0`;
    const Token = localStorage.getItem('Token');
    return this.http.get(this.urlBase + query);
  }

  addSubscribers(data:any):Observable<any>{
    const Token = localStorage.getItem('Token');
    return this.http.post(this.urlBase + 'subscribers', data,
      {
        headers: new HttpHeaders({'Authorization':`Bearera ${Token}`})
      })
  }

}
