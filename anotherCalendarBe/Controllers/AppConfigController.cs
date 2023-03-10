using Microsoft.AspNetCore.Mvc;
using anotherCalendarBe.Models;

namespace anotherCalendarBe.Controllers;

[ApiController]
[Route("[controller]")]
public class AppConfigController : ControllerBase
{

    private readonly ILogger<AppConfigController> _logger;

    public AppConfigController(ILogger<AppConfigController> logger)
    {
        _logger = logger;
    }



    [HttpGet]
    public AppConfig Get()
    {
        return new AppConfig("0.0.0");
    }
}
