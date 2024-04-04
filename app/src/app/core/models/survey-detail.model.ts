export class SurveyDetailModel {
    surveyDetailId: number;
    surveyId: number;
    sectionId: string;
    questionId: string;
    answerId: string;
    answerText: string;
    questionBack: string;
    isFinished: boolean;
}

export class SurveyDetailByUserIdParams {
    UserId: number;
}

export class SurveyDetailByUserIdModel {
    SurveyDetailId: number;
    SurveyId: number;
    SectionId: string;
    QuestionId: string;
    AnswerId: string;
    AnswerText: string;
    QuestionBack: string;
    UserId: number;
    UpdateAt: string;
    Date: string;
    IsFinished: boolean;
}
