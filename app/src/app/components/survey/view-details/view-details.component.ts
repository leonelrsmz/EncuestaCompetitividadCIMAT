import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericTableModel, TableDataModel } from 'src/app/core/models/table-model';
import { SurveyService } from '../../../core/services/survey.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  ContentTb: GenericTableModel;
  userId: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private router: ActivatedRoute,
              private surveyService: SurveyService) {
    this.router.params.subscribe(params => {
      this.userId = +params['userId'];
    });
    //this.userId = 15;
    this.ContentTb = new GenericTableModel();
  }

  ngOnInit(): void {
    this.loadDataTable();
  }

  async loadDataTable() {
    this.error = false;

    this.ContentTb.data = [];
    this.ContentTb.title = 'Respuestas';
    this.ContentTb.heads = ['#', 'Pregunta', 'Respuesta', 'Texto', ''];

    const data = await this.surveyService.getSurveyDetailsByUserId(this.userId).toPromise();
    //console.log(data);
    if (data) {
      const statusCode = data.statusCode;
      if (statusCode === 200) {

        let i = 0;
        data.data.forEach(d => {
          const dataModel = new TableDataModel();
          dataModel.data1 = d.surveyDetailId;
          dataModel.data2 = d.question;
          dataModel.data3 = d.answer;
          dataModel.data4 = d.answerText;
          this.ContentTb.data[i] = dataModel;
          i++;
        });

      } else {
        this.errorMessage = data.errorMessage;
        this.error = true;
      }
    }
    this.loading = false;
  }
}
