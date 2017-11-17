OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Rails.application.secrets.OAUTH_LOGIN, Rails.application.secrets.OAUTH_SECRET, skip_jwt: true
  # provider :google_oauth2, ENV["OAUTH_LOGIN"], ENV["OAUTH_SECRET"], skip_jwt: true
  # provider :google_oauth2, '1002781387609-jktlp53bku8gcffp83ejdv1a40vqscea.apps.googleusercontent.com', 'I-DZDlBBLH9sr02AJKxl_img', skip_jwt: true
end
