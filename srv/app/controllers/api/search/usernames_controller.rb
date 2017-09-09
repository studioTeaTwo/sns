# @tag Search
class Api::Search::UsernamesController < ApplicationController

  # Returns the list of usernames
  #
  # @query_parameter [string] keyword
  # @response_status 200
  # @response_class Array<Rest::ProfileSerializer>
  def index
    return render json: { error: 'bad_request' }, status: :bad_request unless params_present?

    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")

    if @users.present?
      render json: @users, each_serializer: Rest::ProfileSerializer, sort: :search
    else
      render json: { error: 'not_found' }, status: :not_found
    end
  end

  private

    def params_present?
      params[:keyword].present?
    end
  
end
