
ALTER SEQUENCE role_id_seq RESTART WITH 1;

INSERT INTO "public"."role"("role") VALUES('user');
INSERT INTO "public"."role"("role") VALUES('admin');