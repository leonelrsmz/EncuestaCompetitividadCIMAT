using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Constants
{
    public static class Constants
    {
        public const string UserId = "UserId";
        public const string Username = "Username";
        public const string Name = "Name";
        public const string RolId = "RolId";
        public const string IsNew = "IsNew";
        public const string Bearer = "Bearer";

        //Error messages
        public const string ErrorAuthenticate = "Username or password is incorrect";
        public const string Error = "Error";
        public const string ErrorResponse = "Response error";
        public const string ErrorFieldsRequired = "All fields are required";
        public const string ErrorIncompleteModel = "Incomplete model";
        public const string ErrorSearchError = "Search error";
        public const string ErrorInternalError = "Internal server error";
    }
}
