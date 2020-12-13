# Lógica de My Date
Para realizar el consumo de los servicios por medio de la API proporcionada por el ESB Mule trabajamos por medio de framework Angular, el cual nos permite crear servicios para los consumo por medio de peticiones HTTP, por lo cual ocupamos el modulo HttpClient, que nos permite realizar la peticiones GET y POST. <br>
## Configuración
1. Dentro del app.module.ts debemos agregar lo siguiente <br>
import { HttpClientModule } from '@angular/common/http'; <br>
2. Lo importamos dentro del @NgModule: <br>
HttpClientModule,<br>
3. Ahora debemos crear un servicio el cual obtendra las cabeceras para las peticiones, pero a su ves debemos crear un proxy para que angular de de acceso a dichas peticiones, ya que como son API's sin ninguna certificacion de seguridad, angular las toma como pontencialmente peligrosas, por lo cual niega cualquier peticion.

![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fservicio.png?alt=media&token=ad8361a3-3277-46e2-a289-158616173e81)
<br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fproxy.png?alt=media&token=cfcdc976-b43f-443e-9475-38d9781af276)

Ves que lo hemos creado debemos ejecutar el servidor pero en modo debug, de tal manera que entre al proxy y permita realizar las peticiones, esto lo debemos configurar en el package.json
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fjson.png?alt=media&token=a256df3e-8b13-43b5-8f4d-2e8d336321e5)

Una ves finalizada esta parte debemos crear servicios y metodos los cuales obtendran las datos que necesitamos, es decir filtrar el Json que obtenemos, además de que esto nos permitira guardar en nuestra base de datos.
1. Con este metodo llamamos al servicio de la peticion HTTP, la cual envia un parametro de busqueda en el header para obtner un resultado buscado, este es utilizado para obtener la comida para el cliente
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fcomida.png?alt=media&token=16e23b49-5799-47b8-997a-2b0b79d60722)
2. Con este metodo llamamos al servicio de la peticion HTTP, la cual envia un parametro de busqueda en el header para obtner un resultado buscado, este es utilizado para obtener la muscia para el cliente
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fmusica.png?alt=media&token=2e98aa39-9c9a-4512-ba57-38a4b4090c95)

Ahora con los siguientes servicios servicios almacenan la informacion seleccionada por cada usuario, en colecciones y documentos <br>
- Decoracion <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2FGuardar%20decoracion%20en%20la%20base.png?alt=media&token=5cd3e109-83d6-4a43-8b9e-5c45e704ede2)
- Música <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fguardar%20musica%20en%20la%20base.png?alt=media&token=b469119d-e513-4c71-8586-8aa4a166c3d5)
- Comida <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fguardar%20comida%20en%20base.png?alt=media&token=9b8895f9-0e4b-4e4a-9f51-bae63a077410)

Ahora debemos recuperar la informacion de la base para poder generar un PDF cuando el usuario finalice el proceso de seleccion
- Obtenemos la data la decoracion <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fobtener%20decoracion%20de%20la%20base.png?alt=media&token=32f1dcdb-cd49-4163-a662-1c232fef6a2f)
- Obtenemos la data de la musica <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fobtener%20musica%20de%20la%20base.png?alt=media&token=65954ad1-8ffd-44ca-9fe9-e10656b89e20)
- Obtenemos la data de la comida <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fobtener%20comida%20de%20la%20base.png?alt=media&token=d6ff510f-9c49-47d2-8f31-0da7f2c20662)

## Implementación
Con todo esto implementado tenemos el siguiente resultado en la interfaz que se le presenta al usuario:
- Pagina principal <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fpagina%201.png?alt=media&token=892b344d-a6a6-4298-9ebb-f081895f9867)
- Seccion decoracion <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fdecoracionpagina.png?alt=media&token=09967330-e62c-43a9-84c6-edf0cc747317)
- Seccion comida <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fcomida%20pagina.png?alt=media&token=bfa78562-7c16-43a4-ab58-00a8a3848a3e)
- Seccion musica <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Fmusicapag.png?alt=media&token=fb574e19-1ca0-4d3c-bc5b-2bbd2ba20f0e)
- Seccion Invitacion <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2Finvitacion.png?alt=media&token=db5e2191-2156-45e3-ab40-b4a7151ae802)
- PDF generado <br>
![alt text](https://firebasestorage.googleapis.com/v0/b/citas-59d77.appspot.com/o/imagenesGIT%2FPDF.png?alt=media&token=9795ca6a-0bc4-43ed-a271-92c304ad7300)
 

