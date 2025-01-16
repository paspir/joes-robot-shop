import { Component } from '@angular/core';
import { Product } from './product.model'; // Adjust the path to your interface
import { ProductService } from './product.service';


@Component({
  selector: 'app-home',
  standalone: true, // This makes it a standalone component
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Array declaration
   products: Product[] = [];
   deleteProductId: number = 0;

     // Default new product structure
  newProduct: Product = {
    productId: 0,
    name: '',
    price: 0,
    storeId: 0
  };

  // For editing a product
  editProduct: Product = {
    productId: 0,
    name: '',
    price: 0,
    storeId: 0
  };

  constructor(private productSvc: ProductService){}

  ngOnInit(){
  this.productSvc.getProducts().subscribe(products =>{
    this.products = products;
    })
  }

  loadProducts() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onAddProduct() {
    const product: Product = {
      productId: this.newProduct.productId,
      name: this.newProduct.name,
      price: this.newProduct.price,
      storeId: this.newProduct.storeId
    };

    this.productSvc.addProduct(product);
    this.loadProducts(); // Refresh product list
  }

  onDeleteProduct(){
    this.productSvc.deleteProduct(this.deleteProductId);
    this.loadProducts(); // Refresh product list
    this.deleteProductId = 0; // Reset the delete input
  }

  onEditProduct() {
    this.productSvc.editProduct(this.editProduct)
      this.loadProducts();
      this.resetEditForm();

  }

  // Method to reset the form after submission
  resetForm() {
    this.newProduct = { productId: 0, name: '', price: 0, storeId: 0 };
  }

  resetEditForm() {
    this.editProduct = { productId: 0, name: '', price: 0, storeId: 0 };
  }
}

