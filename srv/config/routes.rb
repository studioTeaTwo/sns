Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index'

  if defined? Swaggard
    mount Swaggard::Engine, at: '/api_docs/swagger/'
  end
  
  devise_for :users

  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'

  namespace :api, defaults: { format: :json } do

    resource :login, only: [:create], controller: :sessions
    resource :logout, only: [:destroy], controller: :sessions

    scope module: :users do
      resources :users do
        collection do
          post '/emailverification', to: 'users#verify_email'
        end
        member do
          resources :profiles, only: [:index]
          resources :relationships, only: [:create, :destroy]
          resources :followings, only: [:index]
          resources :followers, only: [:index]
        end
      end
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
    resources :experiences, only: [:index]
    resources :daily_logs
    resources :iges

    get '/master_data/allergen_groups',  to: 'master_data#allergen_groups'
  end

  # TODO: API化の残タスク
  post '/signup',  to: 'users#create'
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:create, :update]

  get '*path', to: 'static_pages#spa_forward'

end
