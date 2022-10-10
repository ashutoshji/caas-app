import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Accordion from 'react-bootstrap/Accordion';
import MachineryFile from './MachineryFile';
import PersonalForm from './PersonalForm';

const CraineForm = (props) =>{
    return(
       <>
       <div className='mLeft-15 mright-15'> 
        <h2>Instructions</h2>
        <Accordion className='mTop-30 mBot-30'>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Instructions</Accordion.Header>
            <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Aenean vel elit convallis, venenatis mauris vitae, volutpat tellus. 
            Nulla gravida pharetra tempus. Pellentesque quis sem turpis. 
            Sed dignissim, nulla sit amet venenatis pellentesque, sapien augue lacinia magna, vel gravida metus nunc a erat.
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        <h2>Your Application</h2>
       </div>
      <Form>
        <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Highest Working Height of Machinery*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Machinery Use Start Date*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Machinery Use End Date*</Form.Label>
                <Form.Control type="text" placeholder="contactNumber" />
                </Form.Group>
            </Col>
        </Row>
            <h2>Machinery and Equipment</h2>
            <MachineryFile></MachineryFile>
            <hr/>
            <h3>Project Details</h3>
            <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Project Title*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Project Expected Completion Date*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
            </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>Type of Address*</Form.Label>
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>Standard</Form.Label>
                    <input type="radio"  />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>Non-Standard</Form.Label>
                    <input type="radio"/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                <label class="form-label" for="formVenueDetails">Location Description</label>
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
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Land Lot No.</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Approved Development Height</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Site ground elevation</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>Is the work site within airport perimeter fencing?</Form.Label>
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>Yes</Form.Label>
                    <input type="radio" placeholder="emailAddress" />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                    <Form.Label>No</Form.Label>
                    <input type="radio" placeholder="emailAddress" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <h3>Developers</h3>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Company</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Project Manager</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Contact number*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <h3>Main Contractor</h3>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Company</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Project Manager</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Contact number*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <h3>Crane Supplier / Subcontractor</h3>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Company</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Project Manager</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Contact number*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <h3>On-site safety personnel</h3>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Company</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Name of Project Manager</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
                <Col sm={6}>
                <Form.Group  className="mTop-30 mBot-30" controlId="formEmailAddress">
                <Form.Label>Contact number*</Form.Label>
                <Form.Control type="text" placeholder="emailAddress" />
                </Form.Group>
                </Col>
            </Row>
        </Form>
        <h3 className='mBot-30 mLeft-15'> Personal Details</h3>
        <div className='mMinusLeft-15 mMinusRight-15'>    
            <PersonalForm></PersonalForm>
        </div>
       </>
    );
}

export default CraineForm;