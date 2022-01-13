CREATE TABLE "users"(
 "user_id" SERIAL PRIMARY KEY,
 "username" VARCHAR (50) UNIQUE NOT NULL,
 "user_email" VARCHAR (100) UNIQUE NOT NULL,
 "user_first_name" VARCHAR(50) NOT NULL,
 "user_last_name" VARCHAR(50),
 "user_password" VARCHAR (500) NOT NULL,
);

CREATE TABLE "sleep" (
  "sleep_id" SERIAL PRIMARY KEY,
  "hours_slept" int,
  "average_hr" int,
  "night_routine" VARCHAR(500),
  "user_id" int,
  "date" date
);

CREATE TABLE "tasks" (
  "task_id" SERIAL PRIMARY KEY,
  "task_text" VARCHAR(100),
  "user_id" int,
  "date" date
);

CREATE TABLE "meals" (
  "meal_id" SERIAL PRIMARY KEY,
  "meal_category" VARCHAR(50),
  "meal_title" VARCHAR(100),
  "user_id" int,
  "date" date
);

CREATE TABLE "motivation" (
  "motivation_id" SERIAL PRIMARY KEY,
  "motivation_content" VARCHAR(200),
  "user_id" int,
  "date" date
);

CREATE TABLE "exercise" (
  "exercise_id" SERIAL PRIMARY KEY,
  "exercise_category" VARCHAR(50),
  "workout_title" VARCHAR(200),
  "user_id" int,
  "date" date
);

CREATE TABLE "schedule" (
  "schedule_id" SERIAL PRIMARY KEY,
  "schedule_entry" VARCHAR(150),
  "schedule_category" VARCHAR(100),
  "user_id" int,
  "date" date,
  "start_time" time,
  "end_time" time
);

ALTER TABLE "sleep" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "tsks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "meals" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "motivation" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "exercise" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "schedule" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
