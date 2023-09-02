import React from "react";

const Navbar = () => {
  return (
    <nav className="navigation-bar">
      <div className="header">
        <h1
          onClick={() =>
            (window.location = "/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai")
          }
        >
          Todo on Chain
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
