"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin") {
      router.push("/admin");
    } else {
      router.push("/users");
    }
    Swal.fire("Succès!", "Connexion réussie!", "success");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        className="border p-2 mb-4"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Se connecter
      </button>
    </div>
  );
}
