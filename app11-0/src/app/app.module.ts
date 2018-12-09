import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

//Pages
import { ChatPage } from '../pages/chat/chat';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';

//Firebase Modules e Config
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';

//Providers
import { AuthProvider } from '../providers/auth/auth.provider';
import { ChatProvider } from '../providers/chat/chat.provider';
import { UserProvider } from '../providers/user/user.provider';
import { MessageProvider } from '../providers/message/message.provider';

//Components
//import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';
//import { MessageBoxComponent } from '../components/message-box/message-box.component';
//import { UserInfoComponent } from '../components/user-info/user-info.component';
//import { UserMenuComponent } from '../components/user-menu/user-menu.component';
//import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';

//Pipes
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { UserProfilePage } from '../pages/user-profile/user-profile';

//Módulos
//import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { SigninPageModule } from '../pages/signin/signin.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';

@NgModule({
  declarations: [
    CapitalizePipe,
    HomePage,
    MyApp,
    //Páginas
    //ChatPage,
    //SigninPage,
    //SignupPage,
    //UserProfilePage

    //Componentes
    //CustomLoggedHeaderComponent,
    //MessageBoxComponent,
    //ProgressBarComponent,
    //UserInfoComponent,
    //UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    //Firebase Modules
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    //CommonModule,
    ComponentsModule,
    ChatPageModule,
    SigninPageModule,
    SignupPageModule,
    UserProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatProvider,
    MessageProvider,
    UserProvider
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    //NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
