import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera';

import {Ionic2RatingModule} from 'ionic2-rating';


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
  picture: any;

  constructor(public navCtrl: NavController, public af: AngularFire, private _FB: FormBuilder, public cameraPlugin: Camera, public viewCtrl: ViewController, public navParams: NavParams) {
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

  uploadImage(name, data) {
    let promise = new Promise((res, rej) => {
      let fileName = name + ".jpg";
      let uploadTask = firebase.storage().ref(`/posts/${fileName}`).put(data);
      uploadTask.on('state_changed', function (snapshot) {
      }, function (error) {
        rej(error);
      }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        res(downloadURL);
      });
    });
    return promise;
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


  takePhotoLibrary() {
    this.title = "https://www.djamware.com/post/5855c96380aca7060f443065/ionic-2-firebase-crud-example-part-2";
    this.cameraPlugin.getPicture({
      quality: 95,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.imageUrl = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });

    // const cameraOptions: CameraOptions = {
    //   quality: 50,
    //   destinationType: this.cameraPlugin.DestinationType.DATA_URL,
    //   encodingType: this.cameraPlugin.EncodingType.JPEG,
    //   mediaType: this.cameraPlugin.MediaType.PICTURE,
    // };
    //
    // this.cameraPlugin.getPicture(cameraOptions).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   this.imageUrl = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   // Handle error
    // });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Upload');
  }
}
