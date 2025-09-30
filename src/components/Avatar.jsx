import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase-client";

export default function Avatar({ url, size = 100, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) throw error;

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Devi selezionare un’immagine.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full shadow-md border border-gray-300"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="rounded-full bg-gray-200 flex items-center justify-center shadow-md"
          style={{ height: size, width: size }}
        >
          <span className="text-sm text-gray-500">No Img</span>
        </div>
      )}
      <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline">
        {uploading ? "Caricamento..." : "Carica nuova"}
        <input
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          hidden
        />
      </label>
    </div>
  );
}
