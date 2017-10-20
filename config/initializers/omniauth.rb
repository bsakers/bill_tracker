OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '1002781387609-jktlp53bku8gcffp83ejdv1a40vqscea.apps.googleusercontent.com', 'I-DZDlBBLH9sr02AJKxl_img', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end
