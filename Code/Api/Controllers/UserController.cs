using Api.Services;
using Foundation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowApiRequest")]
    public class UserController : Controller
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [Route("UsersAll")]
        [HttpPost]
        public async Task<IActionResult> UsersAll([FromBody] UserSearchModel model)
        {
            var response = await _service.UsersAll(model);

            if (response == null)
            {
                return BadRequest(new { message = Constants.Constants.ErrorAuthenticate });
            }
            return Ok(response);
        }

        [Route("UserById")]
        [HttpGet]
        public async Task<IActionResult> UserById([FromQuery] UserByIdModel model)
        {
            var response = await _service.UserById(model);

            if (response == null)
            {
                return BadRequest(new { message = Constants.Constants.ErrorAuthenticate });
            }
            return Ok(response);
        }
    }
}
