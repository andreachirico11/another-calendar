// // namespace anotherCalendarBe.Models
// // {
// //     public class UnitOfWork
// //     {
// //         private CalendarEventRepository _ce { get; set; }
// //         private AnotherCDbContext _ctx { get; set; }
// //         public UnitOfWork(AnotherCDbContext c
// //        tx) {
// //             _ctx = ctx;
// //             _ce = new CalendarEventRepository(ctx.Set<CalendarEvent>());
// //         }
// //         public async void AddNewCalendarEv(CalendarEventDto
// // c) {
// //             await _ce.AddEvent(c);
// //             await _ctx.SaveChangesAsync();
// //         }
// //     }
// // }