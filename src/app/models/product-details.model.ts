export class ProductDetail {
  id: string;
  name: string;
  hsnCode: string;
  description: string;
  productCategoryId: string;
  productBrandId: string;
  buyingPrice: number;
  sellingPrice: number;
  basicPrice: number;
  basicPriceTax: number;
  quantity: number;
  discount: string;
  gstId: string;
  gstPercentage: number;
  gstIncluded: boolean;
  lowStockCount: number;
}


export class ProductDetailResponse {
  productDetails: ProductDetail[];
  totalCount: number;
}
