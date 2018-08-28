class Tweet < ApplicationRecord
  belongs_to :user, class_name: "User", foreign_key: "user_id"
  has_many :replies, class_name: "Tweet", foreign_key: "to_id"

  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
end
