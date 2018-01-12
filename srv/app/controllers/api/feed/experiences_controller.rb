# @tag feed
class Api::Feed::ExperiencesController < ApplicationController

  DEFAULT_NOTIFICATIONS_LIMIT = 5

  # Returns the list of experience
  # 1. 自分の活動記録
  # 2. 友達の活動記録
  #
  # @response_status 200
  # @response_class Rest::ExperienceSerializer
  def index
    my_experiences = get_my_experiences
    friend_experiences = get_friend_experiences
    @experiences = { mine: my_experiences, friend: friend_experiences }
    render json: @experiences, serializer: Rest::ExperienceSerializer
  end

  private

    def get_my_experiences
      results = []

      experiences = current_user.experiences.order("created_at DESC").limit(DEFAULT_NOTIFICATIONS_LIMIT)
      if experiences.present?
        experiences.each do |item|

          if (item.activity_type == 'Relationship')
            follower = Relationship.find(item.activity_id)
            user = User.find(follower.follower_id)
            link_id = user.id.to_s
            description = "#{user.name}さんにフォローされたよ！"
          elsif (item.activity_type == 'DailyLog')
            user = current_user
            link_id = item.activity_id.to_s
            description = "治療日記を付けました！"
          end

          experience = {}
          experience[:id] = item.id
          experience[:type] = item.activity_type
          experience[:user_id] = item.user_id
          experience[:name] = user.name
          experience[:link_id] = link_id
          experience[:description] = description
          experience[:created_at] = item.created_at
          results.push(experience)
        end
      end
      results
    end
   
    def get_friend_experiences
      results = []

      following_ids = current_user.followings&.map(&:id)
      if following_ids.present?

        experiences = User.left_joins(:experiences)
          .where(experiences: {user_id: following_ids})
          .order("experiences.created_at DESC")
          .limit(DEFAULT_NOTIFICATIONS_LIMIT)
          .select('experiences.*, users.name')

        if experiences.present?
          experiences.each do |item|

            if (item.activity_type == 'Relationship')
              follower = Relationship.find(item.activity_id)
              user = User.find(follower.follower_id)
              link_id = user.id.to_s
              description = "#{user.name}さんにフォローされたよ！"
            elsif (item.activity_type == 'DailyLog')
              user = User.find(item.user_id)
              link_id = item.activity_id.to_s
              description = "治療日記を付けました！"
            end

            experience = {}
            experience[:id] = item.id
            experience[:type] = item.activity_type
            experience[:user_id] = item.user_id
            experience[:name] = user.name
            experience[:link_id] = link_id
            experience[:description] = description
            experience[:created_at] = item.created_at
            results.push(experience)
          end
        end
      end
      results
    end

end
