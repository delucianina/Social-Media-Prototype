// imports 
import express from "express";
import connection from "./config/connection.js";
import routes from "./routes/api_routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

connection.once('open', () => {
  app.listen(PORT, () => {
    console.log('Server has started on port 3001');
  })
})







