import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OperatorDetailsForm = () => {
    return(
           <Form className="pad-0">
            <Row>
                <Col sm={12}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formBasicPassportNumber">
                    <Form.Label>Name of Operator’s Company</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name of Operator’s Company" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Operator Company Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            <Col sm={6}>
                    <button className="mTop-10">Retrieve Address</button>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Block  / House No</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            <Col sm={6}>
            <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Street Name*</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Level</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Unit Number</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Building Name</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            </Row>
          </Form>
    )
}

export default OperatorDetailsForm;