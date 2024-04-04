export class SaveAnsweredQuestionParamsModel {
    UserId: number;
    SectionId: string;
    QuestionId: string;
    SaveAnsweredQuestion: AnsweredModel[];
    QuestionBack: string;
}
export class AnsweredModel {
    AnswerId: string;
    AnswerText: string;
}
// export class SaveAnsweredQuestionTmp {
//     UserId: number;
//     SectionId: string;
//     QuestionId: string;
//     AnswerId: number;
//     AnswerText: string;
//     QuestionBack: string;
// }
