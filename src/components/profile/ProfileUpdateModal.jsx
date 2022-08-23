import React, { useContext, useEffect, useState } from "react";
import { sessionContext } from "../../context/sessionContext";
import { supabase } from "../../supabaseClint";

const ProfileUpdateModal = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [website, setWebsite] = useState(null);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { session } = useContext(sessionContext);

  useEffect(() => {
    getProfile();
  }, [session]);

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
      }
    } catch (error) {
      // alert(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        username,
        phone,
        address,

        avatar_url,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="updateProfileModal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle ">
        <div class="modal-box">
          <label
            for="updateProfileModal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">Update your profile</h3>
          <p class="mb-3 text-yellow-300">You connot edit your email.</p>

          {/* update form */}
          <form onSubmit={updateProfile}>
            {/* <ProfilePhoto
          size="150"
          url={avatar_url}
          onUpload={(url) => {
            setAvatarUrl(url);

            updateProfile({ username, website, avatar_url: url });
            // updateProfile();
          }}
        /> */}
            <div class="form-control">
              <label class="input-group my-2">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Your name"
                  class="input input-bordered w-full "
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div class="form-control">
              <label class="input-group my-2">
                <span>Phone</span>
                <input
                  type="text"
                  placeholder="Your name"
                  class="input input-bordered w-full "
                  value={phone || ""}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
            <div class="form-control">
              <label class="input-group my-2">
                <span>Address</span>
                <input
                  type="text"
                  placeholder="Your name"
                  class="input input-bordered w-full "
                  value={address || ""}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
            </div>

            <div class="modal-action">
              <label
                for="updateProfileModal"
                class="btn btn-sm"
                disabled={loading}
                onClick={updateProfile}
              >
                Save changes
              </label>
            </div>
          </form>
          {/* end update form */}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
