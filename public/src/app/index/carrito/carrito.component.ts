import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "app/services/product/product.service";
import swal from "sweetalert2";
import * as CryptoJS from 'crypto-js';
import { PayphoneService } from "app/services/payphone/payphone.service";
import { IndexComponent } from "../index.component";


@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.css"],
})
export class CarritoComponent implements OnInit {
  @Input() arrayProductCart: Product[];
  @Input() producto: Product;
  public payment: Payment;
  public cantidadTotal = 0;
  public precioTotal = 0;
  constructor(
    private productService: ProductService, 
    private router: Router,
    private payphoneService : PayphoneService,
    public indexComponent : IndexComponent,
    ) {}

  ngOnInit(): void {
    this.payment = {
      payment_cvv: '234',
      payment_name: 'JISBELY MALDONADO',
      payment_year: '22',
      payment_month: '06',
      payment_number_card: '4381085400426948',
      payment_identification: "1758685315",
      payment_phone: '0987654321',
      payment_email: 'jisbelys@gmail.com',
    }
    this.recalcular () ;
  }

  recalcular () {
    this.cantidadTotal = 0;
    this.precioTotal = 0;
    this.arrayProductCart.forEach(element => {
      console.log(element.pro_pro_cantidadCarrito);
      this.cantidadTotal += element.pro_pro_cantidadCarrito;
      this.precioTotal = this.precioTotal + (element.pro_pro_cantidadCarrito * element.pro_precio)
   }); 
  }

  onChangeCantidad (e) {
    this.recalcular () ;
  }

  setState () {
    this.indexComponent.showCart = !this.indexComponent.showCart;
    window.scroll(0, 0);
  }

  borrarCarrito(producto) {
    swal({
      title: "¿Estás seguro que quieres eliminar el producto?",
      text: "Se borrará permanentemente",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-fill btn-success btn-mr-5",
      cancelButtonClass: "btn btn-fill btn-danger",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.arrayProductCart.splice(producto, 1);
        this.recalcular () ;

        swal("Ok", "Producto Eliminado", "success");
        if (this.arrayProductCart.length == 0) {
          this.router.navigate(["/"]);
          window.scroll(0, 0);
        }
      } else {
        swal("Cancelado", "Producto NO eliminado", "error");
      }
    });
  }

  rutaIndex() {
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate(["/index"]);
    window.scroll(0, 0);
  }

  valorcero(producto: Product) {
    if (producto.pro_pro_cantidadCarrito == 0) {
      producto.pro_pro_cantidadCarrito = 1;
      swal("ERROR", "La cantiad del producto no puede ser cero", "error");
    }
  }

  paymentInits () {
  }

  paymentInit(){
    console.log("*** Iniciando pago ***");

    var transaccion_id  = new Date().getTime();

    var data_card = {
      cardNumber : this.payment.payment_number_card,
      expirationMonth : this.payment.payment_month,
      expirationYear : this.payment.payment_year,
      holderName : this.payment.payment_name,
      securityCode : this.payment.payment_cvv
    }

    console.log(JSON.stringify(data_card));
    
    var key = CryptoJS.enc.Utf8.parse('bb786f7984034068b4aa0913613f8d90'); 
    var iv = CryptoJS.enc.Utf8.parse(''); 
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data_card), key,{ iv: iv });
    var codificado = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    var data_send = {
      data : codificado,
      email : this.payment.payment_email,
      phoneNumber : this.payment.payment_phone,
      documentId : this.payment.payment_identification,
      amount : 1 * 100,
      amountWithTax : 1 * 100,
      amountWithoutTax : 0,
      tax : 0,
      service : 0,
      tip : 0,
      clientTransactionId: transaccion_id,
      deferredType : "",
    }

    var data_send_1 = {
      nickName: "string",
      chargeByNickName: true,
      phoneNumber: "string",
      countryCode: "string",
      timeZone: 0,
      clientUserId: "string",
      reference: "string",
      optionalParameter1: "string",
      optionalParameter2: "string",
      optionalParameter3: "string",
      deferredType: "string",
      responseUrl: "string",
      amount: 0,
      amountWithTax: 0,
      amountWithoutTax: 0,
      tax: 0,
      service: 0,
      tip: 0,
      clientTransactionId: "string",
      storeId: "string",
      terminalId: "string",
      currency: "string",
      transferTo: "string"
    }


    console.log(JSON.stringify(data_send_1));
    this.payphoneService.send_payment_payphone(JSON.stringify(data_send_1)).subscribe(
      response => {
        console.log(JSON.stringify(response));
        if(response['statusCode'] == 3){
          // this.save_data_user();
        }else{
        }
      },
      error => {
        console.log(JSON.stringify(error));
      }
    )
    
  }
}
