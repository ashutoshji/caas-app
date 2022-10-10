import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PersonalForm from './PersonalForm';
import ReportingCrud from './ReportingCrud';
import AccordionComp from './AccordionComp';

const ApplyShipCrossing = () => {
    return(
        <>
            <h2 className="mTop-30 mBot-30 mLeft-15">Instructions</h2>
        <AccordionComp></AccordionComp>
        <h2>Your Application</h2>
      <Form className="mLeft-15 mRight-15">
        <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Date of Vessel Movement*</Form.Label>
                <Form.Control type="date" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Vessel*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Callsign*</Form.Label>
                <Form.Control type="text" placeholder="contactNumber" />
                </Form.Group>
            </Col>
        </Row>
            <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Height / Draft (in metres)*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Port of Origin*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>Point of Origin*</Form.Label>
                    <Form.Control type="text" placeholder="emailAddress" />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>Final Destination*</Form.Label>
                    <Form.Control type="text" placeholder="emailAddress" />
                    </Form.Group>
                </Col>
                <ReportingCrud></ReportingCrud>
            </Row>
            <Row>
                <Col sm={6}>
                <label class="form-label" for="formVenueDetails">Location Description</label>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Primary Safety Personnel</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <label class="form-label" for="formVenueDetails">Location Description</label>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Contact number</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                <label class="form-label" for="formVenueDetails">Secondary Safety Personnel</label>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Land Lot No.</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <label class="form-label" for="formVenueDetails">Contact number</label>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Land Lot No.</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
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
                <Col sm={6}>
                <label class="form-label" for="formEmailAddress">Intended Route</label>
                <div class="mBot-30">
                    <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Upload</button>
                </div>
            </Col>
            </Row>
        </Form>
        <hr/>
        <PersonalForm></PersonalForm>
    </>
    )
}

export default ApplyShipCrossing;