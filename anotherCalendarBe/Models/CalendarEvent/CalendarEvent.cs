using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace anotherCalendarBe.Models;

public class CalendarEvent
{
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid _id { get; set; }

    [Required]
    public string content { get; set; }

    [Required]
    public DateTime startDateTime { get; set; }

    [Required]
    public DateTime endDateTime { get; set; }
    public CalendarEvent(Guid id, string content, string title, DateTime startDateTime, DateTime endDateTime)
    {
        _id = id;
        this.content = content;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public CalendarEvent()
    {
    }
}
