import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductdetailPresentactionsheetComponent } from './productdetail-presentactionsheet.component';

describe('ProductdetailPresentactionsheetComponent', () => {
  let component: ProductdetailPresentactionsheetComponent;
  let fixture: ComponentFixture<ProductdetailPresentactionsheetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdetailPresentactionsheetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductdetailPresentactionsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
