using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace AppTest.Tests.Base
{
    public class BaseUnitTests
    {
        protected IConfiguration _configuration;

        public BaseUnitTests()
        {
            //Arrange
            var inMemorySettings = new Dictionary<string, string> {
                    {"AppSettings:Secret", "TW9zaGVFcmV6UHJpdmF0ZUtleQ=="},
                    {"ConnectionStrings:DefaultConnection", "Data Source=JAHAIROACEVEDO\\SQLEXPRESS;Initial Catalog=cimatDB;Integrated Security=True"}
                };
            _configuration = new ConfigurationBuilder()
               .AddInMemoryCollection(inMemorySettings)
               .Build();

        }
    }
}
