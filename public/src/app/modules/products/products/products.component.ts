import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import * as firebase from "firebase/app";
import { ProductService } from "../../../services/product/product.service";
import { UsersService } from "app/services/users/users.service";


declare var $: any;
export interface DataTable {
  headerRow: string[];
  footerRow?: string[];
  dataRows: string[][];
}
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  public dataTable: DataTable;
  public product: Decoration;
  public category: Category;
  public arrayproduct: Decoration[];
  public arrayCategory: Category[];
  public arraySubcategory: SubCategory[];
  public documentId = null;
  public isEdit = false;
  public tablaDatos;
  public imageFile: any;
  public imageSrc: any;
  public disabled: boolean = false;
  public cont = 0;
  public cont2 = 0;
  public stateSw = false;
  public usuario: Users;
  public infoUser: Users;
    public user: Users;
  constructor(private productService: ProductService, private usersService: UsersService,) { }

  ngOnInit(): void {
    this.infoUser = JSON.parse(localStorage.getItem("infoUser"));
    this.user = {};
    this.product= JSON.parse(localStorage.getItem("product"));
    this.product={};

    this.dataTable = {
      headerRow: [
        "#",
        "ID",
        "Nombre",
        "Descripción",
        "Precio",
        "Imagen",
        "Seleccionar",
      ],
      dataRows: [],
    };
    this.tablaDatos = $("#datatablesProduct").DataTable({});
    this.getProducts();
    this.getUsers();



  }
  async getUsers() {
    (await this.usersService.getUserByEmails(this.infoUser.user_email)).subscribe((user) => {
        console.log(user);
        this.user = user;
        console.log(this.user)
    });
}
  async getProducts() {
    await this.productService.getProducts('all').subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      console.log(this.arrayproduct);
      prductSnapshot.forEach((categoryData) => {
        
        this.arrayproduct.push(categoryData.payload.doc.data());
        // console.log(prductSnapshot.length + '' + this.arrayproduct.length);
        if (prductSnapshot.length == this.arrayproduct.length) {
          this.initDataTable();
        }
      });
    });
  }
  
  initDataTable() {
    let aaa = this.tablaDatos;
    $("#datatablesProduct").DataTable().destroy();
    setTimeout(function () {
      /*
       * Opciones del datatable
       */
      aaa = $("#datatablesProduct").DataTable({
        paging: true,
        ordering: true,
        info: true,
        pagingType: "full_numbers",
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, "All"],
        ],
        responsive: true,
        language: {
          search: "",
          searchPlaceholder: "Buscar",
        },
      });
    }, 10);
  }

  /**
   * 
   * 
     * para agregar Subcategorias
     * @param decoracion
     * @param valid
     */
  estadoNuevo(e) {


    if (e) {
      console.log(this.product);
        this.productService.createDecoracion(this.product, this.infoUser).then(() => {
          this.product = {
            id: "",
            nombre: "",
            descripcion: "",
            precio: "",
            imgen: "",
          };
        });
    }
  }

  // estadoLoMasVendido(e) {
  //   var cont2 = 0;
  //   var productAux2 = this.product;

  //   console.log(e.currentValue)

  //   this.arrayproduct.forEach((element) => {
  //     if (this.product.pro_categoria == element.pro_categoria) {
  //       if (element.pro_estado_novedad == true) {
  //         cont2++;
  //         console.log(
  //           cont2 + ".- " + element.pro_estado_novedad + ".- " + element.pro_nombre
  //         );
  //       }


  //     }
  //   });
  //   this.cont2 = cont2;

  //   if (cont2 > 3) {
  //     swal(
  //       "Error",
  //       "NO SE PUEDE AGREGAR MAS PRODUCTOS NUEVOS EN LA CATEGORÍA: " + this.product.pro_categoria,
  //       "error"
  //     );
  //     this.product.pro_estado_novedad = false;
  //     $('#modalProduct').modal('hide');
  //     this.product = {};
  //     // this.product = productAux;
  //     // this.selectCategory(this.product);
  //   } else {
  //     console.log(this.product);
  //     if (this.product.pro_nombre != '') {
  //       this.productService.updateProductState(this.product);
  //     }
  //   }
  //   console.log(
  //     "*** TOTAL PARA: => *** " + this.product.pro_categoria + " = " + cont2
  //   );
  // }

  // estadoDecuento(eD) {
  //   var cont3 = 0;

  //   this.product.pro_estado_descuento = eD.currentValue;
  //   this.arrayproduct.forEach((element) => {
  //     if (this.product.pro_categoria == element.pro_categoria) {
  //       console.log(element.pro_estado_descuento);
  //       if (element.pro_estado_descuento == true) {
  //         cont3++;
  //         console.log("hola");
  //         console.log(cont3);
  //       }
  //       if (cont3 == 3) {
  //         swal(
  //           "Error",
  //           "NO SE PUEDE AGREGAR MAS PRODUCTOS NUEVOS EN ESTA CATEGORÍA",
  //           "error"
  //         );
  //         this.product.pro_estado_descuento = false;
  //       }
  //     }
  //   });
  // }
}
