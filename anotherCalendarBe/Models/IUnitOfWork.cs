using anotherCalendarBe.models.calendarEvent;

namespace anotherCalendarBe.models
{
    public interface IUnitOfWork
    {
        ICalendarEventRepository _calendarEvents { get; }
        Task Save();
    }
}