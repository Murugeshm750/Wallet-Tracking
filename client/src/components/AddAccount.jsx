import React from "react";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import "../styles/addAccount.css";
import { FormControl } from "@mui/material";
import axios from "axios"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const currencyOptions = [
  { value: "USD", label: "USD - United States Dollar", symbol: "$" },
  { value: "EUR", label: "EUR - Euro", symbol: "€" },
  { value: "GBP", label: "GBP - British Pound Sterling", symbol: "£" },
  { value: "JPY", label: "JPY - Japanese Yen", symbol: "¥" },
  { value: "INR", label: "INR - Indian Rupee", symbol: "₹" },
];


const AddAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { footerDashboard } = location.state
    ? location.state.shareUserName
    : {};

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const accountDetails = {
    accountName: "",
    currentBalance: "",
    currency: "",
  };
  const [formData, setFormData] = useState(accountDetails);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accountName || !formData.currentBalance || !formData.currency) {
      const errorMsg = 'Required Fields are Missing !';
      setMessage(errorMsg);
      setSeverity('error');
      handleOpen()

      return;
    } else {
      const successMsg = 'Account Created Successfully!';
      setMessage(successMsg);
      setSeverity('success');
      handleOpen()
            setTimeout(() => {
        navigate("/accountList");
      },2000);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/trackWallet/createUserAccDetails",
        formData
      );
      setFormData(accountDetails);
      console.log("Account Details : ", response);
    } catch (err) {
      console.error("Error ", err);
    }
  };

  async function dashboard() {
    navigate("/dashboard");
  }

  return (
    <div>
      <div className="addAccount">
        <Header title="Add Account"/>
      {/* <header><h2>Add Account</h2></header> */}
        <form className="addAccountForm" onSubmit={handleSubmit}>
          <div className="inpField" item xs={12}>
            <TextField
              label="Account Name"
              variant="outlined"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="inpField" item xs={12}>
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              sx={{ width: "100%" }}
            >
              {currencyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="inpField" item xs={12}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">
                  {formData.currency}
                </InputAdornment>
              }
              label="Amount"
              name="currentBalance"
              value={formData.currentBalance}
              onChange={handleChange}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="inpField" item xs={12}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => dashboard()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} style={{ fontSize: '12px', fontWeight: 'bold' }}>
          {message}
        </Alert>
      </Snackbar>
          </div>
        </form>
      </div>
      <Footer footerDashboard={footerDashboard} />
    </div>
  );
};

export default AddAccount;
