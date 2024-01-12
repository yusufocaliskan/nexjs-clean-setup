# Installation

Run the below command after cloning the repository.

`yarn install`

## Using Docker

Using docker is not necessary to up and run the app, however if you wish to use it, then go head and install the Docker Desktop application on your computer and run the following command.

`cd docker-files && docker-compose -f docker-compose.dev.yml up --build`

Now you're good to go 🚀

http://localhost:3000

# Testing

To test some unit of the application, use this command

`yarn test`

or to watch

`yarn test:watch`
