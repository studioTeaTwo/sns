class IgesController < ApplicationController
  include IgesHelper
  before_action :logged_in_user, only: [:index, :new, :create, :edit, :quote, :update, :destroy]

  def index
    @iges = current_user.iges.order("test_date DESC").paginate(:page => params[:page])
    @chart_data = current_user.iges.select(:test_date, :ige_value).group(:test_date).sum(:ige_value)
  end

  def new
    @ige = Ige.new
  end

  def create
    @ige = current_user.iges.build(ige_params)
    addition_params = calc_allergen_possession(ige_params.to_h)
    @ige.update(addition_params)
    ActiveRecord::Base.transaction do
      # 最新IgE検査の更新(プロフィールやユーザー検索のため)
      @current_iges = current_user.iges.order("test_date DESC")
      if ige_params[:test_date] >= @current_iges[0][:test_date].to_s
        # 今回の検査データが最新検査データである
        @current_iges.where(:latest_test_result => true).update_all(:latest_test_result => false)
        @ige[:latest_test_result] = true
      else
        # 今回の検査データは最新では無い
        @ige[:latest_test_result] = false
      end

      # 今回のIge検査を登録
      @ige.save!
    end
    flash[:success] = "あなたの歴史に刻まれました"
    redirect_to root_path
    rescue => e
      puts e
      render 'new'
  end

  def show
    @ige = Ige.find(params[:id]);
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
    addition_params = calc_allergen_possession(ige_params.to_h)
    ActiveRecord::Base.transaction do
      # 最新IgE検査の更新(プロフィールやユーザー検索のため)
      @current_iges = current_user.iges.order("test_date DESC")
      if (
           # 今回の検査データは最新検査の更新であり、かつ今回入力された検査日付が1個前の検査より新しい
           (@ige[:id] == @current_iges[0][:id] && @ige[:test_date] >= @current_iges[1][:test_date]) || 
           # 今回の検査データは最新検査の更新では無いが、今回入力された検査日付は一番新しい
           @ige[:test_date] >= @current_iges[0][:test_date]
         )
        # 今回の検査データが最新検査データである
        @current_iges.where(:latest_test_result => true).update_all(:latest_test_result => false)
        addition_params[:latest_test_result] = true
      else
        # 今回の検査データは最新では無い
        addition_params[:latest_test_result] = false
      end

      # 今回のIge検査を更新
      @ige.update_attributes(addition_params)
    end
    flash[:success] = "記録が修正されました"
    redirect_to root_path
    rescue => e
      render 'edit'
  end

  def destroy
    Ige.find(params[:id]).destroy
    flash[:success] = "記録を削除しました"
    redirect_to root_path
  end

  private

    def ige_params
      params.require(:ige).permit(:test_date, 
                                  :test_category,
                                  :ige_value,
                                  :ige_unit,
                                  :allergen_harugaya_class,
                                  :allergen_gyougishiba_class,
                                  :allergen_kamogaya_class,
                                  :allergen_hirohaushinokegusa_class,
                                  :allergen_hosomugi_class,
                                  :allergen_ooawagaeri_class, 
                                  :allergen_ashi_class,
                                  :allergen_nagahagusa_class, 
                                  :allergen_konukagusaZoku_class,
                                  :allergen_seibanmorokoshi_class,   
                                  :allergen_komugiZoku_class,  
                                  :allergen_oosuzumenoteppou_class,  
                                  :allergen_suzumenohieZoku_class,
                                  :allergen_butakusakongoubu1_class, 
                                  :allergen_butakusa_class,
                                  :allergen_butakusamodoki_class,    
                                  :allergen_oobutakusa_class,
                                  :allergen_nigayomogi_class,
                                  :allergen_yomogi_class,
                                  :allergen_huransugiku_class,
                                  :allergen_tanpopoZoku_class,
                                  :allergen_heraobako_class,
                                  :allergen_shiroza_class,
                                  :allergen_akinokirinsou_class,  
                                  :allergen_himesuiba_class,
                                  :allergen_irakusaZoku_class, 
                                  :allergen_kanamugura_class,
                                  :allergen_kaedeZoku_class, 
                                  :allergen_hannokiZoku_class,
                                  :allergen_shirakanbaZoku_class,
                                  :allergen_bunaZoku_class,
                                  :allergen_byakushinZoku_class,
                                  :allergen_konaraZoku_class,
                                  :allergen_nireZoku_class, 
                                  :allergen_olive_class,
                                  :allergen_kurumiZoku_class, 
                                  :allergen_yanagiZoku_class, 
                                  :allergen_matsuZoku_class, 
                                  :allergen_sugi_class,
                                  :allergen_acaciaZoku_class,  
                                  :allergen_hinoki_class,
                                  :allergen_kuwaZoku_class,  
                                  :allergen_housedust1_class,
                                  :allergen_housedust2_class,
                                  :allergen_yakehyouhidani_class,   
                                  :allergen_konahyouhidani_class,   
                                  :allergen_ashibutokonadani_class,
                                  :allergen_sayaashinidani_class, 
                                  :allergen_kenagakonadani_class,  
                                  :allergen_penicillium_class,
                                  :allergen_cladosporium_class,      
                                  :allergen_aspergillosis_class,     
                                  :allergen_mucor_class,
                                  :allergen_candida_class,
                                  :allergen_alternaria_class,
                                  :allergen_helminthosporium_class,
                                  :allergen_pityrosporium_class, 
                                  :allergen_trichophyton_class,    
                                  :allergen_malassezia_class,
                                  :allergen_kiirobudoukyukinA_class,
                                  :allergen_kiirobudoukyukinB_class,
                                  :allergen_nekoHisetsu_class,
                                  :allergen_umaHisetsu_class,
                                  :allergen_ushiHisetsu_class,
                                  :allergen_inuHisetsu_class,
                                  :allergen_marmotJyouhi_class,    
                                  :allergen_hatoFun_class,
                                  :allergen_gatyouUmou_class,
                                  :allergen_sekiseiinkoFun_class,  
                                  :allergen_sekiseiinkoUmou_class,   
                                  :allergen_yagiJyouhi_class,
                                  :allergen_hitsujiJyouhi_class,  
                                  :allergen_katoJyouhi_class,
                                  :allergen_butaJyouhi_class,
                                  :allergen_hamsterJyouhi_class,   
                                  :allergen_niwatoriUmou_class,    
                                  :allergen_ahiruUmou_class,
                                  :allergen_ratt_class,
                                  :allergen_mouse_class,   
                                  :allergen_oobakosyushi_class,   
                                  :allergen_kinu_class,
                                  :allergen_isocyanateTDI_class,
                                  :allergen_isocyanateMDI_class,
                                  :allergen_isocyanateHDI_class,
                                  :allergen_ethyleneoxide_class,
                                  :allergen_musuihutalsan_class,
                                  :allergen_formalin_class,
                                  :allergen_latex_class,
                                  :allergen_men_class,  
                                  :allergen_ranpaku_class,
                                  :allergen_ranou_class,
                                  :allergen_ovomucoid_class,
                                  :allergen_milk_class,
                                  :allergen_alpha_actalbumin_class,
                                  :allergen_beta_lactoglobulin_class,
                                  :allergen_casein_class,
                                  :allergen_cheese_class, 
                                  :allergen_moldcheese_class,
                                  :allergen_tara_class,
                                  :allergen_maguro_class,
                                  :allergen_sake_class,
                                  :allergen_saba_class,
                                  :allergen_aji_class,
                                  :allergen_iwashi_class,
                                  :allergen_karei_class,
                                  :allergen_ikura_class,
                                  :allergen_tarako_class,
                                  :allergen_kani_class,
                                  :allergen_ebi_class,
                                  :allergen_murasakigai_class,
                                  :allergen_lobster_class,
                                  :allergen_asari_class,
                                  :allergen_kaki_class,  
                                  :allergen_hotate_class,
                                  :allergen_ika_class, 
                                  :allergen_tako_class,
                                  :allergen_komugi_class,
                                  :allergen_gluten_class,
                                  :allergen_oh_5gliadin_class,
                                  :allergen_raimugi_class,
                                  :allergen_oomugi_class,
                                  :allergen_ootomugi_class,
                                  :allergen_toumorokoshi_class,    
                                  :allergen_kome_class,
                                  :allergen_soba_class,   
                                  :allergen_beerkoubo_class,
                                  :allergen_kibi_class,
                                  :allergen_awa_class,   
                                  :allergen_hie_class,    
                                  :allergen_bakuga_class,
                                  :allergen_butaniku_class,
                                  :allergen_gyuniku_class,
                                  :allergen_toriniku_class,
                                  :allergen_youniku_class,
                                  :allergen_endou_class,
                                  :allergen_peanuts_class,
                                  :allergen_daizu_class,
                                  :allergen_ingen_class,  
                                  :allergen_hashibami_class, 
                                  :allergen_brazilnuts_class,
                                  :allergen_almond_class,
                                  :allergen_coconut_class, 
                                  :allergen_cacao_class,
                                  :allergen_cashewnuts_class,
                                  :allergen_kurumi_class,
                                  :allergen_arah2_class, 
                                  :allergen_orange_class,  
                                  :allergen_ichigo_class, 
                                  :allergen_ringo_class, 
                                  :allergen_kiwi_class,  
                                  :allergen_melon_class,   
                                  :allergen_mango_class,  
                                  :allergen_banana_class,  
                                  :allergen_younashi_class,
                                  :allergen_momo_class,
                                  :allergen_avocado_class,
                                  :allergen_grapefruit_class,
                                  :allergen_suika_class,
                                  :allergen_tomato_class,  
                                  :allergen_ninjin_class, 
                                  :allergen_jyagaimo_class,
                                  :allergen_ninniku_class,
                                  :allergen_tamanegi_class,
                                  :allergen_takenoko_class,
                                  :allergen_satsumaimo_class, 
                                  :allergen_celery_class,
                                  :allergen_parsley_class, 
                                  :allergen_yamaimo_class,
                                  :allergen_hourensou_class,
                                  :allergen_kabocha_class,
                                  :allergen_hitoinsulin_food_class, 
                                  :allergen_gelatin_class,
                                  :allergen_goma_class,
                                  :allergen_mustard_class,
                                  :allergen_kaichu_class,
                                  :allergen_anisakis_class,
                                  :allergen_hitoinsulin_etc_class,   
                                  :allergen_mitsubachi_class,
                                  :allergen_suzumebachi_class,
                                  :allergen_ashinagabachi_class,     
                                  :allergen_gokiburi_class,
                                  :allergen_yusurika_class,
                                  :allergen_ga_class,
                                  :allergen_yabuka_class,  
                                  :allergen_doubutsuJyouhi_class,    
                                  :allergen_syokumotsu_class,
                                  :allergen_kokumotsu_class,
                                  :allergen_ineka_class,
                                  :allergen_kabi_class,  
                                  :allergen_zassou_class
                                  )
    end

    def calc_allergen_possession(test_data)
      # リセットする
      allergenGroup_list = ALLERGEN_SORT.keys.map {|allergenGroup_name| [allergenGroup_name, false]}.to_h

      # 保有アレルゲンを記録する
      collect_allergen_in_user(test_data).each do |allergen_sort|
        allergenGroup_list[allergen_sort] = true
      end

      test_data.update(allergenGroup_list)
    end
end