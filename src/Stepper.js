import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Grid } from '@mui/material';
import Biodata from './steps/BioData';
import Biometric from './steps/Biometrics';
import Payment from './steps/Payment';

export default function CustomStepper(prop) {
    
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    // const handleChange = (key,value)=> { 
    //     setObject(prevState => ({
    //         ...prevState,
    //         [key]: value
    //     }));
    // };
    let handleNextClose = prop.next    
    const handleModalNext = React.useCallback(() => {
        handleNextClose()
      }, [prop.next])

    const handleNext = () => {
        if (activeStep !== maxSteps - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }else{
            handleModalNext()
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const steps = [
        {
            label: 'Bio-data update',
            component: <Biodata
            // id={obj._id}
            // clientName={obj.fullName}
            // photo={obj.biometric && obj.biometric.imagePath}
            // status={obj.status}
            next={handleNext} 
            />,
        },
        {
            label: 'Biometric capture',
            component: <Biometric
            next={handleNext}
            />,
        },
        {
            label: 'Payment',
            component: <Payment
            next={handleNext}
            />,
        },
    ];
    const maxSteps = steps.length;

    return (
        <Grid sx={{ flexGrow: 1, mb:3 }}>
            <MobileStepper
                variant="text"
                sx={{ width: "580px" }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                    //disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
            <Typography variant='h6' textAlign='center' >{steps[activeStep].label}</Typography>
             {steps[activeStep].component}
        </Grid>
    );
}
