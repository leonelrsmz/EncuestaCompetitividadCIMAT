using System.Net;

namespace Foundation.Models
{
    public class ReturnService
    {
        public string errorMessage { get; set; }
        public HttpStatusCode statusCode { get; set; }
        public object data { get; set; }
    }
}
