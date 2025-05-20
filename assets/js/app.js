document.addEventListener("DOMContentLoaded", () => {
    // ==== INSCRIPTION ====
    document.getElementById("formInscrip").addEventListener("submit", async (e) => {
        e.preventDefault();
        const userName = document.getElementById("userName").value.trim();
        const email = document.getElementById("mail").value.trim();
        const motDePasse = document.getElementById("mdp").value;

        if (!userName || !email || !motDePasse) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: userName, email, password: motDePasse }),
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            alert("Erreur serveur pendant l'inscription.");
            console.error(error);
        }
    });

    // ==== CONNEXION ====
    document.getElementById("formConnexion").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("mailConnexion").value.trim();
        const motDePasse = document.getElementById("mdpConnexion").value;

        if (!email || !motDePasse) {
            alert("Veuillez entrer vos identifiants.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: motDePasse }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Connexion réussie !");
                // Redirection possible :
                // window.location.href = "users.html";
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("Erreur serveur pendant la connexion.");
            console.error(error);
        }
    });
});
