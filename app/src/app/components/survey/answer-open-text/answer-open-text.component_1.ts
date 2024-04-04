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
  @Input() previousAnswer_Id: string;
  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  @Input() previousAnswerId: string;
  @Input() ExistPreviousQuestion: boolean;
  //recibe el id de la pregunta anterior, cuando se hizo click en el boton regresar

  formOpenTxt: FormGroup;
  
  IsBack: boolean;
  IsNext: boolean;
  Answered: SurveyDetailModel[];

  answerId: string;
  PreviousAnwerId: number;
  IsPreviousQuestion: boolean;

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
    }else{
        if ( this.Answered[0].answerText.length > 0)
        {
          console.log("ngOnInit open text answer "+this.Answered[0].answerText);
        }  
    }
    //this.AnswerText = '';
    this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId; //this.previousAnswerId;
    //console.log("ng oninit this.answerId : "+this.answerId);
    this.IsPreviousQuestion = true;
    this.PreviousAnwerId = 0;
    console.log("ngOnInit ExistPreviousQuestion "+this.ExistPreviousQuestion+
        "this.Answered[0].answerText "+this.Answered[0].answerText);/*
      "previousAnswer_Id "+this.previousAnswer_Id+" previousAnswerId "+this.previousAnswerId);*/
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
      console.log("guardar respuesta open text");
    }
  }

  get invalidTxt1() {
    return this.formOpenTxt.get('answerTxt1').invalid && this.formOpenTxt.get('answerTxt1').touched;
  }
  /*
  backToQuestion(){
    let QFRM : QuestionFullResultModel;
    this.valueResponse.emit(QFRM);    
  }*/
  backToQuestion(){
    let QFRM : QuestionFullResultModel;
    QFRM = this.CurrentQuesionFull.currentQuesionFull;
    QFRM.question.id = 0;
    //QFRM.answered[0].answerId = this.previousAnswer_Id;
    QFRM.answered = this.Answered;
    QFRM.answered[0].answerId = this.previousAnswer_Id;
    //this.answerId = this.previousAnswerId;   
    //this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
        //console.log("this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId: "+this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId);
    this.PreviousAnwerId =+ this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
        //console.log("this.PreviousAnwerId : "+this.PreviousAnwerId);
        this.Answered[0].answerText = '';
    this.answerId = this.previousAnswer_Id;
    //console.log ("this.answerId antes: "+this.answerId);

    this.valueResponse.emit(QFRM);
    //this.answerId = this.CurrentQuesionFull.currentQuesionFull.answered[0].answerId;
    this.answerId = this.previousAnswer_Id;
    //console.log ("this.answerId despues: "+this.answerId);
  }
}

