import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';

import {Ionic2RatingModule} from 'ionic2-rating';

@Component({
  selector: 'page-idea',
  templateUrl: 'idea.html'
})
export class UpdateIdeaPage {
  ideas: FirebaseListObservable<any>;
  form: any;
  title: string = '';
  description: string = '';
  imageUrl: any;
  status: string = '';
  importance: string = '';

  categoryKey: any;
  entry: any;
  key:any;

  idea = {
    $key: '',
    title: '',
    description: '',
    importance: ''
  };

  constructor(public navCtrl: NavController, public af: AngularFire, private _FB: FormBuilder, public camera: Camera, public viewCtrl: ViewController, public navParams: NavParams) {
    this.categoryKey = navParams.get('categoryKey');
    this.idea = navParams.get('entry');
    this.ideas = this.af.database.list('/categories/' + this.categoryKey + '/entries/');

    this.title = this.idea.title;
    this.description = this.idea.description;
    this.importance = this.idea.importance;

    this.form = _FB.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'status': ['', Validators.required],
      'importance': ['', Validators.required]
    });
  }

  sendPut() {

    console.log('---------------------------------------');
    this.ideas.update(this.idea.$key, {
      title: this.title,
      description: this.description,
      status: false,
      image: ''
    });

    this.dismiss();
  }


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
