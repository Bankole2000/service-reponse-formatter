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
      <a href="#installation">Usage</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
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
    <li><a href="#acknowledgements">Acknowledgements</a></li>
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

Example with Express + Typescript

```ts
import express, { Request, Response } from 'express';
import { OK, NotFound, ServiceResponse } from '@neoncoder/service-response'

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
```

| Status Code | Status Type |
| ------------|--------------
| 200 | `OK`
| 201 | `Created`
| 204 | `NoContent`
| 400 | `BadRequest`
| 401 | `Unauthorized`
| 403 | `Forbidden`
| 404 | `NotFound`
| 405 | `MethodNotAllowed`
| 408 | `TimeoutError`
| 415 | `UnsupportedMediaType`
| 417 | `ExpectationFailed`
| 422 | `UnprocessableEntity`
| 429 | `TooManyRequests`
| 500 | `InternalServerError`
| 503 | `ServiceUnavailable`
| 504 | `GatewayTimeout`

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

There are many great README templates available on GitHub, however, I didn't find one that really suit my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should element DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have have contributed to expanding this template!

A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Laravel](https://laravel.com)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo

   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Enter your API in `config.js`

   ```JS
   const API_KEY = 'ENTER YOUR API';
   ```

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are __greatly appreciated__.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - <email@example.com>

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/images/screenshot.png
