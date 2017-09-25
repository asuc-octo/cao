class Report < ActiveRecord::Base

	validates :meetings_attended, presence: true
  validates :current_projects, presence: true
  validates :expenditures, presence: true
  validates :other, presence: true
  validates :user_id, presence: true

  belongs_to :user
end
