import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { FormCheck } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from "react-select";
import axios from 'axios';
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import PubSub from "pubsub-js";
import AddDeleteTableRows from './AddDeleteTableRows';
import Dropdown from './Dropdown';
import SafetyDetailsForm from './SafetyDetailsForm';
import PersonalForm from './PersonalForm';
import OperatorDetailsForm from './OperatorDetailsForm';
import { Api } from '../Api';
import addKeyValue from './Utility';
import ReviewAerialPhotoGraphyForm from './ReviewAerialPhotoGraphyPermit';
import { AerialPhotoUrl } from '../Api';

const AerialPhotoGraphyPermit = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [openReviewForm, setOpenReviewForm] = useState(1);
    const [fieldValues, setFieldValues] = useState({})
    const [flightOptions, setFlightOptions] = useState([]);
    const [typeOfFlight, setTypeOfFlight] = useState("");
    const [loading, setLoading] = useState(true);
    const [refNo, setRefNo] = useState(null)
    const methods = useForm();
    const { step } = props;
    const navigate = useNavigate();
    const ApiUrl = `${Api}aerial-photo/init-data`;

    const publishTopic=()=>{
		let msg={"data":1}
		PubSub.publishSync("activeStep", msg);
		}

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(ApiUrl);
                const flightOptions = response.aircraftTypes.map(function (item) {
                    return addKeyValue(item, 'label', 'value', item.aircrftType, item.aircrftType);
                });
                setFlightOptions(flightOptions);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        console.log(data);
            const params = {
                    "applicationType": 1,
                    "referenceNumber": "zZdxk0Id",
                    "nricPassport": data.nricPassport,
                    "fullName": data.fullName,
                    "companyName": data.companyName,
                    "telephoneNumber": data.telephoneNumber,
                    "email": data.email,
                    "aircraftType": data.typeOfFlight,
                    "apCaptiveBalloon": data.typeOfFlight === "Captive Balloon" ? {
                            "maxHeightFeet":data.maxHeightFeet,
                            "dimWeightKg": data.dimWeightKg,
                            "dimLengthMetres": data.dimLengthMetres
                    }: null,
                    "apBlimpAirship": data.typeOfFlight === "Blimp / Airship"? {
                        "dimWeightKg": data.dimWeightKg,
                        "dimLengthMetres": data.dimLengthMetres,
                        "dimBreadthMetres": data.dimBreadthMetres
                    }: null,
                    "apHelicopter": data.typeOfFlight === "Helicopter" ? {
                            "operatorCompany": data.operatorCompany,
                            "postalCode": data.postalCode,
                            "blockNumnber": data.blockNumber,
                            "streetName": data.streetName,
                            "level": data.street,
                            "unitNumber": data.unitNumber,
                            "buildingName": data.buildingName,
                            "aircraftType": data.aircraftType,
                            "aircraftCallsign": data.aircraftCallsign,
                            "minOperatingAltitudeFeet": data.minOperatingAltitudeFeet,
                            "maxOperatingAltitudeFeet": data.maxOperatingAltitudeFeet,
                            "flyOverCityLowHeight": data.flyOverCityLowHeight,
                            "flyOverAssemblyEvent": data.flyOverAssemblyEvent
                    }: null,
                    "purpose": data.purpose,
                    "activityDays": data.activityDays,
                    "primarySafetyPersonnelName": data.primarySafetyPersonnelName,
                    "primarySafetyPersonnelTelephoneNumber": data.primarySafetyPersonnelTelephoneNumber,
                    "secondarySafetyPersonnelName": data.secondarySafetyPersonnelName,
                    "secondarySafetyPersonnelTelephoneNumber": data.secondarySafetyPersonnelTelephoneNumber,
                    "remarks": data.remarks,
                    "status": "Draft"
                }
        try {
    
                const reqParams = {...params, referenceNumber: refNo}
                const { data: response } = !refNo ? await axios.post(AerialPhotoUrl, reqParams): await axios.put(AerialPhotoUrl, reqParams);
                const resultData = response && response.data ? response.data : response;
                publishTopic();
                setOpenReviewForm(2);
                setFieldValues({ ...resultData });
            
        } catch (error) {
            console.log(error);
            // publishTopic();
            // setOpenReviewForm(2);
            // setFieldValues({...params});
        }
    }

    const loadAerialPhotoPermit = (refNo) => {
		setRefNo(refNo);
		setOpenReviewForm(1);
	}

    const handleFlight = (e) =>{
		const value = e.value
		setTypeOfFlight(value);
	}

    return (
        <>
            {openReviewForm === 1 ? <>
                <Row>
                    <h2>Instructions</h2>
                    <Accordion className='mTop-30 mBot-30'>
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
                    <h2 className='mTop-30 mBot-30'>Your Application</h2>
                </Row>
                <FormProvider {...methods} >
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm={6}>
                                <label class="form-label" for="formVenueDetails">Purpose</label>
                                <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                                    {/* <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }} className="md-3"
                                    /> */}
                                    <Form.Control {...methods.register('purpose',
                                        {
                                            required: "This is required."
                                        })}
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }} className="md-3"
                                    />
                                    <ErrorMessage
                                        errors={methods.errors}
                                        name="purpose"
                                        render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <h3>
                                Date / Time of Activity
                            </h3>
                            <p>
                                The time start and time end for each row of date ranges will indicate the time frame for each day within the date range
                                (e.g. If 20 dec - 25 dec, 2pm - 3pm it means the activity will happen from 2pm-3pm everyday from 20 dec - 25 dec)
                            </p>
                            <AddDeleteTableRows></AddDeleteTableRows>
                        </Row>
                        <div className='col-md-5 mLeft-15 mTop-30 mBot-30'>
                        <Row >
						    {'Type of Flight'}
					    </Row>
                            {/* <Dropdown title={'Type of Flight'} onChange={onChange} options={flightOptions}></Dropdown> */}
                            <Controller
                                control={methods.control}
                                name="typeOfFlight"
                                rules={{ required: true }}
                                render={({
                                    field: { onChange, onBlur, name, value }
                                }) => (
                                    <Select
                                        options={flightOptions}
                                        onChange={val => {
                                            onChange(val.value);
                                            handleFlight(val); 
                                        }} 
                                        name={name}
                                        onBlur={onBlur}
                                        value={flightOptions.filter(({value}) => value === methods.getValues('typeOfFlight'))}
                                    />
                                )}
					        />
                        </div>
                        {renderFlight(typeOfFlight)}
                        <Row>
                            <Col sm={6}>
                                <label class="form-label" for="formVenueDetails">Remarks</label>
                                <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                                    <Form.Control {...methods.register('remarks',
                                        {
                                            required: "This is required."
                                        })}
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }} className="md-3"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col sm={6}>
                                <label class="form-label" for="formEmailAddress">Safety Measures</label>
                                <div class="mBot-30">
                                    <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Upload</button>
                                </div>
                            </Col>
                        </Row>
                        {typeOfFlight === "Helicopter" ? <OperatorDetailsForm></OperatorDetailsForm> : null}
                        <SafetyDetailsForm></SafetyDetailsForm>
                        <h2 className="mLeft-30 mTop-30 mBot-30">Your Personal Details</h2>
                        <PersonalForm></PersonalForm>
                        <div className="btn-center mTop-30 mBot-30">
                                <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
                                <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
                        </div>
                    </Form>
                </FormProvider>

            </> : <ReviewAerialPhotoGraphyForm data={fieldValues} onClick={loadAerialPhotoPermit}></ReviewAerialPhotoGraphyForm>}
        </>
    );
}

export default AerialPhotoGraphyPermit;

const CaptiveBalloons = () => {
    const methods = useFormContext();
    return (
        <>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Maximum Height of Hosited Balloon(s) / Blimp(s) above ground level (in feet) </Form.Label>
                        <Form.Control {...methods.register('maxHeightFeet',
                            {
                                required: "This is required."
                            })}
                            as="textarea"
                            placeholder="Maximum Height of Hosited Balloon"
                            style={{ height: '100px' }} className="md-3"
                        // isInvalid={methods.errors?.remarks?.message ? "true": "false"}
                        />
                        <ErrorMessage
                            errors={methods.errors}
                            name="maxHeightFeet"
                            render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Dimension - Length(m)*</Form.Label>
                        <Form.Control {...methods.register('dimLengthMetres',
                            {
                                required: "This is required."
                            })}
                            type="text"
                            placeholder="Dimension - Length"
                        // isInvalid={methods.errors?.remarks?.message ? "true": "false"}
                        />
                        <ErrorMessage
                            errors={methods.errors}
                            name="dimLengthMetres"
                            render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Dimension - Weight(kg)*</Form.Label>
                        <Form.Control {...methods.register('dimWeightKg',
                            {
                                required: "This is required."
                            })}
                            type="text"
                            placeholder="Dimension - Weight"
                        // isInvalid={methods.errors?.remarks?.message ? "true": "false"}
                        />
                        <ErrorMessage
                            errors={methods.errors}
                            name="dimWeightKg"
                            render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

const BlimpAirship = () => {
    const methods = useFormContext();
    return (
        <>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mBot-30" controlId="dimensionWeightKg">
                        <Form.Label>Dimension - Weight(kg)* </Form.Label>
                        <Form.Control {...methods.register('dimWeightKg',
                            {
                                required: "This is required."
                            })} type="text" placeholder="Dimension - Weight"
                        />
                        <ErrorMessage
                            errors={methods.errors}
                            name="dimWeightKg"
                            render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mBot-30" controlId="dimensionLengthMetres">
                        <Form.Label>Dimension - Length(m)*</Form.Label>
                        <Form.Control {...methods.register('dimLengthMetres',
                            {
                                required: "This is required."
                            })} type="text" placeholder="Dimension - Weight"
                        />
                        <ErrorMessage
                            errors={methods.errors}
                            name="dimLengthMetres"
                            render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Dimension - Breadth(m)*</Form.Label>
                        <Form.Control {...methods.register('dimBreadthMetres',
                            {
                                required: "This is required."
                            })} type="text" placeholder="Dimension - Breadth"
                        />
                        <ErrorMessage
                            errors={methods.errors}
                            name="dimBreadthMetres"
                            render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

const Helicopter = () => {
    const methods = useFormContext();
    return (
        <>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Aircraft Type*</Form.Label>
                        <Form.Control {...methods.register('aircraftType',
                            {
                                required: "This is required."
                            })}  type="text" placeholder="Aircraft Type" className="md-3"
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Callsign of Aircraft*</Form.Label>
                        <Form.Control {...methods.register('aircraftCallsign',
                            {
                                required: "This is required."
                            })}
                            type="text"
                            placeholder="Callsign" className="md-3"
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Minimum Operating Altitude (in feet)</Form.Label>
                        <Form.Control {...methods.register('minOperatingAltitudeFeet',
                            {
                                required: "This is required."
                            })}
                            type="text" placeholder="Minimum Operating Altitude" className="md-3"
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Maximum Operating Altitude (in feet)</Form.Label>
                        <Form.Control {...methods.register('maxOperatingAltitudeFeet',
                            {
                                required: "This is required."
                            })}
                            type="text"
                            placeholder="Maximum Operating Altitude" className="md-3"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>

                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Outside the established helicopter routes, will the aircraft fly over the congested areas of
                            cities, towns or settlements, or over an open-air assemlby of persons at a height less than
                            300m (1000 ft) above the highest obstacle within a radius of 600m from the aircraft?</Form.Label>
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group className="mBot-30" >
                        <Form.Check
                            id="yes1"
                            label="Yes"
                            {...methods.register("flyOverCityLowHeight")}
                            type="radio"
                            value="true"
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group className="mBot-30" >
                        <Form.Check
                            id="no1"
                            label="No"
                            {...methods.register("flyOverCityLowHeight")}
                            type="radio"
                            value="false"
                        />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mBot-30" >
                        <Form.Label>Will the aircraft fly over, or within 3,000 feet of any assembly in the open air of more than
                            1,000 persons assembled for the purpose of witnessing or participating in any organized event?</Form.Label>
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group className="mBot-30" >
                        <Form.Check
                            label="Yes"
                            type="radio"
                            {...methods.register("flyOverAssemblyEvent")}
                            value="true"
                        />
                    </Form.Group>
                </Col>
                <Col sm={3}>
                    <Form.Group className="mBot-30" >
                        <Form.Check
                            label="No"
                            type="radio"
                            {...methods.register("flyOverAssemblyEvent")}
                            value="false"
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

function renderFlight(state) {
    const data = state ? state.split(' ').join(''): null;
    switch (data) {
        case "Blimp/Airship":
            return <BlimpAirship></BlimpAirship>;
        case "CaptiveBalloon":
            return <CaptiveBalloons></CaptiveBalloons>;
        case "Helicopter":
            return <Helicopter></Helicopter>;
        default:
            return null;
    }
}