namespace anotherCalendarBe.Models;

public class AppConfig
{
    public string _id { get; private set; }
    public string version { get; private set; }

    public bool production { get; private set; }

    public AppConfig(string version)
    {
        this.version = version;
        this._id = "will_be_assigned_by_db";
        // in future take it from envs
        this.production = false;
    }
}
