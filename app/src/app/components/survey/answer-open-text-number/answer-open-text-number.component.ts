import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-open-text-number',
  templateUrl: './answer-open-text-number.component.html',
  styleUrls: ['./answer-open-text-number.component.css']
})
export class AnswerOpenTextNumberComponent implements OnInit {
  @Input() CurrentQuesionFull: SendShowAnswerModel;
  @Input() previousAnswer_Id: string;
  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  @Input() previousAnswerId: string;
  formOpenNum: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Answered: SurveyDetailModel[];

  IsPreviousQuestion: boolean;
  PreviousAnwerId: number;
  answerId: string;

  constructor(private fBuilder: FormBuilder) {
    this.formOpenNum = this.fBuilder.group({
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

    this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId; //this.previousAnswerId;
    //this.IsPreviousQuestion = true;
    //this.PreviousAnwerId = 0;
    console.log("answerId en text open number"+this.answerId);
  }

  submitAnswerTxtNumNext() {
    if (this.formOpenNum.invalid) {
      return Object.values( this.formOpenNum.controls ).forEach( control => {
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
    return this.formOpenNum.get('answerNum1').invalid && this.formOpenNum.get('answerNum1').touched;   
  }
  backToQuestion(){
    console.log('regresar desde open text number');
    let QFRM : QuestionFullResultModel;
    QFRM = this.CurrentQuesionFull.currentQuesionFull;
    QFRM.question.id = 0;
    QFRM.answered = this.Answered;
    QFRM.answered[0].answerId = this.previousAnswer_Id;
    this.PreviousAnwerId =+ this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
    this.answerId = this.previousAnswer_Id;
    this.valueResponse.emit(QFRM);
    this.answerId = this.previousAnswer_Id;
  }
}
