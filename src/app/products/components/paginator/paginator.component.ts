import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {PageEvent, MatPaginatorModule, MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() totalItems!: number;
  @Input() pageSize!: number;

  @Output() pageChange = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private paginatorIntl: MatPaginatorIntl) {}

  ngAfterViewInit() {
    this.paginatorIntl.previousPageLabel = ''; 
    this.paginatorIntl.nextPageLabel = ''; 
  }
  
  pageChanged(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex + 1);
  }

}
