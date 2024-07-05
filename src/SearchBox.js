import React, { useState, useRef, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
    const { selectPosition, setSelectPosition, addPlaceToLoca, loca } = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setlistPlace] = useState([]);
    const [showList, setShowList] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setShowList(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listRef]);

    return (
        <div style={{ display: "block", width: "450px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                    <OutlinedInput
                        style={{ width: "100%" }}
                        inputProps={{ style: { height: "38px", padding: "0 14px" } }}
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                            if (event.target.value !== "") {
                                setShowList(true);
                            } else {
                                setShowList(false);
                            }
                        }}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginInline: "20px" }}>
                    <Button
                        variant="contained"
                        onClick={() => {
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
                            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    setlistPlace(JSON.parse(result));
                                    setShowList(true);
                                })
                                .catch((err) => console.log("err: ", err));
                        }}
                    >
                        Search
                    </Button>
                </div>
            </div>
            {showList && (
                <div style={{ marginTop: "10px", position: "relative" }} ref={listRef}>
                    <List
                        component="nav"
                        aria-label="main mailbox folders"
                        style={{
                            position: "absolute",
                            width: "100%",
                            zIndex: 1,
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                            overflowY: "auto",
                            maxHeight: "280px"
                        }}
                    >
                        {listPlace.map((item) => (
                            <div key={item?.place_id}>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setSelectPosition(item);
                                        addPlaceToLoca({ display_name: item.display_name, lat: item.lat, lon: item.lon });
                                        setShowList(false);
                                    }}
                                >
                                    <ListItemIcon>
                                        <img
                                            src="./placeholder.png"
                                            alt="Placeholder"
                                            style={{ width: 38, height: 38 }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item?.display_name} />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </div>
            )}
        </div>
    );
}
