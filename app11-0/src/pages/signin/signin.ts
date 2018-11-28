import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCrtl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {

      this.signinForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  onHomePage(): void {
    this.navCtrl.push(HomePage)
      .then((hasAccess: boolean) => {
        console.log('Autorizado: ', hasAccess);

      }).catch(err => {
        console.log('Não autorizado: ', err);

      });
  }

  onLogOut(): void {
    this.authProvider.logOut();
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();

    //console.log(this.signinForm.value);
    this.authProvider.signinWithEmailAndPassword(this.signinForm.value)
      .then((isLogged: boolean) => {
        if(isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });

  }

  private showAlert(message: string): void {
    this.alertController.create({
      message: message,
      buttons: ['OK']
    }).present();

  }

  private showLoading(): Loading {

    let loading: Loading = this.loadingCrtl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;

  }

}
