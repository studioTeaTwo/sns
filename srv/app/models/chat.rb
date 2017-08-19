class Chat < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :chat_thread
end
