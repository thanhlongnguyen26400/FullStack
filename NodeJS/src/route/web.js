import Express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = Express.Router();

let initWebRouters = (app) => {

    router.get("/", homeController.getHomePage);

    router.get("/about", homeController.getAboutPage);

    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postCRUD);

    router.get("/get-crud", homeController.displayGetCRUD);

    router.get("/edit-crud", homeController.getEditCRUD);

    router.post("/update-crud", homeController.updateCRUD);

    router.get("/delete-crud", homeController.deleteCRUD);


    // ket noi API

    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-all-user', userController.handleGetAllUsers);

    router.post('/api/create-new-user', userController.handleCreateNewUser);

    router.put('/api/edit-user', userController.handleEditUser);

    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use("/", router);

}

module.exports = initWebRouters;