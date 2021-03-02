import express from "express";
import Startup from "./Startup";
// import DbContext from "./db/DbConfig";  --- Not Used on Day 1 of learning Node

//create server & socketServer
const app = express();
const port = process.env.PORT || 3000;

//Establish Socket
Startup.ConfigureGlobalMiddleware(app);
Startup.ConfigureRoutes(app);

//Connect to AtlasDB
// DbContext.connect(); --- Not Connecting to Atlas on Day 1 of Learning Node

//Start Server
app.listen(port, () => {
  console.log("Server running on port:" + port);
});