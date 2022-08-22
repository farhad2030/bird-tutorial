import React from "react";

const MyProfile = () => {
  return (
    <>
      <div class="avatar indicator mt-3">
        <span class="mt-3 indicator-item indicator-top indicator-end badge badge-secondary">
          Edit
        </span>

        <div class="w-24 rounded-full">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <button class="btn btn-sm my-3 ">Update Profile</button>
      {/* swap name */}

      <div>
        <sapn>Name : </sapn>
        <span>Md Mazharul islam</span>
      </div>
      <div>
        <sapn>Email : </sapn>
        <span>Md Mazharul islam</span>
      </div>
      <div>
        <sapn>Phone : </sapn>
        <span>Md Mazharul islam</span>
      </div>
      <div>
        <sapn>Address : </sapn>
        <span>Md Mazharul islam</span>
      </div>
    </>
  );
};

export default MyProfile;
