import { Component, Input, OnInit } from "@angular/core";
import { ProductService } from "app/services/product/product.service";
import { IndexComponent } from "../index.component";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.css"],
})
export class ListProductComponent implements OnInit {
  
  @Input() showCategory: string;
  @Input() category: string;
  @Input() arrayCategory: Category[];
  public arrayproduct: Product[];
  public arrayproductAux: Product[];

  constructor(
    private productService: ProductService,
    public indexComponent: IndexComponent
    ) {}

  ngOnInit(): void {
    console.log('*** showCategory ***');
    console.log(this.showCategory);
    console.log(this.category);
    // console.log(this.arrayCategory);
    this.getProducts(this.category);
  }

  ngOnChanges(changes) {
    console.log('*** Cambiando... ***');
    this.getProducts(this.category);
    
  }


  /**
   * *** Obtenemos todos los productos de la DB sin orden especifica ***
   */
  async getProducts(category) {
    console.log('*** Buscando productos ***');
    await this.productService.getProducts(category).subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      this.arrayproductAux = [];
      prductSnapshot.forEach((categoryData) => {
        this.arrayproduct.push(categoryData.payload.doc.data());
        this.arrayproductAux.push(categoryData.payload.doc.data());
      });
    });
  }

  /**
   * *** Obtenemos todos los productos de la DB ordenados de forma ascendente ***
   */
  async getProductsAsc() {
    await this.productService.getProductsAsc().subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      this.arrayproductAux = [];
      prductSnapshot.forEach((categoryData) => {
        this.arrayproduct.push(categoryData.payload.doc.data());
        this.arrayproductAux.push(categoryData.payload.doc.data());
      });
    });
  }

  /**
   * *** Obtenemos todos los productos de la DB ordenados de forma descendente ***
   */
  async getProductsDesc() {
    await this.productService.getProductsDes().subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      this.arrayproductAux = [];
      prductSnapshot.forEach((categoryData) => {
        this.arrayproduct.push(categoryData.payload.doc.data());
        this.arrayproductAux.push(categoryData.payload.doc.data());
      });
    });
  }

  homeNavigate () {
    this.indexComponent.showAllProducts = false;
  }

}
