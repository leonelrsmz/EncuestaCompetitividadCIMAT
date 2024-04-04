using Api.Helpers;
using Api.Services;
using Foundation.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _service;

        public QuestionController(IQuestionService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("GetIdQuestionByQuestionId")]
        public async Task<IActionResult> GetIdQuestionByQuestionId([FromQuery] QuestionGetByQuetionIdParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.GetIdQuestionByQuestionId(model);
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
        [Route("GetQuestionById")]
        public async Task<IActionResult> GetQuestionById([FromQuery] QuestionGetByIdParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.GetQuestionById(model);
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
        [Route("GetQuestionBack")]
        public async Task<IActionResult> GetQuestionBack([FromQuery] QuestionBackNextParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.QuestionBack(model);
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
        [Route("GetQuestionNext")]
        public async Task<IActionResult> GetQuestionNext([FromQuery] QuestionBackNextParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.QuestionNext(model);
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
        [Route("GetIdPreviousQuestion")]
        public async Task<IActionResult> GetIdPreviousQuestion([FromQuery] PreviousQuestionGetParams model)
        {
            try
            {
                if (model != null)
                {
                    bool resp = ReflectionObject.ReflectionNotNull(model);
                    if (resp == true)
                    {
                        var response = await _service.GetIdPreviousQuestion(model);
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
