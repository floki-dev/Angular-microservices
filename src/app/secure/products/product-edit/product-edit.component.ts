import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../interfaces/product";
import {Response} from "../../../interfaces/response";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  product: Product;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: '',
      description: '',
      image: '',
      price: '',
    })

    this.route.params.subscribe(
      params => {
        this.productService.get(params.id).subscribe(
          (res: Response) => {
            this.product = res.data
            this.form.patchValue(this.product)
          })
      })
  }

  submit() {
    const data = this.form.getRawValue();

    this.productService.update(this.product.id, data).subscribe(
      () => {
        this.router.navigate(['/products']);
      }
    )
  }

  // @ts-ignore
  // upload(files: FileList) {
  //   const file = files.item(0);
  //
  //   this.imageService.upload(data).subscribe();
  // }
}
