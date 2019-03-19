import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username = 'liu';
  password = '123456';
  surePass = '123456';
  mobile = '15361842015';
  code = '3301';
  /**** 验证码 */
  buttonString = '获取验证码';

  constructor(private httpres: HttpService) { }

  ngOnInit() {
  }

  /**
   * 用户注册
   */
  registerApp() {
    console.log(this.mobile);
    if (this.username === '') {
      this.httpres.presentToast('请输入用户名');
      return ;
    } else if (this.mobile === '') {
      this.httpres.presentToast('请输入手机号');
      return ;
    } else if (this.mobile.length !== 11) {
      this.httpres.presentToast('请输入11位手机号');
      return;
    } else if (this.httpres.isMobileString(this.mobile) === false) {
      return;
    } else if (this.password.length < 6) {
      this.httpres.presentToast('请输入6位以上的密码');
      return;
    } else if (this.password !== this.surePass) {
      this.httpres.presentToast('2次输入的密码不一致');
      return;
    } else if (this.code.length === 0) {
      this.httpres.presentToast('请输入验证码');
      return;
    }

    const observe = this.httpres.post_request('User/userRegisterApp', {
      'name' : this.username,
      'password' : this.password,
      'mobile' : this.mobile,
      'code': this.code
    });
    observe.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  /**
   * 获取验证码
   */
  getValiCode() {
    if (this.mobile === '') {
      this.httpres.presentToast('请输入手机号');
      return;
    } else if (this.httpres.isMobileString(this.mobile) === false) {
      this.httpres.presentToast('请输入手机号');
      return;
    }
    const observe = this.httpres.post_request('basecrtl/senderValicode', {
      'mobile' : this.mobile,
      'type' : '2'
    });
    observe.subscribe(data => {
      console.log(data);
      if (data['isError']  === false) {
        this.countDownTime(60);
      }
    }, err => {
      console.log('网络请求失败' + err);
    });
  }

  countDownTime(time: number) {
    setTimeout(() => {
      time = time - 1;
      if (time > 0) {
        this.countDownTime(time);
        this.buttonString = `倒计时(${time})`;
        return;
      } else {
        this.buttonString = '请获取验证码';
      }
    }, 1000);
  }
}
