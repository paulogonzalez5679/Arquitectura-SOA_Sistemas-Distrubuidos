import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PayphoneService } from "app/services/payphone/payphone.service";
import * as CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { PaymentService } from "app/services/payment/payment.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  public payment: Payment;

  data_bill_form: FormGroup;

  public data_bill_identification = new FormControl("");

  public data_bill_name = new FormControl("");

  public data_bill_telephone = new FormControl("");

  public data_bill_email = new FormControl("");

  public data_bill_numbercard = new FormControl("");

  public data_bill_month = new FormControl("");

  public data_bill_year = new FormControl("");

  public data_bill_cvv = new FormControl("");

  public data_plans: any;

  public data_user: any;

  public months = [
    { nummonth: "01" },
    { nummonth: "02" },
    { nummonth: "03" },
    { nummonth: "04" },
    { nummonth: "05" },
    { nummonth: "06" },
    { nummonth: "07" },
    { nummonth: "08" },
    { nummonth: "09" },
    { nummonth: "10" },
    { nummonth: "11" },
    { nummonth: "12" },
  ];

  public years = new Array();

  constructor(
    formulario: FormBuilder,
    private route: Router,
    private servicepayphone: PayphoneService,
    private servicepayment: PaymentService
  ) {
    }

  ngOnInit() {
    this.payment = {};
    this.data_user = JSON.parse(sessionStorage.getItem("user"));
    this.get_data_select_year();
    // this.payment = {
    //   payment_cvv: '234',
    //   payment_name: 'JISBELY MALDONADO',
    //   payment_year: '2022',
    //   payment_month: '06',
    //   payment_number_card: '4381-0854-0042-6948',
    //   payment_identification: "1758685315",
    //   payment_phone: '593988272222',
    //   payment_email: 'jisbelys@gmail.com',
    // }
    this.payment = {
      payment_cvv: '',
      payment_name: '',
      payment_year: '',
      payment_month: '',
      payment_number_card: '',
      payment_identification: '',
      payment_phone: '',
      payment_email: '',
    }
  }

  paymentInit(a, b) {
    var transaccion_id = new Date().getTime();

    var data_card = {
      cardNumber: this.get_number_card(),
      expirationMonth: this.payment.payment_month,
      expirationYear: this.payment.payment_year,
      holderName: this.payment.payment_name,
      securityCode: this.payment.payment_cvv,
    };

    console.log(JSON.stringify(data_card));

    var key = CryptoJS.enc.Utf8.parse("bb786f7984034068b4aa0913613f8d90");
    var iv = CryptoJS.enc.Utf8.parse("");
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data_card), key, {
      iv: iv,
    });
    var codificado = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    var data_send = {
      data: codificado,
      email: this.payment.payment_email,
      phoneNumber: this.payment.payment_phone,
      documentId: this.payment.payment_identification,
      amount: 0 * 100,
      amountWithTax: 0 * 100,
      amountWithoutTax: 0,
      tax: 0 * 100,
      service: 0,
      tip: 0,
      clientTransactionId: transaccion_id,
      deferredType: "",
    };
    console.log(JSON.stringify(data_send));
    this.servicepayphone
      .send_payment_payphone(JSON.stringify(data_send))
      .subscribe(
        (response) => {
          console.log(JSON.stringify(response, null, 3));
          if (response["statusCode"] == 3) {
            // this.save_data_user();
          } else {
          }
        },
        (error) => {
          console.log(JSON.stringify(error, null, 3));
        }
      );
  }

  // async save_data_user() {
  //   var object_data_billing = {
  //     bill_address: this.data_plans.plan_data_bill.billing_user_address,
  //     bill_country: this.data_plans.plan_data_bill.billing_user_country,
  //     bill_dni: this.data_plans.plan_data_bill.billing_user_identification,
  //     bill_email: this.data_plans.plan_data_bill.billing_user_email,
  //     bill_name: this.data_plans.plan_data_bill.billing_user_name,
  //     bill_phone: this.data_plans.plan_data_bill.billing_user_phone,
  //     bill_phone_code: "593",
  //     bill_registration_date: this.get_date_current(),
  //     bill_registration_time: this.get_time_current(),
  //   };

  //   await this.servicepayment
  //     .save_data_billing_user(this.data_user.user_email, object_data_billing)
  //     .then()
  //     .catch();

  //   var object_data_config_user = {
  //     account_registration_date: this.get_date_current(),
  //     acount_registration_time: this.get_time_current(),
  //     active_days: this.data_plans.plan_expiration_days,
  //     acount_days_of_grace: 5,
  //     expiration_date_of_the_plan: this.get_date_expiration_account(),
  //     fea_access_to_contact_manager: this.data_plans.plan_features[3]
  //       .features_value,
  //     fea_access_to_event_manager: this.data_plans.plan_features[4]
  //       .features_value,
  //     fea_access_to_features: this.data_plans.plan_features[0].features_value,
  //     fea_access_to_register_form: this.data_plans.plan_features[1]
  //       .features_value,
  //     fea_access_to_request_form: this.data_plans.plan_features[2]
  //       .features_value,
  //     fun_share_location_in_real_time: this.data_plans.plan_functionality[0]
  //       .functionality_state,
  //     fun_see_the_location_in_real_time: this.data_plans.plan_functionality[1]
  //       .functionality_state,
  //     fun_request_permanent: this.data_plans.plan_functionality[2]
  //       .functionality_state,
  //     fun_request_momentary: this.data_plans.plan_functionality[3]
  //       .functionality_state,
  //     fun_calculate_time_to_destination: this.data_plans.plan_functionality[4]
  //       .functionality_state,
  //     fun_calculate_distance_to_destination: this.data_plans
  //       .plan_functionality[5].functionality_state,
  //     fun_show_location_of_parent_component: this.data_plans
  //       .plan_functionality[6].functionality_state,
  //     fun_activate_travel_measurement: this.data_plans.plan_functionality[7]
  //       .functionality_state,
  //     fun_activate_time_measurement: this.data_plans.plan_functionality[8]
  //       .functionality_state,
  //     fun_verify_registration_location: this.data_plans.plan_functionality[9]
  //       .functionality_state,
  //     fun_notify_new_registration: this.data_plans.plan_functionality[10]
  //       .functionality_state,
  //     fun_store_path: this.data_plans.plan_functionality[11]
  //       .functionality_state,
  //     payment_date: this.get_date_current(),
  //     payment_time: this.get_time_current(),
  //     plan_color: this.data_plans.plan_color_number,
  //     plan_id: this.data_plans.plan_id,
  //     plan_name: this.data_plans.plan_name,
  //     plan_order: this.data_plans.plan_order,
  //     plan_package_id: this.data_plans.plan_package.package_id,
  //     plan_package_name: this.data_plans.plan_package.package_name,
  //     plan_package_num_group_as_guest: this.data_plans.plan_package
  //       .package_num_group_as_guest,
  //     plan_package_num_groups: this.data_plans.plan_package.package_num_groups,
  //     plan_package_num_membres: this.data_plans.plan_package
  //       .package_num_membres,
  //     plan_package_number_of_invites: this.data_plans.plan_package
  //       .package_number_of_invites,
  //     plan_package_unit_price_per_member: this.data_plans.plan_package
  //       .package_unit_price_per_member,
  //     status_account: true,
  //   };

  //   await this.servicepayment
  //     .save_data_config_account_user(
  //       this.data_user.user_email,
  //       object_data_config_user
  //     )
  //     .then()
  //     .catch();

  //   await this.servicepayment
  //     .update_flag_show_plan(this.data_user.user_email)
  //     .then()
  //     .catch();
  //   this.route.navigate(["/home"]);
  // }

  get_number_card(): string {
    var resultado = "";
    var number_card = "";
    number_card = this.payment.payment_number_card;
    var array = number_card.split("-");

    for (let i = 0; i < array.length; i++) {
      resultado = resultado.concat(array[i]);
    }

    //console.log(resultado);
    return resultado;
  }

  get_data_select_year() {
    var current_year = new Date().getFullYear() - 1;
    for (let i = 0; i < 10; i++) {
      current_year += 1;
      var data = { year: current_year };
      this.years.push(data);
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  characteronly(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 96 && charCode < 123) ||
      (charCode > 64 && charCode < 91) ||
      charCode === 32
    ) {
      return true;
    }
    return false;
  }

  masksecuencial(event) {
    const charCode = event.which ? event.which : event.keyCode;
    var value_number_card = event.target.value;
    if (
      value_number_card.length == 4 ||
      value_number_card.length == 9 ||
      value_number_card.length == 14
    ) {
      if (charCode != 8) {
        this.payment.payment_number_card = this.payment.payment_number_card.concat(
          "-"
        );
      }
    }
  }

  
}
