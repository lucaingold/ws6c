import {Component} from '@angular/core';
import {List, NavController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from "angularfire2";


@Component({
  selector: 'page-archiv',
  templateUrl: 'archive.html'
})


export class ArchivePage {
  categories: FirebaseListObservable<any>;

  entries =[];

  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.categories = this.af.database.list('/categories/');


    this.categories.subscribe(categories => {
      let dataSummary = categories.map(category => {
        let entry = category.entries;

        entry.forEach(ent => {
          this.entries.push(ent);
        });
      })
    });

  }

  // deleteIdea(entry) {
  //   this.entries.(entry.$key);
  // }
}
