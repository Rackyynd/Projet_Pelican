document.addEventListener("DOMContentLoaded", () => {
  //Inscription

  //Initialisation de la base de donnee stimule
  let user = JSON.parse(localStorage.getItem("users")) || [];
  // Gestion d'Inscription
  document
    .getElementById("formInscrip")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      //Recuperation des champs
      const userName = document.getElementById("userName").value;
      const email = document.getElementById("mail").value;
      const motDePasse = document.getElementById("mdp").value;
      //console.log(userName,email,motDePasse);
      //verifier si l'email existe deja
      let EmaiExiste = user.find((u) => u.email === email);
      if (EmaiExiste) {
        alert;
      } else {
      }
    });
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
});
