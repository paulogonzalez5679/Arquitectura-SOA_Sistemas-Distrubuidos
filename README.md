# Lógica de My Date
Para realizar el consumo de los servicios por medio de la API proporcionada por el ESB Mule trabajamos por medio de framework Angular, el cual nos permite crear servicios para los consumo por medio de peticiones HTTP, por lo cual ocupamos el modulo HttpClient, que nos permite realizar la peticiones GET y POST. <br>
## Configuración e implementación
1. Dentro del app.module.ts debemos agregar lo siguiente <br>
import { HttpClientModule } from '@angular/common/http'; <br>
2. Lo importamos dentro del @NgModule: <br>
HttpClientModule,<br>
3. Ahora debemos crear un servicio el cual obtendra las cabeceras para las peticiones, pero a su ves debemos crear un proxy para que angular de de acceso a dichas peticiones, ya que como son API's sin ninguna certificacion de seguridad, angular las toma como pontencialmente peligrosas, por lo cual niega cualquier peticion.

![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fservicio.png?alt=media&token=ad8361a3-3277-46e2-a289-158616173e81)
