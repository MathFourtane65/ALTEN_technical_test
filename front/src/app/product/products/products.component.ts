import { Component, OnInit } from '@angular/core';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  sortField: string | null = null;
  sortOrder: number = 1; // 1 pour croissant, -1 pour décroissant

  layout: string = 'list'; // ou 'grid'
  
  sortOptions: any[] = [
    { label: 'Lowest Price', value: 'priceAsc' },
    { label: 'Highest Price', value: 'priceDesc' }
  ];
  sortKey: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.getAll().subscribe(data => {
      console.log(data.data);
      
      this.products = data.data;
    });
  }

  onSortChange(event: any): void {
    const value = event.value;

    if (value === 'priceAsc') {
      this.sortField = 'price';
      this.sortOrder = 1;
    } else if (value === 'priceDesc') {
      this.sortField = 'price';
      this.sortOrder = -1;
    }

    // Vous pouvez maintenant utiliser sortField et sortOrder pour trier votre liste de produits
  }
}
