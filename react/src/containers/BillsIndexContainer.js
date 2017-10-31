import React, { Component } from 'react';
import BillsTable from '../components/BillsTable';
import { Link } from 'react-router';
import NewBillContainer from './NewBillContainer';

class PatientsIndexContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      bills: [],
      selectedBills: []
    }
    this.setBillsAll=this.setBillsAll.bind(this)
    this.setBillsAllThisMonth=this.setBillsAllThisMonth.bind(this)
    this.setBillsUnpaidThisMonth=this.setBillsUnpaidThisMonth.bind(this)
    this.changeBillPaidState=this.changeBillPaidState.bind(this)
  }

  setBillsAll(){
    this.setState({ selectedBills: this.state.bills.all_bills })
  }

  setBillsAllThisMonth() {
    this.setState({ selectedBills: this.state.bills.all_bills_this_month })
  }

  setBillsUnpaidThisMonth() {
    this.setState({ selectedBills: this.state.bills.unpaid_this_month })
  }

  changeBillPaidState(billPayLoad){
    fetch(`/api/v1/bills/${billPayLoad.id}`, {
      credentials: 'same-origin',
      method: 'PATCH'
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
      this.setState({ bills: body })
      this.setState({ selectedBills: body.all_bills_this_month });
    })
  }

  componentDidMount() {
    fetch('/api/v1/bills/', {
      credentials: 'same-origin'
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
        this.setState({ bills: body })
        this.setState({ selectedBills: body.all_bills_this_month });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let billRows
    if (this.state.selectedBills){
      billRows=this.state.selectedBills.map((bill, index) => {
        return(
          <BillsTable
            key={index}
            rowIndex={index}
            bill={bill}
            changeBillPaidState={this.changeBillPaidState}
          />
        )
      })
    }

    return (
      <div>
        <div className="billDropDown">
          <a data-dropdown="drop2" aria-controls="drop2" aria-expanded="false">Select Bills to View</a>
          <div id="drop2" data-dropdown-content className="f-dropdown content" aria-hidden="true" tabIndex="-1">
            <p onClick={this.setBillsAll}>All bills</p>
            <p onClick={this.setBillsAllThisMonth}>All bills for this month (paid and unpaid)</p>
            <p onClick={this.setBillsUnpaidThisMonth}>Unpaid bills for this month</p>
          </div>
        </div>

        <table className="billsTable">
          <thead>
            <tr>
              <th className="billName" width= "200">Bill</th>
              <th className="billDueDate" width= "200">Due Date</th>
              <th className="billAmount" width= "200">Amount ($)</th>
              <th className="billSource" width= "200">Source</th>
              <th className="billPaid" width= "200">Paid?</th>
            </tr>
          </thead>
          <tbody>
            {billRows}
          </tbody>
        </table>

        <Link to={`/bills/new`}>Add New Bill</Link>
      </div>
    );
  }
}

export default PatientsIndexContainer;
