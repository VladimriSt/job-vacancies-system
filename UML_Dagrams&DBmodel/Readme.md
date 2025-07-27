Documtation for diagrams and code for their generation:|

@startuml
class Vacancy {
  +id: number
  +title: string
  +description: string
  +logo: Buffer
  +getAll(): Vacancy[]
  +getResponsesCount(vacancyId: number): number
}

class Response {
  +id: number
  +userEmail: string
  +vacancyId: number
  +create(userEmail: string, vacancyId: number): Response
}

class VacanciesController {
  +listVacancies(): Vacancy[]
}

class ResponsesController {
  +createResponse(userEmail: string, vacancyId: number): Response
}

Vacancy "1" -- "*" Response
VacanciesController --> Vacancy
ResponsesController --> Response
@enduml


@startuml
component Frontend {
  [React]
  [Material-UI]
}

component Backend {
  [Express]
  [PostgreSQL]
}

database "PostgreSQL" as db {
  folder "Таблицы" {
    [vacancies]
    [responses]
  }
}

Frontend --> Backend : HTTP API
Backend --> db : SQL
@enduml


@startuml
entity vacancies {
  *id: number (PK)
  --
  title: string
  description: text
  logo: bytea
}

entity responses {
  *id: number (PK)
  --
  userEmail: string
  vacancyId: number (FK)
}

vacancies ||--o{ responses
@enduml


@startuml
actor User
participant Frontend
participant Backend
participant Database

User -> Frontend: Заполняет форму
Frontend -> Backend: POST /api/responses
Backend -> Database: INSERT INTO responses
Database --> Backend: Успех
Backend --> Frontend: 201 Created
Frontend --> User: Подтверждение
@enduml
