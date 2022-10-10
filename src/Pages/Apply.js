import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import AccordionComp from '../Components/AccordionComp';
import ApplicationForm from '../Components/ApplicationForm';
import CaaSBreadcrumb from '../Components/Breadcrumb';
import Dropdown from '../Components/Dropdown';
import PersonalForm from '../Components/PersonalForm';
import CustomStepper from '../Components/Stepper';
import CraineForm from '../Components/CraineForm';
import AerialPhotoGraphyPermit from '../Components/AerialPhotoGraphyPermit';
import ApplyShipCrossing from '../Components/ApplyShipCrossing';

function Apply() {
    const [applyBreadCrumb, setApplyBreadCrumb] = useState();
    const [formId, setFormId] = useState(3);
    const [state, setState] = useState(1);
    const location = useLocation();
    
    const onChange = (data) => {
        setState(data);
    }

    useEffect(() => {
        if(location && location.state && location.state.detail){
            setApplyBreadCrumb(location.state.detail);
            setFormId(location.state.id);
        }
    }, [location]);

    return (
            <>
                <CaaSBreadcrumb applyBreadCrumb={applyBreadCrumb}></CaaSBreadcrumb>
                <CustomStepper></CustomStepper>
                { 
                    formId === 3 ? (
                    <>
                        <Row>
                        <h2 className="mTop-30 mBot-30 mLeft-15">Instructions</h2>
                        </Row>
                        {/* <Dropdown title={'type of Activity'} onChange={onChange}></Dropdown> */}
                        <AccordionComp></AccordionComp>
                        <hr/>
                        <Dropdown title={'type of Activity'} onChange={onChange}></Dropdown>
                        <ApplicationForm data={state}></ApplicationForm>
                        <PersonalComp></PersonalComp>
                    </>): formId === 2 ? (
                    <ApplyShipCrossing></ApplyShipCrossing>): formId === 1 ? 
                    (<CraineForm></CraineForm>):
                    (<AerialPhotoGraphyPermit></AerialPhotoGraphyPermit>)
                }

                <div className="btn-center mTop-30 mBot-30">
                <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas">Next</button>
                <button type="button" className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
                </div>
                {/* <CaaSBreadcrumb applyBreadCrumb={applyBreadCrumb}></CaaSBreadcrumb>
                <CustomStepper></CustomStepper>
                <h2 className="mTop-30 mBot-30">Instructions</h2>
                <Dropdown></Dropdown>
                <AccordionComp></AccordionComp>
                <hr/>
                <ApplicationForm></ApplicationForm>
                <hr/>
                <PersonalComp></PersonalComp>
                <div className="btn-center mTop-30 mBot-30"> */}
                {/* <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas">Next</button>
                <button type="button" className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button> */}
                {/* </div> */}
            </>
    );
}

const PersonalComp = () => {
    return(
        <>
            <h3 className='mBot-30 mLeft-26'> Personal Details</h3>
            <PersonalForm></PersonalForm>
        </>
    );
};

export default Apply;