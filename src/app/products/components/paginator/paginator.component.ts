import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges){
    if (changes["totalItems"] && this.paginator) {
      this.paginator.pageIndex = 0;
    }
  }
  ngAfterViewInit() {
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    this.paginatorIntl.previousPageLabel = ''; 
    this.paginatorIntl.nextPageLabel = ''; 
    this.paginator._changePageSize(this.paginator.pageSize);

  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    const total = Math.ceil(length / this.pageSize);
    return `Page ${page+1} of ${total}`;
  }

  pageChanged(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex + 1);
  }

}
