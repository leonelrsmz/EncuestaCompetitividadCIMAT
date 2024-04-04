using Foundation.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Imp
{
    public class UserService : BaseService, IUserService
    {
        public UserService(IConfiguration configuration)
        {
            _configurationBase = configuration;
        }

        public async Task<ReturnService> UsersAll(UserSearchModel model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetListFromStoreProcedureOfType<UserSearchReslt>("sp_GetUsers", model);
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

        public async Task<ReturnService> UserById(UserByIdModel model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<UserModel>("sp_GetUserByUserId", model);
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
