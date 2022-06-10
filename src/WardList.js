import React from 'react'
import Card from '@mui/material/Card';
import {Link} from "react-router-dom";
import { Grid } from '@mui/material';
function WardList(prop) {
    var list = prop.wardArr
    return (
        <Grid container gap={2} p={5}>
            {list.map(ward => (
                <Link style={{textDecoration:"none"}} to="/table">
                    <Card sx={{ width: 120, height: 100, p:1, bgcolor: "#00c3014f", decoration:"none" }}>
                        <p style={{fontSize:"20px", fontWeight:"bolder"}} >{ward}</p>
                        <span>{null}</span>
                        <p style={{textAlign:"end"}}><span>{`${0}/${0}`}</span></p>
                    </Card>
                </Link>
            ))}

        </Grid>
    )
}

export default WardList