<h1 align="center">
  <br>
  Another Calendar
  <br>
</h1>

<h4 align="center">Simple Mock Calendar built with <a href="https://angular.io/" target="_blank">Angular</a> and <a href="https://learn.microsoft.com/en-us/ef//" target="_blank">Entity Framework</a> inspired (or copied) from Google Calendar</h4>

<br>

<h2 align="center"><a href="https://another-calendar-fe.onrender.com" target="_blank">
The app is deployed on Render. Try It!!!</a></h2>

## Key Features

- 3 code generated lazy loaded view
- Ngrx stuff everywhere managing mock data and application in general
- Select a date from the drawer calendar to sneak around and click on events to see more details
- Create Read and update events
- Almost responsive
- Super fast SSR with Angular Universal
- Never lose your events again thanks to the power of Sql databases and Entity Framework!

<br>

## Stack

- Angular 15
- Ngrx
- Angular Universal SSR
- Angular Material
- Entity Framework Core 7
- Sql Server
- Docker

<br>
<br>

# Installation Guide

You need a version of [Node.js](https://nodejs.org/en/download/) above version 14 and [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) installed on your machine and also [Git](https://git-scm.com) for cloning the repository.

From your command line:

```bash
$ git clone https://github.com/andreachirico11/another-calendar.git
```

<br>

## Frontend

All of the settings are provided from the backend application, the only one needed by the frontend is the backend url.
<br>
Create a file .env in the <i>/anotherCalendarFe</i> directory:

```text
API_URL=https://localhost:7093
```

<br>

From the root of the project:

```bash
$ cd anotherCalendarFe
$ npm install
$ npm start
```

<br>

## Backend

> TODOOOOOOOOOOO

```bash
$ cd anotherCalendarBe
$ dotnet run
```

<br>

## Database

> TODOOOOOOOOOOO

---

GitHub [@andreachirico11](https://github.com/andreachirico11) &nbsp;&middot;&nbsp;
