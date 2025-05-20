const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Charger les utilisateurs
const getUsers = () => {
  if (!fs.existsSync("users.json")) return [];
  return JSON.parse(fs.readFileSync("users.json"));
};

const saveUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

// === ROUTE INSCRIPTION ===
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const users = getUsers();
  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: "Email déjà utilisé" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json({ message: "Utilisateur inscrit" });
});

// === ROUTE CONNEXION ===
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Identifiants incorrects" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

  res.json({ message: "Connexion réussie", user: { id: user.id, name: user.name, email: user.email } });
});

// === ROUTE USERS (SANS MOTS DE PASSE) ===
app.get("/users", (req, res) => {
  const users = getUsers().map(({ password, ...rest }) => rest);
  res.json(users);
});

app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
