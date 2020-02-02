# SAVUS

A react webapp for storing personal informations

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installation and Setup

Make sure you have node installed

Clone down this repository.

- git clone https://github.com/orsdev/savus.git

You will need node and npm installed globally on your machine.

Install create-react-app

- npx create-react-app my-app

When you are done installing create-react-app,

delete all the files except node_module folder

copy all files from the cloned repository and paste into the - create-react-app folder(my-app)

navigate into the folder - cd my-app

run the commands below to install these packages,

1. npm install react-router-dom or yarn add react-router-dom

2. npm install formik --save or yarn add formik

3. npm install -S yup

4. npm install firebase --save

If an error is encountered during packages intallation

run npm cache clean --force and install the failed package again

Start Server by running:

npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Built With

- create-react-app
- firebase - used for the database
- Sass
- yup & formik - for form validation
- react-router-dom
