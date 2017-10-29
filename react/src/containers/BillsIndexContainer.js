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
    this.setBillsUnpaidThisMonth=this.setBillsUnpaidThisMonth.bind(this)
    this.setBillsAllThisMonth=this.setBillsAllThisMonth.bind(this)
    this.setBillsUnpaidAllMonths=this.setBillsUnpaidAllMonths.bind(this)
  }

  setBillsUnpaidThisMonth() {
    this.setState({ selectedBills: this.state.bills.unpaid_this_month })
  }

  setBillsAllThisMonth() {
    this.setState({ selectedBills: this.state.bills.all_this_month })
  }

  setBillsUnpaidAllMonths() {
    this.setState({ selectedBills: this.state.bills.unpaid_all })
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
        console.log(body)
        this.setState({ bills: body })
        this.setState({ selectedBills: body.all_this_month });
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
          />
        )
      })
    }

    return (
      <div>
        <div className="curveToggle">
          <a data-dropdown="drop2" aria-controls="drop2" aria-expanded="false">Select Bills to View</a>
          <div id="drop2" data-dropdown-content className="f-dropdown content" aria-hidden="true" tabIndex="-1">
            <p onClick={this.setBillsUnpaidThisMonth}>Unpaid Bills for this Month</p>
            <p onClick={this.setBillsAllThisMonth}>All Bills for this month (paid and unpaid)</p>
            <p onClick={this.setBillsUnpaidAllMonths}>Unpaid Bills for All Months</p>
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
