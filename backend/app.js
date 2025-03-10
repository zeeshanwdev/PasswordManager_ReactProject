import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'                                                                  //For Connection Backend & Front-End
import 'dotenv/config'

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Database
main().catch(err => console.log("Database connection error:", err));
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_LOCAL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

const passwordsSchema = mongoose.Schema({
  site: String,
  username: String,
  password: String
})

const Password = mongoose.model('Password', passwordsSchema)



// Routes
app.get('/', async(req, res) => {
    let result = await Password.find({})
    res.json(result)
})



app.post('/', async (req, res) => {

  let password = req.body;
  try {
    await Password.insertMany(password);
    console.log("New Data Inserted Into DB");
    res.status(201).send("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }

})


app.delete('/', async (req, res) => {

  try {
    await Password.deleteOne(req.body);
    console.log("Successfully Deleted");
    res.status(201).send("Deleted successfully");
  } catch (err) {
    console.error("Error Deleting data:", err);
    res.status(500).send("Error Deleting data");
  }

})



app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))





// npm i cors
