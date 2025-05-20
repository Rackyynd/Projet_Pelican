function register(e) {
  e.preventDefault();
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message || data.error));
}

//Connexion
document
  .getElementById("formConnexion")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    //Recuperation des champs
    const email = document.getElementById("mailConnexion").value;
    const motDePasse = document.getElementById("mdpConnexion").value;
    //console.log(userName,email,motDePasse);
    const userFound = user.find(
      (u) => u.email === email && u.motDePasse === motDePasse
    );
    if (userFound) {
      alert("connexion reussie");
      //window.location.href = "index.html";
    } else {
      alert("Email ou mot de passe incorrect");
    }
  });
