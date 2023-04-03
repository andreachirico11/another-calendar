namespace anotherCalendarBe.utils;

public class Settings
{
    public string? FRONTEND_URL { get; set; }
    public string? DATABASE_CONN_STRING { get; set; }
    public string? ENV_NAME { get; set; }
    public string? CORS_POLICY { get; set; }
    public string? MIGRATION_AT_LAUNCH { get; set; }
}

public class Envs
{
    private static bool getValueFromSettings
    {
        get
        {
            return !Envs.isInProduction && Envs.settings is not null;
        }
    }
    public static Settings? settings { get; set; }
    public static bool isInProduction { get; set; }

    public static string frontendUrl
    {
        get
        {
            return getValueFromSettings ?
                Envs.settings.FRONTEND_URL ?? "" : handleNullString("FRONTEND_URL");
        }
    }
    public static string dbConnString
    {
        get
        {
            return getValueFromSettings ?
                Envs.settings.DATABASE_CONN_STRING ?? "" : handleNullString("DATABASE_CONN_STRING");
        }
    }
    public static string envsName
    {
        get
        {
            return getValueFromSettings ?
                Envs.settings.ENV_NAME ?? "" : handleNullString("ENV_NAME");
        }
    }
    public static string corsPolicy
    {
        get
        {
            var envValue = getValueFromSettings ?
                Envs.settings.CORS_POLICY ?? "" : handleNullString("CORS_POLICY");
            return envValue == CorsPolicies.OFF ? CorsPolicies.OFF : CorsPolicies.FE_ONLY;
        }
    }

    public static bool migrationAtLaunch
    {
        get
        {
            var envValue = getValueFromSettings ?
                Envs.settings.MIGRATION_AT_LAUNCH ?? "" : handleNullString("MIGRATION_AT_LAUNCH");
            return handleBoolString(envValue);
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

    private static bool handleBoolString(string oneOrZero)
    {
        return oneOrZero == "1" ? true : false;
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
