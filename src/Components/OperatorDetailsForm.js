import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const OperatorDetailsForm = () => {
        const methods = useFormContext();
        return (
                <>
                        <hr />
                        <h3 className='mLeft-15'> Operator Details</h3>
                        <Row>
                                <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formBasicPassportNumber">
                                                <Form.Label>Name of Operator’s Company</Form.Label>
                                                <Form.Control {...methods.register('operatorCompany',
							{
								required: "This is required."
							})} 
							type="text" placeholder="Enter Name of Operator’s Company" 
							className="md-3"
						/>
                                        </Form.Group>
                                </Col>
                        </Row>
                        <Row>
                                <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formFullName">
                                                <Form.Label>Operator Company Postal Code</Form.Label>
                                                <Form.Control {...methods.register('postalCode',
							{
								required: "This is required."
							})} 
							type="text" placeholder="Postal Code" 
							className="md-3"
						/>
                                        </Form.Group>
                                </Col>
                                <Col sm={6}>
                                        <div class="mTop-70">
                                                <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Retrieve Address</button>
                                        </div>
                                </Col>
                        </Row>
                        <Row>
                                <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formFullName">
                                                <Form.Label>Block  / House No</Form.Label>
                                                <Form.Control {...methods.register('blockNumber',
							{
								required: "This is required."
							})} 
							type="text" placeholder="Block Numnber" 
							className="md-3"
						/>
                                        </Form.Group>
                                </Col>
                                <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formFullName">
                                                <Form.Label>Street Name*</Form.Label>
                                                <Form.Control {...methods.register('streetName',
							{
								required: "This is required."
							})} 
							type="text" placeholder="Street Name"
							className="md-3"
						/>
                                        </Form.Group>
                                </Col>
                        </Row>
                        <Row>
                                <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formFullName">
                                                <Form.Label>Level</Form.Label>
                                                <Form.Control {...methods.register('level')} 
							type="text" placeholder="Level"
							className="md-3"
						/>
                                        </Form.Group>
                                </Col>
                                <Col sm={6}>
                                        <Form.Group className="mTop-30" controlId="formFullName">
                                                <Form.Label>Unit Number</Form.Label>
                                                <Form.Control {...methods.register('unitNumber')} 
							type="text" placeholder="Unit Number"
							className="md-3"
						/>
                                        </Form.Group>
                                </Col>
                        </Row>
                        <Row>
                                <Col sm={6}>
                                        <Form.Group className="mTop-30 mBot-30" controlId="formFullName">
                                                <Form.Label>Building Name</Form.Label>
                                                <Form.Control {...methods.register('buildingName')} 
							type="text" placeholder="Building Name"
							className="md-3"
						/>
                                        </Form.Group>
                                </Col>
                        </Row>
                </>
        )
}

export default OperatorDetailsForm;