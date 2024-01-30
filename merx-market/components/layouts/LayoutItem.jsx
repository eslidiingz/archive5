import Link from "next/link";
import Footer from "./Footer";
import Search from "../form/search";
import { useState } from "react";
import { Navbar, Container, Form, FormControl, Nav, NavDropdown } from "react-bootstrap";

import TopbarItem from "./TobbarItem";

function LayoutItem({ children }) {
  const [toggleViewMode, setToggleViewMode] = useState(false);
  return (
    <>
      <div className="main-layout position-relative ">
        <TopbarItem />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default LayoutItem;
