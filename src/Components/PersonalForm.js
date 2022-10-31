import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const PersonalForm = (props) => {
  const methods = useFormContext();
  return (
    <Row>
      <Form.Group as={Col} md="6" className="mBot-30" controlId="formBasicPassportNumber">
        <Form.Label>Passport number / NRIC*</Form.Label>
        <Form.Control name="nricPassport" {...methods.register('nricPassport', 
						{
							required: "This is required." 
						})} 
            type="text" placeholder="Passport number / NRIC" 
						// isInvalid={!!methods.errors?.nricPassport ? "true": "false"}
            />
						<ErrorMessage
							errors={methods.errors}
							name="nricPassport"
							render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
						/>
      </Form.Group>
      <Form.Group as={Col} md="6" className="mBot-30" controlId="formFullName">
        <Form.Label>Full Name*</Form.Label>
        <Form.Control name="fullName" {...methods.register('fullName', 
						{
							required: "This is required." 
						})} type="text" placeholder="Full Name" 
						// isInvalid={!!methods.errors?.fullName ? "true": "false"}
            />
						<ErrorMessage
							errors={methods.errors}
							name="fullName"
							render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
						/>
      </Form.Group>
      <Form.Group as={Col} md="6" className="mBot-30" controlId="formCompanyName">
        <Form.Label>Company Name</Form.Label>
        <Form.Control name="companyName" {...methods.register('companyName', 
						{
							required: "This is required." 
						})} type="text" placeholder="Company Name" 
						// isInvalid={!!methods.errors?.companyName ? "true": "false"}
            />
						<ErrorMessage
							errors={methods.errors}
							name="companyName"
							render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
						/>
      </Form.Group>
      <Form.Group as={Col} md="6" className="mBot-30" controlId="formContactNumber">
        <Form.Label>Contact Number*</Form.Label>
        <Form.Control name="telephoneNumber" {...methods.register('telephoneNumber', 
						{
							required: "This is required." 
						})} type="text" placeholder="Contact Number" 
						// isInvalid={!!methods.errors?.telephoneNumber ? "true": "false"}
            />
						<ErrorMessage
							errors={methods.errors}
							name="telephoneNumber"
							render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
						/>
      </Form.Group>
      <Form.Group as={Col} md="6" className="mBot-30" controlId="formEmailAddress">
        <Form.Label>Email Address*</Form.Label>
        <Form.Control name="email" {...methods.register('email', 
						{
							required: "This is required." 
						})} type="text" placeholder="email" 
						// isInvalid={!!methods.errors?.email ? "true": "false"}
            />
						<ErrorMessage
							errors={methods.errors}
							name="email"
							render={({ message }) => <p style={{'color': 'red'}}>{message}</p>}
						/>
      </Form.Group>
    </Row>
  )
}

export default PersonalForm;