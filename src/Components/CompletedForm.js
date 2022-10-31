import React, { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CompletedForm = (props) => {
    const { data } = props
    const referenceNumber = data?.referenceNumber
    return (
        <Row>
            <Col sm="12">
                <h3 className='text-center mTop-30 mBot-30'>
                    Confirmation
                </h3>
            </Col>
            <Col sm="12">
                <div className='text-center mTop-30 mBot-30'>Your submission has been received. An email acknowledgement has been sent to you.<br />

                    Please take note of the following details for tracking of application:
                    Application Number: {referenceNumber}</div>
            </Col>
            <Col sm="12">
                <div className='text-center mTop-30 mBot-30'>
                    <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas">Download a copy of your application</button>
                </div>
            </Col>
        </Row>
    )
}

export default CompletedForm;
