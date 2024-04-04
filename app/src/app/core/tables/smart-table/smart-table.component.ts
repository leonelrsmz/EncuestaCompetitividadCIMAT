import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SmartTableModel } from '../../models/table-model';
import { UserSearchModel } from '../../models/user.model';
import { UiService } from '../../services/ui.service';
import { environment } from 'src/environments/environment';

const ROWSOFPAGE = environment.rowsOfPage;

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit, AfterViewInit {
  @Input() smartTb: SmartTableModel;
  @Output() response: EventEmitter<UserSearchModel> = new EventEmitter();

  @ViewChild('searchText') searchTextElement!: ElementRef<HTMLInputElement>;

  headsTb: string[];
  SearchText: string;
  SearchModel: UserSearchModel;
  PagesTotal: number;

  constructor() {
    this.SearchModel = new UserSearchModel();
    this.SearchText = '';
  }

  ngOnInit(): void {
    this.headsTb = this.smartTb.heads;
    //console.log(this.smartTb.data[0].name);
    this.SearchText = this.smartTb.SearchText;
    this.SearchModel.PageNumber = this.smartTb.Page;
    this.SearchModel.RowsOfPage = this.smartTb.RowsOfPage;
    this.PagesTotal = Math.ceil(this.smartTb.Total / ROWSOFPAGE);
  }

  ngAfterViewInit(): void {
    this.searchTextElement.nativeElement.focus();
  }

  searchChanged() {
    this.smartTb.data = null;
    this.SearchModel.SearchText = this.SearchText;
    this.response.emit(this.SearchModel);
  }

  nextPage() {
    if (this.SearchModel.PageNumber < this.PagesTotal)
    {
      this.SearchModel.PageNumber++;
      this.searchChanged();
    }
  }

  backPage() {
    if (this.SearchModel.PageNumber > 1)
    {
      this.SearchModel.PageNumber--;
      this.searchChanged();
    }
  }
}

