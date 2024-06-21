import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/footer.css";
import {
  Dashboard,
  DonutSmall,
  InsertChart,
  ReceiptLong,
} from "@mui/icons-material";

const Footer = () => {
  const navigate = useNavigate();

  async function dashboard() {
    navigate("/dashboard");
  }
  async function category() {
    navigate("/category");
  }
  async function analytics() {
    navigate("/analytics");
  }
  async function transaction() {
    navigate("/transaction");
  }
  return (
    <footer>
      <Dashboard
        className="foo-icon"
        fontSize="large"
        onClick={() => dashboard()}
      />
      <DonutSmall
        className="foo-icon"
        fontSize="large"
        onClick={() => category()}
      />
      <InsertChart
        className="foo-icon"
        fontSize="large"
        onClick={() => analytics()}
      />
      <ReceiptLong
        className="foo-icon"
        fontSize="large"
        onClick={() => transaction()}
      />
    </footer>
  );
};

export default Footer;
