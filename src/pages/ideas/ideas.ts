import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FabContainer} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {CreateIdeaPage} from '../create/idea/idea';
import {UpdateIdeaPage} from "../update/idea/idea";


@Component({
  selector: 'page-ideas',
  templateUrl: 'ideas.html'
})
export class IdeasPage {
  categoryKey: any;
  categoryImage: any;
  categoryTitle: any;
  category: any;

  entries: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public modalCtr: ModalController) {
    this.categoryKey = navParams.get('categoryKey');
    // this.category = this.af.database.list('/categories/0/');

    //TODO category as list with attributes
    // Load default category image
    this.categoryImage = this.af.database.object('/categories/' + this.categoryKey + '/image', {preserveSnapshot: true});
    this.categoryImage.subscribe((snapshot) => {
      if (snapshot.exists()) {
        this.categoryImage = snapshot.val();
      }
    });

    this.categoryTitle = this.af.database.object('/categories/' + this.categoryKey + '/title', {preserveSnapshot: true});
    this.categoryTitle.subscribe((snapshot) => {
      if (snapshot.exists()) {
        this.categoryTitle = snapshot.val();
      }
    });

    //load entries
    this.entries = this.af.database.list('/categories/' + this.categoryKey + '/entries');
  }

  openModal(isCreateModal: boolean, entry) {
    if (isCreateModal) {
      let modal = this.modalCtr.create(CreateIdeaPage, {categoryKey: this.categoryKey});
      modal.present();
    } else {
      let modal2 = this.modalCtr.create(UpdateIdeaPage, {
        entry: entry,
        categoryKey: this.categoryKey
      });
      modal2.present();
    }
  }


  openDeleteModal() {
    let modal = this.modalCtr.create(CreateIdeaPage, {categoryKey: this.categoryKey});
    modal.present();
  }

  createIdea(fab: FabContainer) {
    this.openModal(true, null);
    fab.close();
  }

  editIdea(entry) {
    this.openModal(false, entry);
  }

  deleteIdea(entry) {
    this.entries.remove(entry.$key);
  }

  updateCheckbox(entry) {
     this.entries.update(entry.$key, {status: entry.status});
    // console.log(entry.status);
  }
}
