using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Foundation.Models
{
    public class QuestionGetByIdParams
    {
        public int Id { get; set; }
        public string SectionId { get; set; }
        public int UserId { get; set; }
    }
}
