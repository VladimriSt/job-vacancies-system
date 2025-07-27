Sql Code for Vacancies_DB:
CREATE TABLE Vacancies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    logo BYTEA
);

CREATE TABLE Responses (
    id SERIAL PRIMARY KEY,
    userEmail VARCHAR(255) NOT NULL,
    vacancyId INTEGER NOT NULL REFERENCES Vacancies(id) ON DELETE CASCADE
);

CREATE INDEX ON Responses(userEmail);
CREATE INDEX ON Responses(vacancyId);
