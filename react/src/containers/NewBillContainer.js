import React, { Component } from 'react';

class NewBillContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      billName:"",
      billCost:"",
      billSource:"",
      billDueDate:""
    }
    this.handleFormSubmit=this.handleFormSubmit.bind(this)
    this.handleBillNameChange=this.handleBillNameChange.bind(this)
    this.handleBillCostChange=this.handleBillCostChange.bind(this)
    this.handleBillSourceChange=this.handleBillSourceChange.bind(this)
    this.handleBillDueDateChange=this.handleBillDueDateChange.bind(this)
    this.validateBillName=this.validateBillName.bind(this)
    this.addNewBill=this.addNewBill.bind(this)
  }

  handleFormSubmit(event){
    event.preventDefault()
    if (
      this.validateBillName(this.state.billName)
    ){
      let formPayLoad= {
        name: this.state.billName,
        cost: this.state.billCost,
        source: this.state.billSource,
        date: this.state.billDueDate
      }
      this.addNewBill(formPayLoad)
    }
  }

  addNewBill(formPayLoad){
    fetch(`/api/v1/bills/`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayLoad)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
    })
  }

  handleBillNameChange(event){
    this.setState({ billName: event.target.value })
  }

  handleBillCostChange(event){
    this.setState({ billCost: event.target.value })
  }

  handleBillSourceChange(event){
    this.setState({ billSource: event.target.value })
  }

  handleBillDueDateChange(event){
    this.setState({ billDueDate: event.target.value })
  }

  validateBillName(name){
    if (name == '' || name== ' '){
      alert("Bill Name cannot be blank")
      return false
    }else {
      return true
    }
  }

  render() {

    return(
      <div>
        <h2 className="row newBillHeader"> New Bill Form </h2>
        <form onSubmit={this.handleFormSubmit}>
        <div className="row formFields">
          <div className="row billNameField">
            <div className="large-12 columns">
            <label>Bill Name
              <input
                name='billName'
                onChange={this.handleBillNameChange}
                type='text'
                value={this.state.billName}
              />
            </label>
          </div>
          </div>
          <div className="row costAndDueDateField">
            <div className="large-6 columns billCost">
              <label>Bill Cost
                <input
                  name='billCost'
                  onChange={this.handleBillCostChange}
                  type='number'
                  value={this.state.billCost}
                />
              </label>
            </div>
            <div className="large-6 columns billDueDate">
              <label>Bill Due Date
                <input
                  name='billDueDate'
                  onChange={this.handleBillDueDateChange}
                  type='date'
                  value={this.state.billDueDate}
                />
              </label>
            </div>
          </div>
          <div className="row billSourceField">
            <div className="large-12 columns">
              <label>Bill Source (link to payment if applicable)
                <input
                  name='billSource'
                  onChange={this.handleBillSourceChange}
                  type='url'
                  value={this.state.billSource}
                />
              </label>
            </div>
          </div>
          <div className="row submitNewBill">
            <div className="large-12 columns button-group ">
              <input className="button" type="submit" value="Submit" />
            </div>
          </div>
        </div>
        </form>
      </div>
    )
  }
}

export default NewBillContainer;
