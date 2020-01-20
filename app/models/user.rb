class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, length: { maximum: 100 }
  validates :email, presence: true, length: { maximum: 250 }, format: { with: URI::MailTo::EMAIL_REGEXP}
  #validates :password_digest, presence: true
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }

  before_save { self.email = email.downcase }
end
