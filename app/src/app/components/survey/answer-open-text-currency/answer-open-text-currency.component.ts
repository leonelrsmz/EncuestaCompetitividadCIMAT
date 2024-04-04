import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-open-text-currency',
  templateUrl: './answer-open-text-currency.component.html',
  styleUrls: ['./answer-open-text-currency.component.css']
})
export class AnswerOpenTextCurrencyComponent implements OnInit {
  @Input() CurrentQuesionFull: SendShowAnswerModel;

  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  formOpenCur: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Answered: SurveyDetailModel[];

  constructor(private fBuilder: FormBuilder) {
    this.formOpenCur = this.fBuilder.group({
      answerNum1: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.IsNext = this.CurrentQuesionFull.IsNext;
    this.Answered = this.CurrentQuesionFull.currentQuesionFull.answered;
    if (this.Answered.length === 0)
    {
      const item: SurveyDetailModel = new SurveyDetailModel();
      this.Answered.push(item);
    }
  }

  submitAnswerTxtCurNext() {
    if (this.formOpenCur.invalid) {
      return Object.values( this.formOpenCur.controls ).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }else{
      this.CurrentQuesionFull.currentQuesionFull.answered = this.Answered;
      this.valueResponse.emit(this.CurrentQuesionFull.currentQuesionFull);
    }
  }

  get invalidTxt1() {
    return this.formOpenCur.get('answerNum1').invalid && this.formOpenCur.get('answerNum1').touched;   
  }
}
