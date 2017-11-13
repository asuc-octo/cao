class Report < ActiveRecord::Base
	validates :user_id, presence: true
	validates :due_date_id, presence: true

	belongs_to :due_date
	belongs_to :user
end
