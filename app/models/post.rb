# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  meetings_attended    :string
#  current_projects   :string
#  expenditures   :string
#  other   :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# A twitter-like post.
class Post < ActiveRecord::Base
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

  belongs_to :user
end
