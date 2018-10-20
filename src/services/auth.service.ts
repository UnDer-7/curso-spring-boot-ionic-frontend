import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';

@Injectable()
export class AuthService{
    constructor(
        private http:HttpClient,
        private storage: StorageService
        ){ }
    searchUrl: string = API_CONFIG.baseUrl + "/login";

    public authenticate(creds: CredenciaisDTO){
        return this.http.post(this.searchUrl, creds,{
            //Ter acesso ao header da response
            observe: 'response',
            //Usado para que o framework nao tente fazer um parse para JSON
            responseType: 'text'
        });
    }

    public successfulLogin(authorizationValue: string){
        //Recortar a string apartir do 7 caractere, para remover o Bear
        let tok = authorizationValue.substr(7);
        let user: LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(user);
    }

    public logout(){
        this.storage.setLocalUser(null);
    }
}