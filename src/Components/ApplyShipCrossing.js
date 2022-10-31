import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import PubSub from "pubsub-js";
import axios from 'axios';
import PersonalForm from './PersonalForm';
import AccordionComp from './AccordionComp';
import ReportingTable from './ReportingTable';
import ReviewApplyShipCrossingForm from './ReviewApplyShipCrossing';
import { ShipCrossUrl } from '../Api';

const ApplyShipCrossing = (props) => {
    const [openReviewForm, setOpenReviewForm] = useState(1);
    const [fieldValues, setFieldValues] = useState({})
    const [refNo, setRefNo] = useState(null);
    const { step } = props;
    const navigate = useNavigate();
    const methods = useForm();

    const loadShipCrossForm = (data) => {
        console.log('refno', data);
        setRefNo(data);
        setOpenReviewForm(1);
    }

    const publishTopic=()=>{
		let msg={"data":1}
		PubSub.publishSync("activeStep", msg);
		}

    const onSubmit = async (responseData) => {
        try {
            console.log('params form ship crossing', responseData);
            const result = {...responseData, referenceNumber: refNo}
            const { data: response } = !refNo ? await axios.post(ShipCrossUrl, responseData): await axios.put(ShipCrossUrl, responseData);
            const resultData = response && response.data ? response.data : response;
            publishTopic();
            setOpenReviewForm(2);
            setFieldValues({ ...fieldValues, ...resultData });
        } catch (err) {
            console.log(err);
            // setError(err)
            // publishTopic();
            // setOpenReviewForm(2);
            // setFieldValues({...responseData });
        }
    }

    return (
        <>
            {
                openReviewForm === 1 ?
                    <>
                        <h2 className="mTop-30 mBot-30 mLeft-30">Instructions</h2>
                        <Accordion className='mLeft-30 mRight-30 mTop-30 mBot-30'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Instructions</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean vel elit convallis, venenatis mauris vitae, volutpat tellus.
                                    Nulla gravida pharetra tempus. Pellentesque quis sem turpis.
                                    Sed dignissim, nulla sit amet venenatis pellentesque, sapien augue lacinia magna, vel gravida metus nunc a erat.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <h2 className="mLeft-30">Your Application</h2>
                        <FormProvider {...methods} >
                            <Form className="mLeft-15 mRight-15" onSubmit={methods.handleSubmit(onSubmit)}>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formDateVessel">
                                            <Form.Label>Date of Vessel Movement*</Form.Label>
                                            <Form.Control {...methods.register('vesselMovementDate',
                                                {
                                                    required: "This is required."
                                                })} type="date" placeholder="Date of Vessel Movement"
                                                //aria-invalid={ methods.getValues('vesselMovementDate') === '' ? true: false}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="vesselMovementDate"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formNameOfVessels">
                                            <Form.Label>Name of Vessel*</Form.Label>
                                            <Form.Control {...methods.register('vesselName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Vessel"
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="vesselName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formCallsign">
                                            <Form.Label>Callsign*</Form.Label>
                                            <Form.Control {...methods.register('callsign',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Callsign"
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="callsign"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formHeight">
                                            <Form.Label>Height / Draft (in metres)*</Form.Label>
                                            <Form.Control {...methods.register('heightMetres',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Height / Draft " />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="heightMetres"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formPortOfOrigin">
                                            <Form.Label>Port of Origin*</Form.Label>
                                            <Form.Control {...methods.register('originPort',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Port of Origin" />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="originPort"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formPointOfOrigin">
                                            <Form.Label>Point of Origin*</Form.Label>
                                            <Form.Control {...methods.register('originPoint',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Point of Origin" />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="originPoint"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formFinalDestination">
                                            <Form.Label>Final Destination*</Form.Label>
                                            <Form.Control {...methods.register('finalDestination',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Final Destination" />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="finalDestination"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <ReportingTable></ReportingTable>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formPrimarySafetyPersonnel">
                                            <Form.Label>Primary Safety Personnel</Form.Label>
                                            <Form.Control {...methods.register('primarySafetyPersonnelName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Primary Safety Personnel" />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="primarySafetyPersonnelName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formContactNumber">
                                            <Form.Label>Primary Contact number</Form.Label>
                                            <Form.Control {...methods.register('primarySafetyPersonnelTelephoneNumber',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Contact number"/>
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="primarySafetyPersonnelTelephoneNumber"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" controlId="formLandLotNo">
                                            <Form.Label>Primary Email</Form.Label>
                                            <Form.Control {...methods.register('primarySafetyPersonnelEmail',
                                                {
                                                    required: "This is required."
                                                })} type="email" placeholder="Personnel Email" />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="finalDestination"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Secondary Safety Personnel</Form.Label>
                                            <Form.Control {...methods.register('secondarySafetyPersonnelName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name"/>
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="secondarySafetyPersonnelName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Secondary Contact Number</Form.Label>
                                            <Form.Control {...methods.register('secondarySafetyPersonnelTelephoneNumber',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Contact number"/>
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="secondarySafetyPersonnelTelephoneNumber"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Secondary Email</Form.Label>
                                            <Form.Control {...methods.register('secondarySafetyPersonnelEmail',
                                                {
                                                    required: "This is required."
                                                })} type="email" placeholder="Secondary Email"/>
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="secondarySafetyPersonnelEmail"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <label class="form-label" for="formPurpose">Safety Measures</label>
                                        <FloatingLabel className="mBot-30" controlId="floatingSafetyMeasures" label="">
                                            <Form.Control {...methods.register('safetyMeasures',
                                                {
                                                    required: "This is required."
                                                })}  
                                                as="textarea"
                                                placeholder="Safety Measures"
                                                style={{ height: '100px' }} className="md-3"/>
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="safetyMeasures"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={6}>
                                        <label class="form-label" for="formIntendedRoute">Intended Route</label>
                                        <div class="mTop-15 mBot-30">
                                            <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Upload</button>
                                        </div>
                                    </Col>
                                </Row>
                                <hr />
                                {/* <div className="mLeft-15 mRight-15"> */}
                                    <h3 className='mBot-30 mLeft-15'> Personal Details</h3>
                                    <PersonalForm></PersonalForm>
                                {/* </div> */}
                                <div className="btn-center mTop-30 mBot-30">
                                            <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
                                            <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
                                </div>
                            </Form>
                        </FormProvider>
                    </> :
                    <ReviewApplyShipCrossingForm data={fieldValues} onClick={loadShipCrossForm}></ReviewApplyShipCrossingForm>
            }
        </>
    )
}

export default ApplyShipCrossing;