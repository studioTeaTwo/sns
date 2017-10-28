# @tag Search
class Api::Search::IgeRanksController < ApplicationController

  # Returns the list of igeranks
  #
  # @query_parameter [string] keyword
  # @response_status 200
  # @response_class Array<Rest::ProfileSerializer>
  def index
    return render json: { error: 'bad_request' }, status: :bad_request unless params_present?

    if params[:keyword] == 'initial'
      @users = initial_dispaly
    else
      from_key = search_params[:from_ige].present? ? search_params[:from_ige] : 0
      to_key = search_params[:to_ige].present? ? search_params[:to_ige] : search_params[:from_ige] + 500
      @users = User.search_by_ige(from_key, to_key)
    end

    if @users.present?
      render json: @users, each_serializer: Rest::ProfileSerializer, option: {sort: :search}
    else
      render json: { error: 'not_found' }, status: :not_found
    end
  end

  private

    def search_params
      params.fetch(:keyword, {}).permit(
          :from_ige,
          :to_ige
        )
    end

    def initial_dispaly
      # 検索前に表示しておく人たちを作成する
      # ログインユーザーのIgE値に近い人を、10人になるまで再帰検索する
      latest_ige = current_user.iges.where(:latest_test_result => true)
      if latest_ige[0].present?
        ige_value = latest_ige[0].ige_value
        range = 10
        users = User.search_by_ige(ige_value - range, ige_value + range)
        # IgE範囲を±10ずつ増やしていく
        while users.count < 10 do
          range += 10
          users = User.search_by_ige(ige_value - range, ige_value + range)
        end
        users
      else
        # 適当に10人(検査日付が新しい人から)
        User.search_by_newest
      end
    end

    def params_present?
      params[:keyword] == 'initial' || search_params[:from_ige].present? || search_params[:to_ige].present?
    end
end
