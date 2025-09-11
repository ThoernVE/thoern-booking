// Global settings
Globals = Obj(new
{
    debugOn = true,
    detailedAclDebug = false,
    aclOn = true,
    isSpa = true,
    port = args.Length > 0 ? args[0] : "5000",
    serverName = "Minimal API Backend",
    frontendPath = args.Length > 1 ? args[1] : "/app/wwwroot",
    dbPath = args.Length > 2 ? args[2] : "/app/_db.sqlite3",
    sessionLifeTimeHours = 2
});

// Copy database from template if missing
var dbPath = Globals.dbPath;
var dbTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "db_template", "_db.sqlite3");

if (!File.Exists(dbPath))
{
    Console.WriteLine($"[INFO] Creating database from template: {dbTemplatePath} -> {dbPath}");
    File.Copy(dbTemplatePath, dbPath);
}

Server.Start();