-- 会议室、面试间、静默室
CREATE TYPE room_type AS ENUM ('meeting', 'face', 'silence');

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table meeting_room (
    "id" smallserial PRIMARY KEY,
    "description" text,
    "name" text,
    "type" room_type not null,
    "devices" text default '',
    "location" text default '',
    "peoplesCount" smallint default 0
);

create table meeting_schedule (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    "timeRange" tstzrange NOT NULL,
    "userId" varchar(40),
    "description" text,
    "roomId" smallint REFERENCES meeting_room (id) NOT NULL,
    "day" timestamptz not null DEFAULT now(),
    "createTime" timestamptz DEFAULT now()
);

create or replace function check_time_cover() returns trigger as $time_cover_check$
    declare
        count int;
    begin
        count := (
            select count(*) from meeting_schedule
            where "timeRange" && NEW."timeRange"::tstzrange and "roomId" = NEW."roomId" and id != NEW."id"
        );
        if (count > 0) then
            raise exception 'time cover other';
        else 
            return new;
        end if;
    end;
$time_cover_check$ language plpgsql;

create trigger check_time_insert before insert on meeting_schedule 
    for each row EXECUTE PROCEDURE check_time_cover();

create trigger check_time_update before update on meeting_schedule
    for each row EXECUTE PROCEDURE check_time_cover();

-- insert into meeting_schedule ("timeRange", "userId", "description", "roomId", "day") values ('[2017-09-27 00:00:00+08,2017-10-13 00:00:00+08]', 'xxx', '描述', 1, '2017-10-10');
alter table meeting_room add column devices text default '';
alter table meeting_room add column place text default '';
alter table meeting_room add column "peoplesCount" smallint default 0;
