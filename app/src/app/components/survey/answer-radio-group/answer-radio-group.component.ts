import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AnswerModel } from 'src/app/core/models/answer.model';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-radio-group',
  templateUrl: './answer-radio-group.component.html',
  styleUrls: ['./answer-radio-group.component.css']
})
export class AnswerRadioGroupComponent implements OnInit, OnChanges {
  @Input() CurrentQuesionFull: SendShowAnswerModel;
  @Input() previousAnswer_Id: string;
  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  formRadioBtn: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Answers: AnswerModel[];
  Answered: SurveyDetailModel[];
  answerId: string;
  AnswerText: string;
  InvalidTxt: boolean;

  IsPreviousQuestion: boolean;
  PreviousAnwerId: number;

  constructor(private fBuilder: FormBuilder) {
    this.formRadioBtn = this.fBuilder.group({
      flexRadioDefault: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
    console.log("ngOnChanges  answerId "+this.answerId);
  }

  ngOnInit(): void {
    this.IsNext = this.CurrentQuesionFull.IsNext;
    this.Answers = this.CurrentQuesionFull.currentQuesionFull.answers;
    this.Answered = this.CurrentQuesionFull.currentQuesionFull.answered;
    if (this.Answered.length === 0)
    {
      const item: SurveyDetailModel = new SurveyDetailModel();
      this.Answered.push(item);
    }
    this.AnswerText = '';
    this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId; //this.previousAnswerId;
    //console.log("ng oninit this.answerId : "+this.answerId);
    this.IsPreviousQuestion = true;
    this.PreviousAnwerId = 0;
    console.log("ngOnInit");
  }

  submitAnswerRadioGroupNext() {
      if (this.formRadioBtn.invalid) {
        return Object.values( this.formRadioBtn.controls ).forEach( control => {
          if (control instanceof FormGroup) {
            Object.values( control.controls ).forEach( control2 => control2.markAsTouched() );
          } else {
            control.markAsTouched();
          }
        });
      }else{
        const expectedText = this.getIdExpectedText();
        if (this.answerId === expectedText && (this.AnswerText === undefined || this.AnswerText === ''))
        {
          this.InvalidTxt = true;
        } else {
          this.InvalidTxt = false;
          this.Answered[0].answerId = this.answerId;
          this.Answers?.forEach(element => {
            if (this.answerId === element.answerId && element.expectedText) {
              this.Answered[0].answerText = this.AnswerText;
            }
          });

          this.CurrentQuesionFull.currentQuesionFull.answered = this.Answered;
          this.valueResponse.emit(this.CurrentQuesionFull.currentQuesionFull);
        }
      }
  }

  get invalidRadio() {
    const invalid = this.formRadioBtn.get('flexRadioDefault').invalid && this.formRadioBtn.get('flexRadioDefault').touched;
    return invalid;
  }

  validatOpcTxt(control: FormControl): {[s: string]: boolean}{
    if (control.value === '')
    {
      return { required: true };
    }
    return null;
  }

  getIdExpectedText(): string
  {
      let elementResponse = '0';
      this.Answers?.forEach(element => {
        if (element.expectedText) {
          elementResponse = element.answerId;
        }
      });

      return elementResponse;
  }

  modelChanged(newObj) {
    // do something with new value
    this.AnswerText = newObj.currentTarget.value;
    const expectedText = this.getIdExpectedText();
    this.InvalidTxt = (this.answerId === expectedText && this.AnswerText.length > 0) ? false : true;
  }

  backToQuestion(){
    let QFRM : QuestionFullResultModel;
    QFRM = this.CurrentQuesionFull.currentQuesionFull;
    QFRM.question.id = 0;
    QFRM.answered[0].answerId = this.previousAnswer_Id;
    //this.answerId = this.previousAnswerId;   
    //this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
        //console.log("this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId: "+this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId);
    this.PreviousAnwerId =+ this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
        //console.log("this.PreviousAnwerId : "+this.PreviousAnwerId);

    this.answerId = this.previousAnswer_Id;
    //console.log ("this.answerId antes: "+this.answerId);

    this.valueResponse.emit(QFRM);
    //this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
    this.answerId = this.previousAnswer_Id;
    //console.log ("this.answerId despues: "+this.answerId);
  }
}
