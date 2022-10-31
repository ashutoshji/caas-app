import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
// import AccordionComp from '../Components/AccordionComp';
import ApplicationForm from '../Components/ApplicationForm';
import CaaSBreadcrumb from '../Components/Breadcrumb';
import Dropdown from '../Components/Dropdown';
import PersonalForm from '../Components/PersonalForm';
import CustomStepper from '../Components/Stepper';
import CraineForm from '../Components/CraineForm';
import AerialPhotoGraphyPermit from '../Components/AerialPhotoGraphyPermit';
import ApplyShipCrossing from '../Components/ApplyShipCrossing';
// import ReviewForm from '../Components/ReviewAerialActivitiesForm';
// import CompletedForm from '../Components/CompletedForm';

function Apply() {
    const [applyBreadCrumb, setApplyBreadCrumb] = useState();
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const [formId, setFormId] = useState(3);
    const [state, setState] = useState(1);
    const location = useLocation();
    const AerialOptions = [
        {
            label: "Default",
            value: 1
        },
        {
            label: "Kite Flying / Parasailing",
            value: 2
        },
        {
            label: "Release of balloons",
            value: 3
        },
        {
            label: "Hoisting of Captive Balloon/Blimp",
            value: 4
        },
        {
            label: "Fireworks/Pyrotechnics Display",
            value: 5
        },
        {
            label: "Release of Sky Lanterns",
            value: 6
        },
        {
            label: "Lasers/Other Lights Display",
            value: 7
        }
    ];

    const onChange = (data) => {
        setState(data);
    }

    const navigateToHome = () => {
        navigate('/')
    }

    const nextPage = () => {
        if (activeStep <= 2) {
            let step = activeStep + 1;
            setActiveStep(step);
        }
        //setReviewForm(true);
    }

    useEffect(() => {
        if (location && location.state && location.state.detail) {
            setApplyBreadCrumb(location.state.detail);
            setFormId(location.state.id);
        }
    }, [location]);

    return (
        <>
        <CaaSBreadcrumb applyBreadCrumb={applyBreadCrumb}></CaaSBreadcrumb>
            <CustomStepper activeStep={activeStep}></CustomStepper>
            {
                renderReviewForm(formId, onChange, AerialOptions, state, activeStep, navigateToHome)
                //!reviewForm ? renderForm(formId, onChange, AerialOptions, state): renderReviewForm(formId)
            }
        </>
    );
}

function renderForm(formId, onChange, AerialOptions, state, activeStep) {
    switch (formId) {
        case 1:
            return <CraineForm step={activeStep}></CraineForm>;
        case 2:
            return <ApplyShipCrossing step={activeStep}></ApplyShipCrossing>;
        case 3:
            return (
                <>
                    <Row>
                        <h2 className="mTop-30 mBot-30 mLeft-15">Instructions</h2>
                    </Row>
                    <ApplicationForm data={state} step={activeStep}></ApplicationForm>
                </>
            );
        default:
            return <AerialPhotoGraphyPermit step={activeStep}></AerialPhotoGraphyPermit>;
    }
}

function renderReviewForm(formId, onChange, AerialOptions, state, activeStep, navigateToHome) {
    switch (activeStep) {
        case 0:
            return renderForm(formId, onChange, AerialOptions, state, activeStep)
        default:
            return navigateToHome()
    }
}

export default Apply;