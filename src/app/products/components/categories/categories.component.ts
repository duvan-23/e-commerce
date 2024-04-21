import { Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../shared/models/category';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSliderModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @ViewChildren('checkbox') checkboxes!: QueryList<any>;
  @ViewChildren('checkboxAll') checkboxAll!: any;

  @ViewChild('startInput') startInput: any;
  @ViewChild('endInput') endInput: any;
  
  @Output() searchName = new EventEmitter<String>();
  @Output() searchCategories = new EventEmitter<Array<number>>();
  @Output() searchPrice = new EventEmitter<Array<number>>();

  @Input() maxPrice!:number;
  
  categoryService = inject(CategoryService);
  category!:Category[];
  categoriesOptions: boolean= false;
  categoriesAll: boolean= true;
  formBuilder = inject(FormBuilder);
  inputSearch = this.formBuilder.nonNullable.group({
    search: ['', []],
  });


  ngOnInit(){
    this.categoryService.getCategories().subscribe({
      next:(data)=>{
        this.category=data;
      },
      error:(e)=>{
        console.log(e);
      }
    });
  }

  search(){
    const { search } = this.inputSearch.getRawValue();
    this.searchName.emit(search);
  }

  onCheckboxChange(event:any, id:number){
    if(id==0){
      this.categoriesAll =true;
      if (this.checkboxes) {
        if(this.checkboxes.some(checkbox => checkbox.nativeElement.checked)){
          this.checkboxes.forEach(checkbox =>checkbox.nativeElement.checked =false);
        }
      }
      this.searchCategories.emit([0]);
    }else{
      this.categoriesAll =false;
      if (this.checkboxes) {
        if(this.checkboxes.some(checkbox => checkbox.nativeElement.checked)){
          let ids:any=[];
          this.checkboxes.forEach(checkbox =>{
            if(checkbox.nativeElement.checked){
              ids.push(+checkbox.nativeElement.value);
            }
          });
          this.searchCategories.emit(ids);
        }else{
          this.categoriesAll =true;
          this.searchCategories.emit([0]);
        }
      }
    }
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return value  + 'k';
    }

    return `${value}`;
  }

  rangePrice(){
    const minPrice = this.startInput.nativeElement.value;
    const maxPrice = this.endInput.nativeElement.value;
    this.searchPrice.emit([minPrice, maxPrice]);
  }
}
