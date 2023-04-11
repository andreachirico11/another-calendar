using anotherCalendarBe.models.calendarEvent;

namespace anotherCalendarBe.models
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly AnotherCDbContext _context;

        public UnitOfWork(AnotherCDbContext context)
        {
            _context = context;
            _calendarEvents = new CalendarEventRepository(_context);
        }

        public ICalendarEventRepository _calendarEvents { get; private set; }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}