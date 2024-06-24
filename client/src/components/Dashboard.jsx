import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/dashboard.css';
import {
  Card, CardContent, Button, Typography, Box, CircularProgress, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import AmountFilterCard from './AmountFilterCard';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';



const Dashboard = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const footerDashboard = location.state ? location.state.shareUserName : {};
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState({ dates: [], amounts: [] });

  // Function to navigate to add account page
  const addAccount = () => {
    navigate("/addaccount");
  };

  // Function to open the amount filter card
  const amountFilterCard = () => {
    setOpen(true);
  };

  // Function to fetch account list
  const handleRecoverAccountList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trackWallet/listUserAccdetails', {
        method: "GET",
      });
      setUserDetails(response.data.userAccountList);
    } catch (error) {
      setUserDetails("Data not found !");
      console.error("Error fetching user account details:", error);
    }
  };

  // Fetch account details on component mount
  useEffect(() => {
    const fetchData = async () => {
      await handleRecoverAccountList();
      setLoading(false);
    };
    fetchData();
  }, []);

  // Calculate total amount when userDetails is updated
  useEffect(() => {
    if (Array.isArray(userDetails)) {
      const total = userDetails.reduce((acc, data) => acc + parseFloat(data.currentBalance), 0);
      setTotalAmount(total);

            // Prepare data for LineChart
            const dates = userDetails.map(data => dayjs(data.date).format('MMM D')); // Format dates as 'Month Day'
            const amounts = userDetails.map(data => parseFloat(data.currentBalance));

            setChartData({ dates, amounts });
    }
  }, [userDetails]);

  return (
    <div>
      <div className='dashboard'>
        <Header title="Dashboard" />
        {open && <AmountFilterCard close={() => setOpen(false)} />}
        <Card className='accountsCard' sx={{ backgroundColor: '#2c3858' }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
            <Typography gutterBottom variant="h5" component="div">
              {loading ? (
                <Box className='loader'>
                  <CircularProgress />
                </Box>
              ) : (
                <h3>{`${totalAmount}.00`}</h3>
              )}
            </Typography>
            <Typography>
              <Button size="small" onClick={amountFilterCard}><FilterListIcon /></Button>
            </Typography>
          </CardContent>
          <CardContent>
            { Array.isArray(chartData) && chartData.map((date) => (
                <LineChart
                xAxis={[{ data: date }]}
                series={[{ data: date }]}
                height={150}
                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
              />
            ))}

          </CardContent>
        </Card>
        <Card className='accountsCard' sx={{ backgroundColor: '#2c3858' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              Accounts
              <Button size="small" onClick={addAccount}><AddCircleOutlineIcon /></Button>
            </Typography>
            <Typography className='grid-container'>
              {loading ? (
                <Box className='loader'>
                  <CircularProgress />
                </Box>
              ) : (
                Array.isArray(userDetails) && userDetails.map((data) => (
                  <List key={data.id} className='grid-item'>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText
                          sx={{
                            '& .MuiListItemText-secondary': {
                              color: '#fccb06dd',
                              fontSize: '16px',
                            },
                          }}
                          primary={<Typography sx={{ fontSize: '16px' }}>{data.accountName}</Typography>}
                          secondary={` ${data.currentBalance}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                ))
              )}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Footer footerDashboard={footerDashboard} />
    </div>
  );
};

export default Dashboard;
