const PlantController = require('../controller/PlantController');
const express = require('express');
const { protect } = require('../middleware/userAuth');

const PlantRouter = express.Router();

//save plant details
PlantRouter.post('/createPlant', PlantController.SavePlantDetails);

//get all plant details
// PlantRouter.get('/getAllPlantDetails', protect, PlantController.GetAllPlantDetails);
PlantRouter.get('/getAllPlantDetails', PlantController.GetAllPlantDetails);

//get all plant details bu user
// PlantRouter.get('/getAllPlantDetails', protect, PlantController.GetAllPlantDetails);
PlantRouter.get('/getAllPlantDetailsByUser/:regNo', PlantController.getAllPlantDetailsByUser);

//get update plant details
PlantRouter.get('/getPlantUpdateDetails/:updateID', PlantController.GetUpdatePlantDatils);

//update plant details
PlantRouter.put('/updatePlant', PlantController.UpdatePlantDetails);

//check currect plantID already have
PlantRouter.get('/checkPlantID/:currectplantID', PlantController.getPlantIDHave);

//get the subculture detail list
PlantRouter.get('/GetSubCulturdetailsList', PlantController.getSubcultureDetailsList);

//get the subculture detail list all
PlantRouter.get('/GetSubCulturdetailsListall', PlantController.getSubcultureDetailsListall);





module.exports = PlantRouter;