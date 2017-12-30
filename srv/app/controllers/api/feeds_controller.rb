# @tag Feeds
class Api::FeedsController < ApplicationController

  DEFAULT_NOTIFICATIONS_LIMIT = 5

  # Returns the list of feeds
  #
  # @response_status 200
  # @response_class Rest::FeedSerializer
  def index
    my_experiences = current_user.experiences.order("created_at DESC").limit(DEFAULT_NOTIFICATIONS_LIMIT)
    other_experiences = get_other_experiences
    @experiences = { mine: my_experiences.to_a, others: other_experiences.to_a }
    render json: @experiences, serializer: Rest::FeedSerializer
  end

  private
   
    def get_other_experiences
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
