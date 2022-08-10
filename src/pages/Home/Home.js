import React from "react";
import Hero from "./Hero";
import SingleCard from "./SingleCard";

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Card section */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
      </div>

      {/* end card Section */}
    </div>
  );
};

export default Home;
