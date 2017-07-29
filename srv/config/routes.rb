Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'static_pages#index'

  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'

  #get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  #get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  #get    '/home',   to: 'users#home_logined'

  resources :users do
    collection do
      get 'search_by_ige'
      post 'search_result_by_ige'
      get 'search_by_allergen'
      get 'search_result_by_allergen'
      get 'search_by_name'
      post 'search_result_by_name'
    end
  end
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:create, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]
  resources :iges

end
