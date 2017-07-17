class Masterdata::TestCategory < ActiveHash::Base

  # 検査種類
  self.data = [
    {:id =>  1, :sort => 'ige', :name => '12種吸入性アレルゲンアトピー鑑別試験'},
    {:id =>  2, :sort => 'ige', :name => 'CAP16食物アレルギー'},
    {:id =>  3, :sort => 'ige', :name => 'CAP16アトピー乳幼児'},
    {:id =>  4, :sort => 'ige', :name => 'CAP16アトピー学童'},
    {:id =>  5, :sort => 'ige', :name => 'CAP16アトピー成人'},
    {:id =>  6, :sort => 'ige', :name => 'CAP16花粉症・鼻炎'},
    {:id =>  7, :sort => 'ige', :name => 'CAP16アレルギー性喘息'},
    {:id =>  8, :sort => 'ige', :name => 'MAST33'},
    {:id =>  9, :sort => 'ige', :name => 'MAST36'},
    {:id => 10, :sort => 'ige', :name => 'View 36'},
    {:id => 11, :sort => 'ige', :name => 'View 39'}
  ]

end
