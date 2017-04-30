Rails.application.routes.draw do
  root 'static_pages#home'
  get  '/help',    to: 'static_pages#help'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]
  resources :iges do
    member do
      #引用登録
      get 'quote'
    end
  end
  get '/search_by_ige', to: 'users#search_by_ige'
  post '/search_result_by_ige', to: 'users#search_result_by_ige'
  get '/search_by_allergen', to: 'users#search_by_allergen'
  get '/search_result_by_allergen', to: 'users#search_result_by_allergen'
end
