import React from 'react';

const CaasForm = (props) => {
  return (
    <Modal show={show} onHide={handleClose} fullscreen="xxl-down">
      <Modal.Header closeButton>
        <Modal.Title><i className="bi bi-exclamation-triangle me-3"></i>Aerial Photography / Videography</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Description</h3>
        <div className=''>Time to fill: 30 minutes <br />
          To conduct any aerail photography/videography flights, a clearance is needed.</div>
        <h3>Documents required</h3>
        <div className=''>To conduct any aerail photography/videography flights, a clearance is needed.</div>
        <h3>Cost</h3>
        <div className=''>Free</div>
        <h3>7 days</h3>
        <div className=''>Free</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CaasForm;