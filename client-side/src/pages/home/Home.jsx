import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

import Email from "../../components/emailFeature/Email";
import Footer from "../../components/footer/Footer";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/Propertylist";

function Home() {
  return (
    <div name="container" className="w-auto bg-[#F5f5f5]">
      <Navbar />
      <Header />
      <Featured />
      <PropertyList />
      <FeaturedProperties />
      <Email />
      <Footer />
    </div>
  );
}

export default Home;
