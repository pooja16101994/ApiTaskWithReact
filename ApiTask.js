const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 8001;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors()); // Allow all origins
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/Database")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB:", err);
  });

const empSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  email: { type: String, required: false },
  gender: { type: String, required: false },
  job: { type: String, required: false },
  ip_address: { type: String, required: false },
  age: { type: Number, required: false },
});

const Emp = mongoose.model("emps", empSchema);

app.post("/api/emp", async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body);
    if (!body.first_name) {
      return res.status(400).json({ msg: "Some data is missing" });
    }
    const newEmpData = new Emp(body);
    await newEmpData.save();
    res.status(201).json({ msg: "Data Added successfully" });
  } catch (error) {
    console.error("Error saving data:", error);

    res.status(500).json({ msg: "Error", error });
  }
});

app.get("/api/emp", async (req, res) => {
  try {
    const empData = await Emp.find();
    res.status(200).json(empData);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/emp/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Validate that the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Employee ID format" });
    }

    const deletedEmp = await Emp.findByIdAndDelete(id);
    if (!deletedEmp) {
      res.status(404).json({ msg: "Emp not found" });
    }

    res.status(200).json({ msg: "Employee deleted successfully" });
  } catch (error) {
    console.log("Error in deleting employee:", error);
    res.status(500).json({ msg: "Error deleting employee", error });
  }
});

app.listen(PORT, () => {
  console.log("server started");
});
