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
import { EditStudyRoomPage } from '../pages/edit-study-room/edit-study-room';
import { ReservationProvider } from '../providers/reservation/reservation';
import { StudentsManagementPage } from '../pages/students-management/students-management';
import { StudyRoomsManagementPage } from '../pages/study-rooms-management/study-rooms-management';
import { StudentsProvider } from '../providers/students/students';
import { ReservationsManagementPage } from '../pages/reservations-management/reservations-management';

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
    StudyRoomPage,
    EditStudyRoomPage,
    StudyRoomsManagementPage,
    StudentsManagementPage,
    ReservationsManagementPage
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
    StudyRoomPage,
    EditStudyRoomPage,
    StudyRoomsManagementPage,
    StudentsManagementPage,
    ReservationsManagementPage
  ],
  providers: [
    AuthProvider,
    StatusBar,
    SplashScreen,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfileProvider,
    StudyRoomProvider,
    ReservationProvider,
    StudentsProvider,
  ]
})
export class AppModule {}
