import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{
    constructor(private http:HttpClient){ }
    searchUrl: string = API_CONFIG.baseUrl + "/login";

    public authenticate(creds: CredenciaisDTO){
        return this.http.post(this.searchUrl, creds,{
            //Ter acesso ao header da response
            observe: 'response',
            //Usado para que o framework nao tente fazer um parse para JSON
            responseType: 'text'
        });
    }
}