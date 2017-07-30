require "rails_helper"

RSpec.describe Api::SamplesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/api/samples").to route_to("api/samples#index")
    end


    it "routes to #show" do
      expect(:get => "/api/samples/1").to route_to("api/samples#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/api/samples").to route_to("api/samples#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/api/samples/1").to route_to("api/samples#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/api/samples/1").to route_to("api/samples#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/samples/1").to route_to("api/samples#destroy", :id => "1")
    end

  end
end
