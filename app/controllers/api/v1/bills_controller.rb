require 'date'
require 'pry'

class Api::V1::BillsController < ApiController

  def index
    bills= Bill.where(user_id: current_user)
    current_date = Date.current
    unpaid_this_month= []
    all_this_month= []
    unpaid_all =[]

    bills.each do |bill|
      if !bill.paid && current_date.month == bill.due_date.month
        unpaid_this_month << bill
        unpaid_all << bill
        all_this_month << bill
      elsif bill.paid && current_date.month == bill.due_date.month
        all_this_month << bill
      else !bill.paid
        unpaid_all << bill
      end
    end

    bills = {
      unpaid_this_month: unpaid_this_month,
      all_this_month: all_this_month,
      unpaid_all: unpaid_all
    }
    render json: bills
  end

  def create

    bill= JSON.parse(request.body.read)
    binding.pry
    new_bill=Bill.create(name: bill["name"], cost: bill["cost"].to_f, source: bill["source"], due_date: bill["date"].to_date, user_id: current_user)

    render json: new_bill
  end

end
