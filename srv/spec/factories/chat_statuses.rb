FactoryGirl.define do
  factory :chat_status do
    chat_thread_id nil
    sender_id nil
    read_until 0
  end
end
