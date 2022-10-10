import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const SafetyDetailsForm = () => {
    return(
        <>
           <h3>Safety Details</h3>
           <Form className="pad-0">
            <Row>
                <Col sm={12}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formBasicPassportNumber">
                    <Form.Label>Primary Safety Personnel</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name of Operator’s Company" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Secondary Safety Personnel</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                    <Form.Label>Contact number</Form.Label>
                    <Form.Control type="text" placeholder="FullName" />
                    </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                    <label class="form-label" for="formPurpose">Safety Measures</label>
                    <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }} className="md-3"
                        />
                    </FloatingLabel>
                </Col>
            </Row>
          </Form>
          </>
    )
}

export default SafetyDetailsForm;