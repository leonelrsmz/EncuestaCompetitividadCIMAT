using Foundation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface IAccountService
    {
        Task<ReturnService> Authenticate(AuthenticateParams model);

        UserToken generateJwtToken(AuthenticateResult model);

        Task<ReturnService> UserInsFireBase(UserInsFireBaseModel model);
    }
}
