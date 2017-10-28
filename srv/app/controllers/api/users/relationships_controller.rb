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
    isFollow = current_user.following? user
    render json: user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer,
      option: {sort: :profile, isFollow: isFollow}
  end

  # Destroys a relationship
  #
  # @response_status 200
  def destroy
    user = User.find(params[:id])
    current_user.unfollow(user)
    isFollow = current_user.following? user
    render json: user, include: [:iges, :microposts], serializer: Rest::ProfileSerializer,
      option: {sort: :profile, isFollow: isFollow}
  end

  private

    def relationship_params
      params.fetch(:relationship, {}).permit(:followed_id)
    end

end
