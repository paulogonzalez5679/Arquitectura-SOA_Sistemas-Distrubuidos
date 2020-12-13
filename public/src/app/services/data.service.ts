import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private REST_API_SERVER = "/getFood/";
  private REST_API_SERVER2 = "/getMusica/";

  constructor(private httpClient: HttpClient) { }
  
  public sendGetRequest(busqueda: string){
    return this.httpClient.get(this.REST_API_SERVER+''+busqueda);
  }

  public getMusica(busqueda2: string){
    return this.httpClient.get(this.REST_API_SERVER2+''+busqueda2);
  }

  
}
