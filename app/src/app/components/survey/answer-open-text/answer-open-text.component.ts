import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-open-text',
  templateUrl: './answer-open-text.component.html',
  styleUrls: ['./answer-open-text.component.css']
})
export class AnswerOpenTextComponent implements OnInit {
  @Input() CurrentQuesionFull: SendShowAnswerModel;

  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  formOpenTxt: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Answered: SurveyDetailModel[];

  constructor(private fBuilder: FormBuilder) {
    this.formOpenTxt = this.fBuilder.group({
      answerTxt1: ['', [Validators.required]]
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

  submitAnswerTxtNext() {
    if (this.formOpenTxt.invalid) {
      return Object.values( this.formOpenTxt.controls ).forEach( control => {
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
    //validación de email
    return this.formOpenTxt.get('answerTxt1').invalid && this.formOpenTxt.get('answerTxt1').touched;
  }

  backToQuestion(){
    let QFRM : QuestionFullResultModel;
    QFRM = this.CurrentQuesionFull.currentQuesionFull;
    QFRM.IsBackQuestion = true;
    this.valueResponse.emit(QFRM);
  }
}
