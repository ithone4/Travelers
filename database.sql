
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--This file is used to create the structure of the database.


--First create Database 
CREATE DATABASE "fersk_tech";

--Second create Tables

-- User table----------------------------------------------

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL
);



-- Questions Table ----------------------------------------------

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    question_text character varying(250) NOT NULL
);





-- Answer table for questions ----------------------------------------------

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id integer NOT NULL REFERENCES question(id),
    answer_1 character varying(200),
    answer_2 character varying(200),
    answer_3 character varying(200),
    answer_4 character varying(200),
    answer_5 character varying(200)
);




-- Policy Text ----------------------------------------------

CREATE TABLE policy_text (
    id SERIAL PRIMARY KEY,
    question_id integer NOT NULL REFERENCES question(id),
    policy_text_1 character varying(2500),
    policy_text_2 character varying(2500),
    policy_text_3 character varying(2500),
    policy_text_4 character varying(2500),
    policy_text_5 character varying(2500)
);




-- Snippet Information Table ----------------------------------------------

CREATE TABLE info_snippet (
    id SERIAL PRIMARY KEY,
    question_id integer NOT NULL,
    info_snippet_text character varying(250)
);





-- Policy Builder for each user ----------------------------------------------

CREATE TABLE policy_builder (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user"(id),
    choice_1 integer,
    choice_2 integer,
    choice_3 integer,
    choice_4 integer,
    choice_5 integer,
    choice_6 integer,
    choice_7 integer,
    choice_8 integer,
    choice_9 integer,
    choice_10 integer
);




