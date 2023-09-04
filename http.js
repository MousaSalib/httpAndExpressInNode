// const httpServer = require("http")
// const Server = httpServer.createServer(function(req, res) {
//     if(req.url == "/" && req.method == "GET") {
//         res.end("Home");
//     }else if(req.url == "/about" && req.method == "GET") {
//         res.end("About");
//     }else if(req.url == "/setting" && req.method == "GET") {
//         res.end("setting")
//     }else{
//         res.end("Not Found")
//     }
// }).listen(5500)
let users = [
    {name: "Mousa", age:24},
    {name: "khairy", age: 52},
    {name: "Halim", age: 80}
]
const httpServer = require("http")
const Server = httpServer.createServer(function(req, res) {
    if(req.url == "/all users" && req.method == "GET") {
        res.end(JSON.stringify(users))
    }else if (req.url == "/addUser" && req.method == "POST") {
        req.on("data", function(chunk) {
            users.push(JSON.parse(chunk));
            res.end(users)
        })
    }else if (req.url == "/arrange" && req.method == "GET") {
        let sortUsers = users.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0; // 
          });
          res.end(JSON.stringify(sortUsers));
    } else if (req.method === 'DELETE' && req.url == "/deletedUser") {
        const userId = parseInt(req.url.split('/')[2]);
        const deletedUser = deleteUser(userId);

        if (deletedUser) {
            res.writeHead(204, { 'Content-Type': 'text/plain' });
            res.end('User deleted successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User not found');
        }
    } else if(res.writeHead(404, { 'Content-Type': 'text/plain' })) {
        res.end('Invalid endpoint');
    }
    function deleteUser(userId) {
        const userIndex = users.findIndex(user => user.age === userId);
      
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
          return true;
        } else {
          return false;
        }
      };
       if (req.method !== "PUT" && req.method !== "PATCH") {
        res.statusCode = 405; 
        return res.end("Method not allowed");
      }
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const requestBody = JSON.parse(body);
          const userNameToUpdate = requestBody.name;
          const index = users.findIndex((user) => user.name === userNameToUpdate);
          if (index !== -1) {
            users[index] = requestBody;
            res.statusCode = 200;
            res.end("User updated successfully");
          } else {
            res.statusCode = 404;
            res.end("User not found");
          }
        } catch (error) {
          res.statusCode = 400;
          res.end("Invalid JSON data");
        }
      }); 
      if (reg.url == "/" && req.method === "GET") {
        const urlParts = req.url.split("/");
        const userId = parseInt(urlParts[1], 10);
        if (isNaN(userId)) {
          res.statusCode = 400;
          res.end("Invalid user ID");
          return;
        }
        const user = users.find((u, index) => index === userId - 1);
        if (user) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 404;
          res.end("User not found");
        }
      } else {
        res.statusCode = 405; 
        res.end("Method not allowed");
      } 
}).listen(5500)

let posts = [
    {Publisher: "Ahmed", About: "Learning"},
    {Publisher: "Mohamed", About: "Health"},
    {Publisher: "Omar", About: "Economy"}
]
const httpServe = require("http");
const Serve = httpServe.createServer(function(req, res) {
    if(req.url == "/all posts" && req.method == "GET") {
        res.end(JSON.stringify(posts));
    }else if (req.url == "/" && req.method == "POST") {
        res.end("data", function(chunk) {
            users.push(JSON.parse(chunk));
            res.end(posts)})
    }else if (reg.url == "/reversed posts" && req.method == "GET") {
        let reversedPosts = posts.reverse()
        res.end(JSON.stringify(reversedPosts))
    }else if (req.url == "/deleted" && req.method == "DELETE") {
        const postIndexToDelete = 1;
        if (postIndexToDelete >= 0 && postIndexToDelete < posts.length) {
            posts.splice(postIndexToDelete, 1);
            console.log("Post deleted successfully.");
          }else {
            console.log("Invalid post index. Post not deleted.");
          }
         res.end(JSON.parse(posts))
    }else if (req.url == "/updated" && req.method == "PUT" || req.method == "PATCH") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString()
        });
        req.on("end", () => {
            try {
                const requestData = JSON.parse(body);
                if(req.method == "PUT") {
                    resource = requestData;
                }else if (req.method == "PATCH") {
                    Object.assign(resource, requestData);
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(resource));
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid JSON data");
            }
        })
    }else {
        res.statusCode = 405;
        res.end("Method not allowed");
    }
})