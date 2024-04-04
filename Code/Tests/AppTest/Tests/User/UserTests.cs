using Api.Services.Imp;
using AppTest.Tests.Base;
using Foundation.Models;
using Xunit;

namespace AppTest.Tests.User
{
    public class UserTests : BaseUnitTests
    {
        [Fact]
        public void UserTest()
        {
            UserSearchModel model = new UserSearchModel
            {
                PageNumber = 1,
                RowsOfPage = 10
            };

            UserService service = new UserService(_configuration);

            ReturnService response = service.UsersAll(model).Result;
            Assert.NotNull(response.data);
        }

        [Fact]
        public void User_UserById_NotNull()
        {
            UserByIdModel model = new UserByIdModel
            {
                UserId = 15
            };

            UserService service = new UserService(_configuration);

            ReturnService response = service.UserById(model).Result;
            Assert.NotNull(response.data);
        }
    }
}