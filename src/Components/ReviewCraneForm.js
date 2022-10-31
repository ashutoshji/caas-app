import React, { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormCheck } from '@govtechsg/sgds-react/Form';
import { Form } from '@govtechsg/sgds-react/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { useForm, FormProvider } from "react-hook-form";
import CompletedForm from './CompletedForm';
import PubSub from 'pubsub-js';
import axios from 'axios';
import { ApiCraneUrl } from '../Api';

const ReviewCraineForm = (props) => {
    const [checkbox, setCheckbox] = useState(false);
    const [complete, setComplete] = useState(1);
    const [completeForm, setCompleteForm] = useState(1);
    const [completeFormData, setCompleteFormData] = useState({});
    const { data={} } = props;
    const navigate = useNavigate();
    const methods = useForm();
    const publishTopic = () => {
        let msg = { "data": 2 }
        PubSub.publishSync("activeStep", msg);
    }
    const onSubmit = async (responseData) => {
        const params = {
            ...data, status: "Submitted"
        }
        try {
            const { data: response } = await axios.put(ApiCraneUrl, params);
            setCompleteFormData(data);
            setComplete(2);
            publishTopic();
        } catch (err) {
            console.log(err);
            // setError(err)
            // setCompleteFormData(params);
            // setComplete(2);
            // publishTopic();
        }
    }
    // const SubmitButton = React.memo(() => {
    //     <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
    // });
    return (
        <>
        {
            complete === 1 ? <>
            <FormProvider {...methods} >
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <PersonalDetails data={data}></PersonalDetails>
                <ApplicationDetials data={data}></ApplicationDetials>
                    <div className='mTop-30 mBot-30'>
                    <Form.Check
                                    id="declareForm"
                                    label="I declare that all the information given in this application form is true and correct..
 
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel elit convallis, venen"
                                    {...methods.register('status', {
                                        required: "This is required."
                                    })}
                                />
                                <ErrorMessage
                                    errors={methods.errors}
                                    name="status"
                                    render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                                />
                    </div>
                    
                    <div className="btn-center mTop-30 mBot-30">
                                <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Go Back</button>
                                <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
                                <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
                    </div>
                </Form>
            </FormProvider>
        </>: 
         <CompletedForm data={completeFormData}></CompletedForm>
                }
                </>
    )
}

export default ReviewCraineForm;

const PersonalDetails = (props) => {
    const { data={} } = props;
    return (
        <Row>
            <h3 className='mTop-30 mBot-30'>Your Personal details</h3>
            <Col sm="3">
                <div>Name</div>
            </Col>
            <Col sm="3">
                <div>{data.fullName}</div>
            </Col>
            <Col sm="3">
                <div>NRIC</div>
            </Col>
            <Col sm="3">
                <div>{data.nricPassport}</div>
            </Col>
            <Col sm="3">
                <div>Company Name</div>
            </Col>
            <Col sm="3">
                <div>{data.companyName}</div>
            </Col>
            <Col sm="3">
                <div>contact number</div>
            </Col>
            <Col sm="3">
                <div>{data.telephoneNumber}</div>
            </Col>
            <Col sm="3">
                <div>Email</div>
            </Col>
            <Col sm="3">
                <div>{data.email}</div>
            </Col>
        </Row>
    )
}

const ApplicationDetials = (props) => {
    const { data={} } = props;
    return ( 
        <>
            <Row>
                <h3 className='mTop-30 mBot-30'>Your Application Detials</h3>
                <Col sm="3">
                    <div>Type of Activity</div>
                </Col>
                <Col sm="3">
                    <div>{data.activityType}</div>
                </Col>
            </Row>
            <Row>
                <h3 className='mTop-30 mBot-30'>Craine Machinery list</h3>
            </Row>
            {
                <div className="col-md-12 column table-responsive-xl">
                <table
                    className="table table-hover"
                    id="tab_logic"
                >
                    <thead>
                        <tr>
                            <th className="text-center">Machinery Set</th>
                            <th className="text-center">Machinery Others</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Working Height</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {data.craneMachineryList && data.craneMachineryList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">
                                        {item.machinerySetId}
                                    </td>
                                    <td className="text-center">
                                        {item.machineryOthers}
                                    </td>
                                    <td className="text-center">
                                        {item.quantity}
                                    </td>
                                    <td className="text-center">
                                        {item.workingHeightMetres}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
            }
            <h3 className='mTop-30 mBot-30'>Developers</h3>
            <Row>
                <Col sm="3">
                    <div>Company Name</div>
                </Col>
                <Col sm="3">
                    <div>{data.devCompanyName}</div>
                </Col>
                <Col sm="3">
                    <div>Project Manager</div>
                </Col>
                <Col sm="3">
                    <div>{data.devProjectManagerName}</div>
                </Col>
                <Col sm="3">
                    <div>Contact Number</div>
                </Col>
                <Col sm="3">
                    <div>{data.devTelephoneNumber}</div>
                </Col>
                <Col sm="3">
                    <div>Email</div>
                </Col>
                <Col sm="3">
                    <div>{data.devEmailAddress}</div>
                </Col>
            </Row>
            <h3 className='mTop-30 mBot-30'>Contractors</h3>
            <Row>
                <Col sm="3">
                    <div>Company Name</div>
                </Col>
                <Col sm="3">
                    <div>{data.contractorCompanyName}</div>
                </Col>
                <Col sm="3">
                    <div>Project Manager</div>
                </Col>
                <Col sm="3">
                    <div>{data.contractorProjectManagerName}</div>
                </Col>
                <Col sm="3">
                    <div>Contact Number</div>
                </Col>
                <Col sm="3">
                    <div>{data.contractorTelephoneNumber}</div>
                </Col>
                <Col sm="3">
                    <div>Email</div>
                </Col>
                <Col sm="3">
                    <div>{data.contractorEmailAddress}</div>
                </Col>
            </Row>
            <h3 className='mTop-30 mBot-30'>Supplier</h3>
            <Row>
                <Col sm="3">
                    <div>Company Name</div>
                </Col>
                <Col sm="3">
                    <div>{data.supplierCompanyName}</div>
                </Col>
                <Col sm="3">
                    <div>Project Manager</div>
                </Col>
                <Col sm="3">
                    <div>{data.supplierProjectManagerName}</div>
                </Col>
                <Col sm="3">
                    <div>Contact Number</div>
                </Col>
                <Col sm="3">
                    <div>{data.supplierTelephoneNumber}</div>
                </Col>
                <Col sm="3">
                    <div>Email</div>
                </Col>
                <Col sm="3">
                    <div>{data.supplierEmailAddress}</div>
                </Col>
            </Row>
            <h3 className='mTop-30 mBot-30'>Safety</h3>
            <Row>
                <Col sm="3">
                    <div>Company Name</div>
                </Col>
                <Col sm="3">
                    <div>{data.safetyCompanyName}</div>
                </Col>
                <Col sm="3">
                    <div>Project Manager</div>
                </Col>
                <Col sm="3">
                    <div>{data.safetyProjectManagerName}</div>
                </Col>
                <Col sm="3">
                    <div>Contact Number</div>
                </Col>
                <Col sm="3">
                    <div>{data.safetyTelephoneNumber}</div>
                </Col>
                <Col sm="3">
                    <div>Email</div>
                </Col>
                <Col sm="3">
                    <div>{data.safetyEmailAddress}</div>
                </Col>
            </Row>
            <h3 className='mTop-30 mBot-30'>Site Details</h3>
            <Row>
                <Col sm="3">
                    <div>Project Title</div>
                </Col>
                <Col sm="3">
                    <div>{data.projectTitle}</div>
                </Col>
                <Col sm="3">
                    <div>Address Type</div>
                </Col>
                <Col sm="3">
                    <div>{data.siteAddressType}</div>
                </Col>
                {data.siteAddressType === 'STD' ?
                    <>
                        <Col sm="3">
                            <div>Postal Code</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.sitePostalCode}</div>
                        </Col>
                        <Col sm="3">
                            <div>Site StreetName</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.siteStreetName}</div>
                        </Col>
                        <Col sm="3">
                            <div>Site Level</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.siteLevel}</div>
                        </Col>
                        <Col sm="3">
                            <div>Unit Number</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.siteUnitNumber}</div>
                        </Col>
                        <Col sm="3">
                            <div>Building Name</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.siteBuildingName}</div>
                        </Col></> :
                    <>
                        <Col sm="3">
                            <div>Non Standard Address</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.siteNonStandardAddress}</div>
                        </Col>
                        <Col sm="3">
                            <div>Landlot No</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.landLotNo}</div>
                        </Col>
                    </>
                }

                <Col sm="3">
                    <div>Expected completion Date</div>
                </Col>
                <Col sm="3">
                    <div>{data.expectedCompletionDate}</div>
                </Col>
                <Col sm="3">
                    <div>Approved Development height</div>
                </Col>
                <Col sm="3">
                    <div>{data.approvedDevelopmentHeightMetres}</div>
                </Col>
                <Col sm="3">
                    <div>Ground Elevation</div>
                </Col>
                <Col sm="3">
                    <div>{data.siteGroundElevationMetres}</div>
                </Col>
                <Col sm="3">
                    <div>Site in airport</div>
                </Col>
                <Col sm="3">
                    <div>{data.siteInAirport}</div>
                </Col>
                {data.siteInAirport ?
                    <>
                        <Col sm="3">
                            <div>Airport Machinery DeployedAdhoc</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.airportMachineryDeployedAdhoc ?? "false"}</div>
                        </Col>
                        <Col sm="3">
                            <div>airport Site In Critical Areas</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.airportSiteInCriticalAreas?? "false"}</div>
                        </Col>
                        <Col sm="3">
                            <div>Airport Work During Runway Closure</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.airportWorkDuringRunwayClosure ?? "false"}</div>
                        </Col>
                        <Col sm="3">
                            <div>Airport Stockpile Exists</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.airportStockpileExists ?? "false"}</div>
                        </Col>
                        <Col sm="3">
                            <div>StockPile Height in Metres</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.stockPileHeightMetres}</div>
                        </Col>
                        <Col sm="3">
                            <div>Airport Stockpile Exists</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.airportStockpileExists ?? "false"}</div>
                        </Col>
                        <Col sm="3">
                            <div>StockPile Location Latitude</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.stockPileLocLatitude}</div>
                        </Col>
                        <Col sm="3">
                            <div>Airport Stockpile Longitude</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.stockPileLocLongitude}</div>
                        </Col>
                        <Col sm="3">
                            <div>Airport Safety Measures</div>
                        </Col></>
                    : null}
                <Col sm="3">
                    <div>{data.airsideSafetyMeasures}</div>
                </Col>
                <Col sm="3">
                    <div>Machinery PeriodUse From</div>
                </Col>
                <Col sm="3">
                    <div>{data.machineryPeriodUseFrom}</div>
                </Col>
                <Col sm="3">
                    <div>Machinery PeriodUse To</div>
                </Col>
                <Col sm="3">
                    <div>{data.machineryPeriodUseTo}</div>
                </Col>
                <Col sm="3">
                    <div>Remarks</div>
                </Col>
                <Col sm="3">
                    <div>{data.remarks}</div>
                </Col>
            </Row>
        </>

    )
}