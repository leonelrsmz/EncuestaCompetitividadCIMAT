import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-open-text-year',
  templateUrl: './answer-open-text-year.component.html',
  styleUrls: ['./answer-open-text-year.component.css']
})
export class AnswerOpenTextYearComponent implements OnInit {
  @Input() CurrentQuesionFull: SendShowAnswerModel;

  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  formOpenYear: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Answered: SurveyDetailModel[];
  Year: number;

  constructor(private fBuilder: FormBuilder) {
    const d = new Date();
    this.Year = d.getUTCFullYear();
    this.formOpenYear = this.fBuilder.group({
      // tslint:disable-next-line: max-line-length
      answerNum1: ['', [Validators.required, Validators.min(1800), Validators.max(this.Year), Validators.minLength(4), Validators.maxLength(4)]]
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

  submitAnswerTxtYearNext() {
    if (this.formOpenYear.invalid) {
      return Object.values( this.formOpenYear.controls ).forEach( control => {
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
    return this.formOpenYear.get('answerNum1').invalid && this.formOpenYear.get('answerNum1').touched;
  }
}
