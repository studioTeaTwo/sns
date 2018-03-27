# @tag Users
class Api::Users::RelationshipsController < ApplicationController

  # Creates a relationship
  #
  # @name RelationshipRequestBody
  # @body_parameter [Params::Relationship] relationship
  # @response_status 200
  def create
    user = User.find(relationship_params[:followed_id])
    current_user.follow(user)
    record_activity(relationship_params[:followed_id])
    render json: user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer,
      option: {isFollow: true}
  end

  # Destroys a relationship
  #
  # @response_status 200
  def destroy
    user = User.find(params[:id])
    current_user.unfollow(user)
    render json: user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer,
      option: {isFollow: false}
  end

  private

    def relationship_params
      params.fetch(:relationship, {}).permit(:followed_id)
    end

    def record_activity(followed_id)
      followed = Relationship.where(follower_id: current_user.id, followed_id: followed_id).first
      followed.create_notification(user_id: followed_id)
      followed.create_experience(user_id: followed_id)
    end

end
