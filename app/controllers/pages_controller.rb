class PagesController < ApplicationController
  def home
  end

  def search
    render json: StackexchangeApi::Tags.top_users(params['query'])
  end
end
