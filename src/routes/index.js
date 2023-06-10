import express from 'express'; 
import router from './livrosRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "API Livraria"})
    });

    app.use(
        express.json(),
        router
    )

};


export default routes