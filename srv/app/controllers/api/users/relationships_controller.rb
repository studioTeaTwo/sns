# @tag Users
class Api::Users::RelationshipsController < ApplicationController

  # Creates a relationship
  #
  # @name RelationshipRequestBody
  # @body_parameter [Params::Relationship] relationship
  # @response_status 200
  def create
    @user = User.find(relationship_params[:followed_id])
    current_user.follow(@user)
  end

  # Destroys a relationship
  #
  # @response_status 200
  def destroy
    @user = Relationship.find(params[:id]).followed
    current_user.unfollow(@user)
  end

  private

    def relationship_params
      params.fetch(:relationship, {}).permit(:followed_id)
    end

end
