using Api.Constants;
using Api.Services;
using Api.Services.Imp;
using Foundation.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AppTest.Mocks
{
    public class AccountServiceMock : BaseService, IAccountService
    {
        public AccountServiceMock(IConfiguration configuration)
        {
            _configurationBase = configuration;
        }

        private async Task<ReturnService> methodAsync(ReturnService response)
        {
            return await Task.Delay(10000)
                .ContinueWith(t => response);
        }

        public async Task<ReturnService> Authenticate(AuthenticateParams authenticateModel)
        {
            var response = new ReturnService();

            AuthenticateResult result = new AuthenticateResult()
            {
                UserId = 1,
                Name = "Cesar Rios",
                Email = "cesar@gmail.com",
                Company = "Grupo SITE",
                RolId = 1,
                IsActive = true
            };
            UserToken token = generateJwtToken(result);
            response.data = token;
            response.statusCode = HttpStatusCode.OK;
            return await methodAsync(response);
        }

        public UserToken generateJwtToken(AuthenticateResult model)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configurationBase.GetValue<string>("AppSettings:Secret"));
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(Constants.UserId, model.UserId.ToString()),
                        new Claim(Constants.Username,  model.Email),
                        new Claim(Constants.Name,  $"{model.Name} {model.Name}"),
                    }),
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                UserToken validateCredentialsResult = new UserToken();
                validateCredentialsResult.AccessToken = tokenHandler.WriteToken(token);
                validateCredentialsResult.TokenType = Constants.Bearer;

                return validateCredentialsResult;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ReturnService> UserInsFireBase(UserInsFireBaseModel model)
        {
            var response = new ReturnService();
            try
            {
                var result = await GetItemFromStoreProcedureOfType<AuthenticateResult>("sp_InsUserFireBase", model);
                UserToken token = generateJwtToken(result);
                response.data = token;
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
