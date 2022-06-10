import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import Webcam from 'webcam-easy';
import { Button, Grid } from '@mui/material';
import { StateContext } from '../context/context';




const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: "400px",
    bgcolor: 'background.paper',
  },
  card: {
    display: "flex",
    gap: 3,
    width: "100%",
    padding: "25px",
    justifyContent: "space-between"
  }
};

export default function Biometric(prop) {
  const [swtch, setSwtch] = React.useState(false)
  const [Right, setRight] = React.useState("")
  const [image, setimage] = React.useState("")
  const {setObj} = React.useContext(StateContext)
  let handleNext = prop.next
  const handleModalNext = React.useCallback(() => {
    handleNext()
    stopScan()
    stopFeed()
  }, [handleNext])
  
  const updateBio = () => {
    let data = {
        thumbHash:Right.split(",")[1],
        imageHash:image
    }
    setObj(data)
    handleModalNext()
    // console.log("meta data>>>>>> ",data)
    // console.log("file data>>>>>> ",file)
    // form.append("meta", JSON.stringify(data))
    // form.append("image", image)
    // let url = `${config.EndPionts}/beneficiaries/biometric/${id}`
    // fetch(url, {
    //   method: "POST",
    //   body: form
    // }).then(res => (res.json())).
    //   then(res => {
    //     handleModalClose()
    //     console.log(res)
    //   }).
    //   catch(err => console.log("error >>>>> ", err))
  }

  const Fingerscanner = window.Fingerprint


  class ScannerSdk {
    constructor() {
      this.sdk = new Fingerscanner.WebApi()

      this.sdk.onSamplesAcquired = function (s) {
        samplesAcquired(s)
      }
    }
    startCapture() {
      this.sdk.startAcquisition(Fingerscanner.SampleFormat.PngImage).then(function () {
        return console.log('Scanner Online')
      }, function (error) {
        return console.log('Error connecting to scanner')
      });
    }
    stopCapture() {
      this.sdk.stopAcquisition().then(function () {
        return console.log('Scanner Offline')
      }, function (error) {
        return console.log('Error al detener la captura de huella')
      })
    }
    getDeviceList() {
      return this.sdk.enumerateDevices()
    }
  }
  function samplesAcquired(s) {
    let samples = JSON.parse(s.samples);
    let data = "data:image/png;base64," + Fingerscanner.b64UrlTo64(samples[0])
    console.log(data)
    setRight(data)
  }

  var webcam = null
  function startFeed() {
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    webcam = new Webcam(webcamElement, 'user', canvasElement);
    webcam.start().then(result => {
      console.log("webcam started");
    })
      .catch(err => {
        console.log(err);
      });
  }
  function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  function snap() {
  let  picture = webcam.snap();
    //let file = dataURLtoFile(picture, "snap.png")
    setimage(picture)

  }
  function stopFeed() {
    console.log("webCam closed")
    webcam.stop()
  }
  function startScan() {
    var scn = new ScannerSdk()
    scn.startCapture()
  }
  function stopScan() {
    var scn = new ScannerSdk()
    scn.stopCapture()
  }
  setTimeout(() => {
    startFeed()
    startScan()

  }, 1000)
  React.useEffect(() => {


  }, [swtch])

 

  return (

    <Box container sx={style.modal}>
      <div style={style.card} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", flexDirection: "column", gap: 20 }} >

          <div style={{ width: 120, height: 130, borderRadius: "10%", backgroundColor:swtch?"green":"" }} >
            <img src={Right} id="thumb" style={{ textAlign: "center", fontSize: "small", fontWeight: "bold", borderRadius: "10%" }} alt="Place your Right Thumb on the scanner" width="120" height="130px" />
          </div>
          {/* <div className={Switch ? "" : "flickr"} style={{ width: 120, height: 130, borderRadius: "10%" }} >
            <img id="thumbTwo" style={{ textAlign: "center", fontSize: "small", fontWeight: "bold", borderRadius: "10%" }} alt="Place your Right Thumb on the scanner" width="120" height="130px" src={Left} />
          </div> */}

        </div>
        <div style={{ display: "flex", flexDirection: "column" }} >
          <video style={{ width: 300, height: 250, }} id="webcam" ></video>
          <canvas style={{ width: 300, height: 250, position: "absolute" }} id="canvas" ></canvas>
          <Grid container justifyContent="center" mt={2}>
            <Button variant="outlined" color="secondary" size="small" onClick={snap} >Capture</Button>
          </Grid>
        </div>

      </div>
      <Button  onClick={updateBio}  size="small" disableElevation sx={{width:200, marginLeft:"33%"}} variant='contained' fullWidth={true}  color="primary" >Save and continue</Button>

    </Box>

  );
}