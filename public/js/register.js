// Browser code: runs in the page, never in Node.
const form = document.getElementById("register-form");
const message = document.getElementById("register-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop the browser reloading the page / sending the form itself

  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value; // no trim: spaces can be intentional

  message.textContent = "Creating account...";

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      message.textContent = data.message + " Redirecting to log in...";
      form.reset();
      setTimeout(() => { window.location.href = "index.html"; }, 1500);
    } else {
      message.textContent = data.message; // e.g. "That username is already taken."
    }
  } catch (err) {
    message.textContent = "Couldn't reach the server. Is it running?";
  }
});
