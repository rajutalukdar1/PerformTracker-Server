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
    const tasksCollection = client.db('performTracker').collection('tasks');
    const blogsCollection = client.db('performTracker').collection('blogs');
    const projectsCollection = client.db('performTracker').collection('projects');
    const trainingCollection = client.db('performTracker').collection('training')
    const trainingTypeCollection = client.db('performTracker').collection('trainingType')
    const trainerCollection = client.db('performTracker').collection('trainer')
    const promotionCollection = client.db('performTracker').collection('promotion');
    const teamsCollection = client.db('performTracker').collection('teams');


    // get all task
    app.get('/promotion', async (req, res) => {
      const query = {}
      const task = promotionCollection.find(query).sort({ _id: -1 });
      const services = await task.toArray();

      res.send(services)
    })

    // get task post
    app.post('/promotion', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await promotionCollection.insertOne(user)
      res.send(result);
    })

    // get promotion delete
    app.delete('/promotion/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await promotionCollection.deleteOne(query)

      res.send(result)
    })

    // update a task by id
    app.patch('/promotion/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body
      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await promotionCollection.updateOne(query, updatedDoc)

      res.send(result)

    })

    // get all task
    app.get('/task', async (req, res) => {
      const query = {}
      const task = await taskCollection.find(query).toArray()

      res.send(task)
    })

    // get task post
    app.post('/task', async (req, res) => {
      const user = req.body;
      const result = await taskCollection.insertOne(user)
      res.send(result);
    })

    // update a task by id
    app.patch('/task/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body
      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await taskCollection.updateOne(query, updatedDoc)
      res.send(result)
    })

    // get task delete
    app.delete('/task/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await taskCollection.deleteOne(query)

      res.send(result)
    })

    // get task delete
    app.delete('/clients/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await clientCollection.deleteOne(query)

      res.send(result)
    })

    // get client post
    app.post('/clients', async (req, res) => {
      const user = req.body;
      const result = await clientCollection.insertOne(user)
      res.send(result);
    })


    /* ------ 🤝Clients🤝 ------- */
    // get all Clients
    app.get('/client', async (req, res) => {
      const query = {}
      const cursor = clientCollection.find(query).sort({ _id: -1 });
      const services = await cursor.toArray();
      res.send(services);
    });

    // get an client by id

    app.patch('/clients/:id', async (req, res) => {
      const id = req.params.id;
      const client = req.body
      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: client
      }
      const result = await clientCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    app.get('/client/:id', async (req, res) => {

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

    // update the client in database
    app.patch('/client/:id', async (req, res) => {
      const { id } = req.params
      const updateInfo = req.body
      const query = { _id: ObjectId(id) }
      const updatedDoc = {
        $set: updateInfo
      }
      const result = await clientCollection.updateOne(query, updatedDoc)

      res.send(result)

    })

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
      const { name } = req.query
      const query = name ? { name: { '$regex': name, '$options': 'i' } } : {}
      const employees = await employeesCollection.find(query).toArray()
      res.send(employees)
    })

    // get an employee by id
    app.get('/employees/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const result = await employeesCollection.findOne(query)
      res.send(result)
      console.log(result);
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

    // find each the employee by email
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
      const { uid } = req.query
      const query = { uid }
      const user = await usersCollection.findOne(query) || {}
      res.send(user)
    })

    // create a new user
    app.post('/users', async (req, res) => {
      const user = req.body
      const result = await usersCollection.insertOne(user)

      res.send(result)
    })


    /* ------ 🧑‍💼Trining List🧑‍💼 ------- */
    // get all trainig list
    app.get('/training', async (req, res) => {
      const query = {}
      const training = await trainingCollection.find(query).toArray()
      res.send(training)
    })

    app.post('/training', async (req, res) => {
      const query = req.body
      const training = await trainingCollection.insertOne(query)
      res.send(training)
    })

    /* ------ 🧑‍💼Trining🧑‍💼 ------- */
    // get all Triner
    app.get('/trainer', async (req, res) => {
      const query = {}
      const trainer = await trainerCollection.find(query).toArray()
      res.send(trainer)
    })

    app.post('/trainer', async (req, res) => {
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
    app.get('/trainingtype', async (req, res) => {
      const query = {}
      const trainingtype = await trainingTypeCollection.find(query).toArray()
      res.send(trainingtype)
    })

    app.post('/trainingtype', async (req, res) => {
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


    /* ------ 📝Tasks📝 ------- */
    // get all tasks
    app.get('/tasks', async (req, res) => {
      const query = {}
      const tasks = await tasksCollection.find(query).toArray()

      res.send(tasks)
    })

    // get all tasks by projectId
    app.get('/project-tasks/:id', async (req, res) => {
      const { id } = req.params
      const query = { projectId: id }
      const tasks = await tasksCollection.find(query).toArray()

      res.send(tasks)
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


    /* ------ 👨‍👩‍👧‍👦Users👨‍👩‍👧‍👦 ------- */
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
      res.send({ isAdmin: !!result })
    });

    // get client
    app.get('/users/client', async (req, res) => {
      const { uid } = req.query
      const query = { uid, role: "Client" }

      const result = await usersCollection.findOne(query)
      res.send({ isClient: !!result })
    });


    /* ------ 📝teams📝 ------- */
    // get all teams
    app.get('/teams', async (req, res) => {
      const query = {}
      const teams = await teamsCollection.find(query).toArray()

      res.send(teams)
    })

    // get a blog by id
    app.get('/teams/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const blog = await teamsCollection.findOne(query)
      res.send(blog)
    })

    // create a new blog
    app.post('/teams', async (req, res) => {
      const blog = req.body
      const result = await teamsCollection.insertOne(blog)

      res.send(result)
    })

     // get a blog by id
     app.get('/leads/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const blog = await projectsCollection.findOne(query)
      res.send(blog)
    })

    /* ------ 📝tasks📝 ------- */
    // get all tasks
    app.get('/tasks', async (req, res) => {
      const query = {}
      const tasks = await tasksCollection.find(query).toArray()

      res.send(tasks)
    })

    // get a blog by id
    app.get('/tasks/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const blog = await tasksCollection.findOne(query)
      res.send(blog)
    })

    app.get('/project-tasks/:id', async (req, res) => {
      const { id } = req.params
      const query = { _id: ObjectId(id) }

      const tasks = await tasksCollection.find(query).toArray()
      res.send(tasks)
    })

    // create a new blog
    app.post('/tasks', async (req, res) => {
      const blog = req.body
      const result = await tasksCollection.insertOne(blog)

      res.send(result)
    })

    // // update an user by uid
    // app.patch('/project-tasks/id', async (req, res) => {
    //   const { id } = req.params
    //   const updateInfo = req.body

    //   const query = { id }
    //   const updatedDoc = {
    //     $set: updateInfo
    //   }
    //   const result = await usersCollection.updateOne(query, updatedDoc)

    //   res.send(result)
    // })

  } finally { }
}

run().catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("PerformTracker Server is running")
})

app.listen(port, () => {
  console.log("Server is running on port", port);
})