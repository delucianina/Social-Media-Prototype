// imports 
import express, {Request, Response} from "express";
import db from "./config/connection.js";
import routes from "./routes/api_routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

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






