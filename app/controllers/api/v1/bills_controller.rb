class Api::V1::BillsController < ApiController
  def index
    bills= Bill.all
    render json: bills
  end
end
