import {clienteDTO} from './../../models/cliente.dto';
import {StorageService} from './../../services/storage.service';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ClienteService} from '../../services/domain/cliente.service';
import {API_CONFIG} from "../../config/api.config";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: clienteDTO;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private storage: StorageService,
              private clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(res => {
          this.cliente = res;
          this.getImageIfExists();
        },
        error => {
          console.log("ERROR\n", error)
        });
    }
  }

  public getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(res => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {
        console.log("ERROR\n", error);
      });
  }
}
