class Api::IgesController < ApplicationController

  def index
    @iges = current_user.iges.order("test_date DESC")
    render json: @iges, each_serializer: Rest::IgeSerializer
  end

  def show
    @ige = Ige.find(params[:id]);
    render json: @ige, serializer: Rest::IgeSerializer
  end

  def create
    @ige = current_user.iges.build(ige_params)
    # アレルゲン判定を追加する
    addition_params = calc_allergen_possession(ige_params.to_h)
    @ige.update(addition_params)
    ActiveRecord::Base.transaction do
      # 最新IgE検査の更新(プロフィールやユーザー検索のため)
      if latest_test?(@ige, 'new')
        current_user.iges.where(:latest_test_result => true).update_all(:latest_test_result => false)
        @ige[:latest_test_result] = true
      else
        @ige[:latest_test_result] = false
      end
      # 今回のIge検査を登録
      @ige.save!
    end
    render json: @ige, status: :created, serializer: Rest::IgeSerializer
  rescue => e
    render json: @ige.errors, status: :unprocessable_entity
  end

  def update
    @ige = Ige.find(params[:id])
    # アレルゲン判定を追加する
    addition_params = calc_allergen_possession(ige_params.to_h)
    ActiveRecord::Base.transaction do
      # 最新IgE検査の更新(プロフィールやユーザー検索のため)
      if latest_test?(@ige, 'edit')
        current_user.iges.where.not(:id => @ige.id).where(:latest_test_result => true).update_all(:latest_test_result => false)
        addition_params[:latest_test_result] = true
      else
        addition_params[:latest_test_result] = false
      end
      # 今回のIge検査を更新
      @ige.update_attributes(addition_params)
    end
    render json: @ige, serializer: Rest::IgeSerializer
  rescue => e
    render json: @ige.errors, status: :unprocessable_entity
  end

  def destroy
    @ige = current_user.iges.find_by(:id => params[:id])
    if !@ige.nil?
      @ige.destroy
    else
      render json: @ige.errors, status: :unprocessable_entity
    end
  end

  private

    def ige_params
      params.require(:ige).permit(*Ige.column_names)
    end

    def latest_test?(ige_data, method)
      current_iges = current_user.iges.order("test_date DESC")
      if method == 'new'
        # ige検査がこれしかない
        current_iges.count == 0 ||
        # 今回入力された検査日付は一番新しい
        ige_data[:test_date] >= current_iges[0][:test_date]
      else
        # ige検査がこれしかない
        current_iges.count == 1  ||
        # 今回の検査データは最新検査の更新であり、かつ今回入力された検査日付が1個前の検査より新しい
        (ige_data[:id] == current_iges[0][:id] && ige_data[:test_date] >= current_iges[1][:test_date]) || 
        # 今回の検査データは最新検査の更新では無いが、今回入力された検査日付は一番新しい
        ige_data[:test_date] >= current_iges[0][:test_date]
      end
    end

    def calc_allergen_possession(test_data)
      # リセットする
      allergen_group_list = Masterdata::AllergenGroup.all.map {|allergen_group| [allergen_group.en, false]}.to_h

      # 保有アレルゲンを記録する
      collect_allergen_in_user(test_data).each do |allergen_group|
        allergen_group_list[allergen_group] = true
      end

      test_data.update(allergen_group_list)
    end

    # アレルゲンを持っているか判定する
    def collect_allergen_in_user(test_data)
      positive_reaction_list = test_data.to_a.select do |item|
        positive_reaction? item
      end
      
      allergenGroup_list = positive_reaction_list.map { |item| to_allergen_group(item[0]) }
      allergenGroup_list.uniq!
      # マルチアレルゲンは含めない
      allergenGroup_list.delete_if {|item| item == 'allergen_group_maruti' }
    end

    private

    # 陽性反応か調べる
    def positive_reaction?(inspection_data)
      allergen_class_name = inspection_data[0].match(/(allergen_.+)/)
      allergen_class_name && (inspection_data[1].to_i > 1)
    end

    # アレルゲンクラス名からアレルゲン群に変換する
    def to_allergen_group(allergen_class_name)
      allergen_info = Masterdata::Allergen.all.select do |item|
        allergen_class_name == "allergen_#{item.en}_class"
      end

      # TODO: 結果が１つ以外だったらアラート上げる
      # if allergen_info.count != 1

      allergenGroup = Masterdata::AllergenGroup.all.select do |item| 
        item.ja == allergen_info[0].allergenGroup
      end
      allergenGroup[0].en
    end
end
