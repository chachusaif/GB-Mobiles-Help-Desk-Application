// Helpdesk server (Node + Express).
// v1 storage: users.json next to this file. Later this gets swapped for a cloud database.


//checks if data entered is validated, if it is, it is loaded into a json file (user.json), it uses bcrypt on the password

const express = require("express");        // web server framework
const bcrypt = require("bcrypt");          // salted, slow password hashing
const fs = require("fs").promises;         // read/write files (promise version, works with await)
const path = require("path");              // build file paths safely

const app = express();
const PORT = 3000;
const USER_FILE = path.join(__dirname, "users.json"); // exact path, however node is launched

app.use(express.json());                                  // parses JSON bodies into req.body (must come before routes)
app.use(express.static(path.join(__dirname, "public")));  // serves register.html, index.html, js/...
app.listen();

// ---------- storage helpers ----------

// Read users.json and return it as an array. If the file doesn't exist yet, start with [].
async function readUsers() {
  try {
    const text = await fs.readFile(USER_FILE, "utf8");
    return JSON.parse(text);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// Replace the whole file with the given array. JSON.stringify(value, null, 2) = readable, 2-space indent.
async function writeUsers(users) {
  await fs.writeFile(USER_FILE, JSON.stringify(users, null, 2), "utf8");
}

// ---------- routes ----------

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body ?? {};

    // 1. validate: never trust what the browser sent
    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Username and password are required." });
    }
    const cleanName = username.trim();
    if (cleanName.length < 3 || cleanName.length > 32) {
      return res.status(400).json({ message: "Username must be 3-32 characters." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }
    if (Buffer.byteLength(password) > 72) { // bcrypt only uses the first 72 bytes
      return res.status(400).json({ message: "Password is too long (72 bytes max)." });
    }

    // 2. load existing users and reject duplicates (case-insensitive)
    const users = await readUsers();
    const taken = users.some((u) => u.username.toLowerCase() === cleanName.toLowerCase());
    if (taken) {
      return res.status(409).json({ message: "That username is already taken." });
    }

    // 3. hash the password (12 = cost factor; the salt is generated and stored inside the hash)
    const passwordHash = await bcrypt.hash(password, 12);

    // 4. add the new user and save. The role is set here, never read from the request.
    users.push({ username: cleanName, passwordHash, role: "customer" });
    await writeUsers(users);

    res.status(201).json({ message: "Account created." });
  } catch (err) {
    console.error("Register failed:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
