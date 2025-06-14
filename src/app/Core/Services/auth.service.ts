import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, isEmpty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto, LoginResponseDto, OtpResponse, RegisterDto, SendOtpRequest, UserDto, VerifyOtpRequest } from '../Models/Auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) {}

  private IsLogged = new BehaviorSubject<boolean>(localStorage.getItem("token")! != null  && localStorage.getItem("token")! != undefined);
  IsLogged$ = this.IsLogged.asObservable();

  
  
  private UserInfo = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("UserInfo")!));
  UserInfo$ = this.UserInfo.asObservable();

  SetLogged(val:boolean){
 this.IsLogged.next(val)
  }
  SetUserInfo(val:any){
    this.UserInfo.next(val)
     }
    Login(payload: LoginDto): Observable<LoginResponseDto> {
      return this.http.post<LoginResponseDto>(`${environment.apiUrl}/Auth/login`, payload);
    }

    register(payload: RegisterDto): Observable<LoginResponseDto> {
      return this.http.post<LoginResponseDto>(`${environment.apiUrl}/Auth/register`, payload);
    }

    
    VerifyEmail(payload: SendOtpRequest): Observable<OtpResponse> {
      return this.http.post<OtpResponse>(`${environment.apiUrl}/Auth/VerifyEmail`, payload);
    }

    
    verifyOtp(payload: VerifyOtpRequest): Observable<boolean> {
      return this.http.post<boolean>(`${environment.apiUrl}/Auth/verifyOtp`, payload);
    }
    
    GetCurrentUserInfo(): Observable<UserDto> {
      return this.http.get<UserDto>(`${environment.apiUrl}/Auth/GetCurrentUserInfo`);
    }

    
    EditCurrentUserInfo(payload:any): Observable<boolean> {
      return this.http.post<boolean>(`${environment.apiUrl}/Auth/EditCurrentUserInfo`,payload);
    }
}
