import mongoose from "mongoose"
import data from "../data.json" assert {type:"json"}
import recipeModel from "../models/Recipe.model.js"

async function connect (){

    const newRecipe = {
        title: "Macarrão",
        level: "Easy Peasy",
        ingredients: ["massa", "água", "sal", "molho de tomate"],
        cuisine: "Italiana",
        dishType:"breakfast",
        image: "https://images.media-allrecipes.com/images/75131.jpg",
        duration: 10,
        creator: "Paola Carocella",
        created: new Date
    }
    
    try{
  
      const dbConnect = await mongoose.connect(process.env.MONGODB_URI)
        .then(x => {
          console.log(`Connected to the database: "${x.connection.name}"`);
          // Before adding any recipes to the database, let's remove all existing ones
          return recipeModel.deleteMany()
        }).then(() => {

            return recipeModel.create(newRecipe)
            
        })

    }catch(error)
    {
      console.error('Error connecting to the database', error);
    }
      console.log(newRecipe.title)
    try { 
      
     await recipeModel.insertMany(data)
      console.log("Dando a carga no banco de dados")
      
    } catch (error) {
      console.log(error)
    }

    try {
      //update recipe
      await  recipeModel.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100})
      console.log("Objeto atualizado com sucesso!!")
      //(title: "Rigatoni alla Genovese")
    } catch (error) { 
      console.log(error)
    }

    try {
      //remove recipe
      await recipeModel.deleteOne({title:"Carrot Cake"})
    } catch (error) {
      console.log(error)
    }
    
    try {
      //close data base
      const dbConnect = mongoose.disconnect(process.env.MONGODB_URI)
      console.log("Banco desconectado!!")


    } catch (error) {
      console.log(error)
    }
    
  }
  
  export default connect