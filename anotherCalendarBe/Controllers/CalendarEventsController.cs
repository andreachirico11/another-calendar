using Microsoft.AspNetCore.Mvc;
using anotherCalendarBe.Models;
using anotherCalendarBe.models;

namespace anotherCalendarBe.Controllers;

[ApiController]
[Route("[controller]")]
public class CalendarEventController : ControllerBase
{

    private readonly ILogger<CalendarEventController> _logger;
    private readonly IUnitOfWork _unitOfWork;

    public CalendarEventController(ILogger<CalendarEventController> logger, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CalendarEvent c)
    {
        c._id = Guid.NewGuid();
        if (await _unitOfWork._calendarEvents.Add(c))
        {
            await _unitOfWork.Save();
            return new JsonResult(c) { StatusCode = 201 };
        }
        return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
    }
}