const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l6rvnwk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    const employeesCollection = client.db('performTracker').collection('employees')

    app.get('/employees', async (req, res) => {
      // create dummy data
      // const employees = [
      //   {
      //     name: "Jabed",
      //     salary: 30000
      //   },
      //   {
      //     name: "Sagor",
      //     salary: 30000
      //   },
      // ]

      // const result = await employeesCollection.insertMany(employees)

      // res.send(result)
      
      const query = {}
      const employees = await employeesCollection.find(query).toArray()

      res.send(employees)
    })

    app.post('/employees', async (req, res) => {
      const employee = req.body

      const result = await employeesCollection.insertOne(employee)

      res.send(result)
    })

  }finally{}
}

run().catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("PerformTracker Server is running")
})

app.listen(port , () => {
  console.log("Server is running on port", port);
})