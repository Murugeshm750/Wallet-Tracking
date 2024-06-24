import React, { useState } from 'react'
import Header from './Header'
import '../styles/accountList.css'
import axios from 'axios'
import { useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

const AccountList = () => {

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
         handleRecoveraccountList();
      }, []);


  return (
        <div className='accountList'>
        <Header title = "Account List"/>
                {userDetails.map((data) => (
                    <List key={data.id} sx={{ width: '100%', maxWidth: 360 }} >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <StarIcon />
                            </ListItemIcon>
                            <ListItemText 
                            sx={{
                                '& .MuiListItemText-secondary': {
                                    color: '#fccb06dd',
                                    fontSize: '18px',
                                },
                            }}
                            primary={
                            <>
                                <Typography
                                    sx={{
                                        fontSize: '20px',
                                    }}
                                >
                                    {data.accountName}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }}
                                >
                                    {data.currencyDetail}
                                </Typography>
                            </>
                            }
                             secondary={`Current Balance :  ${data.currentBalance}`}/>
                          </ListItemButton>
                        </ListItem>
                    </List>
                ))}
        </div>
  )
}

export default AccountList