import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';

import { Ionic2RatingModule } from 'ionic2-rating';

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
  status: string = '';
  importance: string = '2';

  categoryKey: any;

  constructor(public navCtrl: NavController, public af: AngularFire, private _FB: FormBuilder, public camera: Camera, public viewCtrl: ViewController, public navParams: NavParams) {
    this.categoryKey = navParams.get('categoryKey');
    this.ideas = this.af.database.list('/categories/' + this.categoryKey + '/entries/');
    console.log(this.ideas);
    this.form = _FB.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'status': ['', Validators.required],
      'importance': ['', Validators.required]
    });
  }

  sendPost() {
    this.ideas.push({
      title: this.title,
      description: this.description,
      status: false,
      image: ''
    });
    this.dismiss();
  }

  // sendPut(ideaId:string) {
  //   this.ideas.update(ideaId, {
  //     title: this.title,
  //     description: this.description,
  //     status: false,
  //     image: ''
  //   });
  //   this.dismiss();
  // }
  //
  // sendDelete(ideaId:string) {
  //   this.ideas.remove(ideaId);
  //   this.dismiss();
  // }

  takePhotoLibrary() {
    this.title = "https://www.djamware.com/post/5855c96380aca7060f443065/ionic-2-firebase-crud-example-part-2";    // this.camera.getPicture({
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   targetHeight: 500,
    //   targetWidth: 500,
    //   correctOrientation: true,
    //   encodingType: this.camera.EncodingType.PNG,
    //   sourceType: 0//0 = Photolibrary, 1 = Camera, 2 = Save to photoalbum
    // }).then((imageData) => {
    //   this.imageUrl = "data:image/jpeg;base64," + imageData;
    // }, (err) => { console.log(err); });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Upload');
  }
}
