import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FabContainer } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { IdeasPage } from '../ideas/ideas';
import { CreateCategoryPage } from '../create/category/category';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    categories: FirebaseListObservable<any>;
    imageUrl: any;

  constructor(public navCtrl: NavController, public af: AngularFire, public modalCtr: ModalController) {
    this.categories = this.af.database.list('/categories');
  }

  public showIdeas(categoryKey: string) {
    this.navCtrl.push(IdeasPage, { categoryKey: categoryKey });
  }

  openModal() {
    let modal = this.modalCtr.create(CreateCategoryPage);
    modal.present();
  }

    createCategory(fab: FabContainer) {
      this.openModal();
      fab.close();
  }
}
