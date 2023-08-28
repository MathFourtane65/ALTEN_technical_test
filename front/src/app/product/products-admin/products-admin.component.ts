import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  styleUrls: ["./products-admin.component.scss"],
})
export class ProductsAdminComponent implements OnInit {
  products: any[] = [];
  editedProduct: any;

  selectedProducts: any[] = [];

  items: MenuItem[];

  showDialog: boolean = false;
  newProduct: any = { code: "", name: "" };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data.data;
    });
  }

  addProduct(form) {
    if (form.valid) {
      // Appelez votre service pour ajouter le nouveau produit
      this.productService.create(this.newProduct).subscribe(
        (newProduct) => {
          this.products = [newProduct, ...this.products];
          this.showDialog = false; // Fermer la boîte de dialogue
          form.reset(); // Réinitialiser le formulaire
        },
        (error) => {
          // Gérer les erreurs
        }
      );
    }
  }

  deleteProduct() {
    this.selectedProducts.forEach((product) => {
      this.productService.delete(product.id).subscribe(
        (deletedProduct) => {
          const index = this.products.findIndex(
            (p) => p.id === deletedProduct.id
          );
          if (index !== -1) {
            this.products.splice(index, 1);
          }
        },
        (error) => {
          // Gérer les erreurs
        }
      );
    });
  }

  onRowEditInit(product: any) {
    this.editedProduct = { ...product };
  }

  onRowEditSave(product: any) {
    this.productService.update(product.id, product).subscribe(
      (updatedProduct) => {
        // Mettre à jour le tableau des produits ou autre traitement
      },
      (error) => {
        // Gérer les erreurs
      }
    );
  }

  onRowEditCancel(product: any, index: number) {
    this.products[index] = this.editedProduct;
  }

  onRowDelete(product: any) {
    this.productService.delete(product.id).subscribe(
      (deletedProduct) => {
        const index = this.products.findIndex(
          (p) => p.id === deletedProduct.id
        );
        if (index !== -1) {
          this.products.splice(index, 1);
        }
      },
      (error) => {
        // Gérer les erreurs
      }
    );
  }
}
