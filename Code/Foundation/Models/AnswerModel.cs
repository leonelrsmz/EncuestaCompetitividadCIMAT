using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation.Models
{
    public class AnswerModel
    {
        public int Id { get; set; }
        public string AnswerId { get; set; }
        public string SectionId { get; set; }
        public string QuestionId { get; set; }
        public string Answer { get; set; }
        public bool ExpectedText { get; set; }
        public string JumpToQuestion { get; set; }
    }
}
