# @tag feed
class Api::Feed::NotificationsController < ApplicationController

  # Returns the list of notification
  # 1. パーソナルアシスタントからのお知らせ
  #   本日の治療日記が未了
  # 2. チャットの未読スレッド
  #
  # @response_status 200
  # @response_class Array<Rest::NotificationSerializer>
  def index
    @notifications = []
    check_personal_assistant
    if @personal_assistant_notification.present?
      @notifications.concat(@personal_assistant_notification)
    end
    render json: @notifications, each_serializer: Rest::NotificationSerializer
  end

  private

    def check_personal_assistant
      @personal_assistant_notification = []
      content = {
        type: 'DailyLog',
        user_id: Constants::PERSONAL_ASSISTANT[:id],
        name: Constants::PERSONAL_ASSISTANT[:name]
      }
      my_personal_assistant = PersonalAssistant.where({user_id: current_user.id})
      if my_personal_assistant[0].daily_atopic
        content[:description] = 'アトピーの治療日記を書こう！'
        @personal_assistant_notification.push(content)
      elsif my_personal_assistant[0].daily_asthma
        content[:description] = '喘息の治療日記を書こう！'
        @personal_assistant_notification.push(content)
      elsif my_personal_assistant[0].daily_rhinitis
        content[:description] = '鼻炎の治療日記を書こう！'
        @personal_assistant_notification.push(content)
      elsif my_personal_assistant[0].daily_pollen
        content[:description] = '花粉症の治療日記を書こう！'
        @personal_assistant_notification.push(content)
      elsif my_personal_assistant[0].daily_gastroenteritis
        content[:description] = '胃腸炎の治療日記を書こう！'
        @personal_assistant_notification.push(content)
      elsif my_personal_assistant[0].daily_conjunctivitis
        content[:description] = '結膜炎の治療日記を書こう！'
        @personal_assistant_notification.push(content)
      end
    end
end
