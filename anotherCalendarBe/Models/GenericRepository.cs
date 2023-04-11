using Microsoft.EntityFrameworkCore;


namespace anotherCalendarBe.models
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected AnotherCDbContext _context;
        internal DbSet<T> _dbSet;

        public GenericRepository(AnotherCDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public virtual async Task<bool> Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            return true;
        }

        public virtual Task<IEnumerable<T>> All()
        {
            throw new NotImplementedException();
        }

        public virtual Task<bool> Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual async Task<T> FindById(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual Task<bool> Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}