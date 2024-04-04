using Foundation.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Api.Services.Imp
{
    public class QuestionService : BaseService, IQuestionService
    {
        public QuestionService(IConfiguration configuration)
        {
            _configurationBase = configuration;
        }

        public async Task<ReturnService> GetIdQuestionByQuestionId(QuestionGetByQuetionIdParams model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<QuestionGetByQuetionIdModel>("sp_GetIdQuestionByQuestionId", model);
                response.data = result;
                response.statusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.errorMessage = ex.Message;
            }
            return response;
        }

        public async Task<ReturnService> GetQuestionById(QuestionGetByIdParams model)
        {
            var response = new ReturnService();
            QuestionFullResult questionFullResult = new QuestionFullResult();
            try
            {
                var dataReader = await GetDataReaderFromStoreProcedure("sp_GetQuestionById", model);

                await dataReader.ReadAsync();
                var Question = GetItemFromDataReaderOfType<QuestionModel>(dataReader);
                await dataReader.NextResultAsync();
                var Answers = GetListFromDataReaderOfType<AnswerModel>(dataReader);
                await dataReader.NextResultAsync();
                var Answered = GetListFromDataReaderOfType<SurveyDetailModel>(dataReader);

                questionFullResult.Question = Question;
                questionFullResult.Answers = Answers.Result;
                questionFullResult.Answered = Answered.Result;

                response.data = questionFullResult;
                response.statusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.errorMessage = ex.Message;
            }
            return response;
        }

        public async Task<ReturnService> QuestionBack(QuestionBackNextParams model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<QuestionBackNextModel>("sp_GetIdQuestionBack", model);
                response.data = result;
                response.statusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.errorMessage = ex.Message;
            }
            return response;
        }

        public async Task<ReturnService> QuestionNext(QuestionBackNextParams model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<QuestionBackNextModel>("sp_GetIdQuestionNext", model);
                response.data = result;
                response.statusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.errorMessage = ex.Message;
            }
            return response;
        }

        public async Task<ReturnService> GetIdPreviousQuestion(PreviousQuestionGetParams model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<QuestionGetByQuetionIdModel>("sp_GetIdPreviuosQuestion", model);
                response.data = result;
                response.statusCode = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.errorMessage = ex.Message;
            }
            return response;
        }
    }
}
