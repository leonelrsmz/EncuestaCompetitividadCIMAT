using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation.Models
{
    public class QuestionModel
    {
        public int Id { get; set; }
        public string QuestionId { get; set; }
        public string SectionId { get; set; }
        public string Section { get; set; }
        public int QuestionTypeId { get; set; }
        public string QuestionType { get; set; }
        public string Decription { get; set; }
        public string Indications { get; set; }
        public int ExpectedQuantityAnswers { get; set; }
        public bool Expected100pc { get; set; }
        public bool ExpectedNumber { get; set; }
        public bool ExpectedCurrency { get; set; }
        public bool ExpectedYear { get; set; }
    }
}
