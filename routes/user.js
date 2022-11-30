import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [{ id: 1, name: "drew", mail: "456@gmail.com", age: 26 }];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  users.push({ id: uuidv4(), ...user });
  res.send(`New user ${user.name} been added`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const got = users.find((user) => user.id == id);
  console.log(got);
  res.send(got);
});

router.delete("/:id",(req,res)=>{
    const {id} =req.params
    const deleteuser= users.filter((user) => user.id != id)
    res.send(deleteuser)
})


router.patch("/:id",(req,res)=>{
    const {id} =req.params
const {name,mail,age}=req.body
    const user= users.find((user) => user.id == id);

    if(name) user.name=name
    if(mail) user.mail=mail
    if(age) user.age=age

    res.send(`user with the ${id} changed its details`)
})
export default router;
