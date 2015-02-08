class PagesController < ApplicationController
  def home
  end

  def search
    users = StackexchangeApi::Tags.top_users(params['query'])
    users['items'].map {|result| result['user']['display_name']}.each do |name| 
      FindTwitterHandleJob.perform_later(name)
    end
    render json: users
  end
end
