import { Component, OnInit } from '@angular/core';
import { UserSearchModel, UserSearchReslt } from 'src/app/core/models/user.model';
import { UserService } from '../../core/services/user.service';
import * as $ from 'jquery';
import { SmartTableModel, UserSmartTableModel } from '../../core/models/table-model';
import { UiService } from '../../core/services/ui.service';
import { environment } from 'src/environments/environment';

const ROWSOFPAGE = environment.rowsOfPage;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  smartTb: UserSmartTableModel;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  SearchText: string;

  constructor(private userService: UserService) {
    this.smartTb = new UserSmartTableModel();
  }

  async ngOnInit(): Promise<void> {
    const userSearch: UserSearchModel = new UserSearchModel();
    userSearch.SearchText = '';
    this.loadDataTable(userSearch);
  }

  async loadDataTable(userSearch: UserSearchModel) {
    this.loading = true;
    this.error = false;

    userSearch.PageNumber = 1;
    userSearch.RowsOfPage = +ROWSOFPAGE;
    const data = await this.userService.postUser(userSearch).toPromise();
    //console.log(data);
    if (data) {
      const statusCode = data.statusCode;
      if (statusCode === 200) {
        this.smartTb.data = data.data;
      } else {
        this.errorMessage = data.errorMessage;
      }
    }
    this.loading = false;
    this.error = true;
  }

  async outputResponse(response: UserSearchModel)
  {
    //console.log(response.SearchText);
    this.smartTb.SearchText = response.SearchText;
    this.loadDataTable(response);
  }
}
