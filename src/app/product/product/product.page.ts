import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { SkuPageComponent } from 'src/app/sku-page/sku-page.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product_id;
  data;
  slideOpts = {
    loop: true,
    speed: 200
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private httpRest: HttpService,
    public modalController: ModalController,
    public popoverController: PopoverController
    ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.product_id = params['product_id'];
      console.log(this.product_id);
  });
  }


  async presentPopover() {
    const popover = await this.popoverController.create({
      component: SkuPageComponent,
      // event: ev,
      translucent: true
    });
    return await popover.present();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: SkuPageComponent,
      componentProps: { value: 123 },
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getProuctDetail();
  }

  getProuctDetail() {
    console.log('获取 商品详情');
    const params = {
      product_id: this.product_id,
    };
    this.httpRest.get_request('Product/getGoodDetail?', params).subscribe(data => {
      console.log(data);
      if ( data['isError'] === false) {
        this.data = data['data'];
        const tag = document.getElementById('html_content');
        tag.innerHTML = data['data']['desc'];
      }
    }, errMsg => {
      console.log(errMsg);
    });
  }
  // 选择sku
  showSelectedSku() {
    this.presentModal();
  }
}
