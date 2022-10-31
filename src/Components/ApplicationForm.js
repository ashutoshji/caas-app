import React, { useState, useRef, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { useForm, FormProvider, useFormContext, Controller} from "react-hook-form";
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import Select from "react-select";
import PubSub from "pubsub-js";
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import AddDeleteTableRows from './AddDeleteTableRows';
import PersonalForm from './PersonalForm';
import AccordionComp from './AccordionComp';
import ReviewAerialAcitivitiesForm from './ReviewAerialActivitiesForm';
import { Api , instance } from '../Api'
import Dropdown from './Dropdown';
import addKeyValue from './Utility';

const ApplicationForm = (props) => {
	const [fieldValues, setFieldValues] = useState({});
	const [openReviewForm, setOpenReviewForm] = useState(1);
	const [activityOptions, setActivityOptions] = useState([{
	}]);
	const [aerialActivity, setAerialActivity] = useState('')
	const [refNo, setRefNo] = useState(null);
	const inputRef = useRef(null);
	const { step, data } = props;
	const navigate = useNavigate();
	const methods = useForm();

	const formRef = useRef();
	const ApiUrl = `${Api}aerial-activity/init-data`;
	const publishTopic=(item)=>{
		let msg={"data": !item ? 1 : item}
		PubSub.publishSync("activeStep", msg);
		}
	function handleForm(e) {
		e.preventDefault()
		// your code here
	};
	const handleClick = () => {
		// 👇️ open file input box on click of other element
		inputRef.current.click();
	};
	const handleFileChange = event => {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) {
			return;
		}

		console.log('fileObj is', fileObj);

		// 👇️ reset file input
		event.target.value = null;

		// 👇️ is now empty
		console.log(event.target.files);

		// 👇️ can still access file object here
		console.log(fileObj);
		console.log(fileObj.name);
	};

	const loadAerialForm = (refNo) => {
		setRefNo(refNo);
		setOpenReviewForm(1);
		publishTopic(0);
	}

	useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(ApiUrl);
				//const activityTypeArr = 
                const options = response.activityTypes.map(function (item) {
                    return addKeyValue(item, 'value', 'label', item.activityType, item.description);
                });
				//const options = [{"description":"Fireworks/Pyrotechnics Display","activityType":"FIREWORKS"},{"description":"Hoisting of Captive Balloon/Blimp","activityType":"BHOISTING"},{"description":"Kite Flying/Parasailing","activityType":"KITE"},{"description":"Lasers/Other Lights Display","activityType":"LASERS"},{"description":"Release of Balloons","activityType":"BRELEASE"},{"description":"Release of Sky Lanterns","activityType":"SLRELEASE"}];
				
				// const dropOptions = options.map(function (item) {
                //     return addKeyValue(item, 'value', 'label', item.activityType, item.description);
                // });
                setActivityOptions(options);
				// setAerialActivity(target);
            } catch (error) {
                console.error(error)
            }
            //setLoading(false);
        };

        fetchData();
    }, []);

	const onSubmit = (data) => {
		console.log(data);
		const params = {
			"applicationType": 4,
			"referenceNumber": refNo,
			"nricPassport": data.nricPassport,
			"salutation": "Mr",
			"fullName": data.fullName,
			"companyName": data.companyName,
			"telephoneCountryCode": "+65",
			"telephoneNumber": data.telephoneNumber,
			"email": data.email,
			"activityType": aerialActivity,
			"aaFireworks": aerialActivity === "FIREWORKS" ? {
				"estimatedDurationMin": data.estimatedDurationMin,
				"numberOfUnits": data.numberOfUnits,
				"dangerRadiusMetres": data.dangerRadiusMetres
			}: null,
			 "aaBalloonHoisting": aerialActivity === "BHOISTING" ? {
				        "numberOfBalloons": data.numberOfBalloons,
				        "maxHoistedHeightFeet":data.maxHoistedHeightFeet,
				        "maxBalloonDimensionMetres": data.maxBalloonDimensionMetres,
				        "dimensionWeightKg": data.dimensionWeightKg
			}: null,
			"aaKiteParasailing": aerialActivity === "KITE" ? {
				    "numberOfKites": data.numberOfKites,
			        "maxHeightFeet": data.maxHeightFeet,
			        "dimensionLengthMetres": data.dimensionLengthMetres,
			        "dimensionBreadthMetres": data.dimensionBreadthMetres
			}: null,
			"aaLasersLights": aerialActivity === "LASERS" ? {
				"laserTypeSpecs": data.laserTypeSpecs,
		        "numberOfUnits": data.numberOfUnits,
		        "maxPowerOutput": data.maxPowerOutput,
		        "dangerHeight": data.dangerHeight,
		        "dangerHeightInstallation": data.dangerHeightInstallation
			}: null,
			"aaBalloonRelease": aerialActivity === "SLRELEASE" ? {
				 "numberOfBalloons": data.numberOfBalloons,
       			 "maxSizeCm": data.maxSizeCm
			}: null,
			"aaSkyLantern": aerialActivity === "SLRELEASE" ? {
				"numberOfLanterns": data.numberOfLanterns,
        		"maxSizeCm": data.maxSizeCm
			}: null,
			"venueDetails": data.venueDetails,
			"purpose": data.purpose,
			"activityDays": data.activityDays,
			"primarySafetyPersonnelName": data.primarySafetyPersonnelName,
			"primarySafetyPersonnelTelephoneCountryCode": "+65",
			"primarySafetyPersonnelTelephoneNumber": data.primarySafetyPersonnelTelephoneNumber,
			"secondarySafetyPersonnelName": data.secondarySafetyPersonnelName,
			"secondarySafetyPersonnelTelephoneCountryCode": "+65",
			"secondarySafetyPersonnelTelephoneNumber": data.secondarySafetyPersonnelTelephoneNumber,
			"safetyMeasures": data.safetyMeasures,
			"remarks": data.remarks,
			"status": "Draft"
		}
		 const apiMethod = refNo === null ||  refNo === 1 ? "post" : "put"
		const postData = async () => {
			try {
				// const { data: response } = await instance.request({
				// 	// url of the api endpoint (can be changed)
				// 		url: "/aerial-activity",
				// 		method: "POST",
				// 		data: params,
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 		},
				// 	})
				var authOptions = {
					method: apiMethod,
					url: "http://52.186.102.117/permits-service/v1/aerial-activity",
					data: JSON.stringify(params),
					headers: {
					  "Content-Type": "application/json",
					json: true,
				  }
				};
				const response = await axios(authOptions);
				const result = response && response.data ? response.data : response;
				console.log("result", result);
				setOpenReviewForm(2);
				setFieldValues({...params, ...result});
				publishTopic();
			} catch (error) {
				console.error(error)
			}
			//setLoading(false);
		};

		postData();

	}

	// const submitButton = React.memo(() => {
	// 	return <input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
	// });

	const handleActivity = (e) =>{
		const value = e.value
		setAerialActivity(value);
		///setDataInstructionKey()
	}

	return (
		<>

			{openReviewForm === 1 ? <>
				<FormProvider {...methods} >
				{/* <Dropdown title={'Type of Activity'} onChange={onChange} options={AerialOptions}></Dropdown> */}
				<Form className="pad-0 mTop-30" ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="col-md-5 mLeft-15 mRight-15">
					<Row >
						{'Type of Activity'}
					</Row>
					{/* <Select
					{...methods.register('selectAerialActivity',
					{
						required: "This is required.",
						onChange: (e) => setAerialActivity(e.value)
					})}
						options={activityOptions}
					/> */}
					<Controller
						control={methods.control}
						name="selectAerialActivity"
						onChange={handleActivity}
						rules={{ required: true }}
						render={({
							field: { onChange, onBlur, name }
						  }) => (
							<Select
								options={activityOptions}
								onChange={val => {
									onChange(val.value);
									handleActivity(val); 
								}} 
								name={name}
								onBlur={onBlur}
							/>
						)}
					/>

				</div>
				<div className='mMinusRight-15 mMinusLeft-15'>
				{!aerialActivity && !aerialActivity ?
						<Accordion className='mLeft-30 mRight-30 mTop-30 mBot-30'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Instructions</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Aenean vel elit convallis, venenatis mauris vitae, volutpat tellus.
                                    Nulla gravida pharetra tempus. Pellentesque quis sem turpis.
                                    Sed dignissim, nulla sit amet venenatis pellentesque, sapien augue lacinia magna, vel gravida metus nunc a erat.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>: <AccordionComp dataKey={aerialActivity}></AccordionComp>}
				
					
					</div>
				<hr />
							<NestedForm data={aerialActivity} inputRef={inputRef} handleFileChange={handleFileChange} handleClick={handleClick}></NestedForm>
						<h3 className='mBot-30 mLeft-15'> Personal Details</h3>
						<PersonalForm />
						<div className="btn-center mTop-30 mBot-30">
									<input type="submit" value="Next" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas" />
									<button type="button" onClick={() => navigate('/')} className="btn btn-outline-primary sgds btn-caas btn-default-caas">Cancel</button>
						</div>
					</Form>
				</FormProvider>
			</> :
				<ReviewAerialAcitivitiesForm data={fieldValues} onClick={loadAerialForm}></ReviewAerialAcitivitiesForm>
			}
		</>
	)
}

export default ApplicationForm;

const NestedForm = (props) => {
	const methods = useFormContext();
	const { data, inputRef, handleFileChange, handleClick } = props;
	const isDefault = typeof data !== 'undefined' && data
	return (
		<>
			{renderForm(data)}
			{isDefault ? 
			<>
						<Row>
				<Col sm={6}>
					<label class="form-label" for="formVenueDetails">Venue Details</label>
					<FloatingLabel className="mBot-30" controlId="floatingTextarea2" label="">
						<Form.Control
							as="textarea"
							placeholder="Leave a comment here"
							style={{ height: '100px' }} className="md-3"
							{...methods.register("venueDetails")}
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
							{...methods.register("purpose")}
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
				{/* <FormModal isOpen={modal2} toggle={toggle2}></FormModal> */}
			</Row>
			<Row>
				<Col sm={6}>
					<label class="form-label" for="formRemarks">Remarks</label>
					<FloatingLabel controlId="remarks">
						<Form.Control {...methods.register('remarks',
							{
								required: "This is required."
							})}
							as="textarea"
							placeholder="Leave a comment here"
							style={{ height: '100px' }} className="md-3"
						// isInvalid={methods.errors?.remarks?.message ? "true": "false"}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="remarks"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="primarySafetyPersonnelName">
						<Form.Label>Primary Safety Personal</Form.Label>
						<Form.Control {...methods.register('primarySafetyPersonnelName',
							{
								required: "This is required."
							})} type="text" placeholder="Primary Safety Personnel"
						// inInvalid={methods.errors?.primarySafetyPersonnelName}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="primarySafetyPersonnelName"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="primarySafetyPersonnelTelephoneNumber">
						<Form.Label>Contact Number</Form.Label>
						<Form.Control {...methods.register('primarySafetyPersonnelTelephoneNumber',
							{
								required: "This is required."
							})} type="text" placeholder="Contact Number"
						// inInvalid={methods.errors?.primarySafetyPersonnelTelephoneNumber}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="primarySafetyPersonnelTelephoneNumber"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="secondarySafetyPersonnelName">
						<Form.Label>Secondary safety Personal</Form.Label>
						<Form.Control {...methods.register('secondarySafetyPersonnelName',
							{
								required: "This is required."
							})} type="text" placeholder="Secondary safety Personal"
						// inInvalid={methods.errors?.secondarySafetyPersonnelName}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="secondarySafetyPersonnelName"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="secondarySafetyPersonnelTelephoneNumber">
						<Form.Label>Contact Number</Form.Label>
						<Form.Control {...methods.register('secondarySafetyPersonnelTelephoneNumber',
							{
								required: "This is required."
							})} type="text" placeholder="Contact Number"
						// inInvalid={methods.errors?.secondarySafetyPersonnelTelephoneNumber}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="secondarySafetyPersonnelTelephoneNumber"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<label class="form-label" for="formPurpose">Safety Measures</label>
					<FloatingLabel className="mBot-30" controlId="safetyMeasures" label="">
						<Form.Control {...methods.register('safetyMeasures',
							{
								required: "This is required."
							})} as="textarea"
							placeholder="Leave a comment here"
							style={{ height: '100px' }} className="md-3"
						// inInvalid={methods.errors?.safetyMeasures}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="safetyMeasures"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</FloatingLabel>
				</Col>
				<Col sm={6}>
					<label class="form-label" for="formEmailAddress">Safety Measures</label>
					<div class="mBot-30">
						<input
							style={{ display: 'none' }}
							ref={inputRef}
							type="file"
							accept='application/pdf, image/png'
							onChange={handleFileChange}
						/>
						<button onClick={handleClick} type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Upload</button>
					</div>
				</Col>
			</Row>
			</>: null
			}
		</>
	)
}

const Fireworks = () => {
	const methods = useFormContext();
	return (
		<>
			<h3 className='mLeft-10 mRight-10'>Your Application</h3>
			<Row>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="estimatedDurationMin">
						<Form.Label>Estimation Duration</Form.Label>
						<Form.Control {...methods.register('estimatedDurationMin', {
							required: "This is required.",
							pattern: {
								value: /^\d*(\.\d+)?$/,
								message: "Estimated duration is digit only"
							}
						})} type="text" placeholder="Estimation Duration"
						//// inInvalid={methods.errors?.estimatedDurationMin}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="estimatedDurationMin"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="numberOfUnits">
						<Form.Label>Number of Units</Form.Label>
						<Form.Control {...methods.register('numberOfUnits', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum number of Units to be released is 9999"
							},
							pattern: {
								value: /^\d*(\.\d+)?$/,
								message: "Estimated duration is digit only"
							}
						})} type="text" placeholder="Number of Units"
						// inInvalid={methods.errors?.estimatedDurationMin}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="numberOfUnits"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="dangerRadiusMetres">
						<Form.Label>Danger radius metres</Form.Label>
						<Form.Control {...methods.register('dangerRadiusMetres', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum number of Danger Radius meters to be released is 9999"
							},
							pattern: {
								value: /^\d*(\.\d+)?$/,
								message: "Danger RadiusMetres is digit only"
							}
						})} type="text" placeholder="Danger radius metres"
						// inInvalid={methods.errors?.estimatedDurationMin}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="dangerRadiusMetres"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
			</Row>
		</>
	)
}

const CaptiveBaloon = (props) => {
	const methods = useFormContext();
	return (
		<>
			<h3 className='mLeft-10 mRight-10'>Your Application</h3>
			<Row>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="numberOfBalloons">
						<Form.Label>Number of Balloons</Form.Label>
						<Form.Control {...methods.register('numberOfBalloons', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum values for number of balloons / blimps to be hoisted is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the maximum number of balloons / blimps to be hoisted is a positive integer bigger than 0"
							}
						})} type="text" placeholder="Number of Balloons"
						// inInvalid={methods?.formState?.errors?.numberOfBalloons?.message ? "true": "false"}
						//aria-invalid={methods.errors?.numberOfBalloons ? "true" : "false"}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="numberOfBalloons"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="maxHoistedHeightFeet">
						<Form.Label>Maximum Hoisted Height</Form.Label>
						<Form.Control {...methods.register('maxHoistedHeightFeet', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum height of hoisted balloons/ blimps above ground level is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for maximum height of hoisted balloons/ blimps above ground level have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Maximum Hoisted Height"
						// inInvalid={methods.errors?.maxHoistedHeightFeet}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="maxHoistedHeightFeet"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="maxBalloonDimensionMetres">
						<Form.Label>Max Baloon Dimension</Form.Label>
						<Form.Control {...methods.register('maxBalloonDimensionMetres', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum dimension of balloons / blimps (m), dimension - meter is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for dimension of hoisted balloons / blimps (m) have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Max Baloon Dimension"
						// inInvalid={methods.errors?.maxBalloonDimensionMetres}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="maxBalloonDimensionMetres"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="dimensionWeightKg">
						<Form.Label>Dimesnion Weight</Form.Label>
						<Form.Control {...methods.register('dimensionWeightKg', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum dimension of hoisted balloons / blimps (m), dimension - weight (kg) is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for maximum height of hoisted balloons/ blimps above ground level have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Baloon Dimension"
						// inInvalid={methods.errors?.maxBalloonDimensionMetres}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="dimensionWeightKg"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
			</Row>
		</>
	)
}

const KiteFlying = (props) => {
	const methods = useFormContext();
	return (
		<>
			<h3 className='mLeft-10 mRight-10'>Your Application</h3>
			<Row>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="numberOfKites">
						<Form.Label>Number of Kites</Form.Label>
						<Form.Control {...methods.register('numberOfKites', {
							required: "This is required.",
							max: {
								value: 999,
								message: "maximum number of Kites to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the maximum number of kites have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Number of Kites"
						// inInvalid={methods.errors?.numberOfKites}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="numberOfKites"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="maxHeightFeet">
						<Form.Label>Maximum Height</Form.Label>
						<Form.Control {...methods.register('maxHeightFeet', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum Height of Kites to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the Height of Kites have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Maximum Height"
						// inInvalid={methods.errors?.maxHeightFeet}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="maxHeightFeet"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="dimensionLengthMetres">
						<Form.Label>Dimension Length</Form.Label>
						<Form.Control {...methods.register('dimensionLengthMetres', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum dimension of largest kite/parasail by breadth is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the maximum dimension of largest kite/parasail by breadth have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Dimesnion Length"
						// inInvalid={methods.errors?.dimensionLengthMetres}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="dimensionLengthMetres"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="dimensionBreadthMetres">
						<Form.Label>Dimension Breadth</Form.Label>
						<Form.Control {...methods.register('dimensionBreadthMetres', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum dimension breadth for Kites to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the mmaximum dimension breadth for Kites have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Dimension Breadth"
						// inInvalid={methods.errors?.dimensionBreadthMetres}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="dimensionBreadthMetres"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
			</Row>
		</>

	)
}

const LasersDisplay = (props) => {
	const methods = useFormContext();
	return (
		<>
			<h3 className='mLeft-10 mRight-10'>Your Application</h3>
			<Row>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="formLaserType">
						<Form.Label>Laser Type</Form.Label>
						<Form.Control {...methods.register('laserTypeSpecs')} type="text" placeholder="Laser Type" />
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="numberOfUnits">
						<Form.Label>Number of Units</Form.Label>
						<Form.Control {...methods.register('numberOfUnits', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum number of units to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the number of units have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Number of Units"
						// inInvalid={methods.errors?.numberOfBalloons}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="numberOfUnits"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="maxPowerOutput">
						<Form.Label>Maximum Power</Form.Label>
						<Form.Control {...methods.register('maxPowerOutput', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum power output to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the power output have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Maximum Power"
						// inInvalid={methods.errors?.maxPowerOutput}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="maxPowerOutput"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="dangerHeight">
						<Form.Label>Danger Height</Form.Label>
						<Form.Control {...methods.register('dangerHeight', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "Danger height to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the danger height have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Danger Height"
						// inInvalid={methods.errors?.dangerHeight}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="dangerHeight"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mBot-30" controlId="dangerHeightInstallation">
						<Form.Label>Danger Height Installation</Form.Label>
						<Form.Control {...methods.register('dangerHeightInstallation', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "Danger height installation to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the danger height installation have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Danger Height Installation"
						// inInvalid={methods.errors?.dangerHeightInstallation}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="dangerHeightInstallation"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<label class="form-label" for="formEmailAddress">Safety Measures</label>
					<div class="mBot-30">
						<button type="button" className="btn btn-primary sgds btn-gap btn-caas btn-primary-caas dark-color">Upload</button>
					</div>
				</Col>
			</Row>
		</>
	)
}

const ReleaseBallons = (props) => {
	const methods = useFormContext();
	return (
		<>
			<h3 className='mLeft-10 mRight-10'>Your Application</h3>
			<Row>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="numberOfBalloons">
						<Form.Label>Number of Balloons</Form.Label>
						<Form.Control {...methods.register('numberOfBalloons', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum number of balloons to be released is 9999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the maximum number of balloons have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Number of Balloons"
						// inInvalid={methods.errors?.numberOfBalloons}
						/>
						<ErrorMessage
							errors={methods.errors}
							name="numberOfBalloons"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="maxSizeOfBalloon">
						<Form.Label>Maximum size of Balloon</Form.Label>
						<Form.Control {...methods.register('maxSizeOfBalloon', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum size of balloons to be released is 999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the maximum size of balloons have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Maximum size of Balloon"
						// inInvalid={methods.errors?.maxSizeOfBalloon} 
						/>
						<ErrorMessage
							errors={methods.errors}
							name="maxSizeOfBalloon"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
			</Row>
		</>
	)
}

const ReleaseOfSkyLanterns = (props) => {
	const methods = useFormContext();
	return (
		<>
			<h3 className='mLeft-10 mRight-10'>Your Application</h3>
			<Row>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="numberOfLanterns">
						<Form.Label>Number of Lanterns</Form.Label>
						<Form.Control {...methods.register('numberOfLanterns', {
							required: "This is required.",
							max: {
								value: 9999,
								message: "maximum size of balloons to be released is 999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the maximum size of balloons have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Number of Lanterns"
						// inInvalid={methods.errors?.numberOfLanterns} 
						/>
						<ErrorMessage
							errors={methods.errors}
							name="numberOfLanterns"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
				<Col sm={6}>
					<Form.Group className="mTop-30 mBot-30" controlId="maxSizeCm">
						<Form.Label>Maximum size of Lanterns</Form.Label>
						<Form.Control {...methods.register('maxSizeCm', {
							required: "This is required.",
							max: {
								value: 999,
								message: "maximum size of lanterns to be released is 999"
							},
							pattern: {
								value: /^[1-9]\d*$/,
								message: "values for the maximum size of lanterns have to be a positive integer bigger than 0"
							}
						})} type="text" placeholder="Maximum size of Lanterns"
						// inInvalid={methods.errors?.maxSizeCm} 
						/>
						<ErrorMessage
							errors={methods.errors}
							name="maxSizeCm"
							render={({ message }) => <p style={{ 'color': 'red' }}>{message}</p>}
						/>
					</Form.Group>
				</Col>
			</Row>
		</>
	)
}

function renderForm(data) {
	switch (data) {
		case "KITE":
			return <KiteFlying></KiteFlying>;
		case "BRELEASE":
			return <ReleaseBallons></ReleaseBallons>;
		case "BHOISTING":
			return <CaptiveBaloon></CaptiveBaloon>;
		case "FIREWORKS":
			return <Fireworks></Fireworks>;
		case "SLRELEASE":
			return <ReleaseOfSkyLanterns></ReleaseOfSkyLanterns>;
		case "LASERS":
			return <LasersDisplay></LasersDisplay>;
		default:
			return <></>
	}
}