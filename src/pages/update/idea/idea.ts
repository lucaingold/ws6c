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
    this.ideas.update(this.idea.$key, {
      title: this.title,
      description: this.description,
      status: false,
      image: this.imageUrl
    });

    this.dismiss();
  }


  takePhotoLibrary() {
    //setup camera options
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 500,
      targetWidth: 500,
      correctOrientation: true,
      sourceType: 0//0 = Photolibrary, 1 = Camera, 2 = Save to photoalbum
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });

    // this.camera.getPicture({
    //
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
