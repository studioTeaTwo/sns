Rails.application.routes.draw do
  namespace :api do
    resources :samples
  end
  
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#index'

  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'

  post '/signup',  to: 'users#create'
  delete '/logout',  to: 'sessions#destroy'

  namespace :api, defaults: { format: :json } do

    resource :login, only: [:create], controller: :sessions

    scope module: :users do
      resources :users do
        collection do
          get 'search_by_ige'
          post 'search_result_by_ige'
          get 'search_by_allergen'
          get 'search_result_by_allergen'
          get 'search_by_name'
          post 'search_result_by_name'
        end
        member do
          resources :relationships, only: [:create, :destroy]
          resources :followings, only: [:index]
          resources :followers, only: [:index]
        end
      end
      resources :profiles, only: [:show]
    end
    
    resources :iges
    resources :microposts, only: [:create, :destroy]
  end

  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:create, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]
  resources :iges

end
