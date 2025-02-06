"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin") {
      router.push("/pages/admin");
    } else {
      router.push("/pages/users");
    }
    Swal.fire("Succès!", "Connexion réussie!", "success");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-blue-400 p-10 rounded-xl flex flex-col items-center justify-center">
        <h1 className="text-2xl text-center font-bold mb-4 text-white">
          Connexion
        </h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="border p-2 mb-4 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
}
