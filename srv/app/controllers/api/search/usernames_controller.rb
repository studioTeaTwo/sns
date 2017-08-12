class Api::Search::UsernamesController < ApplicationController

  def index
    return render json: { error: 'bad_request' }, status: :bad_request unless params_present?

    @users = User.where('name LIKE(?)', "%#{params[:search_key]}%")

    if @users.present?
      render json: @users, each_serializer: Rest::ProfileSerializer, type: :search
    else
      render json: { error: 'not_found' }, status: :not_found
    end
  end

  private

    def params_present?
      params[:search_key].present?
    end
  
end
