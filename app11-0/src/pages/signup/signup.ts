import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user.provider';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { first } from 'rxjs/operators/first';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public loadingCrtl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
    ) {

      //let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        //email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    this.userProvider.userExists1(username)
      //Uma promise retorna uma valor único enquanto um observable fica ouvindo alteraçõe naquele valor
      //tá dando um erro aqui
      .pipe(first())
      .subscribe((userExists: boolean) => {
        if(!userExists) {

          this.authProvider.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState) => {

            delete formUser.password;

            //Não será mais usado
            //formUser.uid = authState.user.uid;

            let uuid: string = authState.user.uid;

            this.userProvider.create(formUser, uuid)
              .then(() => {
                console.log('Usuário cadastrado');
                this.navCtrl.setRoot(HomePage);
                loading.dismiss();
              })
              .catch((error: any) => {
                console.log(error);
                loading.dismiss();
                this.showAlert(error)
              });

          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error)

          });

        } else {
          this.showAlert(`O username ${username} já está sendo usando em outra conta`);
          loading.dismiss();
        }
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
