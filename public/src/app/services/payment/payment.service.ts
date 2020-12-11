import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private db : AngularFirestore
  ) { }

  save_data_billing_user(emailuser : string, data : any){
    return this.db.collection("users").doc(emailuser).collection("config_billing").doc("data_billing").set(data);
  }

  save_data_config_account_user(emailuser : string, data : any){
    return this.db.collection("users").doc(emailuser).collection("account_private").doc("config").set(data);
  }

  update_flag_show_plan(emailuser : string){
    return this.db.collection("users").doc(emailuser).update({user_show_plans : false});
  }
}
