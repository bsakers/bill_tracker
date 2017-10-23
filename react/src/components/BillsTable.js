import React from 'react';

const BillsTable= (props) => {
  let paid
  if (props.bill.paid) {
    paid = "yes"
  } else {
    paid = "no"
  }

  return(
    <tr>
      <td> {props.bill.name} </td>
      <td> {props.bill.due_date} </td>
      <td> {props.bill.cost} </td>
      <td> {props.bill.source} </td>
      <td> {paid} </td>
    </tr>
  )
}




export default BillsTable;
