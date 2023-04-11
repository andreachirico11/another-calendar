

using anotherCalendarBe.Models;
using Microsoft.EntityFrameworkCore;

namespace anotherCalendarBe.models.calendarEvent
{
    public class CalendarEventRepository : GenericRepository<CalendarEvent>, ICalendarEventRepository
    {
        public CalendarEventRepository(AnotherCDbContext context) : base(context)
        {
        }

        public override Task<bool> Add(CalendarEvent entity)
        {
            return base.Add(entity);
        }

        public override async Task<IEnumerable<CalendarEvent>> All()
        {
            try
            {
                return await _dbSet.ToListAsync();
            }
            catch (System.Exception e)
            {
                return new List<CalendarEvent>();
            }
        }

        public override Task<bool> Delete(CalendarEvent entity)
        {
            return base.Delete(entity);
        }

        public override Task<CalendarEvent> FindById(Guid id)
        {
            return base.FindById(id);
        }

        public override Task<bool> Update(CalendarEvent entity)
        {
            return base.Update(entity);
        }
    }
}