const express = require("express")
const router = express.Router()

const mongoClient = require("../config/db.js")

// localhost:3000/db/

router.get("/", (req, res) => {
    res.send("<h1>Dhruv Nitinbhai Vaghasiya</h1>")
})

// TODO Add a "/collections" route handler that lists the collections available in the sample_mflix database
router.get("/collections", async(req, res) => {
    let connection= await mongoClient.connect()
    let db = await connection.db("sample_mflix")
    let collection =await db.listCollections().toArray()

    let data={
         collections: collection,
    }
    res.render("collections", data)
});

router.get("/movies", async (req, res) => {
    try {
      let connection = await mongoClient.connect();
      let db = await connection.db("sample_mflix");
      let moviesCollection = db.collection("movies");
      let movies = await moviesCollection.find({}).limit(50).toArray();

      let data={
        movies:movies,
            }
     // res.render("movies",data);
            res.json(data);
      } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).render({ error: "Internal Server Error" });
      
    }
  });

//Router to get directors of all short movies with its IMDB rating 
    router.get("/directors", async (req, res) => {
      try {
          let connection = await mongoClient.connect();
          let db = await connection.db("sample_mflix");
          let moviesCollection = db.collection("movies");

          let result = await moviesCollection
          .find({ genres: "Short" })
          .toArray();
          let directors = Array.from(new Set(result.map(movie => movie.directors).flat()));
          

          let data = {
            directors: directors,
            movies:result,
          };

          res.render("directors", data);
      } catch (error) {
          console.error("Error fetching directors", error);
          res.status(500).render({ error: "Internal Server Error" });
      }
  });

  //Router to get movies of genres history with their release year and IMDB ratings
  router.get("/history", async(req, res) => {
    try{
      let connection = await mongoClient.connect();
      let db = await connection.db("sample_mflix");
      let moviesCollection = db.collection("movies");

      let result = await moviesCollection
            .find({ genres: "History" }).toArray();

      let data={
        movies:result,
      }
      res.render("history", data);

    }
    catch(error){
      console.error("Error fetching historic Movies", error);
      res.status(500).render({ error: "Internal Server Error" });
    }
  }) 


  //Router to get movies of genres "Drama"
router.get("/genre", async (req, res) => {
  try{
    let connection = await mongoClient.connect();
    let db = await connection.db("sample_mflix");
    let moviesCollection = db.collection("movies");

    let getMovies= await moviesCollection.find({genres:["Drama"]}).toArray();
    let data={
      movies: getMovies,
    }
    res.render("genre", data);

  }
  catch (error) {
    console.error("Error fetching movies of those types", error);
        res.status(500).render("error", { error: "Internal Server Error" });
  }
})

module.exports = router
