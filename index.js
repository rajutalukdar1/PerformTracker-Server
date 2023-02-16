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
    const tasksCollection = client.db('performTracker').collection('tasks');
    const teamsCollection = client.db('performTracker').collection('teams');

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

    // get employees by name
    app.get('/employee', async (req, res) => {
      const { name } = req.query
      const query = { name: { $regex: name, $options: 'i' } }

      const result = await employeesCollection.find(query).toArray()
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

    /* ------ 📝Tasks📝 ------- */
    // get all tasks
    app.get('/tasks', async (req, res) => {
      const query = {}
      const tasks = await tasksCollection.find(query).toArray()

      res.send(tasks)
    })

    // get a task by id
    app.get('/tasks/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const task = await tasksCollection.findOne(query)
      res.send(task)
    })

    // create a new task
    app.post('/tasks', async (req, res) => {
      const task = req.body
      const result = await tasksCollection.insertOne(task)

      res.send(result)
    })

    // update an task by id
    app.patch('/tasks/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await tasksCollection.updateOne(query, updatedDoc)

      res.send(result)
    })

    // delete an task by id
    app.delete('/tasks/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await tasksCollection.deleteOne(query)

      res.send(result)
    })

    /* ------ 📝Teams📝 ------- */
    // get all teams
    app.get('/teams', async (req, res) => {
      const query = {}
      const teams = await teamsCollection.find(query).toArray()

      res.send(teams)
    })

    // get a team by id
    app.get('/team', async (req, res) => {
      const { uid } = req.query
      const query = { uid }

      const team = await teamsCollection.findOne(query)
      res.send(team)
    })

    // create a new team
    app.post('/teams', async (req, res) => {
      const team = req.body
      const result = await teamsCollection.insertOne(team)

      res.send(result)
    })

    // update an team by id
    app.patch('/teams/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await teamsCollection.updateOne(query, updatedDoc)

      res.send(result)
    })

    // delete an team by id
    app.delete('/teams/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await teamsCollection.deleteOne(query)

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