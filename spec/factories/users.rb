FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { 'john@example.com' }
    password { 'pass@123' }
  end
end