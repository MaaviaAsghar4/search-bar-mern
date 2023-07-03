import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "./App.css"

function App() {

  const [listItems, setListItems] = useState([]);

  const handleChange = async (e) => {
    try {
      const query = e.target.value;
      const response = await fetch(`http://localhost:5000/carlist?carname=${query}`)
      const carList = await response.json();
      setListItems(carList.cars)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="App">
      <Box
        component="div"
        sx={{
          maxWidth: 550,
          width: "100%"
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: 30,
            mb: 2,
            color: "#da1919"
          }}
        >
          Search Cars
        </Typography>
        <TextField id="outlined-basic" sx={{
            width: "100%",
            backgroundColor: "#fff"
          }} 
          onChange={ (e) => handleChange(e) }
          label="search" 
          variant="outlined" 
        />
        <List sx={{ backgroundColor: "#fff", boxShadow: "0 0 1px #000", padding: 0 }}>
          { listItems.length > 0 && listItems.map((list, ind) => (
              <ListItem 
                sx={{
                  borderBottom: "1px solid #efefef"
                }} 
                key={list._id}
                disablePadding
              >
                <ListItemButton sx={{ justifyContent: "space-between" }}>
                  <ListItemText sx={{ flex: "unset" }} primary={list.CarName} />
                  <ListItemText sx={{ flex: "unset" }} primary={`USD ${list.price}`} />
                </ListItemButton>
              </ListItem>
          )) }
        </List>
      </Box>
    </div>
  );
}

export default App;
