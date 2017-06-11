import {Component} from '@angular/core';
import {List, NavController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from "angularfire2";


@Component({
  selector: 'page-archiv',
  templateUrl: 'archive.html'
})


export class ArchivePage {
  categories: FirebaseListObservable<any>;
  entriesDB: FirebaseListObservable<any>;
  entries: any = [];
  dataSummary: any;


  constructor(public navCtrl: NavController, public af: AngularFire) {

    this.categories = this.af.database.list('/categories');

    this.loadData();


  }

  ionViewWillEnter() {
    this.loadData();
  }


  loadData(){
    this.entries=[];
    this.categories.subscribe(categories => {
      this.dataSummary = categories.map(category => {
        let entries = Object.keys(category.entries).map(function (key) {
          return category.entries[key];
        });

        let tmp = entries.filter(e => e.status == true);


        if (tmp.length > 0) {
          let e = {
            "categoryImage": category.image,
            "title": category.title,
            "entries": tmp
          };
          this.entries.push(e);
        }
        return [tmp];
      });
    });
  }

  // updateCheckbox(entry) {
  //
  //   this.entriesDB = this.af.database.list('/categories/'+entry.cat_id+'/entries/'+entry.$key);
  //
  //
  //   // this.entriesDB.update(entry.$key, {status: entry.status});
  //   // console.log(entry.status);
  // }
}
