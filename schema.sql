create table meeting_room (
    "id" smallserial PRIMARY KEY,
    "description" text,
    "name" text,
    "type" text
);

create table meeting_schedule (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    "beginTime" timestamptz not null,
    "endTime" timestamptz not null,
    "userId" varchar(40),
    "description" text,
    "roomId" smallint REFERENCES meeting_room (id) NOT NULL
);