Rails.application.routes.draw do

  resources :bills, only: [:index]

end
