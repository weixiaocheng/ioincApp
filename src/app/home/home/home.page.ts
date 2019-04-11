import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
    spaceBetween: 0,
    loop: true
  };

  // 查询的页面
  index = 0;

  product_list: Array<ProductItem> = [];

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
    }, ermsg => {
      console.log('error' + ermsg);
    });
  }

  getGoodList(event) {
    if (this.index === 0) {
      this.index = 1;
    }
    const params = {
      page_index: this.index,
      page_size: 5
    };
    this.httpres.get_request('Product/getProductList?', params).subscribe(data => {
      console.log(data);
      event.target.complete();
      if (data['isError'] === false) {
        if (this.index === 1) {
          this.product_list = data['data'];
          this.index ++ ;
          console.log('13323' + this.product_list);
          return;
        }

        if (data['data'].length > 0) {
          data['data'].forEach(element => {
            this.product_list.push(element);
          });
          this.index ++ ;
          if (data['data'].length < 5) {
            event.target.disabled = true;
          }
        } else {
          this.httpres.presentToast('没有更多的数据了');
        }
      }

    },
    errMsg => {
      console.log(errMsg);
    }
    );
  }

  doRefresh(event) {
    this.index = 1;
    this.getGoodList(event);
  }

  loadData(event) {
    this.getGoodList(event);
  }

}

export class ProductItem {
  product_title: string;
  product_sub: string;
  product_id: number;
  desc: string;
  price: number;
  strik_price: number;
  stock: number;
  product_main_url: string;

}
