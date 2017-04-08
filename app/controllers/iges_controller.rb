class IgesController < ApplicationController
  def new
    @ige = Ige.new
  end

  def create
    @ige = current_user.iges.build(ige_params)
    if @ige.save
      flash[:success] = "あなたの歴史に刻まれました"
      redirect_to root_path
    else
      render 'new'
    end
  end

  def show
    @ige = current_user.iges.find(params[:id]);
  end

  def edit
    @ige = current_user.iges.find(params[:id]);
  end

  def update
    @ige = Ige.find(params[:id])
    if @ige.update_attributes(ige_params)
      flash[:success] = "記録が修正されました"
      redirect_to root_path
    else
      render 'edit'
    end
  end

  def destroy
    Ige.find(params[:id]).destroy
    flash[:success] = "記録を削除しました"
    redirect_to root_path
  end

  def index
    @iges = current_user.iges.paginate(:page => params[:page])
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
