import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryDto, LkDirectionInfoDto, LookUpDto } from '../Models/LookUp';
import { PromoCodesDto } from '../Models/PromoCodes';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  constructor(protected http: HttpClient) {}
  
  getDirections(): Observable<LookUpDto[]> {
    return this.http.get<LookUpDto[]>(`${environment.apiUrl}/LookUp/directions`);
  }

  // Get Direction Info by DirectionId
  getDirectionInfos(): Observable<LkDirectionInfoDto[]> {
    return this.http.get<LkDirectionInfoDto[]>(`${environment.apiUrl}/LookUp/directionInfos`);
  }

  getCountries(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${environment.apiUrl}/LookUp/Countires`);
  }

   getPromoCodes(code:string): Observable<PromoCodesDto> {
    return this.http.get<PromoCodesDto>(`${environment.apiUrl}/LookUp/PromoCodes/`+code);
  }

}
