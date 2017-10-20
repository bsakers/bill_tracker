import React, { Component } from 'react';
import BillsTable from '../components/BillsTable';

class PatientsIndexContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      bills: []
    }
  }

  componentDidMount() {
    fetch('api/v1/bills/')
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
        this.setState({ bills: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let billRows
    if (this.state.bills){
      billRows=this.state.bills.map((bill, index) => {
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
            <p>Unpaid Bills for this Month</p>
            <p>All Bills for this month (paid and unpaid)</p>
            <p>Unpaid Bills for All Months</p>
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
      </div>
    );
  }
}

export default PatientsIndexContainer;
