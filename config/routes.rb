Rails.application.routes.draw do
  get 'pages/root'
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register', edit: 'settings' }
  get '/users', to: 'users#index'
  root to: "pages#root"
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :tweets do
        resources :replies
      end
    end
  end
end
