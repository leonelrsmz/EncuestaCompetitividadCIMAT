using Foundation.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Services.Imp
{
    public class AccountService : BaseService, IAccountService
    {
        public AccountService(IConfiguration configuration)
        {
            _configurationBase = configuration;
        }

        public async Task<ReturnService> Authenticate(AuthenticateParams model)
        {
            var response = new ReturnService();
            try
            {
                AuthenticateSPParams newModel = new AuthenticateSPParams();
                newModel.Email = model.Username;
                newModel.Password = model.Password;

                var result = await GetItemFromStoreProcedureOfType<AuthenticateResult>("sp_Authenticate", newModel);
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
                        new Claim(Constants.Constants.UserId, model.UserId.ToString()),
                        new Claim(Constants.Constants.Username,  model.Email),
                        new Claim(Constants.Constants.Name,  model.Name),
                        new Claim(Constants.Constants.RolId, model.RolId.ToString()),
                        new Claim(Constants.Constants.IsNew, model.IsNew.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddHours(5),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                UserToken validateCredentialsResult = new UserToken();
                validateCredentialsResult.AccessToken = tokenHandler.WriteToken(token);
                validateCredentialsResult.TokenType = Constants.Constants.Bearer;

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
