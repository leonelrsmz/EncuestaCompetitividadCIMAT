namespace Foundation.Models
{
    public class AuthenticateParams
    {
        public string Username { set; get; }
        public string Password { set; get; }
    }
    public class AuthenticateSPParams
    {
        public string Email { set; get; }
        public string Password { set; get; }
    }
    public class AuthenticateResult
    {
        public int UserId { set; get; }
        public string Name { get; set; }
        public string Email { set; get; }
        public string Company { get; set; }
        public int RolId { get; set; }
        public bool IsActive { get; set; }
        public bool IsNew { get; set; }
    }
    public class UserToken
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }
    }
    public class UserInsFireBaseModel
    {
        public string Name { get; set; }
        public string Email { set; get; }
        public string Company { get; set; }
        public int RolId { get; set; }
        public string UId { get; set; }
    }
    public class UserSearchModel
    {
        public int PageNumber { get; set; }
        public int RowsOfPage { get; set; }
        public string SearchText { get; set; }
        public string ByField { get; set; }
        public string SortType { get; set; }
        public UserSearchModel()
        {
            PageNumber = 1;
            RowsOfPage = 10;
            SearchText = null;
            ByField = null;
            SortType = null;
        }
    }
    public class UserSearchReslt
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { set; get; }
        public string Company { get; set; }
        public int RolId { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int Total { get; set; }
        public int Page { get; set; }
        public int RowsOfPage { get; set; }
    }
    public class UserByIdModel
    {
        public int UserId { get; set; }
    }
    public class UserModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { set; get; }
        public string Company { get; set; }
        public int RolId { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
