import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-idea',
  templateUrl: 'idea.html'
})
export class CreateIdeaPage {
  ideas: FirebaseListObservable<any>;
  form: any;
  title: string = '';
  description: string = '';
  imageUrl: any;

  constructor(public navCtrl: NavController, public af: AngularFire, private _FB: FormBuilder, public viewCtrl: ViewController) {
    // this.ideas = this.af.database.list('/categories');
    this.form = _FB.group({ 'title': ['', Validators.required], 'description': ['', Validators.required] });
  }

sendPost() {
    // this.ideas.push({
    //   title: this.title,
    //   description: this.description
    // });
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Upload');
  }
}
