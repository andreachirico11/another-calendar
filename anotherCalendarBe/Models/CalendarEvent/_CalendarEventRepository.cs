// using Microsoft.EntityFrameworkCore;
// using anotherCalendarBe.Models;
// using anotherCalendarBe.utils;

// namespace anotherCalendarBe.Models
// {
//     public class CalendarEventRepository
//     {
//         private DbSet<CalendarEvent> _dbset { get; set; }
//         public CalendarEventRepository(DbSet<CalendarEvent> dbset)
//         {
//             _dbset = dbset;
//         }

//         public async Task<bool> AddEvent(CalendarEventDto c)
//         {
//             _dbset.Attach(c);   
//         }
//     }
// }
