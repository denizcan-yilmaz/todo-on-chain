import React from "react";
import { ConnectButton } from "@connect2ic/react";

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
        <div className="connect-btn">
          <ConnectButton
            style={{
              padding: "10px",
              backgroundColor: "white",
              color: "#7929bb",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
