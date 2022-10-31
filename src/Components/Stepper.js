import React, { useState, useEffect } from 'react';
import { Stepper } from 'react-form-stepper';
import PubSub from "pubsub-js";

const CustomStepper = (props) => {
  //const { activeStep = 0 } = props;
  const [activeStep, setActiveStep] = useState(0);

  const subscribeMethod=(topic,msg)=>{
    setActiveStep(msg.data);
    }
  
  useEffect(()=>{
    const subscriberevent = PubSub.subscribe("activeStep", subscribeMethod);
    return () => { 
      PubSub.unsubscribe(subscriberevent);
    };
  });

  return (
    <Stepper steps={[{ label: 'Your Application' }, { label: 'Review' }, { label: 'Completed' }]} activeStep={activeStep} />
  )
};

export default CustomStepper;
