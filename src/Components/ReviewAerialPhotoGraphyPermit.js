import React, { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormCheck } from '@govtechsg/sgds-react/Form';
import { Form } from '@govtechsg/sgds-react/Form';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import PubSub from 'pubsub-js';
import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import CompletedForm from './CompletedForm';
import { AerialPhotoUrl } from '../Api';

const ReviewAerialPhotoGraphyForm = (props) => {
    const [completeForm, setCompleteForm] = useState(1);
    const [completeFormData, setCompleteFormData] = useState({});
    const { data={}, onClick } = props;
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
            const { data: response } = await axios.put(AerialPhotoUrl, params);
            setCompleteFormData(data);
            setCompleteForm(2);
            publishTopic();
        } catch (err) {
            console.log(err);
            // setCompleteFormData(params);
            // setCompleteForm(2);
            // publishTopic();
            // setError(err)
        }
    }

    return (
        <>
        {completeForm === 1 ?
             <FormProvider {...methods} >
            <PersonalDetails data={data}></PersonalDetails>
            <ApplicationDetials data={data}></ApplicationDetials>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='mTop-30 mBot-30'>
            <FormCheck
                                id="declareForm"
                                label="I declare that all the information given in this application form is true and correct..
 
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel elit convallis, venen"
                                {...methods.register('status', {
                                    required: "This is required."
                                })}
                            />
                             <ErrorMessage errors={methods.errors}
                                name="status"
                                render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
                            />
            </div>
            
                <div className="btn-center mTop-30 mBot-30">
                            <button type="button" onClick={() => onClick(data.referenceNumber)} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Go Back</button>
                            <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
                            <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
                </div>
            </Form>
        </FormProvider>: 
        <CompletedForm data={completeFormData}></CompletedForm>
    }
        </>
    )
}

export default ReviewAerialPhotoGraphyForm;

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
                    <div>Type of Flight</div>
                </Col>
                <Col sm="3">
                    <div>{data.aircraftType}</div>
                </Col>
                {data.apHelicopter && data.apHelicopter ?
                    <>
                        <Col sm="3">
                            <div>Operator Company</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.operatorCompany}</div>
                        </Col>
                        <Col sm="3">
                            <div>Postal Code</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.postalCode}</div>
                        </Col>
                        <Col sm="3">
                            <div>Street Name</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.streetName}</div>
                        </Col>
                        <Col sm="3">
                            <div>level</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.level}</div>
                        </Col>
                        <Col sm="3">
                            <div>Unit Number</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.unitNumber}</div>
                        </Col>
                        <Col sm="3">
                            <div>Building Name</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.buildingName}</div>
                        </Col>
                        <Col sm="3">
                            <div>Aircraft Type</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.aircraftType}</div>
                        </Col>
                        <Col sm="3">
                            <div>Aircraft Callsign</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.aircraftCallsign}</div>
                        </Col>
                        <Col sm="3">
                            <div>minimum Operating AltitudeFeet</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.minOperatingAltitudeFeet}</div>
                        </Col>
                        <Col sm="3">
                            <div>Max Operating Altitude in Feet</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apHelicopter.maxOperatingAltitudeFeet}</div>
                        </Col>
                        <Col sm="3">
                            <div>Outside the established helicopter routes, will the aircraft fly over the congested areas of cities, towns or settlements, or over an open-air assemlby of persons at a height less than 300m (1000 ft) above the highest obstacle within a radius of 600m from the aircraft?</div>
                        </Col>
                        {data.apHelicopter.flyOverCityLowHeight && data.apHelicopter.flyOverCityLowHeight ?
                        <>
                        <Col sm="3">
                            <div>
                            <label>
                                <input type="radio" checked={true} value={data.apHelicopter.flyOverCityLowHeight} className={'mRight-15'}  disabled/>
                                {data.apHelicopter.flyOverCityLowHeight}
                            </label>
                                
                            </div>
                        </Col>
                        </>: null}
                        { data.apHelicopter.flyOverAssemblyEvent && data.apHelicopter.flyOverAssemblyEvent ? 
                        <>
                        <Col sm="3">
                            <div>Will the aircraft fly over, or within 3,000 feet of any assembly in the open air of more than
                            1,000 persons assembled for the purpose of witnessing or participating in any organized event?</div>
                        </Col>
                        <Col sm="3">
                            <div>
                            <label>
                                <input type="radio" checked={true} value={data.apHelicopter.flyOverAssemblyEvent} className={'mRight-15'} disabled/>
                                {data.apHelicopter.flyOverAssemblyEvent}
                            </label>
                            </div>
                        </Col>
                        </>: null}

                    </>
                    : null
                }
                {data.apBlimpAirship && data.apBlimpAirship ?
                    <>
                        <Col sm="3">
                            <div>Dimesnion Weight</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apBlimpAirship.dimWeightKg}</div>
                        </Col>
                        <Col sm="3">
                            <div>Dimension Length in Metres</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apBlimpAirship.dimLengthMetres}</div>
                        </Col>
                        <Col sm="3">
                            <div>Dimesnion Breadth in Metres</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonHoisting.dimBreadthMetres}</div>
                        </Col>
                        <Col sm="3">
                            <div>Dimension Weight(Kg)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonHoisting.dimensionWeightKg}</div>
                        </Col>
                    </>
                : null}
                {data.apCaptiveBalloon && data.apCaptiveBalloon ?
                    <>
                        <Col sm="3">
                            <div>Maximum Height in Feet</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apCaptiveBalloon.maxHeightFeet}</div>
                        </Col>
                        <Col sm="3">
                            <div>Dimension Weight</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apCaptiveBalloon.dimWeightKg}</div>
                        </Col>
                        <Col sm="3">
                            <div>Dimension Length Metres</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.apCaptiveBalloon.dimLengthMetres}</div>
                        </Col>
                    </>: null}
                <Col sm="3">
                    <div>Purpose</div>
                </Col>
                <Col sm="3">
                    <div>{data.purpose}</div>
                </Col>
            </Row>
            <Row>
                <h3 className='mTop-30 mBot-30'>Date & Time Activity</h3>
            </Row>
            {
                <table
                    className="table table-hover"
                    id="tab_logic"
                >
                    <thead>
                        <tr>
                            <th className="text-center">Date Start</th>
                            <th className="text-center">Date End</th>
                            <th className="text-center">Time Start</th>
                            <th className="text-center">Time End</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {data.activityDays && data.activityDays.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">
                                        {item.dateStart}
                                    </td>
                                    <td className="text-center">
                                        {item.dateEnd}
                                    </td>
                                    <td className="text-center">
                                        {item.timeStart}
                                    </td>
                                    <td className="text-center">
                                        {item.timeEnd}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
            <h3 className='mTop-30 mBot-30'>Safety details</h3>
            <Row>
                <Col sm="3">
                    <div>Primary SafetyPersonnel Name</div>
                </Col>
                <Col sm="3">
                    <div>{data.primarySafetyPersonnelName}</div>
                </Col>
                <Col sm="3">
                    <div>Primary Safety Contact Number</div>
                </Col>
                <Col sm="3">
                    <div>{data.primarySafetyPersonnelTelephoneNumber}</div>
                </Col>
                <Col sm="3">
                    <div>Secondary SafetyPersonnel Name</div>
                </Col>
                <Col sm="3">
                    <div>{data.secondarySafetyPersonnelName}</div>
                </Col>
                <Col sm="3">
                    <div>Secondary SafetyPersonnel Contact Number</div>
                </Col>
                <Col sm="3">
                    <div>{data.secondarySafetyPersonnelTelephoneNumber}</div>
                </Col>
                <Col sm="3">
                    <div>Safety Measures</div>
                </Col>
                <Col sm="3">
                    <div>{data.safetyMeasures}</div>
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
