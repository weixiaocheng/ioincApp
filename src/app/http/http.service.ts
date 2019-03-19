import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseFunction } from './baseFunc';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends BaseFunction {
  readonly baseIp = 'http://shop.amei.com/api/';

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
    ) {
    super();
  }

  /**
   * get 网络请求
   * @param apiName
   * @param params
   */
  get_request(apiName: string, params: {[key: string]: any; }) {
    const header = new HttpHeaders({
      'appversion' : '1.0.0',
      'deviceType' : 'ios',
      'token': window.localStorage.getItem('token')
    });
    let url = this.baseIp + apiName;
    url = url + this.mosaicJsonWithDict(params);
    console.log(url);
    return this.http.get(url, {headers: header});
  }

  /**
   * post 网络请求
   * @param apiName
   * @param params
   */
  post_request(apiName: string, params: {[key: string]: any}) {
    const header = new HttpHeaders({
      'appversion' : '1.0.0',
      'deviceType' : 'ios',

    });
    const url = this.baseIp + apiName + '?';
    const body = JSON.stringify(params);
    console.log(url + '\n' + body);
    return this.http.post(url, body, {headers: header});
  }

  // 显示加载框
  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message: message,
      duration: 4000
    });
    await loading.present();
  }

  // 显示toast
  async presentToast(message: string, postition?: 'top'|'middle'|'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: postition || 'middle'
    });
    toast.present();
  }

  // 显示警告窗 少用
  async presentAlert(header: string, subHeader: string,  message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
