"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Upload {
  id: number;
  pdf: string;
  mp3: string;
}

export default function AdminPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);

  useEffect(() => {
    const fetchUploads = async () => {
      const res = await axios.get("http://localhost:3001/uploads");
      setUploads(res.data);
    };

    fetchUploads();
    const interval = setInterval(fetchUploads, 5000); // Mise à jour auto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Fichiers ajoutés</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">PDF</th>
            <th className="border p-2">MP3</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload) => (
            <tr key={upload.id}>
              <td className="border p-2">
                <a
                  href={`/uploads/${upload.pdf}`}
                  download
                  className="text-blue-500"
                >
                  {upload.pdf}
                </a>
              </td>
              <td className="border p-2">
                <a
                  href={`/uploads/${upload.mp3}`}
                  download
                  className="text-green-500"
                >
                  {upload.mp3}
                </a>
              </td>
              <td className="border p-2">
                <button
                  onClick={async () => {
                    await axios.delete(
                      `http://localhost:3001/uploads/${upload.id}`
                    );
                    setUploads((prev) =>
                      prev.filter((u) => u.id !== upload.id)
                    );
                  }}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
