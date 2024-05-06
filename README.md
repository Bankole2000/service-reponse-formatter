## Service Response Formatter

A Collection of utility functions to quickly scaffold and standardize server-side function returns and http responses with nodejs.

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./http.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Service Response - YAHTTPRF</h3>

  <p align="center">
    Yet Another HTTP Response Formatter
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#Usage">Usage</a>
      <ul>
        <li><a href="#generating-serviceresponse">Generating `ServiceResponse`</a></li>
        <li><a href="#generating-tstatus">Generating `TStatus`</a></li>
      </ul>
    </li>
    <li>
      <a href="#list-of-status-codes-types--generator-fxns">Status Codes List</a>
    </li>
    <!-- <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li> -->
  </ul>
</details>

## Installation

Meant to be installed on a __nodejs express__ server with either JavaScript or Typescript

```sh
npm install @neoncoder/service-response
```

The package exposes types, interfaces, and functions to help standardize and easily scaffold function returns and json http responses:

`ServiceResponse` - interface for http responses

```ts
type ServiceResponse = {
  // data sent to the client (including pagination etc)
  data?: any, 
  // error summary (e.g. error.message)
  errMessage?: string | undefined | null, 
  // error details (raw error object / instance)
  error?: unknown, 
  // suggested fixes to help client / end user (e.g. contact support)
  fix?: string | undefined | null, 
  // short message describing operation result (e.g. 'Login successful')
  message: string, 
  // any req, res metadata (e.g. requestId, appId, version, timestamps etc)
  meta?: any, 
  // if using accesstoken and token is refreshed, you can send the new token here
  newAccessToken?: string | undefined | null, 
  // was the operation successful or not?
  success: boolean, 
  // server response status code - i.e. 200, 201, 404, etc
  statusCode: number, 
}
```

`TStatus` - Interface for relaying Data Access / CRUD operation results (or function output in general)

```ts
type TStatus = {
  // operation status code - i.e. 200, 201, 404, etc
  code: number,
  // short message describing result (e.g. 'Created successfully')
  message: string,
  // suggested fixes (optional e.g. contact support)
  fix?: string,
  // resultant data from operation (including pagination etc)
  data?: any,
  // error details (raw error object / instance)
  error?: any,
  // "OK" | "Created" | "BadRequest" | "Unauthorized" etc
  statusType: string
}
```

## Usage

### Generating `ServiceResponse`

- Import and invoke the generator function (e.g. `OK`, `NotFound`, `Created`, `Unauthorized` etc) passing in none or any of the `ServiceResponse` type options (i.e. `{message, success, data, fix, meta, error, errMessage, newAccessToken}`);

```ts
import express, { Request, Response } from 'express';
import { OK, NotFound, Unauthorized, ServiceResponse } from '@neoncoder/service-response'

const app = express();

// generate OK - 200 response
app.get('/endpoint', async (req: Request, res: Response) => {
  const someData = await getSomeData()
  const sr: ServiceReponse = OK({data: someData})
  res.status(sr.statusCode).send(sr)
})

// generate NotFound - 404 response
app.get('/not-found', async (req: Request, res: Response) => {
  const sr: ServiceReponse = NotFound({message: 'This route does not exist'})
  res.status(sr.statusCode).send(sr)
})

// generate Unauthorized - 401 response
app.get('/unauthorized', async (req: Request, res: Response) => {
  if(!checkUserAuth()){
    const sr: ServiceReponse = Unauthorized({})
    return res.status(sr.statusCode).send(sr)
  }
  next()
})
```

- Or Use the `Rez` object and call the functions from there
  
```ts
import express, { Request, Response } from 'express';
import { Rez, ServiceResponse } from '@neoncoder/service-response'

const app = express();

// generate OK - 200 response
app.get('/endpoint', async (req: Request, res: Response) => {
  const someData = await getSomeData()
  const sr: ServiceReponse = Rez.OK({data: someData})
  res.status(sr.statusCode).send(sr)
})

// generate NotFound - 404 response
app.get('/not-found', async (req: Request, res: Response) => {
  const sr: ServiceReponse = Rez.NotFound({fix: 'check the route exists'})
  res.status(sr.statusCode).send(sr)
})
```

### Generating `TStatus`

- The `statusMap.get(<statusCode>)` method returns a function that takes in an options object as parameter (i.e.`{message, fix, error, data}`) to return a `TStatus` object;

```ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { statusMap, TStatus, Rez } from '@neoncoder/service-response'

const prisma = new PrismaClient()
const app = express();

app.get('/user/:id', async (req: Request, res: Response) => {
  let result: TStatus;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })
    // if user is found return 200 with user data, else return 404
    result = user 
      ? statusMap.get(200)!({data: user}) 
      : statusMap.get(404)!({})
  } catch (error: any) {
    result = statusMap.get(500)!({error})
  }
  // Quickly generate a ServiceResponse from the TStatus object / result
  const sr: ServiceResponse = Rez[result.statusType]({...result})
  return res.status(sr.statusCode).send(sr)
})
```

- The `statuses` object contains a predefined list of TStatus Objects that can be referenced by the Status Type. Using the previous example with the `statuses` object becomes:

```ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { statuses, TStatus, Rez } from '@neoncoder/service-response'

const prisma = new PrismaClient()
const app = express();

app.get('/user/:id', async (req: Request, res: Response) => {
  let result: TStatus;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })
    // if user is found return 200 with user data, else return 404
    result = user 
      ? {...statuses.OK, data: user}
      : {...statuses.NotFound}
  } catch (error: any) {
    result = {...statuses.InternalServerError, error}
  }
  // Quickly generate a ServiceResponse from the TStatus object / result
  const sr: ServiceResponse = Rez[result.statusType]({...result})
  return res.status(sr.statusCode).send(sr)
})
```

## List of Status Codes, Types & Generator Fxns

| Status Code | StatusType | Generate `ServiceResponse` | Generate `TStatus`
| ------------|--------------| -------------------------| ---------
| 200 | `OK` | `OK({})` \|\| `Rez.OK({})` | `statusMap.get(200)!({})`
| 201 | `Created` | `Created({})` \|\| `Rez.Created({})` | `statusMap.get(201)!({})`
| 204 | `NoContent` | `NoContent({})` \|\| `Rez.NoContent({})` | `statusMap.get(204)!({})`
| 400 | `BadRequest` | `BadRequest({})` \|\| `Rez.BadRequest({})` | `statusMap.get(400)!({})`
| 401 | `Unauthorized` | `Unauthorized({})` \|\| `Rez.Unauthorized({})` | `statusMap.get(401)!({})`
| 403 | `Forbidden` | `Forbidden({})` \|\| `Rez.Forbidden({})` | `statusMap.get(403)!({})`
| 404 | `NotFound` | `NotFound({})` \|\| `Rez.NotFound({})` | `statusMap.get(404)!({})`
| 405 | `MethodNotAllowed` | `MethodNotAllowed({})` \|\| `Rez.MethodNotAllowed({})` | `statusMap.get(405)!({})`
| 408 | `TimeoutError` | `TimeoutError({})` \|\| `Rez.TimeoutError({})` | `statusMap.get(408)!({})`
| 415 | `UnsupportedMediaType` | `UnsupportedMediaType({})` \|\| `Rez.UnsupportedMediaType({})` | `statusMap.get(415)!({})`
| 417 | `ExpectationFailed` | `ExpectationFailed({})` \|\| `Rez.ExpectationFailed({})` | `statusMap.get(417)!({})`
| 422 | `UnprocessableEntity` | `UnprocessableEntity({})` \|\| `Rez.UnprocessableEntity({})` | `statusMap.get(422)!({})`
| 429 | `TooManyRequests` | `TooManyRequests({})` \|\| `Rez.TooManyRequests({})` | `statusMap.get(429)!({})`
| 500 | `InternalServerError` | `InternalServerError({})` \|\| `Rez.InternalServerError({})` | `statusMap.get(500)!({})`
| 503 | `ServiceUnavailable` | `ServiceUnavailable({})` \|\| `Rez.ServiceUnavailable({})` | `statusMap.get(503)!({})`
| 504 | `GatewayTimeout` | `GatewayTimeout({})` \|\| `Rez.GatewayTimeout({})` | `statusMap.get(504)!({})`


<!-- * [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com) -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- [product-screenshot]: https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/images/screenshot.png -->
