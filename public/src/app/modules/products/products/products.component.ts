import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import * as firebase from "firebase/app";
import { ProductService } from "../../../services/product/product.service";
import { UsersService } from "app/services/users/users.service";
import { DataService } from "app/services/data.service";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  public comida: Comida[];
  public musica: Musica[];

  public busqueda: string = "";
  public busqueda2: string = "";
  public busqueda3: string = "";
  public dataTable2: DataTable;
  public dataTable: DataTable;
  public product: Decoration;
  public category: Category;
  public arrayproduct: Decoration[];
  public arrayCategory: Category[];
  public arraycomida: Comida[];
  public arraymusica: Musica[];
  public arraySubcategory: SubCategory[];
  public documentId = null;
  public isEdit = false;
  public tablaDatos;
  public tablaDatos2;
  public imageFile: any;
  public imageSrc: any;
  public disabled: boolean = false;
  public cont = 0;
  public cont2 = 0;
  public stateSw = false;
  public usuario: Users;
  public infoUser: Users;
  public user: Users;
  public comidaUser: Comida;
  public musicaUser: Musica;
  public comida2:string;

  public food: Food;
  public track: Track;


  constructor(private productService: ProductService, private usersService: UsersService,

    private dataService: DataService) { }

  ngOnInit(): void {




    this.infoUser = JSON.parse(localStorage.getItem("infoUser"));
    this.user = {};
    this.product = JSON.parse(localStorage.getItem("product"));
    this.product = {};
    this.comida = JSON.parse(localStorage.getItem("comida"))
    this.comida = [];
    this.musica = JSON.parse(localStorage.getItem("musica"))
    this.musica = [];

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

    this.dataTable2 = {
      headerRow: [
        "nombre",
        "Receta",
        "Imagen",
        "Energia Calorica",
        "Proteina",
        "Fibra",
        "Seleccionar",
      ],
      dataRows: [],
    };
    this.tablaDatos = $("#datatablesProduct").DataTable({});
    this.tablaDatos2 = $("#datatablesProduct2").DataTable({});
    this.getProducts();
    this.getUsers();
    this.getUsuarioComida();
    this.getUsuarioMusica();
  }



 

  async getUsers() {
    (await this.usersService.getUserByEmails(this.infoUser.user_email)).subscribe((user) => {
      this.user = user;
    });
  }
  
  consultar() {
    this.dataService.sendGetRequest(this.busqueda).subscribe((data: any[]) => {
      this.comida = data['hints'];
    })
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
  consultar2() {
    this.dataService.getMusica(this.busqueda3).subscribe((data2: any[]) => {
      this.musica = data2['tracks']['hits'];

    })
  }




  // consultar2() {
  //   this.dataService.getMusica(this.busqueda2).subscribe((data2: any[]) => {
  //     console.log(data2);
  //     // this.comida = data['hints'];
  //   })
  // }


  /**
   * 
   * 
     * para agregar Subcategorias
     * @param decoracion
     * @param valid
     */
  estadoNuevo(e, product) {
    if (e) {
      this.product = product;
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
  estadoNuevo2(e, comida) {
    if (e) {
      this.comidaUser = comida;
      this.productService.createComida(this.comidaUser, this.infoUser).then(() => {
        this.comidaUser = {
          food: this.comidaUser.food
        };
      });
    }
  }

  estadoNuevo3(musica) {

    this.musicaUser = musica;
    this.productService.createMusica(this.musicaUser, this.infoUser).then(() => {
      this.musicaUser = {
        track: this.musicaUser.track
      };
    });

  }

  initDataTable2() {
    let aaa = this.tablaDatos;
    $("#datatablesProduct2").DataTable().destroy();
    setTimeout(function () {
      /*
       * Opciones del datatable
       */
      aaa = $("#datatablesProduct2").DataTable({
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



  async getProducts() {
    await this.productService.getProducts('all').subscribe((prductSnapshot) => {
      this.arrayproduct = [];
      prductSnapshot.forEach((categoryData) => {

        this.arrayproduct.push(categoryData.payload.doc.data());
        // console.log(prductSnapshot.length + '' + this.arrayproduct.length);
        if (prductSnapshot.length == this.arrayproduct.length) {
          this.initDataTable();
        }
      });
    });
  }

  async getUsuarioComida() {
    
    
    await this.productService.getComida(this.infoUser.user_email).subscribe((prductSnapshot) => {
      console.log(prductSnapshot);
      
      this.arraycomida = [];
      console.log(this.arraycomida);
      prductSnapshot.forEach((categoryData) => {

        this.arraycomida.push(categoryData.payload.doc.data());
        // console.log(prductSnapshot.length + '' + this.arrayproduct.length);
        if (prductSnapshot.length == this.arraycomida.length) {
          console.log(this.arraycomida);
        }
      });
    });
  }

  async getUsuarioMusica() {
    await this.productService.getMusica(this.infoUser.user_email).subscribe((prductSnapshot) => {
      console.log(prductSnapshot);
      
      this.arraymusica = [];
      console.log(this.arraymusica);
      prductSnapshot.forEach((categoryData) => {

        this.arraymusica.push(categoryData.payload.doc.data());
        // console.log(prductSnapshot.length + '' + this.arrayproduct.length);
        if (prductSnapshot.length == this.arraymusica.length) {
          console.log(this.arraymusica);
        }
      });
    });
  }


  generatePdf() {
    for(let comida2 of this.arraycomida){
      console.log("holaaa",comida2.food.label)
      const documentDefinition = { content: this.infoUser.user_cell_phone + ' ' + comida2.food.label };
      pdfMake.createPdf(documentDefinition).open();
    }
    
   

  }
}
