import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FinishSurveyParams } from '../models/finish-survey-params.model';
import { ReturnServiceModel } from '../models/return-service.model';
import { SaveAnsweredQuestionParamsModel } from '../models/save-answered-question-params.model';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService extends BaseService {
  public GETIDQUESTIONBYQUESTIONIDURL = 'api/Question/GetIdQuestionByQuestionId';
  public GETQUESTIONBYIDURL = 'api/Question/GetQuestionById';
  public GETQUESTIONBACKURL = 'api/Question/GetQuestionBack';
  public GETQUESTIONNEXTURL = 'api/Question/GetQuestionNext';
  public GETITPREVIOUSQUESTION = 'api/Question/GetIdPreviousQuestion';

  public SURVEYURL = 'api/Survey/Survey';
  public POSTSAVEANSWEREDQUESTIONURL = 'api/Survey/SaveAnsweredQuestion';
  public POSTFINISHSURVEYURL = 'api/Survey/FinishSurvey';

  public GETSURVEYDETAILSBYUSERIDURL = 'api/Survey/GetSurveyDetailsByUserId';

  constructor(private http: HttpClient,
              private authService: AuthService) {
                super();
              }

  public getIdQuestionByQuestionId(QuestionId: string): Observable<ReturnServiceModel> {
    const params = `?QuestionId=${QuestionId}`;
    const token = this.authService.userToken;
    const HEADERS = this._getHeaders(token);
    return this.http.get<ReturnServiceModel>(`${this.URL}${this.GETIDQUESTIONBYQUESTIONIDURL}${params}`,
     HEADERS).pipe(catchError(this.handleError('GETIDQUESTIONBYQUESTIONIDURL', null)));
  }

  public getQuestionById(Id: number, SectionId: string, UserId: number): Observable<ReturnServiceModel> {
    const params = `?Id=${Id}&SectionId=${SectionId}&UserId=${UserId}`;
    const token = this.authService.userToken;
    const HEADERS = this._getHeaders(token);
    return this.http.get<ReturnServiceModel>(`${this.URL}${this.GETQUESTIONBYIDURL}${params}`, HEADERS).pipe(catchError(this.handleError('GETQUESTIONBYIDURL', null)));
  }

  public getQuestionNext(Id: number, UserId: number): Observable<ReturnServiceModel> {
    const params = `?Id=${Id}&UserId=${UserId}`;
    const token = this.authService.userToken;
    const HEADERS = this._getHeaders(token);
    return this.http.get<ReturnServiceModel>(`${this.URL}${this.GETQUESTIONNEXTURL}${params}`, HEADERS).pipe(catchError(this.handleError('GETQUESTIONNEXTURL', null)));
  }

  public saveAnsweredQuestion(params: SaveAnsweredQuestionParamsModel): Observable<ReturnServiceModel> {
    const token = this.authService.userToken;
    const HEADERS = this._getHeaders(token);
    console.log("AnswerText "+params.SaveAnsweredQuestion[0].AnswerText
    +"\nAnswerId "+params.SaveAnsweredQuestion[0].AnswerId
    + "\nurl "+this.URL+
    "\nPOSTSAVEANSWEREDQUESTIONURL "+this.POSTSAVEANSWEREDQUESTIONURL 
    +"\n QuestionBack "+params.QuestionBack
    +"\n QuestionId "+params.QuestionId+
    "\n SectionId "+params.SectionId+
    "\n UserId "+params.UserId
    +"\nheaders "+HEADERS
    +"\ntoken "+token);
    return this.http.post<ReturnServiceModel>(`${this.URL}${this.POSTSAVEANSWEREDQUESTIONURL}`, params, HEADERS)
                    .pipe(catchError(
                      this.handleError('POSTSAVEANSWEREDQUESTIONURL', null)));
  }

  public finishSurvey(params: FinishSurveyParams): Observable<ReturnServiceModel> {
    const token = this.authService.userToken;
    const HEADERS = this._getHeaders(token);
    return this.http.post<ReturnServiceModel>(`${this.URL}${this.POSTFINISHSURVEYURL}`, params, HEADERS)
                    .pipe(catchError(
                      this.handleError('POSTFINISHSURVEYURL', null)));
  }

  public getSurveyDetailsByUserId(UserId: number): Observable<ReturnServiceModel> {
    const params = `?UserId=${UserId}`;
    const token = this.authService.userToken;
    const HEADERS = this._getHeaders(token);
    return this.http.get<ReturnServiceModel>(`${this.URL}${this.GETSURVEYDETAILSBYUSERIDURL}${params}`, HEADERS)
      .pipe(catchError(this.handleError('GETSURVEYDETAILSBYUSERIDURL', null)));
  }

  public GetIdPreviousQuestion(QuestionId: string, UserId: number): Observable<ReturnServiceModel> {
    const params = `?QuestionId=${QuestionId}&UserId=${UserId}`;
    const token = this.authService.userToken;
    const HEADERS = this._getHeaders(token);
    return this.http.get<ReturnServiceModel>(`${this.URL}${this.GETITPREVIOUSQUESTION}${params}`, HEADERS).pipe(catchError(this.handleError('GETITPREVIOUSQUESTION', null)));
  }
}
