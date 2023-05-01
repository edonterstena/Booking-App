import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import Email from "../../components/emailFeature/Email";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <div name="container" className="w-auto">
      <Navbar />
      <Header />
      <Featured />
      <Email />
      <Footer />
    </div>
  );
}

export default Home;
