import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Colors, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/constants/app.constants';
import { OrderChartData } from 'src/app/models/order.model';
import { TopSellerProductsChartData } from 'src/app/models/topSellerProductsChartData.model';
import { CommonUtils } from 'src/app/modules/utils/common.utils';
import { DashboardService } from 'src/app/services/dashboard.service';
import { OrderService } from 'src/app/services/order.service';
import { LoggerService } from 'src/app/services/util/logger/logger.service';

@Component({
  selector: 'app-product-graphs',
  templateUrl: './product-graphs.component.html',
  styleUrls: ['./product-graphs.component.scss'],
})
export class ProductGraphsComponent implements OnInit {

  productGraphSub: Subscription[] = [];

  // Fetching default values.
  CHART_TYPE = AppConstant.CHART_TYPE;
  CHART_COLOR = AppConstant.CHART_COLOR;

  // Variables being used in html
  orderCountChartLabel: Label[];
  orderCountChartData: ChartDataSets[];
  orderCountChartColors: Colors[] = [{
    backgroundColor: this.CHART_COLOR.BG_PRIMARY,
    borderColor: this.CHART_COLOR.PRIMARY,
  }];

  productDetailsChartLabel: Label[];
  productDetailsChartData: ChartDataSets[];
  productDetailsChartColors: Colors[] = [
    { backgroundColor: this.CHART_COLOR.SECONDARY },
    { backgroundColor: this.CHART_COLOR.TERTIARY },
    { backgroundColor: this.CHART_COLOR.SUCCESS },
    { backgroundColor: this.CHART_COLOR.WARNING },
  ];

  productCategoryChartLabel: Label[];
  productCategoryChartData: ChartDataSets[];
  productCategoryChartColors: Colors[] = [{
    backgroundColor: this.CHART_COLOR.CYAN,
  }];

  productBrandChartLabel: Label[];
  productBrandChartData: ChartDataSets[];
  productBrandChartColors: Colors[] = [{
    backgroundColor: this.CHART_COLOR.STEEL_BLUE,
  }];

  // Chart Options
  defaultChartOptions: ChartOptions = {
    ...AppConstant.DEFAULT_CHART_OPTIONS,
    scales: {
      yAxes: [
        {
          ticks: {
            callback: (value) => {
              if (typeof value === 'number' && value % 1 === 0) {
                return value;
              }
            },
            suggestedMax: 5,
            beginAtZero: true,
          },
        }
      ],
    }
  };

  orderCountChartOptions: ChartOptions = {
    ...this.defaultChartOptions,
    scales: {
      yAxes: [
        {
          ticks: {
            ...this.defaultChartOptions.scales.yAxes[0].ticks,
            suggestedMax: 5,
            beginAtZero: true,
          }
        }
      ]
    }
  };

  orderDateRange: string;

  constructor(
    private _dashboardService: DashboardService,
    private _orderService: OrderService,
  ) { }

  ngOnInit() {
    this.fetchTopSellingProducts();
  }

  async fetchTopSellingProducts() {
    const productsChartData = await this._dashboardService.fetchTopSellingProductsChartData();
    this.populateProductDetailsChart(productsChartData);
    this.populateProductCategoryChart(productsChartData);
    this.populateProductBrandChart(productsChartData);

    const ordercountChartData = await this._orderService.fetchOrderCountChartData();
    this.populateOrderCountChart(ordercountChartData);

  }

  populateProductDetailsChart({ productNameToQtyMap }: TopSellerProductsChartData) {
    const localChart: ChartDataSets[] = [];
    for (const key in productNameToQtyMap) {
      if (productNameToQtyMap.hasOwnProperty(key)) {
        localChart.push({
          data: [productNameToQtyMap[key]],
          label: key
        });
      }
    }

    // Populate the processed response data to the global chart data object.
    this.productDetailsChartData = localChart;
  }

  populateProductCategoryChart({ productCategoryToQtyMap }: TopSellerProductsChartData) {
    const localChart: ChartDataSets[] = [];
    for (const key in productCategoryToQtyMap) {
      if (productCategoryToQtyMap.hasOwnProperty(key)) {
        localChart.push({
          data: [productCategoryToQtyMap[key]],
          label: key
        });
      }
    }

    // Populate the processed response data to the global chart data object.
    this.productCategoryChartData = localChart;
  }

  populateProductBrandChart({ productBrandToQtyMap }: TopSellerProductsChartData) {
    const localChart: ChartDataSets[] = [];
    for (const key in productBrandToQtyMap) {
      if (productBrandToQtyMap.hasOwnProperty(key)) {
        localChart.push({
          data: [productBrandToQtyMap[key]],
          label: key
        });
      }
    }

    // Populate the processed response data to the global chart data object.
    this.productBrandChartData = localChart;
  }

  populateOrderCountChart({ orderDateToCountMap }: OrderChartData) {
    const orderDates: string[] = [];
    const orderCount: number[] = [];

    for (const date in orderDateToCountMap) {
      if (orderDateToCountMap.hasOwnProperty(date)) {
        orderDates.push(CommonUtils.formatToShortStringDate(date as any));
        orderCount.push(orderDateToCountMap[date]);
      }
    }

    this.orderDateRange = `${orderDates[0]}-${orderDates[orderDates.length - 1]}`;

    // Populate the processed response data to the global chart data object.
    this.orderCountChartLabel = orderDates;
    this.orderCountChartData = [{
      data: orderCount,
      label: AppConstant.ORDER_COUNT_CHART_LEGEND_TITLE,
      lineTension: 0
    }];
  }

  // Note: Will implement in next sprint
  filterIcon() {

  }

}
