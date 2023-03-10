import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Collection} from "../../../models/collection";
import {Product} from "../../../models/Product";

@Component({
  selector: 'app-collection-preview',
  templateUrl: './collection-preview.component.html',
  styleUrls: ['./collection-preview.component.scss']
})
export class CollectionPreviewComponent implements OnInit {
  collection!: Collection;
  oneProduct!: Product;

  constructor(private route: ActivatedRoute,
  private store: AngularFirestore) { }

  ngOnInit(): void {
    this.collection = new Collection("",[]);
    const collectionName = this.route.snapshot.params['collectionName'];
    this.store.collection('product').valueChanges().subscribe(product => product.forEach(i => {
      let productScratch: any = i;
      console.log(productScratch.collection + " == " + collectionName);
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH")
      console.log(productScratch.collection == collectionName)
      if (productScratch.collection == collectionName) {
        this.collection.name = collectionName;
        this.collection.product.push(
          new Product(
            productScratch._collection,
            productScratch.image,
            productScratch.name,
            productScratch.price,
            productScratch.solded));
      }
    }));
  }
}
