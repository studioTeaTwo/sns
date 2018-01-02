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
    record_notification(relationship_params[:followed_id])
    render json: user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer,
      option: {sort: :profile, isFollow: true}
  end

  # Destroys a relationship
  #
  # @response_status 200
  def destroy
    user = User.find(params[:id])
    current_user.unfollow(user)
    render json: user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer,
      option: {sort: :profile, isFollow: false}
  end

  private

    def relationship_params
      params.fetch(:relationship, {}).permit(:followed_id)
    end

    def record_notification(followed_id)
      followed = Relationship.where(follower_id: current_user.id, followed_id: followed_id).first
      notification = followed.notifications.build({user_id: followed_id})
      notification.save!
    end

end
