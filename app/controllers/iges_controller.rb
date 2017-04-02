class IgesController < ApplicationController
  def new
    @ige = Ige.new
  end

  def create
    @ige = current_user.iges.build(ige_params)
    if @ige.save
      flash[:success] = "あなたの歴史に刻まれました"
      redirect_to current_user
    else
      render 'new'
    end
  end

  def show
  end

  def edit
  end

  def destroy
  end

  def index
  end

  private

    def ige_params
      params.require(:ige).permit(:test_date, 
                                  :test_category,
                                  :ige_value,
                                  :test_unit,
                                  :allergen_housedust1_value, 
                                  :allergen_housedust1_unit,
                                  :allergen_housedust1_class)
    end
end
