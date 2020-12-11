import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ProductService } from '../services/product/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CategoryService } from 'app/services/categorias/categorias.service';
import { UsersService } from 'app/services/users/users.service';
import { AuthService } from 'app/services/auth/auth/auth.service';
import { HostListener } from '@angular/core';
import { ListProductComponent } from './list-product/list-product.component';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public infoUser: Users;
  public user: Users;
  @ViewChild("modalLogin") modalLogin: ElementRef;
  @HostListener('window:popstate', ['$event'])
 
  test: Date = new Date();
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  public imgSrc1: string = '../../assets/img/comida.jpg';
  public imgSrc2: string = '../../assets/img/decoracion.jpg';
  public imgSrc3: string = '../../assets/img/peliculas.png';
  public imgSrc4: string = '../../assets/img/decoracion.svg';
  public imgSrc5: string = '../../assets/img/escritorios.svg';
  public imgSrc6: string = '../../assets/img/exteriores.svg';
  public imgSrc7: string = '../../assets/img/alfombras.svg';
  public imgSrc8: string = '../../assets/img/iluminacion.svg';
  public imgSrc9: string = '../../assets/img/bar.svg';
  public imgSrc10: string = '../../assets/img/ninos.svg';
  public arrayProduct: Product[];
  public arrayProductCart: Product[];
  public arrayProductAux: Product[];
  productos: Observable<any[]>;
  public showAllProducts = false;
  public showCategory = '';
  public showCart = false;
  public showCart2 = false;
  public showCart3 = false;
  public showCart4 = false;
  public show = 1;
  public show2 = 1;
  public show3 = 1;
  public show4 = 1;

  public category = '***';
  public arrayCategory: any[];
  public arraySubCategory: any[];
  public arraySubCategoryAux: Category[];
  public precio: number;
  public cantidad: number;
  
  public product: Product
  



  constructor(
    private router: Router,
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private ProductService: ProductService,
    private categoryService: CategoryService,
    private usersService: UsersService,
    private authService: AuthService,
    ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }


  ngOnInit(): void {
    this.infoUser = JSON.parse(localStorage.getItem('infoUser'));
    this.user = {};
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.getProducts();
    this.arrayProductCart= [];
    this.getSubcategories();
    this.arraySubCategory = [];

    if (this.infoUser) 
    if (this.infoUser.user_type == 0) {
      this.user = {
        user_email: this.infoUser.user_email,
        user_name: this.infoUser.user_name,
        user_lastname: this.infoUser.user_lastname,
        user_product: this.infoUser.user_product
      };
    } else {
      // this.disabled =  true;
      this.getUsers();
    } 

  }

  public viewRouter(opt: string, time: number) {
    var body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
    setTimeout(function () {
      $('html, body').animate({
        scrollTop: $(opt).position().top
      }, time, function () {
      });
    }, 500);
  }

  /**
   * *** obtenemos la data del usuario ***
   */
  async getUsers() {
    (await this.usersService.getUserByEmails(this.infoUser.user_email)).subscribe((user) => {
      this.user = user;
    });
  }

  getSubcategories() {
    var respuestaCategory = this.categoryService.getCategories();
    respuestaCategory.subscribe((categorys) => {
      var cont = 0;
      this.arrayCategory = [];
      categorys.forEach((categoryData: any) => {
        this.arrayCategory.push(categoryData.payload.doc.data());
        var responseCity = this.categoryService.getSubCategory(
          categoryData.payload.doc.id
        );
        let contAux = cont;
        responseCity.subscribe((c) => {
          this.arraySubCategoryAux = [];
          c.forEach((cData) => {
            this.arraySubCategoryAux.push(cData.payload.doc.data());
          });
          this.arraySubCategory[contAux] = this.arraySubCategoryAux;
        });
        cont++;
      });
      console.log(this.arraySubCategory);
      
    });
  }

  sidebarOpen() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }
  sidebarClose() {
    var body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }
  sidebarToggle() {
    if (this.sidebarVisible == false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }



  isLogin() {
    if (this.location.prepareExternalUrl(this.location.path()) === '#/pages/login') {
      return true;
    }
    return false;
  }

  isRegister() {
    if (this.location.prepareExternalUrl(this.location.path()) === '#/pages/register') {
      return true;
    }
    return false;
  }

  getPath() {
    return this.location.prepareExternalUrl(this.location.path());
  }

  async getProducts() {
    await this.ProductService.getProducts('all').subscribe((productSnapshot) => {
      this.arrayProduct = [];
      this.arrayProductAux = [];
      productSnapshot.forEach((categoryData) => {
        this.arrayProduct.push(categoryData.payload.doc.data());
        this.arrayProductAux.push(categoryData.payload.doc.data());
      });
    });
  }

  agregarCarrito(producto: Product) {
    if (this.arrayProductCart.includes(producto))
    {
      let i = this.arrayProductCart.indexOf(producto);
      this.arrayProductCart[i].pro_pro_cantidadCarrito = this.arrayProductCart[i].pro_pro_cantidadCarrito + 1
      
    } else{
      producto.pro_pro_cantidadCarrito = 1;
      this.arrayProductCart.push(producto);
      swal("OK", "Producto agreado correctamente", "success");
    }
  }

  trackByFn(index, obj)
  {
    return obj.uid;
  }

  carrito(id: any) {
    this.router.navigate([`carrito`]);

  }

  cambioMasvendido(opt) {
    this.show = opt;
  }

  cambioMasvendido2(opt) {
    this.show2 = opt;
  }

  cambioMasvendido3(opt) {
    this.show3 = opt;
  }

  cambioMasvendido4(opt) {
    this.show4 = opt;
  }

  showAllProductComponent(category: string) {
    console.log('*** category 1 ***');
    console.log(category);
    this.showAllProducts = true;
    this.category = category;
    this.showCategory = category;
    this.scrollTop();
  }

  rutaproducts() {
    this.router.navigate(['/pages/list-prod']);
    window.scroll(0, 0);
  }

  scrollTop() {
    $("html, body").animate(
      {
        scrollTop: $("#init").offset().top,
      },
      800,
      function () {}
    );
  }
}