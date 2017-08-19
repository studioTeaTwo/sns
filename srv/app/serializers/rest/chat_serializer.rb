class Rest::ChatSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :body, :created_at
end
