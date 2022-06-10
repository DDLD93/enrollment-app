import * as React from 'react';
import { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import { Button, Card, Divider, Grid, IconButton, TextField } from '@mui/material';
import { StateContext } from '../context/context';




const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    height: "70%",
    bgcolor: 'background.paper',
  }
};

export default function Biodata(prop) {
  const [occupation, setoccupation] = useState("")
  const [disability, setdisability] = useState("")
  const [phone, setphone] = useState('')
  const [idtype, setIdtype] = useState("")
  const [gname, setgname] = useState("")
  const [gidtype, setgIdtype] = useState("")
  const [idNo, setidNo] = useState("")
  const [file, setFile] = useState("")
  const [imgSrc, setimgSrc] = React.useState("")
  const { setObj } = useContext(StateContext)
  const [btn, setbtn] = useState(false)
  let handleNext = prop.next
  const handleModalNext = React.useCallback(() => {
    handleNext()
  }, [prop.next])

  const imgPreview = (e) => {
    let obj = window.URL.createObjectURL(e.target.files[0])
    setimgSrc(obj)
  }

  const updateBio = () => {
    let data = {
      occupation,
      disability,
      guarantor: gname,
      type: idtype,
      idNo: idNo,
      imagePath: imgSrc
    }
    setObj(data)
    //updateObject(data)
    handleModalNext()
    // // console.log("meta data>>>>>> ",data)
    // // console.log("file data>>>>>> ",file)
    // form.append("meta", JSON.stringify(data))
    // form.append("photoID", imgSrc)

    // let url = `${config.EndPionts}/beneficiaries/update/${prop.id}`
    // fetch(url, {
    //   method: "POST",
    //   body: form
    // }).then(res => (res.json())).
    //   then(res => {
    //     handleModalClose()
    //     notification("success", "")
    //   }).
    //   catch(err => console.log("error >>>>> ", err))
  }

  const idTypeList = [
    "NIN",
    "PVC",
    "INTL PASSPORT",
    "DRIVERS LICENSE",
    "PHONE",
    "GUARANTOR"
  ]
  const GidTypeList = [
    "NIN",
    "PVC",
    "INTL PASSPORT",
    "DRIVERS LICENSE",
    "PHONE",
  ]


  React.useEffect(() => {
    if (!occupation || !disability || !idtype || !idNo) {
      setbtn(true)
    } else {
      setbtn(false)
    }


  }, [occupation,
    disability,
    phone,
    idtype,
    idNo,
    file])

  return (
    <div>

      <Box container sx={style.modal}>
        <Grid alignItems="center" justifyContent="center" gap={1} container >
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.fullName} label="Full Name" />
          </Grid>
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.gender} label="Gender" />
          </Grid>
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.age} label="Age" />
          </Grid>
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.state} label="State" />
          </Grid>
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.lga} label="LGA" />
          </Grid>
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.ward} label="Ward" />
          </Grid>
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.phone} label="Phone Number" />
          </Grid>
          <Grid item >
            <TextField disabled size="small" defaultValue={prop.maritalStatus} label="Marital Status" />
          </Grid>
          <Grid item >
            <TextField onChange={(e) => setoccupation(e.target.value)} size="small" defaultValue={prop.occupation} label="Occupation" />
          </Grid>
          <Grid item >
            <TextField onChange={(e) => setdisability(e.target.value)} size="small" defaultValue={prop.disability} label="Disability" />
          </Grid>
          {/* <Grid item >
                  <TextField onChange={(e) => setnextOfKin(e.target.value)} size="small" defaultValue={prop.nextOfKin} label="Next of Kin" />
                </Grid>
                <Grid item >
                  <TextField onChange={(e) => setphone(e.target.value)} size="small" defaultValue={prop.nextOfKinPhone} label="Next of Kin Phone" />
                </Grid> */}
          <Grid sm={5} item >
            <TextField
              select
              label="ID Type"
              sx={{ width: 200 }}
              value={idtype}
              onChange={(e) => setIdtype(e.target.value)}
              SelectProps={{
                native: true,
              }}
              size='small'
            >
              {idTypeList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item >
            <TextField
              onChange={idtype == "GUARANTOR" ? (e) => setgname(e.target.value) : (e) => setidNo(e.target.value)}
              sx={{ width: 230 }}
              required
              fullWidth
              size="small"
              defaultValue={prop.idNo}
              label={idtype == "GUARANTOR" ? "Guarantor's Name" : "ID Number"} />
          </Grid>
          <Grid sx={{ display: idtype == "GUARANTOR" ? "block" : "none" }} sm={5} item >
            <TextField
              select
              disabled={idtype == "GUARANTOR" ? false : true}
              label="ID Type"
              sx={{ width: 250 }}
              value={gidtype}
              onChange={(e) => setgIdtype(e.target.value)}
              SelectProps={{
                native: true,
              }}
              size='small'
            >
              {GidTypeList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid sx={{ display: idtype == "GUARANTOR" ? "block" : "none" }} item >
            <TextField sx={{ width: 230 }} onChange={(e) => setidNo(e.target.value)} required={idtype == "GUARANTOR" ? true : false} size="small" defaultValue={prop.idNo} label="ID Number" />
          </Grid>
          {/* <Grid pb={2} pl={3.7} alignItems="center" container sm={12} item >
            <input
              style={{ display: "block", width: 180 }}
              onChange={(e) => imgPreview(e)}
              id="contained-button-file"
              type="file"
            />
          </Grid> */}
          {/* <Grid sm={12} item >
            <img src={imgSrc} id="preview" width="200" height="100" />
          </Grid> */}
        </Grid>
        <Button disabled={btn} onClick={updateBio} size="small" disableElevation sx={{ width: 200, marginLeft: "33%" }} variant='contained' fullWidth={true} color="primary" >Save and continue</Button>
        {/* <MDButton  onClick={updateBio}  sx={{mt: 4, width:80,top:"85%",right:"15px",position:"absolute"}} size="small" fullWidth={true} variant="outlined" color="primary" >Back</MDButton> */}
      </Box>
    </div>

  );
}