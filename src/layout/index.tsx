import React from "react";
import Asider from "./Asider";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import './index.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Asider />
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
