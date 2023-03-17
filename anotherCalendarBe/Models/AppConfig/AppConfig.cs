using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace anotherCalendarBe.Models;

public class AppConfig
{
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid _id { get; set; }

    [Required]
    public string version { get; set; }
    public AppConfig(Guid id, string version)
    {
        this._id = id;
        this.version = version;
    }
    public AppConfig(string version)
    {
        this.version = version;
    }

    public AppConfig()
    {
    }
}
