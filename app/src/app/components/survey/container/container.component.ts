import { Component, OnInit } from '@angular/core';
import { AnswerModel } from 'src/app/core/models/answer.model';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { QuestionModel } from 'src/app/core/models/question.model';
import { ReturnServiceModel } from 'src/app/core/models/return-service.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';
import { SurveyService } from 'src/app/core/services/survey.service';
import { QuestionBackNextModel } from 'src/app/core/models/question-nextback.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SaveAnsweredQuestionParamsModel, AnsweredModel } from 'src/app/core/models/save-answered-question-params.model';
import { FinishSurveyParams } from 'src/app/core/models/finish-survey-params.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  userId: number;
  Id: number;
  SectionId: string;

  currentQuesionFull: QuestionFullResultModel;
  currentQuesion: QuestionModel;
  currentAnswers: AnswerModel[];
  currentAnswered: SurveyDetailModel[];
  IsBack: boolean;
  IsNext: boolean;
  sendShowAnswerModel: SendShowAnswerModel;
  toBack: string;
  ToFinish: boolean;
  IsFinish: boolean;
  FinishedText: boolean;

  constructor(private surveyService: SurveyService) {
    this.loading = true;
    this.error = false;
    this.Id = 0;
    this.SectionId = '1';
    this.sendShowAnswerModel = new SendShowAnswerModel();
    if (localStorage.getItem('userId')) {
      this.userId = +localStorage.getItem('userId');
    } else {
      this.userId = 0;
    }
    this.ToFinish = false;
    this.IsFinish = false;
    this.FinishedText = false;
   }

  ngOnInit() {
      this.nextQuestion();
  }

  async nextQuestion() {
    this.loading = true;
    this.error = false;

    let toNext = false;
    console.log("nextQuestion this.Id, "+this.Id,);
    do {
      let data1: ReturnServiceModel;
      let questionBackNextModel: QuestionBackNextModel;
      //Get Question Next by Id
      data1 = await this.surveyService.getQuestionNext(this.Id, this.userId).toPromise();
      if (data1) {
        const statusCode = data1.statusCode;
        if (statusCode === 200) {
          questionBackNextModel = data1.data;
          if (questionBackNextModel.exist) {
            this.IsNext = questionBackNextModel.exist;
            this.sendShowAnswerModel.IsNext = this.IsNext;
            if (this.Id > 0) {
              this.toBack = this.currentQuesion.questionId;
            }
            this.Id = questionBackNextModel.id;
            this.SectionId = questionBackNextModel.sectionId;
          }
        }
      }

      if (this.IsNext) {
        let data: ReturnServiceModel;
        data = await this.surveyService.getQuestionById(this.Id, this.SectionId, this.userId).toPromise();
        if (data) {
          const statusCode = data.statusCode;
          if (statusCode === 200) {
            this.isNext();
            this.currentQuesionFull = data.data;
            this.currentQuesion = this.currentQuesionFull.question;
            this.currentAnswers = this.currentQuesionFull.answers;
            this.currentAnswered = this.currentQuesionFull.answered;
            this.sendShowAnswerModel.currentQuesionFull = this.currentQuesionFull;
            // chech question is finished
            if (this.currentAnswered.length > 0) {
              if (this.currentAnswered[0].isFinished) {
                this.FinishedText = true;
                this.IsFinish = true;
              }
            }
          } else {
            this.loading = false;
            this.error = true;
            this.errorMessage = data.errorMessage;
          }
        }
      }
      // chech question is answered
      toNext = false;
      if (this.currentAnswered.length > 0 && this.IsNext) {
        toNext = true;
      }
    } while (toNext);
    
    this.loading = false;
  }


  submit() {
    this.nextQuestion();
  }

  async outputResponse(response: QuestionFullResultModel) {
/*
      this.currentQuesionFull = response;
      response.IsBackQuestion = false;
      this.Id = response.question.id;

      if(response.IsBackQuestion){
        console.log("outputResponse IsBackQuestion "+response.IsBackQuestion);
        this.backQuestion(response.question.id);
      }else
      {*/
        const answer: SaveAnsweredQuestionParamsModel = new SaveAnsweredQuestionParamsModel();
        answer.UserId = this.userId;
        answer.SectionId = `${this.currentQuesionFull.question.sectionId}`;
        answer.QuestionId = `${this.currentQuesionFull.question.questionId}`;
        answer.SaveAnsweredQuestion = [];
        this.currentQuesionFull.answered.forEach(async x => {
          const answered = new AnsweredModel();
          answered.AnswerId = x.answerId;
          answered.AnswerText = `${x.answerText}`;
          answer.SaveAnsweredQuestion.push(answered);
        });
        answer.QuestionBack = `${this.toBack}`;
        this.saveAnswer(answer);
  //    }
   }

   async isNext() {
    let data1: ReturnServiceModel;
    let questionBackNextModel: QuestionBackNextModel;
    data1 = await this.surveyService.getQuestionNext(this.Id, this.userId).toPromise();
    if (data1) {
      const statusCode = data1.statusCode;
      if (statusCode === 200) {
        questionBackNextModel = data1.data;
        this.IsNext = questionBackNextModel.exist;
        this.sendShowAnswerModel.IsNext = this.IsNext;
        this.ToFinish = !this.IsNext;
      }
    }
   }

   async saveAnswer(answer: SaveAnsweredQuestionParamsModel) {
    this.loading = true;
    this.error = false;

    let data: ReturnServiceModel;
    data = await this.surveyService.saveAnsweredQuestion(answer).toPromise();
    if (data) {
      this.loading = false;
      this.error = true;
      const statusCode = data.statusCode;
      if (statusCode === 200) {
        this.nextQuestion();
      } else {
        this.errorMessage = data.errorMessage;
      }
    }
    if (this.ToFinish) {
      this.IsFinish = this.ToFinish;
    }
   }

   async submitFinish() {
    this.loading = true;
    this.error = false;

    const finishSurveyParams = new FinishSurveyParams();
    finishSurveyParams.UserId = this.userId;

    let data: ReturnServiceModel;
    data = await this.surveyService.finishSurvey(finishSurveyParams).toPromise();
    if (data) {
      this.loading = false;
      const statusCode = data.statusCode;
      if (statusCode === 200) {
        this.FinishedText = true;
      } else {
        this.errorMessage = data.errorMessage;
        this.loading = false;
        this.error = true;
      }
    }
   }

   async backQuestion(idQuestion:number){    
      let questionSearched = idQuestion-1;    
      console.log("questionSearched "+questionSearched+"\n this.id "+this.Id);

      this.loading = true;
      this.error = false;
  
      let toNext = false;

      let data1: ReturnServiceModel;
      let questionBackNextModel: QuestionBackNextModel;
      data1 = await this.surveyService.getQuestionNext(questionSearched, this.userId).toPromise();
      if (data1) {
        const statusCode = data1.statusCode;
        if (statusCode === 200) {
          questionBackNextModel = data1.data;
          this.IsNext = questionBackNextModel.exist;
          this.sendShowAnswerModel.IsNext = this.IsNext;
          this.ToFinish = !this.IsNext;
          console.log("getQuestionNext questionBackNextModel.sectionId "+questionBackNextModel.sectionId+
          "\n questionBackNextModel.id " + questionBackNextModel.id);
        }
      }

      let data: ReturnServiceModel;
        data = await this.surveyService.getQuestionById(questionSearched, questionBackNextModel.sectionId, this.userId).toPromise();
        if (data) {
          const statusCode = data.statusCode;
          if (statusCode === 200) {
            this.isNext();
            this.currentQuesionFull = data.data;
            this.currentQuesion = this.currentQuesionFull.question;
            this.currentAnswers = this.currentQuesionFull.answers;
            this.currentAnswered = this.currentQuesionFull.answered;
            this.sendShowAnswerModel.currentQuesionFull = this.currentQuesionFull;
            // chech question is finished
            if (this.currentAnswered.length > 0) {
              if (this.currentAnswered[0].isFinished) {
                this.FinishedText = true;
                this.IsFinish = true;
              }
            }
          } else {
            this.loading = false;
            this.error = true;
            this.errorMessage = data.errorMessage;
          }
          this.loading = false;
        }
      }
}
