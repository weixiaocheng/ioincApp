import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides) slider: IonSlides;
  slideOpts = {
    speed: 1000,
    spaceBetween: 0
  };
  // 获取首页轮播
  bannerList = [];
  constructor(private httpres: HttpService) {

  }

  ngOnInit() {
    this.getBanner();
  }

  getBanner() {
    this.httpres.get_request('Home/homeBanner').subscribe(data => {
      console.log(data);
      if (data['isError'] === false) {
        this.bannerList = data['data'];
        this.slider.startAutoplay();

      }
    }, error => {
      console.log(error);
    });
  }
}
