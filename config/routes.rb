Rails.application.routes.draw do
  root 'welcome#index'

  get 'edit_user/:id', to: 'welcome#edit'
  end
