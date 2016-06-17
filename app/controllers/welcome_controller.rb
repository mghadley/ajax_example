class WelcomeController < ApplicationController
  def index
  end

  def edit
  	@user_id = params[:id]
  end
end
