# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

allergens =
  # アトピー鑑別試験 (12種吸入性アレルゲン)
  10: ['yakehyoudani', 'konahyouhidani', 'neko', 'inu', 'gyougisiba', 'kamogaya', 'butakusa', 'yomogi', 'shirakanba', 'sugi', 'candida', 'alternaria']

show = (allergens) ->
  console.log('show')
  for name in allergens
	   $(".#{name}").show()

presentAllergen = (selector, currentTarget, element) ->
  console.log(selector)
  console.log($(currentTarget).val())
  $(selector).hide()
  if element is 'select'
    test_category = $(currentTarget).val()
  else
    test_category = $(currentTarget).html()
  switch test_category
    when '10' then show(allergens[10])
    else $(selector).show()

$ ->
  do ->
    $('#allergen_sort').on
      'load': presentAllergen('.allergen', '#test_category', 'div')
    $('#ige_test_category').on
      'load': presentAllergen('.card', '#ige_test_category', 'select')
      'change': (e) -> presentAllergen('.card', '#ige_test_category', 'select')