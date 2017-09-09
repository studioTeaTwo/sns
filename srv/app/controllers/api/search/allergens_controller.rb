# @tag Search
class Api::Search::AllergensController < ApplicationController

  # Returns the list of allergens
  #
  # @query_parameter [string] keyword
  # @response_status 200
  # @response_class Array<Rest::ProfileSerializer>
  def index
    return render json: { error: 'bad_request' }, status: :bad_request unless params_present?

    if params[:keyword] == 'initial'
      @users = initial_display
    else
      @users = User.search_by_allergen(params[:keyword])
    end
    
    if @users.present?
      render json: @users, each_serializer: Rest::ProfileSerializer, sort: :search
    else
      render json: { error: 'not_found' }, status: :not_found
    end
  end

  private

    def initial_display
      # 検索前に表示しておく人たちを作成する
      # ログインユーザーが持っているアレルゲンを、10人になるまで再帰検索する
      latest_ige = current_user.iges.where(:latest_test_result => true)
      if latest_ige[0].present?
        # TODO: 保有アレルゲンで10人探す
        User.search_by_newest
      else
        # 適当に10人(検査日付が新しい人から)
        User.search_by_newest
      end
    end

    def params_present?
      params[:keyword].present? && ( params[:keyword] == 'initial' || params[:keyword].match(/(allergen_group_.+)/) )
    end

end
