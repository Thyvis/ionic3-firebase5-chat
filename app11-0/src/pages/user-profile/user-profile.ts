import { UserProvider } from './../../providers/user/user.provider';
import { AuthProvider } from './../../providers/auth/auth.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  uploadProgress: number;
  private filePhoto: File;

  constructor(
    public authProvider: AuthProvider,
    //public changedDetectorRef: ChangedDetectorRef,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.userProvider
    .mapObjectKey<User>(this.userProvider.currentUser)
    .subscribe((user: User) => {
      this.currentUser = user;
    });

  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if(this.filePhoto) {
      let uploadTask = this.userProvider.uploadPhoto(this.filePhoto, this.currentUser.key);

      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {

        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      }, (error: Error) => {
        // catch error
      });

      uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
        UploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
            this.editUser(downloadURL);
        });

      });

    } else {
      this.editUser();
    }

  }

  onPhoto(event): void {
    //console.log('event', event);
    //console.log('event.target.files', event.target.files);
    this.filePhoto = event.target.files[0];

  }

  private editUser(photoUrl?: string): void {
    this.userProvider
    .edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photoUrl || this.currentUser.photo || ''
    })
    .then(() => {
      this.canEdit = false;
      this.filePhoto = undefined;
      this.uploadProgress = 0;
    });

  }

}
