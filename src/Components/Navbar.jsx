// import React from 'react'
import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select, Stack, TextField } from '@mui/material';

// import Search from './Search';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

const experienceArr = [
    { name: 'One', value: 1 },
    { name: 'Two', value: 2 },
    { name: 'Three', value: 3 },
    { name: 'Four', value: 4 },
    { name: 'Five', value: 5 },
    { name: 'Six', value: 6 },
    { name: 'Seven', value: 7 },
    { name: 'Eight', value: 8 },
    { name: 'Nine', value: 9 },
]

export default function Navbar({ exp, setExp, setLocation, setCompanyName, setBasePay }) {

    const [apiData, setApidata] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fectching();
    }, [exp])

    const fectching = () => {
        const raw = JSON.stringify({
            "limit": 20,
            "offset": 0
        });

        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
            method: "Post",
            headers: { "Content-Type": "application/json" },
            body: raw
        }).then((response) => {
            if (response.ok === false) {
                throw Error("somtheing")
            }
            return response.json();
        })
            .then((data) => {
                setApidata(data.jdList.map(element => {
                    return element.location
                }));
                setPending(false);
            })
            .catch((err) => { console.log(err); })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {!pending && <AppBar position="static" sx={{ backgroundColor: 'white' }} >
                <Toolbar variant="dense">

                    <Box sx={{ display: "grid", gridTemplateColumns: {xs:'1fr', md:'1fr 1fr', lg:'1fr 1fr 1fr 1fr'}, gap:2, p:2 }}>

                        <FormControl sx={{color: 'white' }} size="small">
                            <InputLabel id="demo-select-small-label">Min experience</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Min experience"
                                onChange={(e) => { setExp(e.target.value) }}
                            >
                                {experienceArr.map((el) => {
                                    return (
                                        <MenuItem key={el.value} value={el.value}>{el.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ color: 'white' }} size="small">
                            <InputLabel id="demo-select-small-label">Location</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Location"
                                onChange={(e) => { setLocation(e.target.value) }}
                            >
                                {apiData.map((location, index) => {
                                    return (
                                        <MenuItem key={location + index} value={location}>{location}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            id="outlined-size-small"
                            label="Role Name"
                            variant="outlined"
                            size="small"
                            onChange={(e) => { setCompanyName(e.target.value) }}
                        />

                        <TextField
                            id="outlined-size-small"
                            label="Number"
                            variant="outlined"
                            type="number"
                            size="small"
                            onChange={(e) => { setBasePay(e.target.value) }}
                        />

                    </Box>
                </Toolbar>
            </AppBar>}
        </Box>

    )
}
