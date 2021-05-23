import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Customer } from 'src/app/models/customer.model';
import { UrlConstant } from 'src/app/constants/url.constants';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss'],
})
export class SelectCustomerComponent implements OnInit, OnDestroy {
  @Output() customerDetailSelectionChange: EventEmitter<Customer> = new EventEmitter<Customer>();

  @ViewChild('cusomterSelectable') cusomterSelectable: IonicSelectableComponent;
  @Input() hidden: boolean; // Future scope

  customerList: Customer[] = [];
  customer: Customer;
  currentPage = 0;
  totalpage = 0;
  selectCustomerSub: Subscription[] = [];
  fetchCountPerPage = 20;
  displayIonicSelectable = false;



  constructor(
    private _customerService: CustomerService,
    private _navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  customerSelectableChange() {
    this.customerDetailSelectionChange.emit(this.cusomterSelectable.value);
  }

  async customerSelectableSearch(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    const customerText = event.text;
    event.component.startSearch();
    this.currentPage = 0;

    // filtered by company name from our server.
    const cust = await this._customerService
      .getCustomerAllWithPagination(
        customerText,
        undefined,
        undefined,
        this.currentPage,
        this.fetchCountPerPage
      );
    try {
      // this.customerList = cust.customers;

      event.component.items = cust.customers;
      this.totalpage = cust.totalCount / this.fetchCountPerPage;

      // Get customer and stop searching.
      event.component.endSearch();
      event.component.enableInfiniteScroll();
    } catch (error) {

      // Get customer and stop searching.
      event.component.endSearch();
      event.component.enableInfiniteScroll();
    };

  }

  async getMoreCustomer(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    this.currentPage++;

    const text = (event.text || '').trim().toLowerCase();
    // There're no more ports - disable infinite scroll.
    if (this.currentPage > this.totalpage) {
      event.component.disableInfiniteScroll();
      return;
    }

    if (text === '') {
      const customer = await this._customerService
        .getCustomerAllWithPagination(
          undefined,
          undefined,
          undefined,
          this.currentPage,
          this.fetchCountPerPage
        );
      try {
        const localCustomerCount = event.component.items.concat(
          customer.customers
        );

        event.component.items = localCustomerCount;
        event.component.endInfiniteScroll();

      } catch (error) {
        event.component.endInfiniteScroll();
      }
    } else {
      event.component.endInfiniteScroll();
    }
  }

  close() {
    this.cusomterSelectable.close();
  }

  addCustomerURL() {
    this.cusomterSelectable.close();
    this._navCtrl.navigateRoot(UrlConstant.URL_ADD);
  }

  ngOnDestroy() {
    this.selectCustomerSub.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

}
