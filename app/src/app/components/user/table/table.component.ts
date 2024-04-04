import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableDataModel, SmartTableModel, UserSmartTableModel } from 'src/app/core/models/table-model';
import { UserSearchModel } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

const ROWSOFPAGE = environment.rowsOfPage;

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() smartTbU: UserSmartTableModel;
  @Output() response: EventEmitter<UserSearchModel> = new EventEmitter();
  smartTb: SmartTableModel;

  constructor() {
    this.smartTb = new SmartTableModel();
   }

  ngOnInit(): void {
    //build Table Model
    this.smartTb.title = 'Usuarios';
    this.smartTb.SearchText = this.smartTbU.SearchText;
    this.smartTb.Total = (this.smartTbU.data.length > 0) ? this.smartTbU.data[0].total : 0;
    this.smartTb.Page = (this.smartTbU.data.length > 0) ? this.smartTbU.data[0].page : 1;
    this.smartTb.RowsOfPage = (this.smartTbU.data.length > 0) ? this.smartTbU.data[0].rowsOfPage : ROWSOFPAGE;
    this.smartTb.heads = ['#', 'Name', 'Email', 'Rol', 'Opciones'];
    let i = 0;
    this.smartTb.data = [];
    this.smartTbU.data.forEach(d => {
      //console.log(`${d.userId} ${d.name} ${d.email} ${d.description}`);
      const dataModel = new TableDataModel();
      dataModel.data1 = d.userId;
      dataModel.data2 = d.name;
      dataModel.data3 = d.email;
      dataModel.data4 = d.description;
      this.smartTb.data[i] = dataModel;
      i++;
    });

  }

  async outputResponse(response1: UserSearchModel)
  {
    //console.log(response1.SearchText);
    this.response.emit(response1);
  }
}
