import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import AddDeleteTableRows from './AddDeleteTableRows';
import PersonalComp from './PersonalForm';

const ApplicationForm = (props) => {
    const { data } = props;
    var products = [{
        id: 1,
        name: "Item name 1",
        price: 100
    },{
        id: 2,
        name: "Item name 2",
        price: 100
    }];
  // It's a data format example.
  function priceFormatter(cell, row){
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  };

  const cellEditProp = {
    mode: 'click'
  };

  function onAfterDeleteRow(rowKeys, rows) {
    alert('The rowkey you drop: ' + rowKeys);
  }
  
  const options = {
    afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
  };
  
  // If you want to enable deleteRow, you must enable row selection also.
  const selectRowProp = {
    mode: 'checkbox'
  };

    return(
          data === 1 ? <></> :
          <>
          <Form className="pad-0 mLeft-10 mRight-10 mTop-30">
            { data === 2 ?
            (
            <>
            <h3 className='mLeft-10 mRight-10'>Your Application</h3>
            <Row>
                <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formBasicKiteFlying">
                        <Form.Label>Number of Kite Flying / Parasail</Form.Label>
                        <Form.Control type="text" placeholder="Number of Kite Flying / Parasail" />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formSizeKiteFlying">
                        <Form.Label>Maximise size of Kite Flying / Parasail</Form.Label>
                        <Form.Control type="text" placeholder="Maximum size of Kite Flying / Parasail" />
                    </Form.Group>
                </Col>
            </Row>
            </>)
            : data === 3 ? 
            (
            <>
            <h3 className='mLeft-10 mRight-10'>Your Applications</h3>
            <Row>
                <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formBasicPassportNumber">
                        <Form.Label>Number of balloons released</Form.Label>
                        <Form.Control type="text" placeholder="Number of balloons released" />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formFullName">
                        <Form.Label>Maximum size of balloons</Form.Label>
                        <Form.Control type="text" placeholder="Maximum size of balloons" />
                    </Form.Group>
                </Col>
             </Row>
             </>): 
             <></>}
            <Row>
            <Col sm={6}>
                <label class="form-label" for="formVenueDetails">Venue Details</label>
                <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }} className="md-3"
                    />
                </FloatingLabel>
            </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <label class="form-label" for="formPurpose">Purpose</label>
                    <FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }} className="md-3"
                        />
                    </FloatingLabel>
                </Col>
            </Row>
         <Row>
            <h3>
                Date / Time of Activity
            </h3>
            <p>
            The time start and time end for each row of date ranges will indicate the time frame for each day within the date range
(e.g. If 20 dec - 25 dec, 2pm - 3pm it means the activity will happen from 2pm-3pm everyday from 20 dec - 25 dec)
            </p>
            <AddDeleteTableRows></AddDeleteTableRows>

                    </Row>
         <Row>
            <Col sm={6}>
                <label class="form-label" for="formPurpose">Remarks</label>
                <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }} className="md-3"
                />
                </FloatingLabel>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Primary Safety Personal</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="contactNumber" />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group  className="mBot-30" controlId="formEmailAddress">
                <Form.Label>Secondary safety Personal</Form.Label>
                <Form.Control type="text" placeholder="contactNumber" />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group  className="mBot-30" controlId="formEmailAddress">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="contactNumber" />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group  className="mBot-30" controlId="formEmailAddress">
                <Form.Label>Safety Measures</Form.Label>
                <Form.Control type="text" placeholder="contactNumber" />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <label class="form-label" for="formEmailAddress">Safety Measures</label>
                <div class="mBot-30">
                    <button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Upload</button>
                </div>
            </Col>
            </Row>
        </Form>
        </>
    )
}

export default ApplicationForm;