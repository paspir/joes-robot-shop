import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // GET - Return all Products
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('/api/products');
  }

  // POST - add a product
  addProduct(product: Product){
    this.http.post('/api/products', product).subscribe(() => {
      console.log('Added ' + product.name + 'to Database!')
    })
  }

    // POST - add a product
    deleteProduct(id: number){
      this.http.delete('/api/products/'+ id).subscribe(() => {
        console.log('product with id ' + id + 'has been deleted from Database!')
      })
    }

    editProduct(product: Product){
      this.http.put(('/api/products/'+ product.productId), product).subscribe(() => {

      console.log(`Product with ID ${product.productId} updated successfully!`);
    })
    }
  

}
