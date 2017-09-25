# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :report do
    meetings_attended "MyText"
    current_projects "MyText"
    expenditures "MyText"
    other "MyText"
  end
end
