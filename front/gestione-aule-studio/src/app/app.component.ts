import { Component } from '@angular/core';
import { Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { AuthProvider } from '../providers/auth/auth';
import { AdminPage } from '../pages/admin/admin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, private menuCtrl: MenuController, public authService: AuthProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl.swipeEnable(false);
    });
  }
    
  logout(){
    this.menuCtrl.close();
    this.authService.logout();
    this.app.getActiveNav().push(HomePage);
    this.app.getActiveNav().setRoot(HomePage); 
  }

  search(){
    this.menuCtrl.close();
    this.app.getActiveNav().push(SearchPage);
  }
  admin(){
    this.menuCtrl.close();
    this.app.getActiveNav().push(AdminPage);
  }
}

