import React from 'react';

const BillsTable= (props) => {
  let paid
  if (props.bill.paid) {
    paid= true
  } else {
    paid= false
  }

  let handleCheckBoxClick= ()=> {
    if (paid){
      if (confirm("Are you sure you want to mark this bill as UNPAID?")){
        let billPayLoad= {
          id: props.bill.id
        }
        props.changeBillPaidState(billPayLoad)
      }
    } else{
      if (confirm("Are you sure you want to mark this bill as PAID?")){
        let billPayLoad= {
          id: props.bill.id
        }
        props.changeBillPaidState(billPayLoad)
      }
    }
  }

  return(
    <tr>
      <td> {props.bill.name} </td>
      <td> {props.bill.due_date} </td>
      <td> {props.bill.cost} </td>
      <td> {props.bill.source} </td>
      <td>
        <form className="custom">
          <label>
            <input type="checkbox" id="checkbox1" onChange={handleCheckBoxClick} checked={paid}/>
          </label>
        </form>
      </td>
    </tr>
  )
}

export default BillsTable;
