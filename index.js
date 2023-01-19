const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    // get all employees
    app.get('/employees', async (req, res) => {
      const query = {}
      const employees = await employeesCollection.find(query).toArray()

      res.send(employees)
    })

    // get an employee by id
    app.get('/employees/:id', async (req, res) => {
      const {id} = req.params
      const query = {_id: ObjectId(id)}

      const result = await employeesCollection.findOne(query)
      res.send(result)
    })

    // create a new employee
    app.post('/employees', async (req, res) => {
      const employee = req.body
      const result = await employeesCollection.insertOne(employee)

      res.send(result)
    })

    // update an employee by id
    app.patch('/employees/:id', async (req, res) => {
      const {id} = req.params
      const updateInfo = req.body

      const query = {_id: ObjectId(id)}
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await employeesCollection.updateOne(query, updatedDoc)

      res.send(result)
    })

    // delete an employee by id
    app.delete('/employees/:id', async (req, res) => {
      const {id} = req.params
      const query = {_id: ObjectId(id)}

      const result = await employeesCollection.deleteOne(query)

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