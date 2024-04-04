using Api.Services.Imp;
using AppTest.Tests.Base;
using Foundation.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace AppTest.Tests.Question
{
    public class QuetionTests : BaseUnitTests
    {
        [Fact]
        public void GetIdQuestionByQuestionIdNotNullTest()
        {
            QuestionGetByQuetionIdParams model = new QuestionGetByQuetionIdParams
            {
                QuestionId = "2.1"
            };

            QuestionService service = new QuestionService(_configuration);

            ReturnService response = service.GetIdQuestionByQuestionId(model).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void GetQuestionByIdNotNullTest()
        {
            QuestionGetByIdParams model = new QuestionGetByIdParams
            {
                Id = 4,
                SectionId = "1",
                UserId = 1
            };

            QuestionService service = new QuestionService(_configuration);

            ReturnService response = service.GetQuestionById(model).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void GetQuestionBackNotNullTest()
        {
            QuestionBackNextParams model = new QuestionBackNextParams
            {
                Id = 2
            };

            QuestionService service = new QuestionService(_configuration);

            ReturnService response = service.QuestionBack(model).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void GetQuestionNextNotNullTest()
        {
            QuestionBackNextParams model = new QuestionBackNextParams
            {
                Id = 7
            };

            QuestionService service = new QuestionService(_configuration);

            ReturnService response = service.QuestionNext(model).Result;
            Assert.NotNull(response.data);
        }
    }
}
