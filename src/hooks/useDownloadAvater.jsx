import { useEffect, useState } from "react";
import { supabase } from "../supabaseClint";

const useDownloadAvater = () => {
  const [avaterSrcUrl, setAvaterSrcUrl] = useState("");
  //   useEffect(() => {
  //     downloadImage(url);
  //   }, []);
  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const getUrl = URL.createObjectURL(data);
      //   setAvatarUrl(getUrl);
      //   setAvatarUrlContext(getUrl);
      setAvaterSrcUrl(getUrl);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  return [avaterSrcUrl, downloadImage];
};
export default useDownloadAvater;
