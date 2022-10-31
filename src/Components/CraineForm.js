import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import PubSub from 'pubsub-js';
import axios from 'axios';
import PersonalForm from './PersonalForm';
import MachinaryTable from './MachinaryTable';
import ReviewCraineForm from './ReviewCraneForm';
import { ApiCraneUrl } from '../Api';

const CraineForm = (props) => {
    const [isAddress, setIsAddress] = useState('');
    const [siteInAirport, setSiteInAirport] = useState('');
    const [fieldValues, setFieldValues] = useState({});
    const [refNo, setRefNo] = useState(null);
    const [openReviewForm, setOpenReviewForm] = useState(1)
    const methods = useForm();
    const { step } = props;
    const navigate = useNavigate();
    const handleAddressChange = (e) => {
        const value = e.target.value;
        setIsAddress(value);
    }

    const publishTopic = (item) => {
        let msg = { "data": !item ? 1 : item }
        PubSub.publishSync("activeStep", msg);
    }

    const onSubmit = async (data) => {
        console.log(data);
        const params = {
            "applicationType": 2,
            "referenceNumber": data.referenceNumber ?? refNo,
            "nricPassport": data.nricPassport,
            "fullName": data.fullName,
            "companyName": data.companyName,
            "telephoneNumber": data.telephoneNumber,
            "email": data.email,
            "craneMachineryList": data.craneMachineryList,
            "devCompanyName": data.devCompanyName,
            "devProjectManagerName": data.devProjectManagerName,
            "devTelephoneNumber": data.devTelephoneNumber,
            "devEmailAddress": data.devEmailAddress,
            "contractorCompanyName": data.contractorCompanyName,
            "contractorProjectManagerName": data.contractorProjectManagerName,
            "contractorTelephoneNumber": data.contractorTelephoneNumber,
            "contractorEmailAddress": data.contractorEmailAddress,
            "supplierCompanyName": data.supplierCompanyName,
            "supplierProjectManagerName": data.supplierProjectManagerName,
            "supplierTelephoneNumber": data.supplierTelephoneNumber,
            "supplierEmailAddress": data.supplierEmailAddress,
            "safetyCompanyName": data.safetyCompanyName,
            "safetyProjectManagerName": data.safetyProjectManagerName,
            "safetyTelephoneNumber": data.safetyTelephoneNumber,
            "safetyEmailAddress": data.safetyEmailAddress,
            "projectTitle": data.projectTitle,
            "siteAddressType": data.siteAddressType,
            "sitePostalCode": data.sitePostalCode,
            "siteBlockNumnber": data.siteBlockNumnber,
            "siteStreetName": data.siteStreetName,
            "siteLevel": data.siteLevel ?? null,
            "siteUnitNumber": data.siteUnitNumber ?? null,
            "siteBuildingName": data.siteBuildingName ?? null,
            "siteNonStandardAddress": data.siteAddressType,
            "landLotNo": data.landLotNo,
            "expectedCompletionDate": data.expectedCompletionDate,
            "approvedDevelopmentHeightMetres": data.approvedDevelopmentHeightMetres,
            "siteGroundElevationMetres": data.siteGroundElevationMetres,
            "siteInAirport": data.siteInAirport,
            "airportMachineryDeployedAdhoc": data.airportMachineryDeployedAdhoc,
            "airportSiteInCriticalAreas": data.airportSiteInCriticalAreas,
            "airportWorkDuringRunwayClosure": data.airportWorkDuringRunwayClosure,
            "airportStockpileExists": data.airportStockpileExists,
            "stockPileHeightMetres": data.stockPileHeightMetres ?? null,
            "stockPileLocLatitude": data.stockPileLocLatitude ?? null,
            "stockPileLocLongitude": data.stockPileLocLongitude ?? null,
            "airsideSafetyMeasures": data.airsideSafetyMeasures ?? null,
            "machineryPeriodUseFrom": data.machineryPeriodUseFrom,
            "machineryPeriodUseTo": data.machineryPeriodUseTo,
            "remarks": data.remarks ?? null,
            "status": "Draft"
        };
        try {

            const { data: response } = !refNo ? await axios.post(ApiCraneUrl, params) : await axios.put(ApiCraneUrl, params);
            const resultData = response && response.data ? response.data : response;
            publishTopic();
            setOpenReviewForm(2);
            setFieldValues({ ...resultData });

        } catch (error) {
            console.log(error);
            // publishTopic();
            // setOpenReviewForm(2);
            // setFieldValues({ ...params });
        }
    }

    const handleChange = (e) => {
        setSiteInAirport(e.currentTarget.value)
    }

    const SubmitButton = React.memo(() => {
        return <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
    });

    const loadCraneForm = (refNo) => {
        setRefNo(refNo);
        setOpenReviewForm(1);
        publishTopic(0);
    }

    const handleDateChange = (e) => {
        console.log(e);
        const { name, value } = e.currentTarget
        if(name == "machineryPeriodUseFrom"){

        }
    }

    return (
        <>
            {
                openReviewForm === 1 ?
                    <>
                        <div className='mLeft-15 mRight-15'>
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
                            <h2 className='mBot-30'>Your Application</h2>
                        </div>
                        <FormProvider {...methods} >
                            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Highest Working Height of Machinery*</Form.Label>
                                            <Form.Control {...methods.register('highestWorkingHeightMeters',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Highest Working Height of Machinery"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="highestWorkingHeightMeters"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Machinery Use Start Date*</Form.Label>
                                            <Form.Control {...methods.register('machineryPeriodUseFrom',
                                                {
                                                    required: "This is required.",
                                                    validate: {
                                                        required: value => {
                                                          //console.log(value);
                                                          const dateEnd = methods.getValues(`machineryPeriodUseTo`);
                                                          const x = new Date(value);
                                                          const y = new Date(dateEnd);
                                                          if (x.getTime() > y.getTime()) return 'End date should be greater than Start date';
                                                          return true;
                                                        }
                                                      }
                                                })} 
                                                type="date" 
                                                placeholder="Machinery Use Start Date"
                                                onChange={handleDateChange}
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="machineryPeriodUseFrom"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Machinery Use End Date*</Form.Label>
                                            <Form.Control {...methods.register('machineryPeriodUseTo',
                                                {
                                                    required: "This is required." ,
                                                    validate: {
                                                        required: value => {
                                                          //console.log(value);
                                                          const dateStart = methods.getValues(`machineryPeriodUseFrom`);
                                                          const x = new Date(value);
                                                          const y = new Date(dateStart);
                                                          if (x.getTime() < y.getTime()) return 'End date should be greater than Start date';
                                                          return true;
                                                        }
                                                      }
                                                })} 
                                                type="date" 
                                                placeholder="Machinery Use End Date"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="machineryPeriodUseTo"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h2 className='mLeft-15'>Machinery and Equipment</h2>
                                {/* <MachineryFile></MachineryFile> */}
                                <Row>
                                    <MachinaryTable></MachinaryTable>
                                </Row>
                                <hr />
                                <h3 className='mLeft-15 mTop-30'>Project Details</h3>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Project Title*</Form.Label>
                                            <Form.Control {...methods.register('projectTitle',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Project Title"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="projectTitle"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className=" mBot-30" >
                                            <Form.Label>Project Expected Completion Date*</Form.Label>
                                            <Form.Control {...methods.register('expectedCompletionDate',
                                                {
                                                    required: "This is required."
                                                })} type="date" placeholder="Project Expected Completion Date"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="expectedCompletionDate"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Type of Address*</Form.Label>
                                            {!isAddress ?
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="siteAddressType"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{"This is required."}</p>}
                                                /> :
                                                null}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Check {...methods.register('siteAddressType',
                                                {
                                                    required: "This is required."
                                                })}
                                                type="radio"
                                                id="standard"
                                                label="Standard"
                                                name="address"
                                                value="STD"
                                                onChange={handleAddressChange}
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Check {...methods.register('siteAddressType',
                                                {
                                                    required: "This is required."
                                                })}
                                                type="radio"
                                                id="nonStandard"
                                                name="address"
                                                value="NONSTD"
                                                label="Non-Standard"
                                                onChange={handleAddressChange}
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            {/* <ErrorMessage
                                                errors={methods.errors}
                                                name="siteAddressType"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            /> */}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    {isAddress && isAddress === "STD" ?
                                        <>
                                            <Col sm={6}>
                                                <Form.Group className="mBot-30" >
                                                    <Form.Label>Postal Code*</Form.Label>
                                                    {/* <Form.Control type="text" placeholder="Danger Height Installation" /> */}
                                                    <Form.Control {...methods.register('sitePostalCode',
                                                        {
                                                            required: "This is required."
                                                        })} type="text" placeholder="Postal Code"
                                                    //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                    />
                                                    <ErrorMessage
                                                        errors={methods.errors}
                                                        name="sitePostalCode"
                                                        render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={6}>
                                                <div class="mTop-30 mLeft-30">
                                                    <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Retrieve Address</button>
                                                </div>
                                            </Col>
                                            <Col sm={6}>
                                                <Form.Group className="mBot-30" >
                                                    <Form.Label>Street name*</Form.Label>

                                                    <Form.Control {...methods.register('siteStreetName',
                                                        {
                                                            required: "This is required."
                                                        })} type="text" placeholder="Street name"
                                                    //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                    />
                                                    <ErrorMessage
                                                        errors={methods.errors}
                                                        name="siteStreetName"
                                                        render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </>
                                        :
                                        <Col sm={12}>
                                            <label class="form-label" for="formVenueDetails">Location Description</label>
                                            <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                                                <Form.Control {...methods.register('locationDescription',
                                                    {
                                                        required: "This is required."
                                                    })}
                                                    as="textarea"
                                                    placeholder="Leave a comment here"
                                                    style={{ height: '100px' }} className="md-3"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="locationDescription"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                />
                                            </FloatingLabel>
                                        </Col>}
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Land Lot No.</Form.Label>
                                            <Form.Control {...methods.register('landLotNo')} type="text" placeholder="Land Lot No"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="landLotNo"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Approved Development Height*</Form.Label>
                                            <Form.Control {...methods.register('approvedDevelopmentHeightMetres',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Approved Development Height"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="approvedDevelopmentHeightMetres"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Site ground elevation</Form.Label>

                                            <Form.Control {...methods.register('siteGroundElevationMetres',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Site ground elevation"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="siteGroundElevationMetres"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Is the work site within airport perimeter fencing?*</Form.Label>
                                            {
                                                !siteInAirport ?
                                                    <ErrorMessage
                                                        errors={methods.errors}
                                                        name="siteInAirport"
                                                        render={({ message }) => <p style={{ 'color': 'red' }}>{"This is required."}</p>}
                                                    /> : null
                                            }
                                        </Form.Group>
                                    </Col>
                                    <Col sm={1}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Check {...methods.register('siteInAirport',
                                                {
                                                    required: "This is required."
                                                })}

                                                label="Yes"
                                                name="siteInAirport"
                                                type="radio"
                                                value={true}
                                                onChange={handleChange}
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            {/* <ErrorMessage
                                                errors={methods.errors}
                                                name="siteInAirport"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col sm={1}>
                                        <Form.Group className="mBot-30" >

                                            <Form.Check {...methods.register('siteInAirport',
                                                {
                                                    required: "This is required."
                                                })}

                                                label="No"
                                                name="siteInAirport"
                                                type="radio"
                                                value={false}
                                                onChange={handleChange}

                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            {/* <ErrorMessage
                                                errors={methods.errors}
                                                name="siteInAirport"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            /> */}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {siteInAirport === "true" ?
                                    <Row>
                                        <Col sm={6}>
                                            <Form.Group className="mBot-30" >

                                                <Form.Check {...methods.register('airportMachineryDeployedAdhoc',
                                                    {
                                                        required: "This is required."
                                                    })}

                                                    label="Airport Machinery Deployed Adhoc*"
                                                    name="airportMachineryDeployedAdhoc"
                                                    type="checkbox"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="airportMachineryDeployedAdhoc"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mBot-30" >

                                                <Form.Check {...methods.register('airportSiteInCriticalAreas')}
                                                    name="airportSiteInCriticalAreas"
                                                    label="AirportSite In CriticalAreas"
                                                    type="checkbox"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                {/* <ErrorMessage
                                                    errors={methods.errors}
                                                    name="airportSiteInCriticalAreas"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mBot-30" >
                                                {/* <Form.Check
                                                    id="option-1"
                                                    label="Airport Work During Runway Closure*"
                                                    name="radio_checks"
                                                    type="checkbox"
                                                /> */}
                                                <Form.Check {...methods.register('airportWorkDuringRunwayClosure',
                                                    {
                                                        required: "This is required."
                                                    })}
                                                    label="Airport Work During Runway Closure*"
                                                    name="airportWorkDuringRunwayClosure"
                                                    type="checkbox"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="airportWorkDuringRunwayClosure"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mBot-30" >

                                                <Form.Check {...methods.register('airportStockpileExists')}
                                                    label="Airport Stockpile Exists"
                                                    name="airportStockpileExists"
                                                    type="checkbox"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                {/* <ErrorMessage
                                                    errors={methods.errors}
                                                    name="airportStockpileExists"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mTop-30" >
                                                <Form.Label>StockPile Height Metres</Form.Label>

                                                <Form.Control {...methods.register('stockPileHeightMetres')}
                                                    type="text"
                                                    placeholder="StockPile Height Metres"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="stockPileHeightMetres"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mTop-30" >
                                                <Form.Label>StockPile Location Latitude</Form.Label>

                                                <Form.Control {...methods.register('stockPileLocLatitude')} type="text" placeholder="StockPile Location Latitude"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="stockPileLocLatitude"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mTop-30 mBot-30" >
                                                <Form.Label>StockPile Location Longitude</Form.Label>

                                                <Form.Control {...methods.register('stockPileLocLongitude')}
                                                    type="text"
                                                    placeholder="StockPile Location Longitude"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="stockPileLocLongitude"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group className="mTop-30 mBot-30" >
                                                <Form.Label>Airside SafetyMeasures</Form.Label>

                                                <Form.Control {...methods.register('airsideSafetyMeasures')} type="text" placeholder="Airside SafetyMeasures"
                                                //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                                />
                                                <ErrorMessage
                                                    errors={methods.errors}
                                                    name="airsideSafetyMeasures"
                                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row> :
                                    null}
                                <Row>
                                    <h3>Developers</h3>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Name of Company*</Form.Label>

                                            <Form.Control {...methods.register('devCompanyName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Company"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="devCompanyName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Email Address*</Form.Label>

                                            <Form.Control {...methods.register('devEmailAddress',
                                                {
                                                    required: "This is required."
                                                })} type="email" placeholder="Email Address"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="devEmailAddress"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Name of Project Manager</Form.Label>

                                            <Form.Control {...methods.register('devProjectManagerName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Project Manager"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="devProjectManagerName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Contact number*</Form.Label>

                                            <Form.Control {...methods.register('devTelephoneNumber',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Contact number"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="devTelephoneNumber"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <h3>Main Contractor</h3>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Name of Company</Form.Label>

                                            <Form.Control {...methods.register('contractorCompanyName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Company"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="contractorCompanyName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Email Address</Form.Label>

                                            <Form.Control {...methods.register('contractorEmailAddress',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Email Address"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="contractorEmailAddress"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Name of Project Manager</Form.Label>

                                            <Form.Control {...methods.register('contractorProjectManagerName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Project Manager"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="contractorProjectManagerName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Contact number*</Form.Label>

                                            <Form.Control {...methods.register('contractorTelephoneNumber',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Contact number"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="contractorTelephoneNumber"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <h3>Crane Supplier / Subcontractor</h3>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Name of Company</Form.Label>

                                            <Form.Control {...methods.register('supplierCompanyName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Company"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="supplierCompanyName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" >
                                            <Form.Label>Email Address</Form.Label>

                                            <Form.Control {...methods.register('supplierEmailAddress',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Email Address"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="supplierEmailAddress"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Name of Project Manager</Form.Label>

                                            <Form.Control {...methods.register('supplierProjectManagerName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Project Manager"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="supplierProjectManagerName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mBot-30" >
                                            <Form.Label>Contact number*</Form.Label>

                                            <Form.Control {...methods.register('supplierTelephoneNumber',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Contact number"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="supplierTelephoneNumber"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <h3>On-site safety personnel</h3>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Name of Company</Form.Label>

                                            <Form.Control {...methods.register('safetyCompanyName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Company"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="safetyCompanyName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Email Address</Form.Label>

                                            <Form.Control {...methods.register('safetyEmailAddress',
                                                {
                                                    required: "This is required."
                                                })} type="email" placeholder="Email Address"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="safetyEmailAddress"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Name of Project Manager</Form.Label>

                                            <Form.Control {...methods.register('safetyProjectManagerName',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Name of Project Manager"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="safetyProjectManagerName"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group className="mTop-30" >
                                            <Form.Label>Contact number*</Form.Label>
                                            <Form.Control {...methods.register('safetyTelephoneNumber',
                                                {
                                                    required: "This is required."
                                                })} type="text" placeholder="Contact number"
                                            //isInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber ? "true": "false"}
                                            />
                                            <ErrorMessage
                                                errors={methods.errors}
                                                name="safetyTelephoneNumber"
                                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <h3 className='mBot-30 mTop-30 mLeft-15'> Personal Details</h3>
                                <PersonalForm></PersonalForm>
                                <div className="btn-center mTop-30 mBot-30">
                                    <SubmitButton></SubmitButton>
                                    <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>

                                </div>
                            </Form>
                        </FormProvider>
                    </> :
                    <ReviewCraineForm data={fieldValues} onClick={loadCraneForm}></ReviewCraineForm>
            }
        </>

    );
}

export default CraineForm;