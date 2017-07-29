class Masterdata::TestUnit < ActiveHash::Base

  # 検査単位
  self.data = [
    {:id => 1, :sort => 'ige', :name => 'IU/mL'},
    {:id => 2, :sort => 'ige', :name => 'UA/mL'},
    {:id => 3, :sort => 'ige', :name => 'IUA/mL'},
    {:id => 4, :sort => 'ige', :name => 'LC'}
  ]
end