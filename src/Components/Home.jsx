import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Grid, Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import ShowMoreText from "react-show-more-text";

export default function Home({ exp, location, companyName, basePay }) {
    const [apiData, setApidata] = useState([])
    const [pending, setPending] = useState(true)
    const [filterDate, setFilterData] = useState([])
    const [limit, setLimit] = useState(20);

    //Fetching data when limit value changes
    useEffect(() => {
        fectching(limit);
    }, [limit])

    //Filtering data if exp value changes
    useEffect(() => {
        setFilterData(apiData.filter((element) => {
            return element.minExp > exp
        }))
    }, [exp])

    //Filtering data if Location value changes
    useEffect(() => {
        setFilterData(apiData.filter((element) => {
            if (location !== "") {
                return element.location == location
            }
            return element
        }))
    }, [location])

    //Filtering data if companyName value changes
    useEffect(() => {
        setFilterData(apiData.filter((element) => {
            if (companyName !== "") {
                return element.jobRole.includes(companyName.toLowerCase())
            }
            return element
        }))
    }, [companyName])

    //Filtering data if basePay value changes
    useEffect(() => {
        setFilterData(apiData.filter((element) => {
            if (basePay !== 0) {
                return element.minJdSalary >= basePay
            }
            return element
        }))
    }, [basePay])

    // This function executes when you reach end of the page
    const reFetchData = () => {
        setLimit(limit + 20);
    }

    //Fetching Data
    const fectching = (limit) => {
        const raw = JSON.stringify({
            "limit": limit,
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
                setApidata(data.jdList),
                    //Setting filtering data to show data initially
                    setFilterData(data.jdList),
                    setPending(false);
            })
            .catch((err) => { console.log(err); })
    }


    return (
        <div>
            {pending && <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>}

            <InfiniteScroll
                dataLength={apiData.length}
                next={reFetchData}
                hasMore={apiData.length !== 11000}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <Box sx={{ margin: "30px", display: "flex", flexWrap: "wrap", gap: "70px" }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: {xs:'1fr', md:'1fr 1fr', lg:'1fr 1fr 1fr 1fr'}, gap:2 }}>
                        {!pending && filterDate.map((element, index) => {
                            return (
                                <JobDescriptionCard element={element} index={index} />
                            )
                        })}
                    </Box>
                </Box>
            </InfiniteScroll>
        </div>
    )
}

const JobDescriptionCard = ({ element, index }) => {

    const [isReadMore, setIsReadMore] = useState(true);

    return (
        <Card key={element.jdLink + index}>
            <CardContent p={4}>
                <Typography gutterBottom variant="h6" >
                    Role : {element.jobRole}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                    loaction : {element.location}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Experience required : {element.maxExp}
                </Typography>
                <Typography variant="body2" >
                    {isReadMore ? element.jobDetailsFromCompany.slice(0, 150) : element.jobDetailsFromCompany}
                    {element.jobDetailsFromCompany.length > 150 &&
                        <Button onClick={() => { setIsReadMore(!isReadMore) }}>{isReadMore ? '...read more' : ' ...show less'}</Button>
                    }
                </Typography>
            </CardContent>
            <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '2rem' }}>
                <Button variant="contained" disableElevation>
                    Apply
                </Button>
            </Stack>
        </Card>
    )
}
