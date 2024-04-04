import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnswerModel } from 'src/app/core/models/answer.model';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-open-text-onehundredpc',
  templateUrl: './answer-open-text-onehundredpc.component.html',
  styleUrls: ['./answer-open-text-onehundredpc.component.css']
})
export class AnswerOpenTextOnehundredpcComponent implements OnInit {
  @Input() CurrentQuesionFull: SendShowAnswerModel;

  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  formOpenOneHPC: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Answers: AnswerModel[];
  sum: number;
  isInvalid: boolean;
  Answered: SurveyDetailModel[];

  constructor(private fBuilder: FormBuilder) {
    this.formOpenOneHPC = this.fBuilder.group({
      answerNum1: ['', [Validators.min(0), Validators.min(100)]]
    });
    this.sum = 0;
  }

  ngOnInit(): void {
    this.IsNext = this.CurrentQuesionFull.IsNext;
    this.Answers = this.CurrentQuesionFull.currentQuesionFull.answers;
    this.Answers?.forEach(element => {
      element.answerTxt = '';
      element.isInvalid = true;
    });
    this.Answered = this.CurrentQuesionFull.currentQuesionFull.answered;
  }

  submitAnswerTxtNext() {
    if (!this.InvalidAnswered()) {
      this.Answered = [];
      if (this.Answered.length === 0)
      {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.Answers.length; i++)
        {
          const item: SurveyDetailModel = new SurveyDetailModel();
          this.Answered.push(item);
        }
      }
      let i = 0;
      this.Answers?.forEach(element => {
          this.Answered[i].answerText = element.answerTxt;
          i++;
      });

      this.CurrentQuesionFull.currentQuesionFull.answered = this.Answered;
      this.valueResponse.emit(this.CurrentQuesionFull.currentQuesionFull);
    }
  }

  InvalidAnswered() {
    let isInvalid = true;
    let sum = 0;
    this.Answers?.forEach(element => {
      if (element.answerTxt === '' || +element.answerTxt < 0 || +element.answerTxt > 100) {
        element.isInvalid = true;
        isInvalid = true;
        return isInvalid;
      }
      else {
        element.isInvalid = false;
      }
      sum += +element.answerTxt;
      this.sum = sum;
    });
    isInvalid = (sum !== 100);
    if (isInvalid) {
      this.Answers?.forEach(element => {
        element.isInvalid = true;
      });
    }
    this.isInvalid = isInvalid;
    return isInvalid;
  }

  modelChanged(newObj) {
    // do something with new value
    this.InvalidAnswered();
  }
}
