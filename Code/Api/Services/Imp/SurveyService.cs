using Foundation.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Api.Services.Imp
{
    public class SurveyService : BaseService, ISurveyService
    {
        public SurveyService(IConfiguration configuration)
        {
            _configurationBase = configuration;
        }

        public async Task<ReturnService> SaveSurvey(SurveyInsParams model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<SaveModel>("sp_InsSurvey", model);
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

        public async Task<ReturnService> SaveAnsweredQuestion(SaveAnsweredQuestionParams model)
        {
            var response = new ReturnService();
            var result = new SaveModel();
            try
            {
                using (SqlConnection connectionDB = await Connect())
                {
                    var command = connectionDB.CreateCommand();
                    command.CommandText = "sp_SaveAnsweredQuestion";
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 0;

                    DbParameter parametroUserId = command.CreateParameter();
                    parametroUserId.ParameterName = "@UserId";
                    parametroUserId.Value = model.UserId;
                    command.Parameters.Add(parametroUserId);

                    DbParameter parametroSectionId = command.CreateParameter();
                    parametroSectionId.ParameterName = "@SectionId";
                    parametroSectionId.Value = model.SectionId;
                    command.Parameters.Add(parametroSectionId);

                    DbParameter parametroQuestionId = command.CreateParameter();
                    parametroQuestionId.ParameterName = "@QuestionId";
                    parametroQuestionId.Value = model.QuestionId;
                    command.Parameters.Add(parametroQuestionId);

                    DataTable tabSaveAnsweredQuestion = new DataTable();
                    tabSaveAnsweredQuestion.Columns.Add("Id", typeof(int));
                    tabSaveAnsweredQuestion.Columns.Add("AnswerId", typeof(int));
                    tabSaveAnsweredQuestion.Columns.Add("AnswerText", typeof(string));
                    int index = 1;
                    foreach (SaveAnsweredQuestion item in model.SaveAnsweredQuestion)
                    {
                        item.Id = index;
                        tabSaveAnsweredQuestion.Rows.Add(item.Id, item.AnswerId, item.AnswerText);
                        index++;
                    }
                    DbParameter parameterSaveAnsweredQuestion = command.CreateParameter();
                    parameterSaveAnsweredQuestion.ParameterName = "@SaveAnsweredQuestion";
                    parameterSaveAnsweredQuestion.Value = tabSaveAnsweredQuestion;
                    command.Parameters.Add(parameterSaveAnsweredQuestion);

                    DbParameter parametroQuestionBack = command.CreateParameter();
                    parametroQuestionBack.ParameterName = "@QuestionBack";
                    parametroQuestionBack.Value = model.QuestionBack;
                    command.Parameters.Add(parametroQuestionBack);

                    using (SqlDataReader dr = command.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            result.Status = Convert.ToInt32(dr["Status"].ToString());
                            if (result.Status == 0)
                                result.ErrorMessage = dr["ErrorMessage"].ToString();
                        }
                    }

                    connectionDB.Close();
                    response.data = result;
                    response.statusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                response.errorMessage = ex.Message;
            }
            return response;
        }

        public async Task<ReturnService> FinishSurvey(FinishSurveyParams model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<SaveModel>("sp_FinishSurvey", model);
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

        public async Task<ReturnService> SurveyDetailsByUserId(SurveyDetailByUserIdParams model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetListFromStoreProcedureOfType<SurveyDetailByUserIdModel>("sp_GetSurveyDetailsByUserId", model);
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
