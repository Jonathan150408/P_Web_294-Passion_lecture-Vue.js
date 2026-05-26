# P_Web 295 - Passion Lecture ( Backend )

Auteurs : Jonathan Junod et Néo Darbellay
Chef de projet : Grégory Charmier (GCR)
Dates : 28.04.2026 - 26.05.2026
Module : C295

## Introduction

> Au cours de ce projet, il nous a été demandé de mettre en place une application web de a à z. En effet, la première partie du projet était consacrée au développement du frontend, alors que la deuxième partie portait sur le développement du backend. Ce présent rapport parle et détaile la seconde partie du projet : partie backend.
>
> Dans ce rapport, nous parlerons de la manière par laquelle l'équipe a organisé et divisé les tâches ainsi que l'outil que nous avons utilisé afin de se faire. Nous aborderons une partie analyse de l'application et nous parlerons de l'architecture de la base de données. Nous présenterons un tableau des routes mises en place ainsi que leurs fonction. Enfin nous détaillerons l'organisation du code et de l'équipe par rapport à la réalisation des tâches. Nous conclurons évidemment par une conclusion générale ainsi qu'un cours paragraphe par personne sur une brève conclusion personnelle.

CONTEXTE : Explication briève du projet
PAGES : 1

## Analyse

### Planification des tâches

CONTEXTE : Parler de quel outil de planification (donner un lien aussi, probablement) a été utilisé pendant le projet
PAGES : ?

### Analyse de l'API REST

#### Catégories

| Verbe HTTP | URI                 | JSON             | Auth |
| :--------- | :------------------ | :--------------- | :--- |
| GET        | /api/categories     | -                | Non  |
| GET        | /api/categories/:id | -                | Non  |
| POST       | /api/categories     | {"label":"Dogs"} | Oui  |
| PUT        | /api/categories/:id | {"label":"Cats"} | Oui  |
| DELETE     | /api/categories/:id | -                | Oui  |

#### Éditeurs

| Verbe HTTP | URI              | JSON           | Auth |
| :--------- | :--------------- | :------------- | :--- |
| GET        | /api/editors     | -              | Non  |
| GET        | /api/editors/:id | -              | Non  |
| POST       | /api/editors     | {"name":"Noé"} | Oui  |
| PUT        | /api/editors/:id | {"name":"Néo"} | Oui  |
| DELETE     | /api/editors/:id | -              | Oui  |

#### Livres

| Verbe HTTP | URI            | JSON                                                                                                                                                                                                                                     | Auth |
| :--------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| GET        | /api/books     | -                                                                                                                                                                                                                                        | Non  |
| GET        | /api/books/:id | -                                                                                                                                                                                                                                        | Non  |
| POST       | /api/books     | {"title":"Something strange happened","numberOfPages":319,"pdfLink":"/false","abstract":"Just an easter egg for Noe to find","editionYear":"2025","imagePath":"./true","userId":1,"writerId":2,"editorsIds":[3,4],"categoriesIds":[1,2]} | Oui  |
| PUT        | /api/books/:id | {"title":"Something strange happened","numberOfPages":319,"pdfLink":"/false","abstract":"Just an easter egg for Noe to find","editionYear":"2025","imagePath":"./true","userId":1,"writerId":2,"editorsIds":[3,4],"categoriesIds":[1,2]} | Oui  |
| DELETE     | /api/books/:id | -                                                                                                                                                                                                                                        | Oui  |

#### Users

| Verbe HTTP | URI                 | JSON | Auth |
| :--------- | :------------------ | :--- | :--- |
| POST       | /api/users/register | -    | Non  |
| POST       | /api/users/login    | -    | Non  |
| POST       | /api/users/logout   | -    | Oui  |
| GET        | /api/users          | -    | Oui  |
| GET        | /api/users/:id      | -    | Oui  |
| PUT        | /api/users/:id      | -    | Oui  |
| DELETE     | /api/users/:id      | -    | Oui  |
| GET        | /api/me             | -    | Oui  |

#### Docs

| Verbe HTTP | URI      | JSON | Auth |
| :--------- | :------- | :--- | :--- |
| GET        | /swagger | -    | Non  |
| GET        | /docs    | -    | Non  |

PAGES : 1

### Analyse de la DB

CONTEXTE : MCD, MLD, MPD (Migrations, optionnel dans notre contexte)
PAGES : 1

#### Relations des modèles

CONTEXTE : Parler des hasMany, hasOne, belongsTo, foreign key, etc. en complétant dans le MCD
PAGES : ?

### Schéma d'interaction frontend/backend

CONTEXTE : Faire un schéma des composants (API REST, DB, ORM, etc.) visuellement et leurs liens
PAGES : ?

## Réalisation

### Authentification et rôles

CONTEXTE : Parler de la gestion de l'auth et rôles
PAGES : 1

### Mesures de sécurité

CONTEXTE : Parler des mesures prises pour la sécurité de notre application
PAGES : 1

## Test

CONTEXTE : Parler des tests réalisés pour voir si tout marchait bien (ex. Bruno)
PAGES : 1

## Conclusion

### Organisation du groupe de la gestion du code

CONTEXTE : Parler de comment on a fait avec GitHub
PAGES : 0.5

### Conclusion Générale

CONTEXTE : Parler de ce qu'on a fait / pas fait / comment ça c'est déroulé / soucis
PAGES : 0.5

### Conclusion Personelle

#### Jonathan

PAGES : 0.5

#### Néo

PAGES : 0.5

### Planification du projet

CONTEXTE : Critique constructive sur notre planification
PAGES : 0.5
