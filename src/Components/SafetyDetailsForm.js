import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const SafetyDetailsForm = () => {
    const methods = useFormContext();
    return (
        <>
            <hr />
            <h3 className='mLeft-15'>Safety Details</h3>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mTop-30" controlId="formPrimarySafetyPersonnel">
                        <Form.Label>Primary Safety Personnel*</Form.Label>
                        <Form.Control {...methods.register('primarySafetyPersonnelName',
							{
								required: "This is required."
							})} 
                            type="text" placeholder="Primary Safety Personnel"  className="md-3"
						/>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mTop-30" controlId="formContactNumber">
                        <Form.Label>Contact number*</Form.Label>
                        <Form.Control {...methods.register('primarySafetyPersonnelTelephoneNumber',
							{
								required: "This is required."
							})} 
							type="text" placeholder="Contact Number"  className="md-3"
						/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group className="mTop-30 mBot-30" controlId="formSecondarySafetyPersonnel">
                        <Form.Label>Secondary Safety Personnel*</Form.Label>
                        <Form.Control {...methods.register('secondarySafetyPersonnelName',
							{
								required: "This is required."
							})} 
                            type="text"
							placeholder="Secondary Safety Personnel" className="md-3"
						/>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mTop-30 mBot-30" controlId="formContactNumber">
                        <Form.Label>Contact number*</Form.Label>
                        <Form.Control {...methods.register('secondarySafetyPersonnelTelephoneNumber',
							{
								required: "This is required."
							})} 
							type="text" placeholder="Contact Number" className="md-3"
						/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <label class="form-label" for="formPurpose">Safety Measures</label>
                    <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                        <Form.Control {...methods.register('safetyMeasures',
							{
								required: "This is required."
							})} 
							as="textarea"
							placeholder="Leave a comment here" style={{ height: '100px' }} className="md-3"
						/>
                    </FloatingLabel>
                </Col>
            </Row>
            <hr />
        </>
    )
}

export default SafetyDetailsForm;