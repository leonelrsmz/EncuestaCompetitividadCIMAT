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
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [Route("Authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateParams model)
        {
            var response = await _service.Authenticate(model);

            if (response == null)
            {
                return BadRequest(new { message = Constants.Constants.ErrorAuthenticate });
            }
            return Ok(response);
        }

        [AllowAnonymous]
        [Route("UserInsFireBase")]
        [HttpPost]
        public async Task<IActionResult> UserInsFireBase([FromBody] UserInsFireBaseModel model)
        {
            var response = await _service.UserInsFireBase(model);

            if (response == null)
            {
                return BadRequest(new { message = Constants.Constants.ErrorAuthenticate });
            }
            return Ok(response);
        }
    }
}
