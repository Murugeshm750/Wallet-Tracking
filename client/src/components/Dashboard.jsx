import  React from 'react'
import Footer from './Footer'
import { useLocation } from 'react-router-dom';
import '../styles/dashboard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios'




const Dashboard = () => {
  const navigate = useNavigate();
    const location = useLocation();
    // const buslist = location.state ? location.state.shareBusList : [];
    const { footerDashboard } = location.state ? location.state.shareUserName : {};

    async function addAccount() {
      navigate("/addaccount");
    }
    const [userDetails, setUserDetails] = useState([]);
    async function handleRecoveraccountList() {
        try {
            const response = await axios.get('http://localhost:5000/trackWallet/listUserAccdetails', {
                method: "GET"
              })
            setUserDetails(response.data.userAccountList)
        } catch (error) {
            setUserDetails("Data not found !");
            console.error("Error fetching user account details:", error);
        }
    }

    useEffect(() => {
      async function fetchData(){
       await handleRecoveraccountList();
      }
      fetchData()
      }, []);

  return (
    <div>
        <div className='dashboard'>
          <header><h2>Dashboard</h2></header>
        <Card className='accountsCard' sx={{backgroundColor:'#2c3858'}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{display : 'flex',justifyContent : 'space-between', color: '#fff'}}>
          Accounts
          <Button size="small" onClick={() => addAccount()}><AddCircleOutlineIcon/></Button>
        </Typography>
        <Typography  className='grid-container'>
        {Array.isArray(userDetails) && userDetails.map((data) => (
            <List key={data.id}  className='grid-item'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText 
                sx={{
                    '& .MuiListItemText-secondary': {
                        color: '#fccb06dd',
                        fontSize: '16px',
                    },
                }}
                primary={
                <>
                    <Typography
                        sx={{
                            fontSize: '16px',
                        }}
                    >
                        {data.accountName}
                    </Typography>
                </>
                }
                 secondary={` ${data.currentBalance}`}/>
              </ListItemButton>
            </ListItem>
          </List>
          ))}
        </Typography>
      </CardContent>
    </Card>       
     </div>
    <Footer footerDashboard ={footerDashboard}/>
    </div> 
     )
}

export default Dashboard