const Item = require('../models/ItemModel');


const getItems =async (req, res) => {
    try {
      const Items = await Item.find().sort({ date: -1 });  
      res.status(200).json(Items);

    }

    catch (error) {
     
      res.status(500).json({ message: 'Server error' });
    }


} 


const addItem =async (req,res) =>{
   
    const {note} =req.body;

    if (!note){
        return res.status(400).json({message:"add items "})
    }

    try {
         const item = new Item({note})
         await item.save()
         return res.status(200).json({message:"item added",item})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message:error})
    }
}



const updateItem = async (req,res) => {
  const id =req.params.id;
  const  {note} = req.body;

  try {
    const updateNote = await Item.findByIdAndUpdate(
     id, 
     {note},
     {new:true}
    );

    if (!updateNote) {
      return res.status(404).json({message:"not found"})

    }

    res.status(200).json(updateNote);
  }

  catch(error){
    res.status(500).json({ message: "Server error", error:error.message });
    console.error("Update error:", error);7
  }
}



const deleteItem = async (req,res) =>{
  const id = req.params.id;

  try {
    await Item.findByIdAndDelete(id);
    const message = "item deleted";
    res.status(200).json({ message})

  }
  catch (error) {
     res.status(500).json({message:"server error",error:error.message})
  }

}


module.exports = {
  getItems,addItem,updateItem,deleteItem
}

