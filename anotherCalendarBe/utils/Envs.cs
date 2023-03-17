namespace anotherCalendarBe.utils;

public class Settings
{
    public string? FRONTEND_URL { get; set; }
    public string? DATABASE_CONN_STRING { get; set; }
}

public class Envs
{
    public static Settings? settings { get; set; }
    public static bool isInProduction { get; set; }

    public static string frontendUrl
    {
        get
        {
            if (!Envs.isInProduction && Envs.settings is not null)
            {
                return Envs.settings.FRONTEND_URL ?? "";
            }
            return handleNullString("FRONTEND_URL");
        }
    }
    public static string dbConnString
    {
        get
        {
            if (!Envs.isInProduction && Envs.settings is not null)
            {
                return Envs.settings.DATABASE_CONN_STRING ?? "";
            }
            return handleNullString("DATABASE_CONN_STRING");
        }
    }

    public static void SetupEnvs(bool isInProduction, Settings? settings)
    {
        Envs.isInProduction = isInProduction;
        Envs.settings = settings;
    }

    private static string handleNullString(string varName)
    {
        var variable = Environment.GetEnvironmentVariable(varName);
        return variable is null ? "" : variable;
    }

    private static string chooseVar(string varName)
    {
        var output = "";
        if (Envs.isInProduction)
        {
            output = Environment.GetEnvironmentVariable(varName);
        }
        else
        {
            output = (string)Envs.settings.GetType().GetProperty(varName).GetValue(Envs.settings);
        }
        return output is null ? "" : output;
    }

}
