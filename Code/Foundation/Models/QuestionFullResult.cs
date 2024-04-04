using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation.Models
{
    public class QuestionFullResult
    {
        public QuestionModel Question { get; set; }
        public List<AnswerModel> Answers { get; set; }
        public List<SurveyDetailModel> Answered { get; set; }
    }
}
