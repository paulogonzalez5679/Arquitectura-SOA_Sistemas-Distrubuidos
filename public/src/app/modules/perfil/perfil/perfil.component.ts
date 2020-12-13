import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'app/services/users/users.service';
import { AuthService } from 'app/services/auth/auth/auth.service';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  title = 'angular-pdfmakewrapper';

  generatePdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();

   }


  public infoUser: Users;
  public user: Users;
  public category: Category;
  public arrayCategory: any[];
  public imageFile: any;
  public arrayCountries: any[];
  public categorySelect = '';
  public imageSrc: any ;
  public isContentToggled: Boolean;
  public arrayShowAllNotification: Array<Boolean> = [];
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.infoUser = JSON.parse(localStorage.getItem('infoUser'));
    this.user = {};
    this.getUsers();
   // console.log(this.getCategories);

    
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
  /**
   * *** obtenemos la data del usuario ***
   */
  async getUsers() {
    (await this.usersService.getUserByEmails(this.infoUser.user_email)).subscribe((user) => {
      console.log(user);
      this.user = user;
    //  console.log(this.user)
    });
  }

  saveUser(user: Users, valid: boolean) {
    console.log(this.user);
    this.usersService.saveUser(this.user, this.infoUser);
    // this.disabled = true;
  }

  logout() {
    this.doLogout();
  };

  doLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }



  public toggleContent(i) {
    this.arrayShowAllNotification[i] = true ;
   console.log(this.arrayShowAllNotification)

  }
  public toggleContentHiden(i) {
    this.arrayShowAllNotification[i] = false;
    console.log(this.arrayShowAllNotification)
  }

}
