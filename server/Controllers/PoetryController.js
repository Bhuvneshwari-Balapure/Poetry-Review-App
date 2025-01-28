const PoetryModel = require("../Models/PoetryModel");
const PoetModel = require("../Models/PoetModel");

const CreatePoetry = async (req, res) => {
  try {
    const { poetid, poetName, poetryName, poetryContent } = req.body;

    // Log request body to check for poetid
    console.log("Request body:", req.body);

    // Check if poetid is provided
    if (!poetid) {
      return res.status(400).send({ msg: "Poet ID is required" });
    }

    const poet = await PoetModel.findById(poetid);
    if (!poet) {
      return res.status(404).send({ msg: "Poet not found" });
    }

    // Create poetry
    const newPoetry = await PoetryModel.create({
      poetid: poet._id,
      poetName: poetName,
      poetryName: poetryName,
      poetryContent: poetryContent,
    });

    res.status(200).send({ msg: "Poetry Created Successfully", poet });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in Server" });
  }
};

const DisplayPoetry = async (req, res) => {
  try {
    console.log("req.querry - ", req.query);
    const { poetid } = req.query;

    console.log(poetid);
    if (!poetid) {
      // Check for poetid, not poet
      return res.status(400).send({ msg: "Poet Id Not Match" });
    }
    const poetry = await PoetryModel.find({ poetid: poetid });
    if (poetry.length === 0) {
      return res.status(404).send({ msg: "No poetry found for this poet" });
    }

    res.status(200).send(poetry);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error fetching poetry" });
  }
};

const GetPoetryDetail = async (req, res) => {
  try {
    const poetry = await PoetryModel.findById(req.params.id);
    if (!poetry) {
      return res.status(404).json({ msg: "Poetry Not Found" });
    }
    return res.status(200).send(poetry); // Directly return the poetry details
  } catch (error) {
    res.status(400).send({ msg: "Error Fetching Poetry details" });
  }
};
const UpdatePoetryDetail = async (req, res) => {
  try {
    const { id, poetryName, poetryContent } = req.body;
    const Poetry = await PoetryModel.findByIdAndUpdate(id, {
      poetryName,
      poetryContent,
    });
    if (!Poetry) {
      return res.status(404).json({ msg: "Poetry Not Found" });
    }
    return res.status(200).json({ mag: "Poetry Successfully Updated" });
  } catch (error) {
    return res.status(404).json({ msg: "Error Updating Poetry" });
  }
};
const DisplayAllPoetry = async (req, res) => {
  try {
    const poetryList = await PoetryModel.find();
    res.status(200).send(poetryList);
    console.log(poetryList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch poetry" });
  }
};
const DelPoetry = async (req, res) => {
  try {
    const { id } = req.params;
    const poetry = await PoetryModel.findByIdAndDelete(id);
    if (!poetry) {
      return res.status(404).json({ msg: "Poetry Not Found" });
    }
    res.status(200).json({ msg: "Successfully Delteted" });
  } catch (error) {
    res.status(400).send(error);
  }
};
const AddReview = async (req, res) => {
  try {
    //Id of poetry
    const { id } = req.params;
    const { comment } = req.body;
    const poetry = await PoetryModel.findById(id);
    if (!poetry) {
      return res.status(404).send({ msg: "Poetry Not Found" });
    }
    poetry.reviews.push({ comment });
    await poetry.save();
    res.status(200).send({ msg: "Review Added Successfully", poetry });
  } catch (error) {
    console.error("Error Adding Review:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
const GetAllReviews = async (req, res) => {
  const { id } = req.params;
  console.log("id from backend : ", id);
  try {
    const poetry = await PoetryModel.findById(id);
    if (!poetry) {
      return res.status(404).send({ msg: "Poetry Not Found" });
    }
    res.status(200).send({ reviews: poetry.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error fetching reviews" });
  }
};
module.exports = {
  CreatePoetry,
  DisplayPoetry,
  GetPoetryDetail,
  UpdatePoetryDetail,
  DisplayAllPoetry,
  DelPoetry,
  AddReview,
  GetAllReviews,
};
