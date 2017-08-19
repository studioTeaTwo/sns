class ChatStatus < ApplicationRecord
  belongs_to :user
  belongs_to :chat_thread
end
