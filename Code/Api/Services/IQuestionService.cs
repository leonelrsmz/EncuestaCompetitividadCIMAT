using Foundation.Models;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface IQuestionService
    {
        Task<ReturnService> GetIdQuestionByQuestionId(QuestionGetByQuetionIdParams model);
        Task<ReturnService> GetQuestionById(QuestionGetByIdParams model);
        Task<ReturnService> QuestionBack(QuestionBackNextParams model);
        Task<ReturnService> QuestionNext(QuestionBackNextParams model);

        Task<ReturnService> GetIdPreviousQuestion(PreviousQuestionGetParams model);
    }
}