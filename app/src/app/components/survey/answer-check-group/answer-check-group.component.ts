import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerModel } from 'src/app/core/models/answer.model';
import { QuestionFullResultModel } from 'src/app/core/models/question-full-result.model';
import { QuestionModel } from 'src/app/core/models/question.model';
import { SendShowAnswerModel } from 'src/app/core/models/send-show-answer.model';
import { SurveyDetailModel } from 'src/app/core/models/survey-detail.model';

@Component({
  selector: 'app-answer-check-group',
  templateUrl: './answer-check-group.component.html',
  styleUrls: ['./answer-check-group.component.css']
})
export class AnswerCheckGroupComponent implements OnInit {
  @Input() CurrentQuesionFull: SendShowAnswerModel;

  @Output() valueResponse: EventEmitter<QuestionFullResultModel> = new EventEmitter();

  formCheckBox: FormGroup;

  IsBack: boolean;
  IsNext: boolean;
  Quesion: QuestionModel;
  Answers: AnswerModel[];
  invalidCheck: boolean;
  Answered: SurveyDetailModel[];

  myModel: string;

  constructor(private fBuilder: FormBuilder) {
    this.formCheckBox = this.fBuilder.group({
      flexCheckChecked: []
    });
    this.invalidCheck = true;
  }

  ngOnInit(): void {
    this.IsNext = this.CurrentQuesionFull.IsNext;
    this.Quesion = this.CurrentQuesionFull.currentQuesionFull.question;
    this.Answers = this.CurrentQuesionFull.currentQuesionFull.answers;
    this.Answers?.forEach(element => {
      element.answerTxt = '';
      element.isChecked = false;
      element.isInvalid = false;
    });
    this.Answered = this.CurrentQuesionFull.currentQuesionFull.answered;

    this.myModel = '';
  }

  submitAnswerRadioGroupNext() {
    let isInvalidForm1 = false;
    let conutChecks = 0;
    this.Answers?.forEach(element => {
      if (element.isChecked) {
        conutChecks++;
        if (element.expectedText) {
          if (element.answerTxt.length < 1) {
            isInvalidForm1 = true;
          }
        }
      }
    });

    let isInvalidForm2 = false;
    if (this.Quesion.expectedQuantityAnswers > 0)
    {
      if (this.Quesion.expectedQuantityAnswers !== conutChecks) {
        isInvalidForm2 = true;
      }
    }

    if (!isInvalidForm1 && !isInvalidForm2) {
      this.Answered = [];
      if (this.Answered.length === 0)
      {
        // tslint:disable-next-line: no-shadowed-variable
        for (let i = 0; i < conutChecks; i++)
        {
          const item: SurveyDetailModel = new SurveyDetailModel();
          this.Answered.push(item);
        }
      }
      let i = 0;
      this.Answers?.forEach(element => {
        if (element.isChecked)
        {
          this.Answered[i].answerId = element.answerId;
          if (element.answerTxt !== '')
          {
            this.Answered[i].answerText = element.answerTxt;
          }
          i++;
        }
      });

      this.CurrentQuesionFull.currentQuesionFull.answered = this.Answered;
      this.valueResponse.emit(this.CurrentQuesionFull.currentQuesionFull);
    }
  }

  InvalidAnswered() {
  }

  modelChanged(newObj, Answer) {
    // do something with new value
    Answer.answerTxt = newObj.currentTarget.value;
    Answer.isInvalid = (Answer.answerTxt.length < 1);
  }

  checkChanged(newObj) {
    // do something with new value
    this.invalidCheck = true;
    let conutChecks = 0;
    this.Answers?.forEach(element => {
      if (element.isChecked) {
        this.invalidCheck = false;
        conutChecks++;
        if (element.expectedText) {
          element.isInvalid = (element.answerTxt.length < 1);
        }
      }
      else {
        if (element.expectedText) {
          element.isInvalid = false;
        }
      }

      if (this.Quesion.expectedQuantityAnswers > 0)
      {
        if (this.Quesion.expectedQuantityAnswers !== conutChecks) {
          this.invalidCheck = true;
        }/*
        if (this.Quesion.id == 169 && conutChecks>1){
          this.invalidCheck = false;
        }*/
      }
    });
  }
}
