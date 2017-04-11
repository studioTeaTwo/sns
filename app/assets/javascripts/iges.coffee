# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

allergens =
	 # 全種類
  all: [
  	'housedust1',     
			'housedust2',     
			'yakehyouhidani', 
			'konahyouhidani', 
			'sugi',           
			'hinoki',         
			'hannoki',        
			'shirakanba',     
			'gyougisiba',     
			'harugaya',       
			'kamogaya',       
			'ooawagaeri',     
			'butakusa',       
			'yomogi',         
			'alternaria',     
			'aspergillosis',  
			'candida',        
			'malassezia',     
			'neko',           
			'inu',            
			'kato',           
			'gokiburi',       
			'ga',             
			'gyunyu',         
			'ranpaku',        
			'ovomucoid',      
			'kome',           
			'komugi',         
			'soba',           
			'daizu',          
			'peanuts',        
			'ringo',          
			'banana',         
			'kiwi',           
			'goma',           
			'gyuniku',        
			'butaniku',       
			'toriniku',       
			'ebi',            
			'kani',           
			'saba',           
			'sake',           
			'maguro',         
			'latex'
			]
  # アトピー鑑別試験 (12種吸入性アレルゲン)
  10: ['yakehyoudani', 'konahyouhidani', 'neko', 'inu', 'gyougisiba', 'kamogaya', 'butakusa', 'yomogi', 'shirakanba', 'sugi', 'candida', 'alternaria']

show = (allergens) ->
  for name in allergens
	   $(".#{name}").show()

presentAllergen = (selector, currentTarget, element) ->
  $(selector).hide()
  if element is 'select'
    test_category = $(currentTarget).val()
  else
    test_category = $(currentTarget).html()
  switch test_category
    when '10' then show(allergens[10])
    else $(selector).show()

syncValue = ->
  selectedValue = $('#ige_ige_unit').val()
  for name in allergens.all
    $("select[id=ige_allergen_#{name}_unit]").val(selectedValue)

$ ->
  do ->
    $('#allergen_sort').on
      'load': presentAllergen('.allergen', '#test_category', 'div')
    $('#ige_test_category').on
      'load': presentAllergen('.card', '#ige_test_category', 'select')
      'change': (e) -> presentAllergen('.card', '#ige_test_category', 'select')
    $('#ige_ige_unit').on
      'load': syncValue()
      'change': (e) -> syncValue()