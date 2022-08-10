import React from "react";

const SingleCard = () => {
  return (
    <div>
      <div class="card bg-base-100 shadow-xl ">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="course title" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Course Title</h2>
          <p>
            The quick brown fox jumps over the lazy dog .The quick brown fox
            jumps over the lazy dog
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
