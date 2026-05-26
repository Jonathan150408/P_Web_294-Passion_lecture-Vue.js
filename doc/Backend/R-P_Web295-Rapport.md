# P_Web 295 - Passion Lecture ( Backend )

Auteurs : Jonathan Junod et Néo Darbellay
Chef de projet : Grégory Charmier (GCR)
Dates : 28.04.2026 - 26.05.2026
Module : C295

## Introduction

> Dans ce rapport, nous parlerons de la manière par laquelle l'équipe a organisé et divisé les tâches ainsi que l'outil que nous avons utilisé afin de se faire. Nous aborderons une partie analyse de l'application et nous parlerons de l'architecture de la base de données. Nous présenterons un tableau des routes mises en place ainsi que leurs fonction. Enfin nous détaillerons l'organisation du code et de l'équipe par rapport à la réalisation des tâches. Nous conclurons évidemment par une conclusion générale ainsi qu'un cours paragraphe par personne sur une brève conclusion personnelle.
>
> Ce projet a pour objectif de concevoir et développer une application web complète permettant la gestion de livres en leur attachants des commentaires, des catégories, des éditeurs ainsi qu'au moins un écrivain. Cette application repose sur une architecture MVC séparant le frontend et le backend. Dans cette partie du projet, nous allons donc développer une API REST, une base de donnée de type SQL ainsi qu'un système d’authentification des utilisateurs.
>
> Ce morceau de projet consiste donc en améliorer et compléter un frontend réalisé précédemment en Vue.js au cours du module 294, puis à développer une API REST complète avec AdonisJS, MySQL ainsi qu'une multitudes d'autres outils.
>
> L’application développée permettra aux utilisateurs de consulter les ouvrages disponibles ainsi que leurs catégories. Les utilisateurs connectés peuvent ajouter, modifier ou supprimer leurs propres livres. Ils peuvent aussi ajouter des commentaires accompagnés d'une note de 0 à 5 sur les livres.

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
