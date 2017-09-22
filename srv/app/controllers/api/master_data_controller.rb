# @tag MasterData
class Api::MasterDataController < ApplicationController
  skip_before_action :logged_in_user

  # Returns list of allergen groups
  #
  # @response_status 200
  # @response_class MasterData::AllergenGroup
  def allergen_groups
    @allergen_groups = Masterdata::AllergenGroup.data.map do |item|
      item[:en] = item[:en].camelize(:lower)
      item
    end
    render json: @allergen_groups
  end
end
