import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PersonalForm = () => {
    return(
          <Form as={Row} className="pad-0 mLeft-15 mRight-15">
          <Form.Group as={Col} md="6" className="mBot-30" controlId="formBasicPassportNumber">
            <Form.Label>Passport number / NRIC*</Form.Label>
            <Form.Control type="text" placeholder="Enter Passport number / NRIC" />
          </Form.Group>
          <Form.Group as={Col} md="6" className="mBot-30" controlId="formFullName">
            <Form.Label>Full Name*</Form.Label>
          <Form.Control type="text" placeholder="FullName" />
          </Form.Group>
          <Form.Group as={Col} md="6" className="mBot-30" controlId="formCompanyName">
            <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" placeholder="Company Name" />
          </Form.Group>
          <Form.Group as={Col} md="6" className="mBot-30" controlId="formContactNumber">
            <Form.Label>Contact Number*</Form.Label>
          <Form.Control type="text" placeholder="Contact Number" />
          </Form.Group>
          <Form.Group as={Col} md="6" className="mBot-30" controlId="formEmailAddress">
            <Form.Label>Email Address*</Form.Label>
          <Form.Control type="email" placeholder="emailAddress" />
          </Form.Group>
        </Form>
    )
}

export default PersonalForm;