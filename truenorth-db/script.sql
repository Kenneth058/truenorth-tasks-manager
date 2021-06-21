create table "Task" (
  id serial primary key,
  uuid uuid unique,
  title varchar(500) not null,
  complete boolean default false
);

CREATE OR REPLACE FUNCTION public.inserttasks(jsondata json)
 RETURNS SETOF "Task"
 LANGUAGE plpgsql
AS $function$
  begin
    RETURN QUERY
    INSERT INTO "Task" (uuid, title)
    SELECT
      jsonTable.uuid,
      jsonTable.title
    FROM json_populate_recordset(null::"Task", jsonData) as jsonTable
    RETURNING *;
  END
$function$
;

CREATE OR REPLACE FUNCTION public.completetask(uuidval uuid)
 RETURNS SETOF "Task"
 LANGUAGE plpgsql
AS $function$
  begin
    RETURN QUERY
    update "Task" 
    set complete = true
    where uuid = uuidval
    RETURNING *;
  END
$function$
;

CREATE OR REPLACE FUNCTION public.gettasks()
 RETURNS TABLE ("uuid" uuid, title varchar, complete boolean)
 LANGUAGE plpgsql
AS $function$
  begin
    RETURN QUERY
    select t.uuid, t.title, t.complete
    from "Task" t
    order by id asc;
  END
$function$
;