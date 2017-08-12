class Masterdata::UserHonoraryTitle < ActiveHash::Base

  # 検査単位
  self.data = [
    {:id => 10, :name => 'ふつーの人'},
    {:id => 11, :name => 'アレルギーサラリーマン'},
    {:id => 12, :name => 'アレルギーナイト'},
    {:id => 13, :name => 'アレルギーキング'},
    {:id => 14, :name => 'アレルギーゴッド'}
  ]
end