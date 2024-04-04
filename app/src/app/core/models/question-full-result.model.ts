import { AnswerModel } from './answer.model';
import { QuestionModel } from './question.model';
import { SurveyDetailModel } from './survey-detail.model';

export class QuestionFullResultModel {
    question: QuestionModel;
    answers: AnswerModel[];
    answered: SurveyDetailModel[];
        //indica si es un regreso
        IsBackQuestion: boolean;
}
