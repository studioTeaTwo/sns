class Masterdata::UserRank < ActiveHash::Base

  # 検査単位
  self.data = [
    {:id => 0, :name => 'Dランク'},
    {:id => 1, :name => 'Cランク'},
    {:id => 2, :name => 'Bランク'},
    {:id => 3, :name => 'Aランク'},
    {:id => 4, :name => 'Sランク'}
  ]
end