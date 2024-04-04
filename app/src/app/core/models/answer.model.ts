export class AnswerModel {
    id: number;
    answerId: string;
    sectionId: string;
    questionId: string;
    answer: string;
    expectedText: boolean;
    jumpToQuestion: string;
    isInvalid: boolean;
    isChecked: boolean;
    answerTxt: string;
}
