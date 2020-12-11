import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "app/services/auth/auth/auth.service";
declare var $: any;

declare interface UserLogin {
  email?: string;
  password?: string;
}

@Component({
  selector: "app-modal-login",
  templateUrl: "./modal-login.component.html",
  styleUrls: ["./modal-login.component.css"],
})
export class ModalLoginComponent implements OnInit {
  @ViewChild("modalLogin") modalLogin: ElementRef;

  public userLogin: UserLogin;

  array = [];
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),
    password: new FormControl("", Validators.required),
  });
  test: Date = new Date();
  loginService: any;

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.userLogin = {};
  }

  /**
   * *** Manejo del modal login       ***
   * *** seteamos la variable a false ***
   * *** para ocultar el cargando     ***
   */
  ngAfterViewInit() {
    $(this.modalLogin.nativeElement).on("hidden.bs.modal", () => {
      console.log('*** CERRANDO MODAL ***');
    });
    $(this.modalLogin.nativeElement).on("show.bs.modal", () => {
      console.log('*** ABRIENDO MODAL ***');
    });
  }

  /**
   * *** Funcion para loguear al usuario           ***
   * *** validamos el formulario si es valido      ***
   * *** llamamos el servicio login en authSevice  ***
   * @param userLogin
   * @param valid
   */
  async onLogin(userLogin: UserLogin, valid: boolean) {
    this.array.length;
    if (valid) {
      if (userLogin) {
        this.authservice.login(userLogin.email, userLogin.password);
      }
    }
  }
}
