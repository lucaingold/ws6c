import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.categoryKey = navParams.get('categoryKey');
    // this.category = this.af.database.list('/categories/0/');

    //TODO category as list with attributes
    // Load default category image
    this.categoryImage = this.af.database.object('/categories/' + this.categoryKey + '/image', { preserveSnapshot: true });
    this.categoryImage.subscribe((snapshot) => {
      if (snapshot.exists()) {
        this.categoryImage = snapshot.val();
      }
    });

    this.categoryTitle = this.af.database.object('/categories/' + this.categoryKey + '/title', { preserveSnapshot: true });
    this.categoryTitle.subscribe((snapshot) => {
      if (snapshot.exists()) {
        this.categoryTitle = snapshot.val();
      }
    });

    //load entries
    this.entries = this.af.database.list('/categories/' + this.categoryKey + '/entries');

  }
}