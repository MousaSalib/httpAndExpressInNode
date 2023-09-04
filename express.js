const express = require("express");
const app = express();
app.use(express.json());

let users = [
    {name: "Mousa", age:24},
    {name: "khairy", age: 52},
    {name: "Halim", age: 80}
];

app.get("/", (req, res) => {
    res.json(users)
});

app.post("/addUser", (req, res) => {
    let {name, age} = req.body;
    let nameEx = users.find((ele) => ele.name == name);
    if(nameEx) {
        res.json({message: "existed"})
    }else {
        users.push({name, age})
        res.json({message: "is added"})
    }
});

app.delete("/", (req, res) => {
    let {name} = req.body;
    let deletedUser = users.filter((ele) => ele.name != name);
    if(deletedUser.length == users.length) {
        res.json({message: "there is not found"})
    }else {
        res.json({message: "Is Deleted"})
    }
});

app.delete("/:name", (req, res) => {
    let {name} = req.params;
    let deletedUser = users.filter((ele) => ele.name != name);
    if(deletedUser.length == users.length) {
        res.json({message: "there is not found"})
    }else {
        res.json({message: "Is Deleted"})
    }
});

app.get("/getusers", (req, res) => {
    const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    res.status(200).json(sortedUsers);
  });

app.put("/updateuser/:name", (req, res) => {
    const userNameToUpdate = req.params.name;
    const updatedUserData = req.body;
    const userIndex = users.findIndex((user) => user.name === userNameToUpdate);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUserData };
      res.status(200).json(users[userIndex]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
});

app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
  
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
    } else {
      const user = users.find((u) => u.id === userId);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
});  
// =========================================================================================
let posts = [
    {Publisher: "Ahmed", About: "Learning"},
    {Publisher: "Mohamed", About: "Health"},
    {Publisher: "Omar", About: "Economy"}
];
app.get("/", (req, res) => {
    res.json(posts)
});

app.post("/addPost", (req, res) => {
    let {Publisher, About} = req.body;
    let publisherEx = posts.find((ele) => ele.Publisher == Publisher);
    if(publisherEx) {
        res.json({message: "existed"})
    }else {
        posts.push({Publisher, About})
        res.json({message: "is added"})
    }
});

app.delete("/", (req, res) => {
    let {Publisher} = req.body;
    let deletedPublisher = posts.filter((ele) => ele.Publisher != Publisher);
    if(deletedPublisher.length == posts.length) {
        res.json({message: "there is not found"})
    }else {
        res.json({message: "Is Deleted"})
    }
});

app.delete("/:Publisher", (req, res) => {
    let {Publisher} = req.params;
    let deletedPublisher = posts.filter((ele) => ele.Publisher != Publisher);
    if(deletedPublisher.length == posts.length) {
        res.json({message: "there is not found"})
    }else {
        res.json({message: "Is Deleted"})
    }
});

app.get("/getPosts", (req, res) => {
    const sortedPosts = posts.slice().sort((a, b) => a.Publisher.localeCompare(b.Publisher));
    res.status(200).json(sortedPosts);
  });

  app.put("/updatePosts/:Publisher", (req, res) => {
    const postPublisherToUpdate = req.params.Publisher;
    const updatedPostsData = req.body;
    const PostIndex = posts.findIndex((Post) => Post.Publisher === postPublisherToUpdate);
    if (PostIndex !== -1) {
      posts[PostIndex] = { ...posts[PostIndex], ...updatedPostsData };
      res.status(200).json(posts[PostIndex]);
    } else {
      res.status(404).json({ error: "Publisher not found" });
    }
});

app.get("/posts/:id", (req, res) => {
    const PublisherId = parseInt(req.params.id);
  
    if (isNaN(PublisherId)) {
      res.status(400).json({ error: "Invalid Publisher ID" });
    } else {
      const publisher = posts.find((u) => u.id === PublisherId);
  
      if (publisher) {
        res.status(200).json(publisher);
      } else {
        res.status(404).json({ error: "Publisher not found" });
      }
    }
}); 
