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
    const usersCollection = client.db('performTracker').collection('users')
    const employeesCollection = client.db('performTracker').collection('employees')
    const clientCollection = client.db('performTracker').collection('clients');
    const taskCollection = client.db('performTracker').collection('task');
    const blogsCollection = client.db('performTracker').collection('blogs');
    const projectsCollection = client.db('performTracker').collection('projects');
    

    // get all task
    app.get('/task', async (req, res) => {
      const query = {}
      const task = await taskCollection.find(query).toArray()

      res.send(task)
    })

    // get task post
    app.post('/task', async(req, res) =>{
      const user = req.body;
      const result = await taskCollection.insertOne(user)
      res.send(result);
  })

  // get task delete
    app.delete('/task/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await taskCollection.deleteOne(query)

      res.send(result)
    })
    // get client post
    app.post('/clients', async(req, res) =>{
      const user = req.body;
      const result = await clientCollection.insertOne(user)
      res.send(result);
  })
    

    /* ------ 🤝Clients🤝 ------- */
    // get all Clients
    app.get('/clients', async (req, res) => {
      const query = {}
      const cursor = clientCollection.find(query).sort({ _id: -1 });
      const services = await cursor.toArray();
      res.send(services);
    });
    // get an client by id
    app.get('/clients/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await clientCollection.findOne(query);
      res.send(service);
    });

    // find each the client in email
    app.get('/client', async (req, res) => {
      const { email } = req.query
      const query = { email }

      const result = await clientCollection.findOne(query)
      res.send(result)
    });


    app.get('/client/projects/:id', async (req, res) => {
      const { id } = req.params
      const query = {
        clientId: id
        // $or: [{ team: { $elemMatch: { uid: id } } }, {
        //   assignedleaders: { $elemMatch: { uid: id } }
        // }]
      }
      const result = await projectsCollection.find(query).toArray();
      res.send(result)
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
    });

    // find each the employee in email
    app.get('/employee', async (req, res) => {
      const { email } = req.query
      const query = { email }

      const result = await employeesCollection.findOne(query)
      res.send(result)
    });

    /* ------ 📝Blogs📝 ------- */
    // get all Blogs
    app.get('/blogs', async (req, res) => {
      const query = {}
      const blogs = await blogsCollection.find(query).toArray()

      res.send(blogs)
    });

    // get a blog by id
    app.get('/blogs/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const blog = await blogsCollection.findOne(query)
      res.send(blog)
    });

    // create a new blog
    app.post('/blogs', async (req, res) => {
      const blog = req.body
      const result = await blogsCollection.insertOne(blog)

      res.send(result)
    });

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
    });

    // delete an blog by id
    app.delete('/blogs/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await blogsCollection.deleteOne(query)

      res.send(result)
    });

    /* ------ 🚀Projects🚀 ------- */
    // get all projects
    app.get('/projects', async (req, res) => {
      const query = {}
      const projects = await projectsCollection.find(query).toArray()

      res.send(projects)
    });

    // get an project by id
    app.get('/projects/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await projectsCollection.findOne(query)
      res.send(result)
    });

    // create a new project
    app.post('/projects', async (req, res) => {
      const project = req.body
      const result = await projectsCollection.insertOne(project)

      res.send(result)
    });

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
    });

    // delete an project by id
    app.delete('/projects/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await projectsCollection.deleteOne(query)

      res.send(result)
    });

    /* ------ 👷‍♀️👷‍♂️👨‍💼Users👷‍♀️👷‍♂️👨‍💼 ------- */
    // get user
    app.get('/users', async (req, res) => {
      const {uid} = req.query
      const query = {uid}
      const user = await usersCollection.findOne(query) || {}
      res.send(user)
    })

    // create a new user
    app.post('/users', async (req, res) => {
      const user = req.body
      const result = await usersCollection.insertOne(user)

      res.send(result)
    })

    // update an user by id
    app.patch('/users/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body

      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await usersCollection.updateOne(query, updatedDoc)
      
      res.send(result)
    })

    // update an user by uid
    app.patch('/users', async (req, res) => {
      const { uid } = req.query
      const updateInfo = req.body

      const query = { uid }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await usersCollection.updateOne(query, updatedDoc)

      res.send(result)
    })
    
    // get employees projects
    app.get('/employee/projects/:id', async (req, res) => {
      const { id } = req.params
      const query = {
        $or: [{ team: { $elemMatch: { uid: id } } }, {
          assignedleaders: { $elemMatch: { uid: id } }
        }]
      }
      const result = await projectsCollection.find(query).toArray();
      res.send(result)
    });

    // get admin
    app.get('/users/admin', async (req, res) => {
      const { uid } = req.query
      const query = { uid, role: "Admin" }

      const result = await usersCollection.findOne(query)
      res.send({isAdmin: !!result})
    });

    // get client
    app.get('/users/client', async (req, res) => {
      const { uid } = req.query
      const query = { uid, role: "Client" }

      const result = await usersCollection.findOne(query)
      res.send({isClient: !!result})
    });


  } finally { }
}

run().catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("PerformTracker Server is running")
})

app.listen(port, () => {
  console.log("Server is running on port", port);
})