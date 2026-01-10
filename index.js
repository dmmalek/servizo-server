const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const servizo_Service = client.db("servizoService");
    const serviceCollection = servizo_Service.collection("services");

    // post services data
    app.post("/services", async (req, res) => {
      const service = req.body;
      const serviceData = await serviceCollection.insertOne(service);
      res.send(serviceData);
    });
    // get service data
    app.get("/services", async (req, res) => {
      const result = await serviceCollection.find().toArray();
      res.send(result);
    });

    // get service data using id
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(filter);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Service Sharing Server Running");
});

app.listen(port, () => {
  console.log(`Service Sharing on port ${port}`);
});
