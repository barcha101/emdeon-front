import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor() { }

  @Input() totalCount: number | undefined;
  @Input() perPage: number | undefined;
  @Input() pageNum: number | undefined;
  @Output() onPageChange = new EventEmitter<any>();
  @Output() perPageUpdated = new EventEmitter<any>();

  public totalPages = 0;
  public startNum = 0;
  public endNum = 0;
  public pagesToShow: any = [];
  public perPageOpts: any = [10, 20, 50, 100, 200];

  ngOnInit(): void {
    this.setNumbers();
  }

  ngOnChanges(changes: SimpleChanges) {
      this.setNumbers();
  }

  setNumbers(){
    if(this.totalCount && this.perPage && this.pageNum){
      this.totalPages = Math.ceil(this.totalCount/this.perPage);
      this.startNum = (this.pageNum * this.perPage) - this.perPage + 1;
      this.endNum = (this.pageNum * this.perPage) > this.totalCount ? this.totalCount : (this.pageNum * this.perPage);
    } else {
      this.totalPages = 0;
      this.startNum = 0;
      this.endNum = 0;
    }
  }

  pageClicked(num: any){
    this.onPageChange.emit(num)
  }

  perPageUpdatedLocal(){
    this.perPageUpdated.emit(this.perPage)
  } 

}
