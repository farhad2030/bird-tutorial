import React from "react";
import ClassScheduleTable from "../components/home/ClassScheduleTable";
import Hero from "../components/home/Hero";
import SingleCard from "../components/home/SingleCard";

const Home = () => {
  return (
    <div>
      <Hero />
      <div class="flex flex-col w-full border-opacity-50">
        <div class="divider text-3xl font-bold mb-10">
          Offline batch schedule
        </div>
      </div>

      {/* class schedule table  */}

      <ClassScheduleTable />
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
