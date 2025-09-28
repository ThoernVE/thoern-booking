using Microsoft.AspNetCore.Mvc;

namespace WebApp;

public static class RestApi
{
    public static void Start()
    {
        App.MapPost("/api/{table}", (
            HttpContext context, string table, JsonElement bodyJson
        ) =>
        {
            var body = JSON.Parse(bodyJson.ToString());
            body.Delete("id");
            var parsed = ReqBodyParse(table, body);
            var columns = parsed.insertColumns;
            var values = parsed.insertValues;
            var sql = $"INSERT INTO {table}({columns}) VALUES({values})";
            var result = SQLQueryOne(sql, parsed.body, context);
            if (!result.HasKey("error"))
            {
                // Get the insert id and add to our result
                result.insertId = SQLQueryOne(
                    @$"SELECT id AS __insertId 
                       FROM {table} ORDER BY id DESC LIMIT 1"
                ).__insertId;
            }
            return RestResult.Parse(context, result);
        });

        App.MapGet("/api/{table}", (
            HttpContext context, string table
        ) =>
        {
            var sql = $"SELECT * FROM {table}";
            var query = RestQuery.Parse(context.Request.Query);
            sql += query.sql;
            return RestResult.Parse(context, SQLQuery(sql, query.parameters, context));
        });

        App.MapGet("/api/{table}/{id}", (
            HttpContext context, string table, string id
        ) =>
            RestResult.Parse(context, SQLQueryOne(
                $"SELECT * FROM {table} WHERE id = $id",
                ReqBodyParse(table, Obj(new { id })).body,
                context
            ))
        );

        App.MapPut("/api/{table}/{id}", (
            HttpContext context, string table, string id, JsonElement bodyJson
        ) =>
        {
            var body = JSON.Parse(bodyJson.ToString());
            body.id = id;
            var parsed = ReqBodyParse(table, body);
            var update = parsed.update;
            var sql = $"UPDATE {table} SET {update} WHERE id = $id";
            var result = SQLQueryOne(sql, parsed.body, context);
            return RestResult.Parse(context, result);
        });

        App.MapDelete("/api/{table}/{id}", (
             HttpContext context, string table, string id
        ) =>
            RestResult.Parse(context, SQLQueryOne(
                $"DELETE FROM {table} WHERE id = $id",
                ReqBodyParse(table, Obj(new { id })).body,
                context
            ))
        );

        App.MapPost("api/users/workfields", (HttpContext context, [FromBody] int id) =>
        {
            var sql = "SELECT workfieldId AS id FROM COMPETENCES WHERE userId = $id";
            var rows = DbQuery.SQLQuery(sql, new { id }, context);

            var ids = rows.Map(x => (int)x.id);
            return Results.Ok(ids);
        });

        App.MapPost("api/users/workfields/save", (HttpContext context, [FromBody] SaveWorkfieldsRequest req) =>
        {
            var deleteSql = "DELETE FROM Competences WHERE UserId = $userId";
            DbQuery.SQLQuery(deleteSql, new { userId = req.UserId }, context);

            foreach (var wfId in req.WorkfieldIds)
            {
                var insertSql = "INSERT INTO Competences (userId, workfieldId) VALUES ($userId, $workfieldId)";
                DbQuery.SQLQuery(insertSql, new { userId = req.UserId, workfieldId = wfId }, context);
            }

            return Results.Ok(new { message = "Competences updated", count = req.WorkfieldIds.Count });
        });
    }
    public record SaveWorkfieldsRequest(int UserId, List<int> WorkfieldIds);
}