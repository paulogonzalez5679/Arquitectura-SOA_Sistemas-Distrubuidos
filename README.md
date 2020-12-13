# Lógica de My Date
Para realizar el consumo de los servicios por medio de la API proporcionada por el ESB Mule trabajamos por medio de framework Angular, el cual nos permite crear servicios para los consumo 
por medio de peticiones HTTP, por lo cual ocupamos el modulo HttpClient, que nos permite realizar la peticiones GET y POST. <br>
La configuracion es la siguiente: <br>
1. Dentro del app.module.ts debemos agregar lo siguiente <br>
import { HttpClientModule } from '@angular/common/http'; <br>
2. 
