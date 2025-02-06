"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/app/environment/api";

export default function UsersPage() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [mp3, setMp3] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!pdf || !mp3) {
      Swal.fire("Erreur", "Veuillez ajouter un PDF et un MP3", "error");
      return;
    }

    // Générer un numéro aléatoire pour cet upload, qui sera la clé unique
    const randomId = Math.floor(Math.random() * 1000000); // Numéro entre 0 et 999999

    try {
      // Envoi des données au JSON Server avec le randomId comme clé unique
      await axios.post(`${API_URL}/uploads`, {
        randomId: randomId, // Utilisation du randomId comme clé unique
        pdf: pdf.name,
        mp3: mp3.name,
        accepted: false, // Ajout de accepted à false
      });

      Swal.fire(
        "Succès!",
        `Fichiers ajoutés avec succès. Voici votre identifiant : ${randomId}. Veuillez ne pas perdre votre numéro.`,
        "success"
      );

      setPdf(null);
      setMp3(null);
    } catch (error) {
      Swal.fire("Erreur", "Échec de l'upload", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col border rounded-xl text-center p-9">
        <h1 className="text-2xl font-bold mb-4">Ajout de fichiers</h1>
        <label htmlFor="pdf" className="m-4 text-left">
          Fichier PDF :
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdf(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <label htmlFor="mp3" className="m-4 text-left">
          Fichier MP3 :
        </label>
        <input
          type="file"
          accept=".mp3"
          onChange={(e) => setMp3(e.target.files?.[0] || null)}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded font-semibold"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
