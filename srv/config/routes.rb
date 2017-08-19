Rails.application.routes.draw do

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#index'

  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'

  namespace :api, defaults: { format: :json } do

    resource :login, only: [:create], controller: :sessions

    scope module: :users do
      resources :users do
        member do
          resources :relationships, only: [:create, :destroy]
          resources :followings, only: [:index]
          resources :followers, only: [:index]
        end
      end
      resources :profiles, only: [:show]
    end

    namespace :search do
      resources :usernames, only: [:index]
      resources :allergens, only: [:index]
      resources :ige_ranks, only: [:index]
    end
    
    resources :chats, only: [:index, :create, :show, :destroy] do
      member do
        post '/say', to: 'chats#say'
      end
    end
    resources :microposts, only: [:create, :destroy]
    resources :iges
  end

  # TODO: API化の残タスク
  post '/signup',  to: 'users#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:create, :update]

end
