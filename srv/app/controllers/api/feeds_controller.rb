# @tag Feeds
class Api::FeedsController < ApplicationController

  DEFAULT_NOTIFICATIONS_LIMIT = 5

  # Returns the list of feeds
  #
  # @response_status 200
  # @response_class Rest::FeedSerializer
  def index
    my_experiences = current_user.experiences.order("created_at DESC").limit(DEFAULT_NOTIFICATIONS_LIMIT)
    following_ids = current_user.followings&.map(&:id)
    other_experiences = following_ids && Experience.where(user_id: following_ids).order("created_at DESC").limit(DEFAULT_NOTIFICATIONS_LIMIT)
    @experiences = { mine: my_experiences.to_a, others: other_experiences.to_a }
    render json: @experiences, serializer: Rest::FeedSerializer
  end

end
