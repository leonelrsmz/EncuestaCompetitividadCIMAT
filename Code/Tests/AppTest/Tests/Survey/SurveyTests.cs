using Api.Services.Imp;
using AppTest.Tests.Base;
using Foundation.Models;
using Xunit;

namespace AppTest.Tests.Surey
{
    public class SurveyTests : BaseUnitTests
    {
        [Fact]
        public void InsertNotNullTest()
        {
            SurveyInsParams model = new SurveyInsParams
            {
                UserId = 1
            };

            SurveyService service = new SurveyService(_configuration);

            ReturnService response = service.SaveSurvey(model).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void SaveAnsweredQuestionNotNullTest()
        {
            SaveAnsweredQuestion[] SaveAnsweredQuestionArr = new SaveAnsweredQuestion[1];
            SaveAnsweredQuestion SaveAnsweredQuestion = new SaveAnsweredQuestion
            {
                Id = 1,
                AnswerId = "0",
                AnswerText = "test007"
            };
            SaveAnsweredQuestionArr.SetValue(SaveAnsweredQuestion, 0);
            SaveAnsweredQuestionParams model = new SaveAnsweredQuestionParams
            {
                UserId = 1,
                SectionId = "1",
                QuestionId = "1.13",
                SaveAnsweredQuestion = SaveAnsweredQuestionArr,
                QuestionBack = null
            };

            SurveyService service = new SurveyService(_configuration);

            ReturnService response = service.SaveAnsweredQuestion(model).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void FinishSurveyNotNullTest()
        {
            FinishSurveyParams model = new FinishSurveyParams
            {
                UserId = 1
            };

            SurveyService service = new SurveyService(_configuration);

            ReturnService response = service.FinishSurvey(model).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void SurveyDetailsByUserIdNotNullTest()
        {
            SurveyDetailByUserIdParams model = new SurveyDetailByUserIdParams
            {
                UserId = 15
            };

            SurveyService service = new SurveyService(_configuration);

            ReturnService response = service.SurveyDetailsByUserId(model).Result;
            Assert.NotNull(response.data);
        }
    }
}
