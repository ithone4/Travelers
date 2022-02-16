--SETUP INFO-----------------------------------------------
--This file is used to create the structure of the database.

--Follow the sequence below to create the database and structure.
--then add the static data to the tables in the following order from the individual 
--data.sql files:
--role_data.sql
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

--answers database has {user.company_id} in fields therefore user reducer must be provided 
--in such components using this data.

--First create Database 
CREATE DATABASE "fersk_tech";

--Second create Tables in the order as follows:


-- role table ----------------------------------------------

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role text
);


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
    travel_spend character varying(200),
    culture integer,
    role_id integer REFERENCES role(id),
    last_question integer
    
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
    business_processes boolean
   
);





-- Answer table for questions ----------------------------------------------

CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    question_id integer NOT NULL REFERENCES question(id),
    answer_1 character varying(2000),
    answer_2 character varying(2000),
    answer_3 character varying(2000),
    answer_4 character varying(2000),
    answer_5 character varying(2000).
	answer_6 character varying(2000)
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
    info_snippet_text character varying(2000)
);





-- Policy Builder for each user ----------------------------------------------

CREATE TABLE policy_builder (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user"(id),
    question_1 integer,
    question_2 integer,
    question_3 integer,
    question_4 integer,
    question_5 integer,
    question_6 integer,
    question_7 integer,
    question_8 integer,
    question_9 integer,
    question_10 integer,
	question_11 integer,
	question_12 integer,
	question_13 integer,
	question_14 integer,
	question_15 integer,
	question_16 integer,
	question_17 integer,
	question_18 integer,
	question_19 integer,
	question_20 integer,
	question_21 integer,
	question_22 integer,
	question_23 integer,
	question_24 integer,
	question_25 integer,
	question_26 integer,
	question_27 integer,
	question_28 integer,
	question_29 integer,
	question_30 integer,
	question_31 integer,
	question_32 integer,
	question_33 integer,
	question_34 integer,
	question_35 integer,
	question_36 integer,
	question_37 integer,
	question_38 integer,
	question_39 integer,
	question_40 integer,
	question_41 integer,
	question_42 integer,
	question_43 integer,
	question_44 integer,
	question_45 integer,
	question_46 integer,
	question_47 integer,
	question_48 integer,
	question_49 integer,
	question_50 integer,
	question_51 integer,
	question_52 integer,
	question_53 integer,
	question_54 integer,
	question_55 integer,
	question_56 integer,
	question_57 integer,
	question_58 integer,
	question_59 integer,
	question_60 integer,
	question_61 integer,
	question_62 integer,
	question_63 integer,
	question_64 integer,
	question_65 integer,
	question_66 integer,
	question_67 integer,
	question_68 integer,
	question_69 integer,
	question_70 integer,
	question_71 integer,
	question_72 integer,
	question_73 integer,
	question_74 integer,
	question_75 integer,
	question_76 integer,
	question_77 integer,
	question_78 integer,
	question_79 integer,
	question_80 integer,
	question_81 integer,
	question_82 integer,
	question_83 integer,
	question_84 integer,
	question_85 integer,
	question_86 integer,
	question_87 integer,
	question_88 integer,
	question_89 integer,
	question_90 integer,
	question_91 integer,
	question_92 integer,
	question_93 integer,
	question_94 integer,
	question_95 integer,
	question_96 integer,
	question_97 integer,
	question_98 integer,
	question_99 integer,
	question_100 integer,
	question_101 integer
);


