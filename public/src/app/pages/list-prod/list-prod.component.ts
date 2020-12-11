import { Component, OnInit } from "@angular/core";
import { ProductService } from "app/services/product/product.service";
import swal from "sweetalert2";
import * as firebase from "firebase/app";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

declare var $: any;
export interface DataTable {
  headerRow: string[];
  footerRow?: string[];
  dataRows: string[][];
}
@Component({
  selector: "app-list-prod",
  templateUrl: "./list-prod.component.html",
  styleUrls: ["./list-prod.component.css"],
})
export class ListProdComponent implements OnInit {
  public dataTable: DataTable;
  public product: Product;
  public category: Category;
  public arrayproduct: Product[];
  public arrayproductAux: Product[];
  public arrayCategory: Category[];
  public documentId = null;
  public isEdit = false;
  public tablaDatos;
  public imageFile: any;
  public imageSrc: any;
  public disabled: boolean = false;
  public cont = 0;
  public stateSw = false;
  public seachText = "";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product = {};
    this.dataTable = {
      headerRow: [
        "#",
        "ID",
        "Nombre",
        "Categoría",
        "Descripción",
        "Stock",
        "Precio",
        "Imagen",
        "Editar",
        "Eliminar",
      ],
      dataRows: [],
    };
    this.tablaDatos = $("#datatablesProduct").DataTable({});
    this.getProducts();
  }

  stateChange() {}

  onChange(e) {}

  /**
   * *** Recibimos el archivo y lo enviamos a subir al storage ***
   * @param event
   */
  public upload(event): void {
    const file = event.target.files[0];
    this.imageFile = file;
    this.uploadDocumentToStorage();
  }

  searchProduct() {
    this.arrayproduct = [];
    this.arrayproductAux.forEach((e) => {
      if (e.pro_nombre.toUpperCase().includes(this.seachText.toUpperCase())) {
        this.arrayproduct.push(e);
      }
    });
  }

  filtroTodos(event) {
    this.arrayproduct = [];

    this.arrayproductAux.forEach((e) => {
      this.arrayproduct.push(e);
    });
  }

  /**
   * Optenemos el id de la nueva categoria
   */

  /**
   * para agregar categorias
   * @param product
   * @param valid
   */

  // addProduct(product: Decoration, valid: boolean) {
  //   console.log(product);
  //   if (valid) {
  //     product.de_estado_seleccionado = this.product.pro_estado_nuevo;
  //     console.log(product);
  //     this.productService.createProduct(product).then(() => {
  //       swal("OK", "Registro Exitoso", "success");
  //       this.product = {};
  //       $("#modalProduct").modal("hide");
  //     });
  //   }
  // }

  /**
   * *** Obtenemos todos los productos de la DB ***
   */
  async getProducts() {
    await this.productService.getProducts('').subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      this.arrayproductAux = [];
      prductSnapshot.forEach((categoryData) => {
        this.arrayproduct.push(categoryData.payload.doc.data());
        this.arrayproductAux.push(categoryData.payload.doc.data());
        // console.log(prductSnapshot.length + '' + this.arrayproduct.length);
        if (prductSnapshot.length == this.arrayproduct.length) {
          this.initDataTable();
        }
      });
    });
  }

  async getProductsAsc() {
    await this.productService.getProductsAsc().subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      this.arrayproductAux = [];
      prductSnapshot.forEach((categoryData) => {
        this.arrayproduct.push(categoryData.payload.doc.data());
        this.arrayproductAux.push(categoryData.payload.doc.data());
        // console.log(prductSnapshot.length + '' + this.arrayproduct.length);
        if (prductSnapshot.length == this.arrayproduct.length) {
          this.initDataTable();
        }
      });
    });
  }

  async getProductsDesc() {
    await this.productService.getProductsDes().subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      this.arrayproductAux = [];
      prductSnapshot.forEach((categoryData) => {
        this.arrayproduct.push(categoryData.payload.doc.data());
        this.arrayproductAux.push(categoryData.payload.doc.data());
        // console.log(prductSnapshot.length + '' + this.arrayproduct.length);
        if (prductSnapshot.length == this.arrayproduct.length) {
          this.initDataTable();
        }
      });
    });
  }

  async getCategory() {
    await this.productService.getCategories().subscribe((categorySnapshot) => {
      this.arrayCategory = [];
      categorySnapshot.forEach((categoryData) => {
        this.arrayCategory.push(categoryData.payload.doc.data());
        if (categorySnapshot.length == this.arrayCategory.length) {
          // this.initDataTable();
        }
      });
    });
  }

  selectCategories(e) {
    this.category = this.arrayCategory[e.target.value];
    this.estadoNuevo("e");
  }

  /**
   * *** Seleccionamos una categoria para la edicion ***
   * @param category
   */
  selectCategory(product: Product) {
    console.log("*** Cargando ***");

    this.isEdit = true;
    this.product = product;
    this.estadoNuevo("e");
  }

  /**
   *
   * @param id
   */
  public editProduct(id) {
    let editSubscribe = this.productService
      .getProduct(id)
      .subscribe((categoria) => {
        editSubscribe.unsubscribe();
      });
  }

  // public deleteProduct(id) {
  //   this.productService.deleteProduct(id).then(
  //     () => {},
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

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

  uploadDocumentToStorage() {
    // let serviceGlobal = this.registerService;
    let categoryLocal = this.product;
    var storageService = firebase.storage();
    var refStorage = storageService.ref("/product").child(this.product.pro_id);
    var uploadTask = refStorage.put(this.imageFile);
    uploadTask.on(
      "state_changed",
      null,
      function (error) {},
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          categoryLocal.pro_url = downloadURL;
          swal({
            title: "Muy bien",
            text: "Información adicional guardada correctamente",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-fill btn-success",
            type: "success",
          }).catch(swal.noop);
        });
      }
    );
  }

  estadoNuevo(e) {
    var cont = 0;
    var productAux = this.product;
    // console.log("funciona");
    // console.log(this.cont);

    console.log(e.currentValue);
    // console.log(this.arrayproduct)
    // this.product.pro_estado_nuevo = e.currentValue;
    // console.log(this.product);

    this.arrayproduct.forEach((element) => {
      if (this.product.pro_categoria == element.pro_categoria) {
        if (element.pro_estado_nuevo == true) {
          cont++;
          console.log(
            cont + ".- " + element.pro_estado_nuevo + ".- " + element.pro_nombre
          );
        }

        // if (cont==4)
        // {
        //   swal('Error','NO SE PUEDE AGREGAR MAS PRODUCTOS NUEVOS EN ESTA CATEGORÍA','error')
        //   this.product.pro_estado_nuevo = false;
        // }
        // else if(cont<4)
        // {
        //   swal('Error',' RECUERDE QUE DEBE AGREGAR 3 PRODUCTOS EN LO MAS NUEVO','error')
        //   this.product.pro_estado_nuevo = false;
        // }
      }
    });
    this.cont = cont;

    if (cont > 3) {
      swal(
        "Error",
        "NO SE PUEDE AGREGAR MAS PRODUCTOS NUEVOS EN LA CATEGORÍA: " +
          this.product.pro_categoria,
        "error"
      );
      this.product.pro_estado_nuevo = false;
      $("#modalProduct").modal("hide");
      this.product = {};
      // this.product = productAux;
      // this.selectCategory(this.product);
    } else {
      console.log(this.product);
      if (this.product.pro_nombre != "") {
        // this.productService.updateProductState(this.product);
      }
    }
    console.log(
      "*** TOTAL PARA: => *** " + this.product.pro_categoria + " = " + cont
    );
  }

  estadoLoMasVendido(eMV) {
    var cont2 = 0;

    this.product.pro_estado_novedad = eMV.currentValue;
    this.arrayproduct.forEach((element) => {
      if (this.product.pro_categoria == element.pro_categoria) {
        console.log(element.pro_estado_novedad);
        if (element.pro_estado_novedad == true) {
          cont2++;
          console.log("hola");
          console.log(cont2);
        }
        if (cont2 == 3) {
          swal(
            "Error",
            "NO SE PUEDE AGREGAR MAS PRODUCTOS NUEVOS EN ESTA CATEGORÍA",
            "error"
          );
          this.product.pro_estado_novedad = false;
        }
      }
    });
  }
}
