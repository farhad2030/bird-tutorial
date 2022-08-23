import React, { useContext, useEffect, useState } from "react";
import { sessionContext } from "../../context/sessionContext";
import { supabase } from "../../supabaseClint";
import ProfileUpdateModal from "./ProfileUpdateModal";

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar_url, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { session } = useContext(sessionContext);
  useEffect(() => {
    getProfile();
  }, []);
  //   [session, avatar_url]);

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
        setUsername(data.username);
        setPhone(data.phone);
        setAddress(data.address);
        setAvatarUrl(data.avatar_url);
        downloadImage(data.avatar_url);
      }
    } catch (error) {
      // alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   image download
  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  // upload profile image
  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (!uploadError) {
        console.log("updating database on avater change", filePath);
        //   setLoading(true);
        setAvatarUrl(filePath);
        console.log("avater url", avatar_url);
        const user = supabase.auth.user();
        console.log("avater user call", user);
        const updates = {
          id: user.id,
          avatar_url: filePath,
          updated_at: new Date(),
        };
        console.log("updates info ", updates);

        let { error: upsertError } = await supabase
          .from("profiles")
          .upsert(updates, {
            returning: "minimal", // Don't return the value after inserting
          });
        if (upsertError) {
          console.log(upsertError);
          throw upsertError;
        }

        //   console.log(error);
        //   alert(error.message);
      }
      if (uploadError) {
        throw uploadError;
      }
      //   onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <div class="avatar indicator mt-3">
        <span class="mt-3 indicator-item indicator-top indicator-end badge badge-secondary">
          <label htmlFor="selectUploadAvater">Edit</label>
          <input
            type="file"
            id="selectUploadAvater"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
            style={{ display: "none", userSelect: "none" }}
          />
        </span>

        <div class="w-24 rounded-full">
          <img
            src={avatar_url ? avatar_url : `https://place-hold.it/150x150`}
          />
        </div>
      </div>
      {/* upload button */}

      {/* update modal button */}

      {/* <!-- The button to open modal --> */}
      <label for="updateProfileModal" class="btn btn-xs my-3">
        Update profile
      </label>
      <ProfileUpdateModal />

      {/* swap name */}

      <div className="w-full text-center">
        <sapn>Name : </sapn>
        <span>
          {username ? (
            username
          ) : (
            <span className="text-red-300">"Plese update your name"</span>
          )}
        </span>
      </div>
      <div className="w-full text-center">
        <sapn>Email : </sapn>
        <span>{session?.user?.email}</span>
      </div>
      <div className="w-full text-center">
        <sapn>Phone : </sapn>
        <span>
          {phone ? (
            phone
          ) : (
            <span className="text-red-300">"Plese update your phone"</span>
          )}
        </span>
      </div>
      <div className="w-full text-center">
        <sapn>Address : </sapn>
        <span>
          {address ? (
            address
          ) : (
            <span className="text-red-300">"Plese update your address"</span>
          )}
        </span>
      </div>
    </>
  );
};

export default MyProfile;
