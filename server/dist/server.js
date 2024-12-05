// THIS NEEDS TO BE LOOKED OVER 
// NOT SURE THAT I IMPLEMENTED JUNO'S FIXES PROPERLY 
import express from "express";
import db from "./config/connection.js";
import routes from "./api/all_routes.js";
const PORT = 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
await db();
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
/*
---------
Tutor's fix is being used above ^
---------
Maybe eventually add this error handling back in to get better feedback when something goes wrong:
db().then((connection) => {
  connection.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
}).catch((err) => {
  console.error('Failed to connect to the database', err);
});
*/
// -------------------------------------------------------------------
// What I had that did not work, before I got help in a tutor session:
// ------------------------------------------------------------------- 
/*
import express from 'express';
import db from './config/connection.js';
import routes from './api/all_routes.js';

const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db().then((connection) => {
  connection.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
}).catch((err) => {
  console.error('Failed to connect to the database', err);
});
*/ 
