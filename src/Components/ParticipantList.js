import React from 'react';

export default class ParticipantsList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isEditing:false
    }
  }

  renderParticipants(){
    const {dateStart, dateEnd, timeStart, timeEnd} = this.props;
    if (this.state.isEditing){
      return(        
          <form className="formItem"onSubmit={this.onSaveClick.bind(this) }>
            <input type="text" defaultValue={dateStart} ref="editDateStartInput"/>
            <input type="text" defaultValue={dateEnd} ref="editDateEndInput"/>
            <input type="text" defaultValue={timeEnd} ref="editTimeStartInput"/>
            <input type="text" defaultValue={timeEnd} ref="editTimeEndInput"/>
          </form>
      );
    }

    return(      
      <div>
        <span className="name">{dateStart}</span>
        <span className="email">{dateEnd}</span>
        <span className="phone">{timeStart}</span>
        <span className="phone">{timeEnd}</span>
      </div>
    );

  }

  renderActionSection(){
    if (this.state.isEditing){
      return(
        <span className="icons spanItem">
          <button className="btnCancel" onClick={this.onCancelClick.bind(this)} >Cancel</button>
          <button className="btnSave" onClick={this.onSaveClick.bind(this)}>Save</button>
      </span>
      );
    }
    return(
      <span className="icons">
        <i className="material-icons" onClick={this.onEditClick.bind(this)}>create</i>
        <i className="material-icons" onClick={this.props.deletePerson.bind(this,this.props.name)}>delete</i>
      </span>
    );
  }

onEditClick() {
  this.setState({ isEditing: true });
}

onCancelClick() {
  this.setState({ isEditing: false });
}


onSaveClick(event){
  event.preventDefault();
  const oldPerson=this.props.name;
  const newPerson={dateStart:this.refs.editDateStartInput.value,
                   dateEnd:this.refs.editDateEndInput.value,
                   timeStart:this.refs.editTimeStartInput.value,
                   
                };
  this.props.savePerson(oldPerson,newPerson);
  this.setState({isEditing:false});
}

  render() {
    return (
      <div className="items">
        <div className="item">
          {this.renderParticipants()}
          {this.renderActionSection()}
        </div>        
      </div>
    );
  }  
}