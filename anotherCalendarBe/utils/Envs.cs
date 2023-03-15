namespace anotherCalendarBe.utils;

public class Envs
{
    public static bool isInProduction()
    {
        return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production";
    }

    public static string frontendUrl()
    {
        var variable = Environment.GetEnvironmentVariable("FRONTEND_URL");
        if (variable is null)
        {
            return "";
        }
        return variable;
    }
}
