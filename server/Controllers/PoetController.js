const PoetModel = require("../Models/PoetModel");
const PoetRgistration = async (req, res) => {
  const { poetName, poetEmail, poetPass } = req.body;

  try {
    const Poet = await PoetModel.create({
      poetName: poetName,
      poetEmail: poetEmail,
      poetPass: poetPass,
    });

    console.log(Poet);
    res.status(200).send({ msg: "Successfully Registered...", poet: Poet });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
const PoetLogin = async (req, res) => {
  try {
    const { poetid, poetEmail, poetPass } = req.body;
    const login = await PoetModel.findOne({ poetEmail });
    console.log(login);
    if (!login) {
      return res.status(400).send({ msg: "Invalid Email Id" });
    }
    if (login.poetPass != poetPass) {
      return res.status(404).send({ msg: "Invalid Password" });
    }
    res.status(200).send({ msg: "Login Successfully", login });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  PoetRgistration,
  PoetLogin,
};
