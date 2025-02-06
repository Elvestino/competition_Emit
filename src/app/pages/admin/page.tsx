"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/app/environment/api";
import Swal from "sweetalert2";

interface Upload {
  randomId: number;
  pdf: string;
  mp3: string;
  accepted: boolean;
}

export default function AdminPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);

  useEffect(() => {
    const fetchUploads = async () => {
      const response = await axios.get(`${API_URL}/uploads`);
      setUploads(response.data);
    };

    fetchUploads();
  }, []);

  const handleAccept = async (upload: Upload) => {
    setUploads((prev) =>
      prev.map((u) =>
        u.randomId === upload.randomId ? { ...u, accepted: true } : u
      )
    );

    await axios.patch(`${API_URL}/uploads/${upload.randomId}`, {
      accepted: true,
    });

    Swal.fire({
      icon: "success",
      title: "Participant accepté",
      text: `Vous avez accepté ce participant avec le numéro ${upload.randomId}`,
    });
  };

  const handleDelete = async (upload: Upload) => {
    await axios.delete(`${API_URL}/uploads/${upload.randomId}`);
    setUploads((prev) => prev.filter((u) => u.randomId !== upload.randomId));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Participants</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border p-2">Numero</th>
              <th className="border p-2">PDF</th>
              <th className="border p-2">MP3</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload) => (
              <tr key={upload.randomId}>
                <td className="border p-2">{upload.randomId}</td>
                <td className="border p-2">
                  {/* Lien de téléchargement pour le fichier PDF */}
                  <a
                    href={`${API_URL}/uploads/${upload.pdf}`}
                    download
                    className="text-blue-500"
                  >
                    {upload.pdf}
                  </a>
                </td>
                <td className="border p-2">
                  {/* Lien de téléchargement pour le fichier MP3 */}
                  <a
                    href={`${API_URL}/uploads/${upload.mp3}`}
                    download
                    className="text-green-500"
                  >
                    {upload.mp3}
                  </a>
                </td>
                <td className="border p-2">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {!upload.accepted ? (
                      <>
                        <button
                          onClick={() => handleAccept(upload)}
                          className="bg-blue-500 text-white p-2 rounded mb-2 sm:mb-0"
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => handleDelete(upload)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          Rejeter
                        </button>
                      </>
                    ) : (
                      <span className="text-green-500">
                        Participant accepté
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
