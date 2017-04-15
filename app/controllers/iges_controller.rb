class IgesController < ApplicationController
  def new
    @ige = Ige.new
  end

  def create
    @ige = current_user.iges.build(ige_params) # プロトの便宜性のため一時的にige_paramsではなくparamsにしている
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

  def quote
    @ige = current_user.iges.find(params[:id]);
    # 引用登録で必ず再記入させたい項目をnilにする
    @ige.id = nil
    @ige.test_date = nil
    @ige.ige_value = nil
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
    @iges = current_user.iges.order("test_date DESC").paginate(:page => params[:page])
    @chart_data = current_user.iges.select(:test_date, :ige_value).group(:test_date).sum(:ige_value)
  end

  private

    def ige_params
      params.require(:ige).permit(:test_date, 
                                  :test_category,
                                  :ige_value,
                                  :ige_unit,
                                  :allergen_housedust1_value,
                                  :allergen_housedust1_unit,
                                  :allergen_housedust1_class,
                                  :allergen_housedust2_value,
                                  :allergen_housedust2_unit,
                                  :allergen_housedust2_class,
                                  :allergen_yakehyoudani_value,
                                  :allergen_yakehyoudani_unit,
                                  :allergen_yakehyoudani_class, 
                                  :allergen_sugi_value,
                                  :allergen_sugi_unit,
                                  :allergen_sugi_class,
                                  :allergen_hinoki_value,
                                  :allergen_hinoki_unit,
                                  :allergen_hinoki_class,
                                  :allergen_hannoki_value,
                                  :allergen_hannoki_unit,
                                  :allergen_hannoki_class,
                                  :allergen_shirakanba_value,
                                  :allergen_shirakanba_unit,
                                  :allergen_shirakanba_class,
                                  :allergen_harugaya_value,
                                  :allergen_harugaya_unit,
                                  :allergen_harugaya_class,
                                  :allergen_kamogaya_value,
                                  :allergen_kamogaya_unit,
                                  :allergen_kamogaya_class,
                                  :allergen_ooawagaeri_value,
                                  :allergen_ooawagaeri_unit,
                                  :allergen_ooawagaeri_class,
                                  :allergen_butakusa_value,
                                  :allergen_butakusa_unit,
                                  :allergen_butakusa_class,
                                  :allergen_yomogi_value,
                                  :allergen_yomogi_unit,
                                  :allergen_yomogi_class,
                                  :allergen_alternaria_value,
                                  :allergen_alternaria_unit,
                                  :allergen_alternaria_class,
                                  :allergen_aspergillosis_value,
                                  :allergen_aspergillosis_unit,
                                  :allergen_aspergillosis_class,
                                  :allergen_candida_value,
                                  :allergen_candida_unit,
                                  :allergen_candida_class,
                                  :allergen_malassezia_value,
                                  :allergen_malassezia_unit,
                                  :allergen_malassezia_class,
                                  :allergen_neko_value,
                                  :allergen_neko_unit,
                                  :allergen_neko_class,
                                  :allergen_inu_value,
                                  :allergen_inu_unit,
                                  :allergen_inu_class,
                                  :allergen_kato_value, # 家兎
                                  :allergen_kato_unit,
                                  :allergen_kato_class,
                                  :allergen_gokiburi_value,
                                  :allergen_gokiburi_unit,
                                  :allergen_gokiburi_class,
                                  :allergen_ga_value,
                                  :allergen_ga_unit,
                                  :allergen_ga_class,
                                  :allergen_gyunyu_value,
                                  :allergen_gyunyu_unit,
                                  :allergen_gyunyu_class,
                                  :allergen_ranpaku_value,
                                  :allergen_ranpaku_unit,
                                  :allergen_ranpaku_class,
                                  :allergen_ovomucoid_value,
                                  :allergen_ovomucoid_unit,
                                  :allergen_ovomucoid_class,
                                  :allergen_kome_value,
                                  :allergen_kome_unit,
                                  :allergen_kome_class,
                                  :allergen_komugi_value,
                                  :allergen_komugi_unit,
                                  :allergen_komugi_class,
                                  :allergen_soba_value,
                                  :allergen_soba_unit,
                                  :allergen_soba_class,
                                  :allergen_daizu_value,
                                  :allergen_daizu_unit,
                                  :allergen_daizu_class,
                                  :allergen_peanuts_value,
                                  :allergen_peanuts_unit,
                                  :allergen_peanuts_class,
                                  :allergen_ringo_value,
                                  :allergen_ringo_unit,
                                  :allergen_ringo_class,
                                  :allergen_banana_value,
                                  :allergen_banana_unit,
                                  :allergen_banana_class,
                                  :allergen_kiwi_value,
                                  :allergen_kiwi_unit,
                                  :allergen_kiwi_class,
                                  :allergen_goma_value,
                                  :allergen_goma_unit,
                                  :allergen_goma_class,
                                  :allergen_gyuniku_value,
                                  :allergen_gyuniku_unit,
                                  :allergen_gyuniku_class,
                                  :allergen_butaniku_value,
                                  :allergen_butaniku_unit,
                                  :allergen_butaniku_class,
                                  :allergen_toriniku_value,
                                  :allergen_toriniku_unit,
                                  :allergen_toriniku_class,
                                  :allergen_ebi_value,
                                  :allergen_ebi_unit,
                                  :allergen_ebi_class,
                                  :allergen_kani_value,
                                  :allergen_kani_unit,
                                  :allergen_kani_class,
                                  :allergen_saba_value,
                                  :allergen_saba_unit,
                                  :allergen_saba_class,
                                  :allergen_sake_value,
                                  :allergen_sake_unit,
                                  :allergen_sake_class,
                                  :allergen_maguro_value,
                                  :allergen_maguro_unit,
                                  :allergen_maguro_class,
                                  :allergen_latex_value,
                                  :allergen_latex_unit,
                                  :allergen_latex_class
                                  )
    end
end
