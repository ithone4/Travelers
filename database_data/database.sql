--SETUP INFO-----------------------------------------------
--This file is used to create the structure of the database.

--Follow the sequence below to create the database and structure.
--then add the static data to the tables in the following order from the individual 
--data.sql files:

--group_data.sql
--question_data.sql
--answer_data.sql
--policy_text_data.sql
--info_snippet_data.sql


--GENERAL NOTES--------------------------------------------
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--First create Database 
CREATE DATABASE "fersk_tech";

--Second create Tables in the order as follows:

-- User table----------------------------------------------

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    first_name character varying(80),
    last_name character varying(80),
    company_name character varying(200),
    phone_number text,
    "location" character varying(200),
    industry character varying(100),
    program character varying(100),
    travel_spend integer
);


-- group table ----------------------------------------------

CREATE TABLE "group" (
    id SERIAL PRIMARY KEY,
    group_name character varying(100),
    group_info character varying(2000)
);





-- Questions Table ----------------------------------------------

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    question_text character varying(2000) NOT NULL,
    group_id integer NOT NULL REFERENCES "group"(id),
    safety boolean,
    cost boolean,
    experience boolean,
    sustainability boolean,
    business_processes boolean,
   
);





-- Answer table for questions ----------------------------------------------

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id integer NOT NULL REFERENCES question(id),
    answer_1 character varying(2000),
    answer_2 character varying(2000),
    answer_3 character varying(2000),
    answer_4 character varying(2000),
    answer_5 character varying(2000)
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
    culture integer,
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

--static data templates-----------------------------------------------


INSERT INTO question (question_text) VALUES ('what commercial uses a lizard mascot?');

INSERT INTO info_snippet (question_id, info_snippet_text) VALUES (2,'you could save money if you switch to fersk tech');

INSERT INTO answer (question_id, answer_1, answer_2, answer_3, answer_4, answer_5) VALUES (2,'answer1', 'answer2', 'answer3', 'answer4', 'answer5');

INSERT INTO policy_text (question_id, policy_text_1, policy_text_2, policy_text_3, policy_text_4, policy_text_5) VALUES (2,'Policy Text1', 'Policy Text2', 'Policy Text3', 'Policy Text4', 'Policy Text5');


