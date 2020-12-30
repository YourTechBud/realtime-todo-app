# Building a realtime todo app using CDC

This app uses the following tools:
- [React js](https://reactjs.org/) on the frontend.
- [MySQL](https://www.mysql.com/) as the database.
- [Debezium](https://debezium.io/) for Change Data Capture.
- [SpaceCloud](https://spaceuptech.com) as a realtime data layer.

## Prerequisites
 
- You'll need to have [Docker](https://docs.docker.com/engine/install/) installed. This project uses `docker-compose` to bring the backend components up.
- [Nodejs](https://nodejs.org/en/download/) is needed to build and run the react app.

## How to start the app

- Simply run `docker-compose up -d` to bring up MySQL, Debezium and SpaceCloud. 
- Once all the containers are up, Open [http://localhost:4122/mission-control](http://localhost:4122/mission-control).
- Head over to the `Settings` tab in the `Database` section and hit `Modify schema` to create the necessary tables.

![Modify Schema Image](https://raw.githubusercontent.com/YourTechBud/realtime-todo-app/master/modify-schema.png)

## Test it out

Simply move into the frontend directory (`cd frontend`) and run `npm i` and `npm start`. The todo app should be up on [http://localhost:3000](http://localhost:3000). Open the app in two windows to watch the realtime magic in action.

> **The app is configured to find the server on localhost. If you wish to run your app from other devices, replace `localhost` to `YOUR_IP` in `frontend/src/client.js`.**

