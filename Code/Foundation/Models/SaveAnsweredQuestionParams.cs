using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation.Models
{
    public class SaveAnsweredQuestionParams
    {
        public int UserId { get; set; }
        public string SectionId { get; set; }
        public string QuestionId { get; set; }
        //public int AnswerId { get; set; }
        //public string AnswerText { get; set; }
        public SaveAnsweredQuestion[] SaveAnsweredQuestion { get; set; }
        public string QuestionBack { get; set; }
    }

    public class SaveAnsweredQuestion
    {
        public int Id { get; set; }
        public string AnswerId { get; set; }
        public string AnswerText { get; set; }
    }
}
