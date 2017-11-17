OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, Rails.application.secrets.OAUTH_LOGIN, Rails.application.secrets.OAUTH_SECRET, skip_jwt: true
end
