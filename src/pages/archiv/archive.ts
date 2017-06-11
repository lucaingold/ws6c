import {Component} from '@angular/core';
import {List, NavController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from "angularfire2";


@Component({
  selector: 'page-archiv',
  templateUrl: 'archive.html'
})


export class ArchivePage {
  categories: FirebaseListObservable<any>;
  entries: any = [];
  dataSummary: any;


  constructor(public navCtrl: NavController, public af: AngularFire) {

    this.categories = this.af.database.list('/categories');

    this.categories.subscribe(categories => {
      this.dataSummary = categories.map(category => {

        let entries = Object.keys(category.entries).map(function (key) {
          return category.entries[key];
        });

        let tmp = entries.filter(e => e.status == true);

        if (tmp.length>0){
          console.log(tmp);

          let e = {
            "categoryImage":category.image,
            "title": category.title,
            "entries": tmp
          };
          this.entries.push(e);
        // console.log(tmp);

        }


        return [tmp];
        //   let entry = Object.keys(entries).map(function (key) {
        //     return entries[key];
        //   });
        //
        //   let count = 0;
        //   entry.forEach(e => {
        //     console.log(e.status);
        //     if (e.status === false) ++count;
        //   });
        //
        //   return [category.title, count];
        // });
      });

    });

    console.log(this.entries);


    // this.entries.forEach(e => console.log());
    // this.categories.forEach(c=>console.log(c));

    // this.categories.subscribe(categories => {
    //   categories.forEach(category => {
    //
    //     let e = Object.keys(category.entries).map(function (key) {
    //       return category.entries[key];
    //     });
    //
    //     let tmp=[];
    //     Object.keys(e).forEach(function (key) {
    //       if (e[key].status) {
    //         // console.log(e[key]);
    //         tmp.push(e[key]);
    //         this.entries.push(e[key]);
    //
    //         return e[key];
    //       }
    //     });
    //
    //   });
    //   console.log(this.entries);
    // });

    // this.categories.subscribe(categories => {
    //   let dataSummary = categories.map(category => {
    //     let entry = category.entries;
    //
    //     entry.forEach(ent => {
    //       if (ent.status == 'true') {
    //         this.entries.push(ent);
    //       }
    //     });
    //   })
    // });

  }

  // deleteIdea(entry) {
  //   this.entries.(entry.$key);
  // }
}
