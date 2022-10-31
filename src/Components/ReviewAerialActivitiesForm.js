import React, { useState, useRef, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormCheck } from '@govtechsg/sgds-react/Form';
import { Form } from '@govtechsg/sgds-react/Form';
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';
import { useLocation, useNavigate } from 'react-router-dom';
import PubSub from "pubsub-js";
import CompletedForm from './CompletedForm';
import { AerialActivityUrl } from '../Api';

// import Client from '../Api';

const ReviewAerialAcitivitiesForm = (props) => {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [complete, setComplete] = useState(1);
    const { data = {}, onClick } = props;
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
            const { data: response } = await axios.put(AerialActivityUrl, params);
            setResults(data);
            setError(null);
            setComplete(2);
            publishTopic();
        } catch (err) {
            console.log(err);
            setError(err);
        }
    }

    return (
        <>
            {
                complete === 1 ?
                    <FormProvider {...methods} >
                        <PersonalDetails data={data}></PersonalDetails>
                        <ApplicationDetials data={data}></ApplicationDetials>
                        <Row>
                            <h3 className='mTop-30'>Declaration Form</h3>
                            <Form onSubmit={methods.handleSubmit(onSubmit)}>
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
                                <div className="btn-center mTop-30 mBot-30">
                                    <button type="button" onClick={() => onClick(data.referenceNumber)} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Go Back</button>
                                    <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas mLeft-10" />
                                    <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
                                </div>
                            </Form>
                        </Row>
                    </FormProvider> :
                    <CompletedForm data={results}></CompletedForm>
            }
        </>
    )
}

export default ReviewAerialAcitivitiesForm;

const PersonalDetails = (props) => {
    const { data = {} } = props;
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
    const { data = {} } = props;
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
                {data.aaFireworks && data.aaFireworks ?
                    <>
                        <Col sm="3">
                            <div>Estimated Duration(mins)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaFireworks.estimatedDurationMin}</div>
                        </Col>
                        <Col sm="3">
                            <div>Number of units</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaFireworks.numberOfUnits}</div>
                        </Col>
                        <Col sm="3">
                            <div>Estimated Duration(mins)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaFireworks.dangerRadiusMetres}</div>
                        </Col>
                    </>: null}
                {data.aaBalloonHoisting && data.aaBalloonHoisting ?
                    <>
                        <Col sm="3">
                            <div>Number of Balloons</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonHoisting.numberOfBalloons}</div>
                        </Col>
                        <Col sm="3">
                            <div>Maximum Hoisted height</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonHoisting.maxHoistedHeightFeet}</div>
                        </Col>
                        <Col sm="3">
                            <div>Max Ballons Dimension(meter)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonHoisting.maxBalloonDimensionMetres}</div>
                        </Col>
                        <Col sm="3">
                            <div>Dimension Weight(Kg)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonHoisting.dimensionWeightKg}</div>
                        </Col>
                    </>: null}
                {data.aaKiteParasailing && data.aaKiteParasailing ?
                    <>
                        <Col sm="3">
                            <div>Number of Kites</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaKiteParasailing.numberOfKites}</div>
                        </Col>
                        <Col sm="3">
                            <div>Maximum Height</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaKiteParasailing.maxHeightFeet}</div>
                        </Col>
                        <Col sm="3">
                            <div>Number of Kites(meters)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaKiteParasailing.dimensionLengthMetres}</div>
                        </Col>
                        <Col sm="3">
                            <div>Dimension breadth(meters)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaKiteParasailing.dimensionBreadthMetres}</div>
                        </Col>
                    </>: null}
                {data.aaLasersLights && data.aaLasersLights ?
                    <>
                        <Col sm="3">
                            <div>Laser Type</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaLasersLights.laserTypeSpecs}</div>
                        </Col>
                        <Col sm="3">
                            <div>Number of Units</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaLasersLights.numberOfUnits}</div>
                        </Col>
                        <Col sm="3">
                            <div>Max power output</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaLasersLights.maxPowerOutput}</div>
                        </Col>
                        <Col sm="3">
                            <div>Danger Height</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaLasersLights.dangerHeight}</div>
                        </Col>
                        <Col sm="3">
                            <div>Danger Height Installation</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaLasersLights.dangerHeightInstallation}</div>
                        </Col>
                    </>: null}
                {data.aaSkyLantern && data.aaSkyLantern ?
                    <>
                        <Col sm="3">
                            <div>Number Of Lanterns</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaSkyLantern.numberOfLanterns}</div>
                        </Col>
                        <Col sm="3">
                            <div>Max Size(cm)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaSkyLantern.maxSizeCm}</div>
                        </Col>
                    </>: null}
                {data.aaBalloonRelease && data.aaBalloonRelease ?
                    <>
                        <Col sm="3">
                            <div>Number of balloons</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonRelease.numberOfBalloons}</div>
                        </Col>
                        <Col sm="3">
                            <div>Max size(cm)</div>
                        </Col>
                        <Col sm="3">
                            <div>{data.aaBalloonRelease.maxSizeCm}</div>
                        </Col>
                    </>: null}
            </Row>
            <Row>
                <h3 className='mTop-30 mBot-30'>Date & Time Activity</h3>
            </Row>
            {
                <div className="col-md-12 column table-responsive-xl">
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
                </div>
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