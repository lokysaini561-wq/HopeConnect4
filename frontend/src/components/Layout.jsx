// components/Layout.js
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;