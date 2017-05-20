# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

allergens =
	 # 全種類 -> iges_helper.rb からコピペ
  all: [
			'harugaya',          
			'gyougishiba',       
			'kamogaya',          
			'hirohaushinokegusa',
			'hosomugi',          
			'ooawagaeri',        
			'ashi',              
			'nagahagusa',        
			'konukagusaZoku',    
			'seibanmorokoshi',   
			'komugiZoku',        
			'oosuzumenoteppou',  
			'suzumenohieZoku',   
			'butakusakongoubu1', 
			'butakusa',          
			'butakusamodoki',    
			'oobutakusa',        
			'nigayomogi',        
			'yomogi',            
			'huransugiku',       
			'tanpopoZoku',       
			'heraobako',         
			'shiroza',           
			'akinokirinsou',     
			'himesuiba',         
			'irakusaZoku',       
			'kanamugura',        
			'kaedeZoku',         
			'hannokiZoku',       
			'shirakanbaZoku',    
			'bunaZoku',          
			'byakushinZoku',     
			'konaraZoku',        
			'nireZoku',          
			'olive',             
			'kurumiZoku',        
			'yanagiZoku',        
			'matsuZoku',         
			'sugi',              
			'acaciaZoku',        
			'hinoki',            
			'kuwaZoku',          
			'housedust1',        
			'housedust2',        
			'yakehyouhidani',    
			'konahyouhidani',    
			'ashibutokonadani',  
			'sayaashinidani',    
			'kenagakonadani',    
			'penicillium',       
			'cladosporium',      
			'aspergillosis',     
			'mucor',             
			'candida',           
			'alternaria',        
			'helminthosporium',  
			'pityrosporium',     
			'trichophyton',      
			'malassezia',        
			'kiirobudoukyukinA', 
			'kiirobudoukyukinB', 
			'nekoHisetsu',       
			'umaHisetsu',        
			'ushiHisetsu',       
			'inuHisetsu',        
			'marmotJyouhi',      
			'hatoFun',           
			'gatyouUmou',        
			'sekiseiinkoFun',    
			'sekiseiinkoUmou',   
			'yagiJyouhi',        
			'hitsujiJyouhi',     
			'katoJyouhi',        
			'butaJyouhi',        
			'hamsterJyouhi',     
			'niwatoriUmou',      
			'ahiruUmou',         
			'ratt',              
			'mouse',             
			'oobakosyushi',      
			'kinu',              
			'isocyanateTDI',     
			'isocyanateMDI',     
			'isocyanateHDI',     
			'ethyleneoxide',     
			'musuihutalsan',     
			'formalin',          
			'latex',             
			'men',               
			'ranpaku',           
			'ranou',             
			'ovomucoid',         
			'milk',              
			'alpha_actalbumin',  
			'beta_lactoglobulin',
			'casein',            
			'cheese',            
			'moldcheese',        
			'tara',              
			'maguro',            
			'sake',              
			'saba',              
			'aji',               
			'iwashi',            
			'karei',             
			'ikura',             
			'tarako',            
			'kani',              
			'ebi',               
			'murasakigai',       
			'lobster',           
			'asari',             
			'kaki',              
			'hotate',            
			'ika',               
			'tako',              
			'komugi',            
			'gluten',            
			'oh_5gliadin',       
			'raimugi',           
			'oomugi',            
			'ootomugi',          
			'toumorokoshi',      
			'kome',              
			'soba',              
			'beerkoubo',         
			'kibi',              
			'awa',               
			'hie',               
			'bakuga',            
			'butaniku',          
			'gyuniku',           
			'toriniku',          
			'youniku',           
			'endou',             
			'peanuts',           
			'daizu',             
			'ingen',             
			'hashibami',         
			'brazilnuts',        
			'almond',            
			'coconut',           
			'cacao',             
			'cashewnuts',        
			'kurumi',            
			'arah2',             
			'orange',            
			'ichigo',            
			'ringo',             
			'kiwi',              
			'melon',             
			'mango',             
			'banana',            
			'younashi',          
			'momo',              
			'avocado',           
			'grapefruit',        
			'suika',             
			'tomato',            
			'ninjin',            
			'jyagaimo',          
			'ninniku',           
			'tamanegi',          
			'takenoko',          
			'satsumaimo',        
			'celery',            
			'parsley',           
			'yamaimo',           
			'hourensou',         
			'kabocha',           
			'hitoinsulin_food',  
			'gelatin',           
			'goma',              
			'mustard',           
			'kaichu',            
			'anisakis',          
			'hitoinsulin_etc',   
			'mitsubachi',        
			'suzumebachi',       
			'ashinagabachi',     
			'gokiburi',          
			'yusurika',          
			'ga',                
			'yabuka',            
			'doubutsuJyouhi',    
			'syokumotsu',        
			'kokumotsu',         
			'ineka',             
			'kabi',              
			'zassou'            
			]
  # 12種吸入性アレルゲンアトピー鑑別試験
  0: ['gyougishiba', 'kamogaya', 'butakusa', 'yomogi', 'shirakanbaZoku', 'sugi', 'yakehyouhidani', 'konahyouhidani', 'candida', 'alternaria', 'nekoHisetsu', 'inuHisetsu']
  # CAP16食物アレルギー
  1: ['ranpaku', 'ovomucoid', 'milk', 'maguro', 'sake', 'ikura', 'kani', 'ebi', 'komugi', 'soba', 'gyuniku', 'peanuts', 'daizu', 'kurumi', 'kiwi', 'banana']
  # CAP16アトピー乳幼児
  2: ['sugi', 'yakehyouhidani', 'nekoHisetsu', 'inuHisetsu', 'ranpaku', 'ovomucoid', 'milk', 'maguro', 'sake', 'ikura', 'ebi', 'komugi', 'soba', 'peanuts', 'daizu', 'gokiburi']
  # CAP16アトピー学童
  3: ['sugi', 'yakehyouhidani', 'candida', 'nekoHisetsu', 'inuHisetsu', 'ranpaku', 'milk', 'maguro', 'kani', 'ebi', 'komugi', 'soba', 'peanuts', 'daizu', 'kiwi', 'gokiburi']
  # CAP16アトピー成人
  4: ['sugi', 'yakehyouhidani', 'candida', 'malassezia', 'nekoHisetsu', 'inuHisetsu', 'saba', 'kani', 'ebi', 'komugi', 'soba', 'peanuts', 'daizu', 'kiwi', 'gokiburi', 'ga']
  # CAP16花粉症・鼻炎
  5: ['kamogaya', 'butakusa', 'yomogi', 'hannokiZoku', 'sugi', 'hinoki', 'housedust1', 'yakehyouhidani', 'nekoHisetsu', 'inuHisetsu', 'hamsterJyouhi', 'tomato', 'gokiburi', 'yusurika', 'ga', 'kabi']
  # CAP16アレルギー性喘息
  6: ['housedust1', 'yakehyouhidani', 'sugi', 'hinoki', 'hannokiZoku', 'kamogaya', 'butakusa', 'yomogi', 'alternaria', 'candida', 'aspergillosis', 'nekoHisetsu', 'inuHisetsu', 'gokiburi', 'yusurika', 'ga']
  # MAST33
  7: ['kamogaya', 'ooawagaeri', 'butakusakongoubu1', 'yomogi', 'hannokiZoku', 'shirakanbaZoku', 'sugi', 'hinoki', 'housedust1', 'konahyouhidani', 'candida', 'alternaria', 'nekoHisetsu', 'inuHisetsu', 'latex', 'ranpaku', 'ovomucoid', 'milk', 'maguro', 'sake', 'kani', 'ebi', 'komugi', 'kome', 'soba', 'butaniku', 'gyuniku', 'toriniku', 'peanuts', 'daizu', 'kiwi', 'banana', 'goma']
  # MAST36
  8: ['kamogaya', 'ooawagaeri', 'butakusakongoubu1', 'yomogi', 'hannokiZoku', 'shirakanbaZoku', 'sugi', 'hinoki', 'housedust1', 'konahyouhidani', 'aspergillosis', 'candida', 'alternaria', 'nekoHisetsu', 'inuHisetsu', 'latex', 'ranpaku', 'ovomucoid', 'milk', 'maguro', 'sake', 'kani', 'ebi', 'komugi', 'kome', 'soba', 'butaniku', 'gyuniku', 'toriniku', 'peanuts', 'daizu', 'kiwi', 'banana', 'momo', 'tomato', 'goma']
  # View 36
  9: ['kamogaya', 'butakusa', 'yomogi', 'hannokiZoku', 'shirakanbaZoku', 'sugi', 'hinoki', 'housedust1', 'yakehyouhidani', 'aspergillosis', 'candida', 'alternaria', 'malassezia', 'nekoHisetsu', 'inuHisetsu', 'latex', 'ranpaku', 'ovomucoid', 'milk', 'maguro', 'sake', 'saba', 'kani', 'ebi', 'komugi', 'kome', 'soba', 'gyuniku', 'toriniku', 'peanuts', 'daizu', 'ringo', 'kiwi', 'goma', 'gokiburi', 'ga']
  # View 39
  10: ['housedust1', 'yakehyouhidani', 'sugi', 'hinoki', 'hannokiZoku', 'shirakanbaZoku', 'kamogaya', 'ooawagaeri', 'butakusa', 'yomogi', 'alternaria', 'aspergillosis', 'candida', 'malassezia', 'nekoHisetsu', 'inuHisetsu', 'gokiburi', 'ga', 'milk', 'ranpaku', 'ovomucoid', 'kome', 'komugi', 'soba', 'daizu', 'peanuts', 'ringo', 'banana', 'kiwi', 'goma', 'gyuniku', 'butaniku', 'toriniku', 'ebi', 'kani', 'saba', 'sake', 'maguro', 'latex']

show = (allergens) ->
  for name in allergens
	   $(".#{name}").show()

presentAllergen = (selector, currentTarget, element) ->
  $(selector).hide()
  if element is 'select'
    test_category = $(currentTarget).val()
  else
    test_category = $(currentTarget).html()
  if test_category
    show(allergens[test_category])
  else $(selector).hide()

$ ->
  do ->
    # showページ
    $('#allergen_detail').on
      'load': presentAllergen('.allergen', '#test_category', 'div')
    # editページ
    # 検査項目のイベント
    $('#ige_test_category').on
      'load': presentAllergen('.card', '#ige_test_category', 'select')
      'change': (e) -> presentAllergen('.card', '#ige_test_category', 'select')