export class QuestionPreviousModel {
    id: number;
    questionId: string;
    sectionId: string;
    section: string;
    questionTypeId: number;
    questionType: string;
    decription: string;
    indications: string;
    expectedQuantityAnswers: number;
    expected100pc: boolean;
    expectedNumber: boolean;
    expectedCurrency: boolean;
    expectedYear: boolean;
}