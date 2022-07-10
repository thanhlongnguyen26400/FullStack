import Express from "express";
import homeController from "../controllers/homeController";


let router = Express.Router();

let initWebRouters = (app) => {

    router.get("/", homeController.getHomePage);

    router.get("/about", homeController.getAboutPage);

    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postCRUD);

    router.get("/get-crud", homeController.displayGetCRUD);

    router.get("/edit-crud", homeController.getEditCRUD);

    // router.post("/update-crud", homeController.updateCRUD);

    return app.use("/", router);

}

module.exports = initWebRouters;