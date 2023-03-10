namespace anotherCalendarBe.utils;

public class Envs
{
    public static bool isInProduction()
    {
        return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production";
    }

    public static string frontendUrl()
    {
        return Environment.GetEnvironmentVariable("FRONTEND_URL");
    }
}
