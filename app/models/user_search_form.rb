class UserSearchForm
  include ActiveModel::Model

  attr_accessor :from_ige, :to_ige

  def matches(from_ige, to_ige)
    result = User.eager_load(:iges).where(:iges => {:ige_value => (from_ige)..(to_ige), :latest_test_result => true})
  end
end