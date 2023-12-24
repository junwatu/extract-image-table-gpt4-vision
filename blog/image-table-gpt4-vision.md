# Processing Image Data using GPT4-Vision, Node.js, and GridDB

![blog-gpt4-cover](assets/blog-gpt4-cover.jpg)

In this blog, we will explore how to use GPT-4 Vision to process image data, specifically tabular data from image and store the results in GridDB. We will build a simple web application using React.js and Node.js that allows users to upload images and view the results of GPT-4V's image processing.

## Meet the Stacks

We will use Node.js, GridDB, and OpenAI's GPT-4 Vision. For user interface, we will use React.js.

### GPT-4 Vision

GPT-4 with Vision, sometimes referred to as GPT-4V is one of the OpenAI's product. It allows the model to take in images and answer questions about them. Historically, language model systems have been limited by taking in a single input modality, text. For many use cases, this constrained the areas where models like GPT-4 could be used. You can read more about GPT-4V in their official [documentation](https://platform.openai.com/docs/guides/vision).

### GridDB

GridDB is an open-source, in-memory NoSQL database that is optimized for IoT and big data applications. It is a highly scalable database that can handle large volumes of data with high throughput and low latency. GridDB is also ACID compliant and supports SQL-like queries. For more information about GridDB, please visit the [GridDB website](https://griddb.net/).

### Node.js

Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to build scalable network applications. It is built on top of Google's V8 JavaScript engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. For more information about Node.js, please visit the [Node.js website](https://nodejs.org/en/).

### React.js

React.js is an open-source JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React.js allows developers to create reusable UI components that can be used across different applications. For more information about React.js, please visit the [React.js website](https://reactjs.org/).

## Prerequisites

This project is tested on Ubuntu 20.04.2 LTS WSL 2. You need OpenAI API key, GridDB, Node.js, and React.js to run this project. You can install them by following the instructions below.

### Install Node.js

To install Node.js v20 LTS on Ubuntu using package manager, you need to add additional `deb` repository. Please read and follow this [documentation](https://github.com/nodesource/distributions?tab=readme-ov-file#ubuntu-versions). After that test if the Node.js installed correctly by typing this command in the terminal:

```bash
node -v
```

### Install GridDB

The GridDB documentation for installation in Ubuntu on WSL can be found [here](https://docs.griddb.net/latest/gettingstarted/wsl/#installing-wsl). To check if GridDB is installed correctly, you can run the following command:

```bash
$ sudo systemctl status gridstore
```

If GridDB is not started, you can start it using this command:

```bash
$ sudo systemctl start gridstore
```

### OpenAI Account and API Key

You can get OpenAI API key by signing up for an account at [OpenAI](https://platform.openai.com/api-keys/). To keep your API key safe, you can store it in a `.env` file in the root directory of the project (more on this later).

## Running the Project

To get started, you need to clone this [repository](https://github.com/junwatu/extract-image-table-gpt4-vision) and install the dependencies. You can do this by running the following commands:

```bash
git clone git@github.com:junwatu/extract-image-table-gpt4-vision.git
```
Change directory to the project root `server` directory and install the dependencies:

```bash
cd extract-image-table-gpt4-vision/server
npm install
```
Create `.env` file in the root directory of the project. The `.env` file should look like this:

```
OPENAI_API_KEY=<your-api-key>
```
and add `.env` to `.gitignore` file to prevent it from being pushed to the repository.

Run the server:

```bash
npm start
```

In browser, go to the default project URL: `http://localhost:5115` and try to upload image that contains tabular data.

[//]: # (todo: create a gif to showcase the project)

## Project Architecture

The project follows a standard web application architecture. When an image containing tabular data is uploaded, Node.js will call upon GPT-4 Vision from OpenAI to process the image. The processed data will then be saved in the GridDB database. Afterward, the saved data will be displayed on a web page using React.js.

![project data diagram](assets/project-data-gpt4.png)


## Understanding GPT4-Vision

- Overview of GPT4-Vision's features
- How GPT4-Vision processes image data
- Advantages of using GPT4-Vision for image processing

## Integrating GPT4-Vision with Node.js

- Setting up a Node.js server
- Integrating GPT4-Vision API with Node.js
- Handling image data in Node.js

## Storing Processed Data in GridDB

- Overview of GridDB and its features
- Creating a schema for image data in GridDB
- Storing and retrieving image data with GridDB

## Building an End-to-End Application

- Designing the application workflow
- Integrating Node.js, GPT4-Vision, and GridDB
- Handling user inputs and displaying processed data

## References

- List of sources and further reading materials
