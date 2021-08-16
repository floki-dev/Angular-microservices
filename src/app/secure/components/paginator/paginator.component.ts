import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  // принимаем
  @Input('lastPage') lastPage: number | undefined
  // отправляем
  @Output('pageChange') pageChange = new EventEmitter<number>();
  currentPage: number = 1

  constructor() { }

  ngOnInit(): void {
  }

  prev() {
    if(this.currentPage === 1) return;

    this.currentPage--
    this.pageChange.emit(this.currentPage)
  }

  next() {
    if(this.currentPage === this.lastPage) return;

    this.currentPage++
    this.pageChange.emit(this.currentPage)
  }
}
