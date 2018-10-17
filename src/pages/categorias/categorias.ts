import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private categoriaService: CategoriaService
     ) {}

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(
      res => {
        console.table(res);
      },
      error => {
        console.log('Error: ', error);
      })
  }
}
