namespace anotherCalendarBe.Models;

public class CalendarEventDto
{
    public string content { get; set; }
    public DateTime startDateTime { get; set; }
    public DateTime endDateTime { get; set; }
    public CalendarEventDto(Guid id, string content, string title, DateTime startDateTime, DateTime endDateTime)
    {
        this.content = content;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public CalendarEventDto()
    {
    }
}
