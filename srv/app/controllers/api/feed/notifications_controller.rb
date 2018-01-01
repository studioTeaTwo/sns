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
    if check_personal_assistant.present?
      @notifications.concat(@personal_assistant_notification)
    end
    if check_unread_chat.present?
      @notifications.concat(@unread_chat_notification)
    end
    render json: @notifications, each_serializer: Rest::NotificationSerializer
  end

  private

    def check_personal_assistant
      @personal_assistant_notification = []
      template = {
        type: 'DailyLog',
        user_id: Constants::PERSONAL_ASSISTANT[:id],
        name: Constants::PERSONAL_ASSISTANT[:name]
      }
      my_personal_assistant = PersonalAssistant.where({user_id: current_user.id}).first
      if my_personal_assistant.daily_atopic
        notification = template.dup
        notification[:description] = 'アトピーの治療日記を書こう！'
        notification[:link_id] = 'atopic'
        @personal_assistant_notification.push(notification)
      end
      if my_personal_assistant.daily_asthma
        notification = template.dup
        notification[:description] = '喘息の治療日記を書こう！'
        notification[:link_id] = 'asthma'
        @personal_assistant_notification.push(notification)
      end
      if my_personal_assistant.daily_rhinitis
        notification = template.dup
        notification[:description] = '鼻炎の治療日記を書こう！'
        notification[:link_id] = 'rhinitis'
        @personal_assistant_notification.push(notification)
      end
      if my_personal_assistant.daily_pollen
        notification = template.dup
        notification[:description] = '花粉症の治療日記を書こう！'
        notification[:link_id] = 'pollen'
        @personal_assistant_notification.push(notification)
      end
      if my_personal_assistant.daily_gastroenteritis
        notification = template.dup
        notification[:description] = '胃腸炎の治療日記を書こう！'
        notification[:link_id] = 'gastroenteritis'
        @personal_assistant_notification.push(notification)
      end
      if my_personal_assistant.daily_conjunctivitis
        notification = template.dup
        notification[:description] = '結膜炎の治療日記を書こう！'
        notification[:link_id] = 'conjunctivitis'
        @personal_assistant_notification.push(notification)
      end
      @personal_assistant_notification
    end

    def check_unread_chat
      @unread_chat_notification = []
      content = {
        type: 'Chat',
        description: 'チャットが届いているよ！'
      }
      unread_chats = ChatStatus.where(user_id: current_user.id, has_unread: true).order("updated_at DESC")
      if unread_chats.present?
        unread_chats.each do |chat_status|
          participaints = ChatThread.find(chat_status.chat_thread_id).users
          # TODO: 3人以上の時
          opponent = participaints.select { |user| user.id != current_user.id }
          content[:user_id] = opponent[0].id
          content[:name] = opponent[0].name
          content[:link_id] = chat_status.chat_thread_id.to_s
          @unread_chat_notification.push(content)
        end
      end
      @unread_chat_notification
    end
end
