using Microsoft.AspNetCore.Mvc;
using anotherCalendarBe.Models;
using Microsoft.EntityFrameworkCore;

namespace anotherCalendarBe.Controllers;

[ApiController]
[Route("[controller]")]
public class AppConfigController : ControllerBase
{

    private readonly ILogger<AppConfigController> _logger;

    private AnotherCDbContext ctx { get; set; }

    public AppConfigController(ILogger<AppConfigController> logger, AnotherCDbContext ctx)
    {
        _logger = logger;
        this.ctx = ctx;
    }



    [HttpGet]
    public async Task<AppConfig> Get()
    {
        return await this.ctx.AppConfig.FirstOrDefaultAsync();
    }
}
