Rails.application.routes.draw do

  root 'static_pages#home'

  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'

  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get 'password_resets/new'
  get 'password_resets/edit'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get    '/home',   to: 'users#home_logined'

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
      get :following, :followers
    end
  end
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy, :new]
  resources :relationships,       only: [:create, :destroy]
  resources :iges do
    member do
      #引用登録
      get 'quote'
    end
  end
end
