import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { clienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService{
    
    baseUrl: string = API_CONFIG.baseUrl+'/clientes';
    bucketUrl: string = API_CONFIG.bucketBaseUrl+'/cp';
    constructor(
        private http: HttpClient,
        private storage: StorageService){ }

    public findByEmail(email: string): Observable<clienteDTO>{
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<clienteDTO>(
            `${this.baseUrl}/email?value=${email}`,
            {'headers': authHeader});
    }

    public getImageFromBucket(id: string): Observable<any>{
      return this.http.get(
        `${this.bucketUrl}${id}.jpg`,
        {responseType: "blob"});
    }
}
