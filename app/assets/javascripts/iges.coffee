# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

allergens =
  # アトピー鑑別試験 (12種吸入性アレルゲン)
  10: ['yakehyoudani', 'konahyouhidani', 'neko', 'inu', 'gyougisiba', 'kamogaya', 'butakusa', 'yomogi', 'shirakanba', 'sugi', 'candida', 'alternaria']

show = (allergens) ->
	for name in allergens
		$(".#{name}").show()

$ ->
  do ->
	  presentAllergenForEdit = ->
	  	console.log("bbbb")
	  	console.log($('#ige_test_category').val())
	  	$('.card').hide()
		  test_category = $('#ige_test_category').val()
		  switch test_category
			  when '10' then show(allergens[10])
			  else　$('.card').show()

	  $('#ige_test_category').on
	    'load': presentAllergenForEdit
	    'change': presentAllergenForEdit
  
  do ->
    presentAllergenForShow = ->
	  	$('.allergen').hide()
		  test_category = $('#test_category').html()
		  console.log("aaa")
		  switch test_category
			  when '10' then show(allergens[10])
			  else　$('.allergen').show()
    
    $('#allergen_sort').on
	    'load': presentAllergenForShow