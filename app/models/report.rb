class Report < ActiveRecord::Base
	include ActsAsAttachmentOwner

  acts_as_attachment_owner(
      accepts_roles: [
          { image: {
              count: 1,
              filter: lambda { |attachment, post|
                if !attachment.web_image?
                  :not_an_image
                else
                  true
                end
              }
          } },
          :others
      ])

	validates :meetings_attended, presence: true
  validates :current_projects, presence: true
  validates :expenditures, presence: true
  validates :other, presence: true
  validates :user_id, presence: true
  validates :due_date, presence: true

  belongs_to :user
end
