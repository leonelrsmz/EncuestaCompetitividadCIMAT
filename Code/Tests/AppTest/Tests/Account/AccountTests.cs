using Api.Services.Imp;
using AppTest.Tests.Base;
using Foundation.Models;
using Xunit;

namespace AppTest.Tests.Account
{
    public class AccountTests : BaseUnitTests
    {
        [Fact]
        public void UserNotNullTest()
        {
            AuthenticateParams authenticateModel = new AuthenticateParams
            {
                Username = "cesar@gmail.com",
                Password = "212121"
            };

            //AccountServiceMock service = new AccountServiceMock(_configuration);
            AccountService service = new AccountService(_configuration);

            ReturnService response = service.Authenticate(authenticateModel).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void UserInsFireBaseNotNullTest()
        {
            UserInsFireBaseModel model = new UserInsFireBaseModel
            {
                Name = "User Test",
                Email = "user_test@gmail.com",
                Company = "CompanyTest",
                RolId = 2,
                UId = "KYVJTrQjHTctgQVCDT18KcDbjyI3"
            };

            AccountService service = new AccountService(_configuration);

            ReturnService response = service.UserInsFireBase(model).Result;
            Assert.NotNull(response.data);
        }

    }
}