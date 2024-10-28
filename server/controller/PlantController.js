const PlantModel = require("../model/PlantModel");

//create plant
const SavePlantDetails = async (req, res) => {
  const {
    plantID,
    note,
    status,
    plantDate,
    subCultureDate,
    creaetdByName,
    createByRegNo,
  } = req.body;
  const image = req.files.files;

  try {
    const imageNameStore = new Date().getTime();
    await image.mv("Assets/PlantImages/" + `${imageNameStore}.jpg`, (err) => {
      console.log("An error occured in file ", err);
    });

    const PlantDetails = new PlantModel({
      plantID,
      note,
      status,
      plantDate,
      subCultureDate,
      creaetdByName,
      createByRegNo,
      image: `${imageNameStore}.jpg`,
    });

    return await PlantDetails.save()
      .then((value) => {
        res.status(200).json({ ID: value._id });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  } catch (err) {
    res.status(400).json({ error: err.meassage });
  }
};

//get all the plant details
const GetAllPlantDetails = async (req, res) => {
  try {
    const PlantDetails = await PlantModel.find();
    return res.status(200).send({ PlantDetails });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

//get all the plant details by user
const getAllPlantDetailsByUser = async (req, res) => {
  const regNo = req.params.regNo;
  try {
    const PlantDetails = await PlantModel.find({ createByRegNo: regNo });
    return res.status(200).send({ PlantDetails });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

//get update plant details
const GetUpdatePlantDatils = async (req, res) => {
  const id = req.params.updateID;
  try {
    const plantss = await PlantModel.find({ _id: id });
    return res.status(200).send({ plantss });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

//update Plant details
const UpdatePlantDetails = async (req, res) => {
  const { note, status, plantDate, subCultureDate } = req.body;

  console.log(req.body);

  const id = req.body.updateID;

  try {
    const UpdateDetails = {
      note,
      status,
      plantDate,
      subCultureDate,
    };
    await PlantModel.findByIdAndUpdate(id, UpdateDetails)
      .then(() => {
        res.status(200).send({ status: "Success", data: UpdateDetails });
      })
      .catch((err) => {
        res.status(400).send({ status: err });
      });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

//check plant ID already heve
const getPlantIDHave = async (req, res) => {
  const plantID = req.params.currectplantID;
  try {
    const PlantDetails = await PlantModel.findOne({ plantID: plantID });
    if (PlantDetails == null) {
      return res.status(200).send({ value: 1 });
    } else {
      return res.status(200).send({ value: 0 });
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// get subculture detail list
const getSubcultureDetailsList = async (req, res) => {
  const regNo = req.query.userRegNo;
  const date = req.query.date;
  try {
    const PlantDetails = await PlantModel.find(
      { createByRegNo: regNo, subCultureDate: date },
      { plantID: 1, _id: 0 }
    );
    return res.status(200).send({ PlantDetails });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

// get subculture detail list a;;
const getSubcultureDetailsListall = async (req, res) => {
  const date = req.query.date;
  try {
    const PlantDetails = await PlantModel.find(
      { subCultureDate: date },
      { plantID: 1, _id: 0 }
    );
    return res.status(200).send({ PlantDetails });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

module.exports = {
  SavePlantDetails,
  GetAllPlantDetails,
  GetUpdatePlantDatils,
  UpdatePlantDetails,
  getAllPlantDetailsByUser,
  getPlantIDHave,
  getSubcultureDetailsList,
  getSubcultureDetailsListall,
};
