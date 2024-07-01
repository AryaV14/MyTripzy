import React,{ useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


const NOMINATIM_BASE_URL ="https://nominatim.openstreetmap.org/search?";
const params = {
    q: "", 
    format: "json",
    addressdetails: "addressdetails",
};

export default function SearchBox(props) {
    const { selectPosition, setSelectPosition, addPlaceToLoca, loca  } = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setlistPlace] = useState([]); 

  return (
    <div style={{display: "flex", flexdirection: "column", width:"100%"}}>
    <div style={{display: "flex"}}>
    <div style={{flex: 1}}>
      <OutlinedInput 
        style={{width: "100%"}} 
        value={searchText}
        onChange={(event) => {
            setSearchText(event.target.value);
        }}
    />
    </div>
     
    <div style={{ display:"flex", alignItems: "center"}}>
    <Button variant="contained" onClick={() => {
        //Search
        const params = {
            q: searchText,
            format: 'json',
            addressdetails: 'addressdetails',
            polygon_geojson: 0
        };
        const queryString = new URLSearchParams(params).toString();
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(`${NOMINATIM_BASE_URL}${queryString}`,requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(JSON.parse(result));
                setlistPlace(JSON.parse(result));
            })
            .catch((err) => console.log("err: ", err));
    }}
    >
        Search</Button>
    </div>
    </div>
    <div>
        <List component ="nav" aria-label="main mailbox folders">
            {listPlace.map((item) => {
                return (
                    <div key ={item?.place_id}>
                        <ListItem button onClick={() => {
                            setSelectPosition(item);
                            addPlaceToLoca({ display_name: item.display_name, lat: item.lat, lon: item.lon });
                        }}>
                            <ListItemIcon>
                                <img 
                                    src="./placeholder.png"
                                    alt="Placeholder" style={{width:38, height:38 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={item?.display_name} />
                        </ListItem>
                        <Divider />
                    </div>
                );
            })}
        </List>
    </div>
</div>
  )
}
