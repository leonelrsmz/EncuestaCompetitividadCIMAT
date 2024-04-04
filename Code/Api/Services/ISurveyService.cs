using Foundation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface ISurveyService
    {
        Task<ReturnService> SaveSurvey(SurveyInsParams model);
        Task<ReturnService> SaveAnsweredQuestion(SaveAnsweredQuestionParams model);
        Task<ReturnService> FinishSurvey(FinishSurveyParams model);
        Task<ReturnService> SurveyDetailsByUserId(SurveyDetailByUserIdParams model);
    }
}
