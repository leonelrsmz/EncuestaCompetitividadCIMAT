using Api.Helpers;
using Api.Services;
using Foundation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowApiRequest")]
    public class SurveyController : ControllerBase
    {
        private readonly ISurveyService _service;

        public SurveyController(ISurveyService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("Survey")]
        public async Task<IActionResult> Survey([FromBody] SurveyInsParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.SaveSurvey(model);
                        if (response != null)
                        {
                            if (response.statusCode == HttpStatusCode.OK)
                            {
                                return Ok(response);
                            }
                            else
                            {
                                return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                            }
                        }
                        else
                        {
                            return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                        }
                    }
                    else
                    {
                        return BadRequest(Constants.Constants.ErrorFieldsRequired);
                    }
                }
                return BadRequest(Constants.Constants.ErrorIncompleteModel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{Constants.Constants.ErrorInternalError}: {ex}");
            }
        }

        [HttpPost]
        [Route("SaveAnsweredQuestion")]
        public async Task<IActionResult> SaveAnsweredQuestion([FromBody] SaveAnsweredQuestionParams model)
        {
            try
            {
                if (model != null)
                {
                    var response = await _service.SaveAnsweredQuestion(model);
                    if (response != null)
                    {
                        if (response.statusCode == HttpStatusCode.OK)
                        {
                            return Ok(response);
                        }
                        else
                        {
                            return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                        }
                    }
                    else
                    {
                        return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                    }
                }
                return BadRequest(Constants.Constants.ErrorIncompleteModel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{Constants.Constants.ErrorInternalError}: {ex}");
            }
        }

        [HttpPost]
        [Route("FinishSurvey")]
        public async Task<IActionResult> FinishSurvey([FromBody] FinishSurveyParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.FinishSurvey(model);
                        if (response != null)
                        {
                            if (response.statusCode == HttpStatusCode.OK)
                            {
                                return Ok(response);
                            }
                            else
                            {
                                return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                            }
                        }
                        else
                        {
                            return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                        }
                    }
                    else
                    {
                        return BadRequest(Constants.Constants.ErrorFieldsRequired);
                    }
                }
                return BadRequest(Constants.Constants.ErrorIncompleteModel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{Constants.Constants.ErrorInternalError}: {ex}");
            }
        }

        [HttpGet]
        [Route("GetSurveyDetailsByUserId")]
        public async Task<IActionResult> GetSurveyDetailsByUserId([FromQuery] SurveyDetailByUserIdParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.SurveyDetailsByUserId(model);
                        if (response != null)
                        {
                            if (response.statusCode == HttpStatusCode.OK)
                            {
                                return Ok(response);
                            }
                            else
                            {
                                return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                            }
                        }
                        else
                        {
                            return BadRequest($"{Constants.Constants.Error}: {response.errorMessage}");
                        }
                    }
                    else
                    {
                        return BadRequest(Constants.Constants.ErrorFieldsRequired);
                    }
                }
                return BadRequest(Constants.Constants.ErrorIncompleteModel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{Constants.Constants.ErrorInternalError}: {ex}");
            }
        }
    }
}
