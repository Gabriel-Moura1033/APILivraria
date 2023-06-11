import express from "express"; 
import router from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "API Livraria"});
  });

  app.use(
    express.json(),
    router,
    autores
  );

};


export default routes;
