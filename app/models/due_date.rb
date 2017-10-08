class DueDate < ActiveRecord::Base
	validates :due_date, presence: true
	validates :role_id, presence: true
	has_many :reports
	belongs_to :role
end
