import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  mainUrl: string;
  companySelected$: BehaviorSubject<any> = new BehaviorSubject('');


  constructor(private http: HttpClient) {
      this.mainUrl = environment.localhost;
   }

   getData(): Observable<any>{
     return this.http.get(this.mainUrl + 'orders/start');
   }

   getCompanies(): Observable<any>{
     return this.http.get(this.mainUrl + 'orders/getcompanies')
   }

   getPrevousOrdersForCompany(companyId: string): Observable<any>{
     return this.http.get(this.mainUrl + 'orders/getordersByCompanie?companyId=' + companyId);
   }

   getAvaliableWorkStations(companyId: string, dateFrom:string, dateTo:string){

    return this.http.get(this.mainUrl + `orders/GetAvailiableSlots?companyId=${companyId}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
   }

   MakeBooking(companyId: string, dateFrom:string, dateTo:string, workStationId:string){
    return this.http.get(this.mainUrl + `orders/makeBooking?companyId=${companyId}&dateFrom=${dateFrom}&dateTo=${dateTo}&workStationId=${workStationId}`);
   }
}
