# SampleChannelApp

This project is a sample of using [DaVinci API](https://apidocs.contactcanvas.com/) to integrate a channel into the [DaVinci Platform](https://www.contactcanvas.com/). This project was original generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0. 

This project generates fake calls to a list of phone number and passes the information to the DaVinci api. The important files are [app.component.ts](src/app/app.component.ts) and [call.component.ts](src/app/call/call.component.ts).

To test run the project with `ng serve` then in [Creators Studio](https://studio.contactcanvas.com) create an app with the URL pointing to you local server, http://localhost:4200/ by default, and the position set to 'Center[tabs]'.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Running Sample Channel App locally: 

* Open a terminal window and navigate inside the folder that contains the Sample Channel App and enter these commands. 

* cd SampleChannelApp/ 

* ng serve -o 

* The Sample Channel App will run on localhost:4200 


## Creating the Applications in Studio 

* Open the creators studio (https://studio.contactcanvas.com) and navigate to the Edit Apps Section 

* Create a new app with the name “SampleChannelApp” 

* Navigate to the configurations of the app you just created and enter the url configuration as (localhost:4200) 


