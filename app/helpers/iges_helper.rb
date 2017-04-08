module IgesHelper
  # 検査種類を表示する
  def get_test_category_name(test_category_value)
    case test_category_value
    when 0 then "IgE(非特異的IgE)〔CLEIA〕"
    when 1 then	"IgE(非特異的IgE)〔FEIA〕"
    when 2 then "特異的IgE(MAST36アレルゲン)"
    when 3 then "汎用セット スクリーニング16　内科・呼吸器系"
    when 4 then "汎用セット スクリーニング16　小児科"
    when 5 then "汎用セット スクリーニング16　耳鼻科"
    when 6 then "汎用セット スクリーニング16　皮膚科"
    when 7 then "汎用セット コンビネーション6"
    when 8 then "特異的IgE(ミックスアレルゲン) "
    when 9 then "特異的IgE(シングルアレルゲン) "
    when 10 then "アトピー鑑別試験 (12種吸入性アレルゲン) "
    when 11 then "特異的IgE (C-PAC16アレルゲン) 小児用 "
    when 12 then "特異的IgE (C-PAC16アレルゲン) アトピー性皮膚炎用 "
    when 13 then "特異的IgE (C-PAC16アレルゲン) 鼻炎・喘息用 "
    when 14 then "特異的IgE (C-PAC5アレルゲン)　小児除去食用 "
    when 15 then "特異的IgE(マルチアレルゲン) "
    when 16 then "特異的IgE(シングルアレルゲン) "
    when 17 then "特異的IgE(Ara h 2)(ピーナッツ由来) "
    else
    end
  end

  # 単位を表示する
  def get_unit_name(unit_value)
    case unit_value
    when 0 then "IU/mL"
    when 1 then "UA/mL"
    when 2 then "IUA/mL"
    when 3 then "LC"
    else
    end
  end
end
