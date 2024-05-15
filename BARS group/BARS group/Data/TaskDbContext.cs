using BARS_group.Models;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace BARS_group.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) 
        {
            Database.EnsureCreated();
        }

        public DbSet<ToDoItem> ToDoItems { get; set;}
    }
}
