import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { SearchPage } from '../pages/search/search';
import { ReservePage } from '../pages/reserve/reserve';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { AdminPage } from '../pages/admin/admin';
import { StudyRoomPage } from '../pages/study-room/study-room';
import { ProfileProvider } from '../providers/profile/profile';
import { StudyRoomProvider } from '../providers/study-room/study-room';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MainPage,
    ProfilePage,
    SearchPage,
    ReservePage,
    AdminPage,
    StudyRoomPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MainPage,
    ProfilePage,
    SearchPage,
    ReservePage,
    AdminPage,
    StudyRoomPage
  ],
  providers: [
    AuthProvider,
    StatusBar,
    SplashScreen,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfileProvider,
    StudyRoomProvider,
  ]
})
export class AppModule {}
