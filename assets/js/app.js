// Fonction d'inscription
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
    .then((data) => alert(data.message || data.error))
    .catch((err) => alert("Erreur serveur lors de l'inscription"));
}

// Fonction de connexion sécurisée via fetch POST
document.getElementById("formConnexion").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("mailConnexion").value;
  const motDePasse = document.getElementById("mdpConnexion").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: motDePasse }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Connexion réussie") {
        alert("Connexion réussie !");
        // window.location.href = "index.html"; // Décommente pour rediriger
      } else {
        alert(data.message || "Email ou mot de passe incorrect");
      }
    })
    .catch((err) => {
      console.error("Erreur fetch login:", err);
      alert("Erreur serveur lors de la connexion");
    });
});

// Fonction pour récupérer et afficher les utilisateurs dans la console
function afficherUtilisateurs() {
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      console.log("Liste des utilisateurs :", data);
      // Ici tu peux faire l'affichage dans un tableau HTML si tu veux
    })
    .catch((err) => console.error("Erreur fetch users :", err));
}

// Appel de la fonction au chargement de la page
afficherUtilisateurs();
