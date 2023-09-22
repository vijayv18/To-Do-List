require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI);

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to my TodoList"
})

const item2 = new Item({
  name: "Type in input box and hit '+' sign to get item added to list"
})

const item3 = new Item({
  name: "You can delete list items by checking them off"
})

const listSchema = ({
  name: String,
  items: [itemsSchema]
}); 

const List = mongoose.model("List", listSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  
  Item.find({})
    .then((foundItems)=>{

      if(foundItems.length === 0) {
        Item.insertMany([item1,item2,item3])
        .then(()=> {
            console.log("Successfully added all items to todolistDB");
        })
        .catch((err)=> {
            console.log(err);
        });
        res.redirect("/");

      }
      else {

        res.render("list.ejs", {
          listTitle: "Today",
          listItems: foundItems
        });

      }
    })
    .catch((err)=>{
      console.log(err);
    })
});

app.get("/:customListNames", function(req, res){
  const customListName = _.capitalize(req.params.customListNames);

  List.findOne({name: customListName})
    .then((foundList)=>{
      if(!foundList) {
        const list = new List({
          name: customListName,
          items: [item1,item2,item3]
        });
        list.save();
        res.redirect("/"+customListName);
      } else {
        res.render("list.ejs", {
          listTitle: foundList.name,
          listItems: foundList.items
        });
      }  
    })
    .catch((err)=>{
      console.log(err);
    });
    
});

app.post("/", function(req, res){

  const itemName = req.body.newTodo;
  const listName = req.body.listSubmit;

  const item = new Item({
    name : itemName
  });

  if(listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName})
      .then((foundList) => {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+listName);
      })
      .catch((err)=> {
        console.log(err);
      });
  }

  
});

app.post("/delete", (req,res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  
  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId)
    .then(()=>{
      console.log(`Successfully deleted ID: ${checkedItemId}`);
      res.redirect("/");
    })
    .catch((err)=>{
      console.log(err);
    })
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
      .then(()=> {
        console.log(`Successfully deleted ID: ${checkedItemId}`);
        res.redirect("/"+listName);
      })
      .catch((err)=> {
        console.log(err);
      });
  }
  
});

app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});