# @name DailyLog
#
# @attr [integer] id
# @attr [string] symptom
# @attr [integer] health
# @attr [string] healthMemo
# @attr [boolean] medicina
# @attr [string] medicinaMemo
# @attr [string] photograph
# @attr [string] photographMemo
# @attr [date-time] updatedAt
class Rest::DailyLogSerializer < ActiveModel::Serializer
  attributes :id, :symptom, 
             :health, :health_memo,
             :medicina, :medicina_memo,
             :photograph, :photograph_memo,
             :updated_at
end
