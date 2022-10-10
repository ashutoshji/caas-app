import React from 'react';
import { Stepper } from 'react-form-stepper';

const CustomStepper = () => {
    return (
         <Stepper steps={[{ label: 'Your Application' }, { label: 'Review' }, { label: 'Completed' }]} activeStep={0} />
    )
  };
  
export default CustomStepper;
