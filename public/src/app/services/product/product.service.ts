import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  public carrito = [];
  public user: Users;
  constructor(
    private product: AngularFirestore,
    private category: AngularFirestore
  ) { }

  // public getUserByEmail(user: Users) {
  //   return this.category
  //     .collection<Users>("users_collection").doc(user.user_email)
  //     .snapshotChanges();
  // }

  public getUserByEmail(user: Users) {
    return this.category
      .collection<Users>("users_collection").doc(user.user_email)
      .snapshotChanges();
  }
 
  public createDecoracion(decoracion: Decoration, usuario: Users) {
    console.log(decoracion.id);
    console.log(usuario.user_email);
    
    return this.category
    .collection("users_collection")
    .doc(usuario.user_email)
    .collection("user_cita")
    .doc("decoracion")
    .collection("user_decoracion")
    .doc(decoracion.nombre).set(decoracion); 
  }

  public createComida(comida: Comida, usuario: Users) {
    console.log(comida.food.label);
    console.log(usuario.user_email);
    return this.category
    .collection("users_collection")
    .doc(usuario.user_email)
    .collection("user_cita")
    .doc("comida")
    .collection("user_comida")
    .doc(comida.food.label).set(comida); 
  }


  // public createComida(comida: Comida, usuario: Users) {
  //   console.log(comida.food.label);
  //   console.log(usuario.user_email);
    
  //   return this.category
  //   .collection("users_collection")
  //   .doc(usuario.user_email)
  //   .collection("user_comida")
  //   .doc(comida.food.label).set(comida); 
  // }

  

  //Crea una nueva categoria
  public createProduct(product: Product) {
    return this.product.collection("products").doc(product.pro_id).set(product);
  }


  //Obtiene una nueva categoria
  public getProduct(documentId: string) {
    return this.product
      .collection("decoration")
      .doc(documentId)
      .snapshotChanges();
  }

  //Obtiene todos productos normal
  public getProducts(category: String) {
    console.log(category);
    if (category == 'all') {
      return this.product.collection("decoration").snapshotChanges();
    } 

  }
  //Obtiene todos productos ascendente
  public getProductsAsc() {
    return this.product
      .collection("products", (ref) => ref.orderBy("pro_precio", "asc"))
      .snapshotChanges();
  }

  //Obtiene todos productos descendente
  public getProductsDes() {
    return this.product
      .collection("products", (ref) => ref.orderBy("pro_precio", "desc"))
      .snapshotChanges();
  }

  //Actualiza una nueva categoria
  // public updateProduct(documentId: string, data: any) {
  //   return this.product.collection("products").doc(documentId).set(data);
  // }
  //Actualiza una nueva categoria
  // public updateProductState(product: Product) {
  //   return this.product
  //     .collection("products")
  //     .doc(product.pro_id)
  //     .update(product);
  // }
  //Elimina una nueva categoria
  // public deleteProduct(documentId: string) {
  //   return this.product.collection("products").doc(documentId).delete();
  // }

  //Obtiene todos las categorias
  public getCategories() {
    return this.category.collection("decoration").snapshotChanges();
  }



  // //Obtener sub categoria
  // getSubCategory(): Observable<any[]>{
  //   //se envia el codigo de la category
  //   return this.product.collection('category').doc('03u7SPV2avAP5KY9WXjJ').collection('sub_category').snapshotChanges();
  // }
}
