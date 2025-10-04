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
      const { data, error } = await supabase.storage.from("avatars").download(path);
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
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);
      if (uploadError) throw uploadError;
      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4"> 
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full object-cover border-2 border-secondary/50" 
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="rounded-full bg-card-bg flex items-center justify-center border-2 border-secondary/50" 
          style={{ height: size, width: size }}
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary/70">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      )}
      
      
      <label className="bg-accent text-primary font-heading px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {uploading ? "CARICAMENTO..." : "CARICA IMMAGINE"}
        <input
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}