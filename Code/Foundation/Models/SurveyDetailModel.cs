using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation.Models
{
    public class SurveyDetailModel
    {
        public long SurveyDetailId { get; set; }
        public long SurveyId { get; set; }
        public string SectionId { get; set; }
        public string QuestionId { get; set; }
        public int AnswerId { get; set; }
        public string AnswerText { get; set; }
        public string QuestionBack { get; set; }
        public bool IsFinished { get; set; }
    }

    public class SurveyDetailByUserIdParams
    {
        public int UserId { get; set; }
    }

    public class SurveyDetailByUserIdModel
    {
        public long SurveyDetailId { get; set; }
        public long SurveyId { get; set; }
        public string SectionId { get; set; }
        public string QuestionId { get; set; }
        public string Question { get; set; }
        public string AnswerId { get; set; }
        public string Answer { get; set; }
        public string AnswerText { get; set; }
        public string QuestionBack { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public DateTime UpdateAt { get; set; }
        public bool IsFinished { get; set; }
    }
}
