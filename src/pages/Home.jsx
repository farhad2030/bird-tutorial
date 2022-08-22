import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/home/Hero";
import SingleCard from "../components/home/SingleCard";

const Home = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (hash) {
      navigate("resetPassword", { state: { hash } });
    }
    console.log(hash);
  }, []);
  return (
    <div>
      <Hero />
      <div class="flex flex-col w-full border-opacity-50">
        <div class=" text-3xl font-bold mb-10">Offline batch schedule</div>
      </div>

      {/* class schedule table  */}

      {/* <ClassScheduleTable /> */}
      <Outlet></Outlet>
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
