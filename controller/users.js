const users = require("../JsonData/users.json");
const fs = require("fs");
const path = require("path");

const updateUser = path.join(__dirname, "../JsonData/users.json");


function writeUsersFile(users) {
    fs.writeFileSync(updateUser, JSON.stringify(users, null, 2));
  }

exports.getAllUsers = (req, res) => {
    res.json(users);
}

exports.getUser = (req, res) =>{
    const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}
exports.addUser = (req, res) =>{
    const { id, name, address } = req.body;
    if (!id || !name || !address) {
        return res.status(400).json({ error: 'Please provide id, name, and email' });
    }      
    const newUser = { id, name, address };
    users.push(newUser);
    writeUsersFile(users);     
    res.status(201).json({success: 'user created successfully'});
}
exports.editUser = (req, res) =>{
    const userId = parseInt(req.params.id);
    const { name, address } = req.body;
    if (!name || !address) {
        return res.status(400).json({ error: 'Please provide name and email' });
    }
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.name = name;
    user.address = address;
    writeUsersFile(users);
    res.json(user);
}

exports.deleteUser = (req, res) =>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => parseInt(u.id) === userId);
  
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    users.splice(userIndex, 1);
    writeUsersFile(users);
  
    res.status(201).json({success:'user deleted successfully!!!'});
}