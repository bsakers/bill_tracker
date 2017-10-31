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
      console.log(body)
    })
  }

  handleBillNameChange(event){
    this.setState({ billName: event.target.value })
    console.log(this.state.billName)
  }

  handleBillCostChange(event){
    this.setState({ billCost: event.target.value })
    console.log(this.state.billCost)
  }

  handleBillSourceChange(event){
    this.setState({ billSource: event.target.value })
    console.log(this.state.billCost)
  }

  handleBillDueDateChange(event){
    this.setState({ billDueDate: event.target.value })
    console.log(this.state.billDueDate)
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
        <h2> New Bill Form </h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>Bill Name
            <input
              name='billName'
              onChange={this.handleBillNameChange}
              type='text'
              value={this.state.billName}
            />
          </label>
          <label>Bill Cost
            <input
              name='billCost'
              onChange={this.handleBillCostChange}
              type='number'
              value={this.state.billCost}
            />
          </label>
          <label>Bill Source (link to payment if applicable)
            <input
              name='billSource'
              onChange={this.handleBillSourceChange}
              type='url'
              value={this.state.billSource}
            />
          </label>
          <label>Bill Due Date
            <input
              name='billDueDate'
              onChange={this.handleBillDueDateChange}
              type='date'
              value={this.state.billDueDate}
            />
          </label>
          <div className="button-group">
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default NewBillContainer;
