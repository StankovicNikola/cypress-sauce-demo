# cypress-sauce-demo

## Installing

Install Cypress for Mac, Linux, or Windows, then [get started](https://on.cypress.io/install).

```
npm install cypress --save-dev
```
or

```
yarn add cypress --dev
```

![installing-cli e1693232](https://user-images.githubusercontent.com/1271364/31740846-7bf607f0-b420-11e7-855f-41c996040d31.gif)
----------------------------


# Cypress Test Project

This is a Cypress test project that demonstrates how to run automated tests using Cypress.

## Prerequisites

Before running the tests, ensure that you have the following software installed on your machine:

- Node.js (https://nodejs.org)
- Git (https://git-scm.com)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/StankovicNikola/cypress-sauce-demo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cypress-sauce-demo
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```
   
4. For demonstration purposes the credentials are stored in cypress.env.json file and are not pushed to git. To fetch the credentials head over to https://www.saucedemo.com/, create the cypress.env.json file in root folder and add the listed credentials:

   ```bash
    {
    "standard_user": "standard_user",
    "locked_out_user": "locked_out_user",
    "problem_user": "problem_user",
    "performance_glitch_user": "performance_glitch_user",
    "password": "secret_sauce"
    }
   ```

## Running Tests

To run the tests, execute the following command in the project directory:

```bash
npm run cypress:open
```

This will launch the Cypress Test Runner, and you will see a graphical interface where you can select and run individual tests.

To run all tests in headless mode, execute the following command in the project directory

```bash
npm run cypress:run
```


## Writing Tests

The test files are located in the `cypress/e2e` directory. You can add or modify test files in this directory to suit your testing needs. Cypress supports writing tests in JavaScript and TypeScript.

For more information on how to write Cypress tests, refer to the official documentation: https://docs.cypress.io/guides/getting-started/writing-your-first-test

## Configuration

The project configuration file `cypress.config.js` contains various settings for Cypress. You can modify this file to configure browser options, test file locations, environment variables, and other Cypress settings.

## Feedback and Contributions

If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the GitHub repository.

Happy testing!
