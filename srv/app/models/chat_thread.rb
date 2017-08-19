class ChatThread < ApplicationRecord
  has_many :chat_statuses, dependent: :destroy
  has_many :chats, dependent: :destroy
  has_many :users, through: :chat_statuses

  serialize :participants

  validates :participants, uniqueness: true
end
