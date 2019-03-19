import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // 用户名
  usename = '';
  // 密码
  password = '';
  constructor(
    private toastCtrl: ToastController,
    private http: HttpClient,
    private navCtrl: NavController,
    private loadCtrl: LoadingController
    ) { }

  ngOnInit() {
  }

  loginApp() {
    if (this.usename === '') {
      this.presentToast('请输入用户名');
      return;
    } else if (this.password === '') {
      this.presentToast('请输入密码');
      return;
    } else if (this.password.length < 6) {
      this.presentToast('请输入6位以上的密码');
      return;
    }
    const url = 'http://shop.amei.com/api/User/loginApp';
    const params = {
      'name' : this.usename,
      'password' : this.password,
    };
     this.presentLoading('加载中');
    const body = JSON.stringify(params);
    this.http.post(url, body).subscribe(data => {
      this.loadCtrl.dismiss();
      console.log(data);
      if (data['isError'] === false) {
        this.presentToast('登录成功');
        window.localStorage.setItem('token', data['data']['token']);
        this.navCtrl.pop();
      } else {
        this.presentToast(data['msg']);
      }
    }, error => {
      console.log(error);
    });
    console.log('登录app');
  }

  async presentToast(message: string, postiton?: 'top'|'middle'|'bottom') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: postiton || 'middle'
    });
    toast.present();
  }


  async presentLoading(message) {
    const loading = await this.loadCtrl.create({
      message: message,
      duration: 3000
    });
    await loading.present();
  }

}
