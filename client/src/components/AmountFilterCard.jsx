import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/amountFilterCard.css';
import {
  Card, CardContent, Button, Typography, Box, CircularProgress, List, ListItem, ListItemButton, ListItemText, Checkbox,
} from '@mui/material';
import axios from 'axios';

const AmountFilterCard = ({ close }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState([1]);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  async function handleRecoveraccountList() {
    try {
      const response = await axios.get('http://localhost:5000/trackWallet/listUserAccdetails', {
        method: "GET",
      });
      setUserDetails(response.data.userAccountList);
    } catch (error) {
      setUserDetails("Data not found !");
      console.error("Error fetching user account details:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await handleRecoveraccountList();
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className='amountFilterCard'>
      <Card className='accountsCard' sx={{ backgroundColor: '#2c3858' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
            Accounts
            <Button size="medium" onClick={close}>Close</Button>
          </Typography>
          <Typography className='grid-container-amtFilter'>
            {loading ? (
              <Box className='loader'>
                <CircularProgress />
              </Box>
            ) : (
              Array.isArray(userDetails) && userDetails.map((data) => (
                <List key={data.id} className='grid-item'>
                  <ListItem
                    key={data}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(data)}
                        checked={checked.indexOf(data) !== -1}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText primary={`${data.accountName}`} />
                    </ListItemButton>
                  </ListItem>
                </List>
              ))
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmountFilterCard;
