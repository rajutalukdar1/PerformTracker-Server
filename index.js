const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l6rvnwk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const employeesCollection = client.db('performTracker').collection('employees')
    const clientCollection = client.db('performTracker').collection('clients');
    const blogsCollection = client.db('performTracker').collection('blogs');
    const projectsCollection = client.db('performTracker').collection('projects');
    const trainingCollection = client.db('performTracker').collection('training')
    const trainingTypeCollection = client.db('performTracker').collection('trainingType')
    const trainerCollection = client.db('performTracker').collection('trainer')

    /* ------ 🤝Clients🤝 ------- */
    // get all Clients
    app.get('/clients', async (req, res) => {
      const query = {}
      const cursor = clientCollection.find(query);
      const services = await cursor.limit(9).toArray();
      res.send(services);
    });

    // get an client by id
    app.get('/clients/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await clientCollection.findOne(query);
      res.send(service);
    });


    /* ------ 🧑‍💼Employees🧑‍💼 ------- */
    // get all employees
    app.get('/employees', async (req, res) => {
      const query = {}
      const employees = await employeesCollection.find(query).toArray()

      res.send(employees)
    })

    // get an employee by id
    app.get('/employees/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

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
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await employeesCollection.updateOne(query, updatedDoc)

      res.send(result)
    })

    // delete an employee by id
    app.delete('/employees/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await employeesCollection.deleteOne(query)

      res.send(result)
    })
    /* ------ 🧑‍💼Trining List🧑‍💼 ------- */
    // get all trainig list
    app.get('/training', async(req, res)=>{
      const query = {}
      const training = await trainingCollection.find(query).toArray()
      res.send(training)
     })
     app.post('/training', async(req, res)=>{
      const query = req.body
      const training = await trainingCollection.insertOne(query)
      res.send(training)
     })
    /* ------ 🧑‍💼Trining🧑‍💼 ------- */
    // get all Triner
     app.get('/trainer', async(req, res)=>{
      const query = {}
      const trainer = await trainerCollection.find(query).toArray()
      res.send(trainer)
     })
     app.post('/trainer', async(req, res)=>{
      const query = req.body
      const trainer = await trainerCollection.insertOne(query)
      res.send(trainer)
     })
     app.patch('/trainer/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await trainerCollection.updateOne(query, updatedDoc)

      res.send(result)
    })
    app.delete('/trainer/:id', async (req, res) => {
      const { id } = req.params
      const query = req.body

      const result = await trainerCollection.deleteOne(query)

      res.send(result)
    })
    /* ------ 🧑‍💼Trining type🧑‍💼 ------- */
    // get all Trining Type
    app.get('/trainingtype', async(req, res)=>{
      const query = {}
      const trainingtype = await trainingTypeCollection.find(query).toArray()
      res.send(trainingtype)
     })
     app.post('/trainingtype', async(req, res)=>{
      const query = req.body
      const trainingtype = await trainingTypeCollection.insertOne(query)
      res.send(trainingtype)
     })
     app.patch('/trainingtype/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await trainingTypeCollection.updateOne(query, updatedDoc)

      res.send(result)
    })
    app.delete('/trainingtype/:id', async (req, res) => {
      const { id } = req.params
      const query = req.body

      const result = await trainingTypeCollection.deleteOne(query)

      res.send(result)
    })
    /* ------ 📝Blogs📝 ------- */
    // get all Blogs
    app.get('/blogs', async (req, res) => {
      const query = {}
      const blogs = await blogsCollection.find(query).toArray()

      res.send(blogs)
    })

    // get a blog by id
    app.get('/blogs/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const blog = await blogsCollection.findOne(query)
      res.send(blog)
    })

    // create a new blog
    app.post('/blogs', async (req, res) => {
      const blog = req.body
      const result = await blogsCollection.insertOne(blog)

      res.send(result)
    })

    // update an blog by id
    app.patch('/blogs/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await blogsCollection.updateOne(query, updatedDoc)

      res.send(result)
    })

    // delete an blog by id
    app.delete('/blogs/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await blogsCollection.deleteOne(query)

      res.send(result)
    })


    /* ------ 🚀Projects🚀 ------- */
    // get all projects
    app.get('/projects', async (req, res) => {
      const query = {}
      const projects = await projectsCollection.find(query).toArray()

      res.send(projects)
    })

    // get an project by id
    app.get('/projects/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await projectsCollection.findOne(query)
      res.send(result)
    })

    // create a new project
    app.post('/projects', async (req, res) => {
      const project = req.body
      const result = await projectsCollection.insertOne(project)

      res.send(result)
    })

    // update an project by id
    app.patch('/projects/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await projectsCollection.updateOne(query, updatedDoc)

      res.send(result)
    })

    // delete an project by id
    app.delete('/projects/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await projectsCollection.deleteOne(query)

      res.send(result)
    })


  } finally { }
}

run().catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("PerformTracker Server is running")
})

app.listen(port, () => {
  console.log("Server is running on port", port);
})