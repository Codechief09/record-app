using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR.Protocol;


namespace AudioUpload.Server.Controllers
{
    [ApiController]
    [Route("api/upload")]


    public class RecordingsController : ControllerBase
    {

        private readonly ILogger<RecordingsController> _logger;
        private readonly Cloudinary _cloudinary;
        public List<string> urls = new List<string>();

        public List<UploadResult> urts = new List<UploadResult>();

        public int cnt = 0;
        public RecordingsController(ILogger<RecordingsController> logger)
        {
            _logger = logger;
            Account account = new Account(
                "dybg8yojp",
                "821777276456314",
                "HTJLbTfRkpu9hVXzdFXDmX_jEww"
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpPost]
        public IActionResult UploadRecordings(IFormFile[] files)
        {
            try
            {
                foreach (var file in Request.Form.Files)
                {
                    _logger.LogInformation("file: ", file);
                    cnt++;
                    
                    if (file.Length > 0 && file.FileName != null )
                    {
                        var uploadParams = new RawUploadParams
                        {
                            File = new FileDescription(file.FileName, file.OpenReadStream())
                        };

                        var uploadResult = _cloudinary.Upload(uploadParams);
                        this.urls.Add(uploadResult.SecureUrl.ToString());

                    }
                    else
                    {
                        this.urls.Add("");
                    }
                }
                return Ok(urls);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
    
}


