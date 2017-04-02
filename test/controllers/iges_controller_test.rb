require 'test_helper'

class IgesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get iges_new_url
    assert_response :success
  end

  test "should get show" do
    get iges_show_url
    assert_response :success
  end

  test "should get edit" do
    get iges_edit_url
    assert_response :success
  end

  test "should get destroy" do
    get iges_destroy_url
    assert_response :success
  end

  test "should get index" do
    get iges_index_url
    assert_response :success
  end

end
