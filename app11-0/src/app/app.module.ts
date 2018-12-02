import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';

//Pipes
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
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
    AngularFireFunctionsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatProvider,
    MessageProvider,
    UserProvider
  ]
})
export class AppModule {}
