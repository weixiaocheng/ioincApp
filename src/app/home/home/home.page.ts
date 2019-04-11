import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { IonSlides, NavController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides) slider: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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
  constructor(
    private httpres: HttpService,
    private navCtrl: NavController
    ) {

  }

  ngOnInit() {
    this.getBanner();
    this.getGoodList();
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

  getGoodList(event?) {
    if (this.index === 0) {
      this.index = 1;
    }
    const params = {
      page_index: this.index,
      page_size: 5
    };
    this.httpres.get_request('Product/getProductList?', params).subscribe(data => {
      console.log(data);
      if (event) {
        event.target.complete();
      }
      if (data['isError'] === false) {
        if (this.index === 1) {
          this.product_list = data['data'];
          this.index ++ ;
          console.log('13323' + this.product_list);
          if (data['data'].length < 5) {
            this.infiniteScroll.disabled = true;
          } else {
            this.infiniteScroll.disabled = false;
          }
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
          event.target.disabled = true;
        }
      }

    },
    errMsg => {
      console.log(errMsg);
      if (event) {
        event.target.complete();
      }
    }
    );
  }

  /**
   * 下拉刷新
   * @param event
   */
  doRefresh(event) {
    this.index = 1;
    this.getGoodList(event);
  }

  /**
   * 上拉加载
   * @param event
   */
  loadData(event) {
    this.getGoodList(event);
  }

  toProductDetail(id) {
    this.navCtrl.navigateForward(`product?product_id=${id}`);
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
