DROP TABLE IF EXISTS tasks;
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) DEFAULT NULL,
    tag INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT (now() at time zone 'utc'),
    deleted_at TIMESTAMP DEFAULT NULL,
    finished_at TIMESTAMP DEFAULT NULL
);

INSERT INTO tasks (name, tag, finished_at) VALUES ('Create architecture', 1, CURRENT_TIMESTAMP);
INSERT INTO tasks (name, tag, finished_at) VALUES ('Manage SQL data', 0, CURRENT_TIMESTAMP);
INSERT INTO tasks (name, tag, finished_at) VALUES ('Create a clear design', 0, CURRENT_TIMESTAMP);
INSERT INTO tasks (name, tag, finished_at) VALUES ('Add tags', 2, CURRENT_TIMESTAMP);
INSERT INTO tasks (name, tag, finished_at) VALUES ('Create Readme file', 0, CURRENT_TIMESTAMP);
INSERT INTO tasks (name, finished_at) VALUES ('Allow groups of task', NULL);
INSERT INTO tasks (name, finished_at) VALUES ('Missing something?', NULL);