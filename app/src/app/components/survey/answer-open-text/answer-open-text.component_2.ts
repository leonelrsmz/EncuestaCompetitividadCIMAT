import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { window } from 'rxjs/operators';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-open-text',
  templateUrl: './answer-open-text.component.html',
  styleUrls: ['./answer-open-text.component.css']
})
export class AnswerOpenTextComponent implements OnInit, OnChanges {
  @Input() CurrentQuesionFull: SendShowAnswerModel;
  @Input() ExistPreviousQuestion: boolean;
  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();
  @Input() previousAnswer_Id: string;
  formOpenTxt: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Answered: SurveyDetailModel[];

  answerId: string;
  PreviousAnwerId: number;

  constructor(private fBuilder: FormBuilder) {
    this.formOpenTxt = this.fBuilder.group({
      answerTxt1: ['', [Validators.required]]
    });
    
    //this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Answered = this.CurrentQuesionFull.currentQuesionFull.answered;
    console.log("ngOnChanges  this.Answered[0].text "+this.Answered[0].answerText);
  }

  refresh(){
    //this.Answered = this.CurrentQuesionFull.currentQuesionFull.answered;
    //console.log("refresh  this.Answered[0].text "+this.Answered[0].answerText);
  }

  ngOnInit(): void {
    this.IsNext = this.CurrentQuesionFull.IsNext;
    this.Answered = this.CurrentQuesionFull.currentQuesionFull.answered;
    console.log("this.Answered.length ",this.Answered.length)
    if (this.Answered.length === 0)
    {
      const item: SurveyDetailModel = new SurveyDetailModel();
      this.Answered.push(item);
    }else{
      console.log("this.Answered[0].text ",this.Answered[0].answerText)
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
      this.CurrentQuesionFull.currentQuesionFull.IsBackQuestion = false;
      this.valueResponse.emit(this.CurrentQuesionFull.currentQuesionFull);
    }
  }

  get invalidTxt1() {
    return this.formOpenTxt.get('answerTxt1').invalid && this.formOpenTxt.get('answerTxt1').touched;
  }

  backToQuestion(){
    let QFRM : QuestionFullResultModel;
    QFRM = this.CurrentQuesionFull.currentQuesionFull;
    QFRM.question.id = 0;
    QFRM.answered = this.Answered;
    this.Answered[0].answerText = '';
    QFRM.IsBackQuestion = true;
    this.valueResponse.emit(QFRM);
  }
}
