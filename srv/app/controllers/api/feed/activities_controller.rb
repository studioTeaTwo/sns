# @tag feed
class Api::Feed::ActivitiesController < ApplicationController

  DEFAULT_NOTIFICATIONS_LIMIT = 5

  # Returns the list of experience
  # 1. 自分の活動記録
  # 2. 友達の活動記録
  #
  # @response_status 200
  # @response_class Rest::ActivitySerializer
  def index
    my_experiences = current_user.experiences.order("created_at DESC").limit(DEFAULT_NOTIFICATIONS_LIMIT)
    friend_experiences = get_friend_experiences
    @experiences = { mine: my_experiences.to_a, friend: friend_experiences.to_a }
    render json: @experiences, serializer: Rest::ActivitySerializer
  end

  private
   
    def get_friend_experiences
      following_ids = current_user.followings&.map(&:id)
      if following_ids.present?
        results = User.left_joins(:experiences)
          .where(experiences: {user_id: following_ids})
          .order("experiences.created_at DESC")
          .limit(DEFAULT_NOTIFICATIONS_LIMIT)
          .select('experiences.*, users.name')
      else
        results = []
      end
      results
    end

end
