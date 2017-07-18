require 'test_helper'

class IgesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)
    log_in_as(@user)
    @ige = iges(:one)
  end

  test "should get index" do
    get iges_url
    assert_response :success
  end

  test "should get new" do
    get new_ige_url
    assert_response :success
  end

  test "should get show" do
    get ige_url(@ige)
    assert_response :success
  end

  test "should get edit" do
    get edit_ige_url(@ige)
    assert_response :success
  end

  test "should get quote" do
    get quote_ige_url(@ige)
    assert_response :success
  end

  test "should destroy" do
    assert_difference('Ige.count', -1) do
      delete ige_url(@ige)
    end
  end

end
