"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function UsersPage() {
  const [pdf, setPdf] = useState<File | null>(null);
  const [mp3, setMp3] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!pdf || !mp3) {
      Swal.fire("Erreur", "Veuillez ajouter un PDF et un MP3", "error");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("mp3", mp3);

    try {
      await axios.post("http://localhost:3001/uploads", {
        pdf: pdf.name,
        mp3: mp3.name,
      });

      Swal.fire("Succès!", "Fichiers ajoutés avec succès", "success");
      setPdf(null);
      setMp3(null);
    } catch (error) {
      Swal.fire("Erreur", "Échec de l'upload", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Ajout de fichiers</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setPdf(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <input
        type="file"
        accept=".mp3"
        onChange={(e) => setMp3(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white p-2 rounded"
      >
        Ajouter
      </button>
    </div>
  );
}
