import React, { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormCheck } from '@govtechsg/sgds-react/Form';
import { Form } from '@govtechsg/sgds-react/Form';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import PubSub from 'pubsub-js';
import { ErrorMessage } from '@hookform/error-message';
import CompletedForm from './CompletedForm';
import { ShipCrossUrl } from '../Api';

const ReviewApplyShipCrossingForm = (props) => {
    const [checkbox, setCheckbox] = useState(false);
    const [complete, setComplete] = useState(1);
    const [completeFormData, setCompleteFormData] = useState({});
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
            const { data: response } = await axios.put(ShipCrossUrl, params);
            setCompleteFormData(data);
            setComplete(2);
            publishTopic();
        } catch (err) {
            console.log(err);
            // setError(err)
        }
    }
    return (
        <>
            {
                complete === 1 ? <>
                    <FormProvider {...methods} >
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <PersonalDetails data={data}></PersonalDetails>
                        <ApplicationDetials data={data}></ApplicationDetials>
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
                            <div className="btn-center mTop-30 mBot-30">
                                <button type="button" onClick={() => onClick(data.referenceNumber)} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Go Back</button>
                                <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas mLeft-10" />
                                <button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
                            </div>
                        </Form>
                    </FormProvider>
                </> :
                    <CompletedForm data={completeFormData}></CompletedForm>
            }
        </>
    )
}

export default ReviewApplyShipCrossingForm;

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
                    <div>Vessel Movement Date</div>
                </Col>
                <Col sm="3">
                    <div>{data.vesselMovementDate}</div>
                </Col>
                <Col sm="3">
                    <div>Vessel Name</div>
                </Col>
                <Col sm="3">
                    <div>{data.vesselName}</div>
                </Col>
                <Col sm="3">
                    <div>callsign</div>
                </Col>
                <Col sm="3">
                    <div>{data.callsign}</div>
                </Col>
                <Col sm="3">
                    <div>height in Metres</div>
                </Col>
                <Col sm="3">
                    <div>{data.heightMetres}</div>
                </Col>
                <Col sm="3">
                    <div>originPort</div>
                </Col>
                <Col sm="3">
                    <div>{data.originPort}</div>
                </Col>
                <Col sm="3">
                    <div>originPoint</div>
                </Col>
                <Col sm="3">
                    <div>{data.originPoint}</div>
                </Col>
                <Col sm="3">
                    <div>Final Destination</div>
                </Col>
                <Col sm="3">
                    <div>{data.finalDestination}</div>
                </Col>
            </Row>
            <Row>
                <h3 className='mTop-30 mBot-30'>Reporting Activity</h3>
            </Row>
            {
                <div className="col-md-12 column table-responsive-xl">
                <table
                    className="table table-hover"
                    id="tab_logic"
                >
                    <thead>
                        <tr>
                            <th className="text-center">Reporting Point</th>
                            <th className="text-center">Reporting Time</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {data.shipReportingPointDetails && data.shipReportingPointDetails.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">
                                        {item.reportingPointId.reportingPointName}
                                    </td>
                                    <td className="text-center">
                                        {item.reportingTime}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
            }
            <Row>
                <h3 className='mTop-30 mBot-30'>Safety details</h3>
            </Row>
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
                {/* <Col sm="3">
                    <div>Remarks</div>
                </Col>
                <Col sm="3">
                    <div>{data.remarks}</div>
                </Col> */}
            </Row>
        </>

    )
}

const DeclarationForm = () => {
    return (
        <Row>
            <h3 className='mTop-30'>Declaration Form</h3>
            <Form>
                <FormCheck
                    id="declareForm"
                    label="I declare that all the information given in this application form is true and correct..

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel elit convallis, venen"
                />
            </Form>
        </Row>
    )
}