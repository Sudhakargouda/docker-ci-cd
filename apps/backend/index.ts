import express from "express";
import { prismaClient } from "db/client"; // Make sure the path is correct

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "no data found"});
  }
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        password
      }
    });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
