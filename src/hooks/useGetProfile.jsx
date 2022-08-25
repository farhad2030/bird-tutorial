import { useEffect, useState } from "react";
import { supabase } from "../supabaseClint";

const useGetProfile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar_url, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [getData, setGetData] = useState({});

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, phone,address, avatar_url`)
        .eq("id", user.id)
        .single();

      console.log("user data", data);

      if (error) {
        throw error;
      }
      if (data) {
        setGetData(data);
        setUsername(data.username);
        setPhone(data.phone);
        setAddress(data.address);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      // alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [getData];
};
export default useGetProfile;
