require 'date'
require 'pry'

class Api::V1::BillsController < ApiController
  skip_before_action :verify_authenticity_token, only: [:create, :update]
  def index

    bills= Bill.where(user_id: current_user)
    current_date = Date.current
    all_bills=[]
    all_bills_this_month= []
    unpaid_this_month= []

    bills.each do |bill|
      if !bill.paid && current_date.month == bill.due_date.month
        all_bills_this_month << bill
        unpaid_this_month << bill
      elsif bill.paid && current_date.month == bill.due_date.month
        all_bills_this_month << bill
      end
    end

    bills = {
      all_bills: bills,
      all_bills_this_month: all_bills_this_month,
      unpaid_this_month: unpaid_this_month
    }
    render json: bills
  end

  def create
    bill= JSON.parse(request.body.read)
    new_bill=Bill.create(name: bill["name"], cost: bill["cost"].to_f, source: bill["source"], due_date: bill["date"].to_date, user_id: current_user.id)
    render json: new_bill
  end

  def update
    bill= Bill.find(params[:id])
    if bill.paid
      bill.update(paid: false)
    elsif !bill.paid
      bill.update(paid: true)
    end

    bills= Bill.where(user_id: current_user)
    current_date = Date.current
    all_bills=[]
    all_bills_this_month= []
    unpaid_this_month= []
    
    bills.each do |bill|
      if !bill.paid && current_date.month == bill.due_date.month
        all_bills_this_month << bill
        unpaid_this_month << bill
      elsif bill.paid && current_date.month == bill.due_date.month
        all_bills_this_month << bill
      end
    end

    bills = {
      all_bills: bills,
      all_bills_this_month: all_bills_this_month,
      unpaid_this_month: unpaid_this_month
    }
    render json: bills
  end

end
