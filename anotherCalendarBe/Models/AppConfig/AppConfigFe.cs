using anotherCalendarBe.utils;

namespace anotherCalendarBe.Models;

public class AppConfigFe
{

    public string version { get; set; }
    public bool isInProduction { get; set; }
    public AppConfigFe(AppConfig c)
    {
        version = c.version;
        isInProduction = Envs.isInProduction;
    }
}
