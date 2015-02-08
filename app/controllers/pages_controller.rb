class PagesController < ApplicationController
  def home
  end

  def search
    users = StackexchangeApi::Tags.top_users(params['query'])
    names = users.map { |user| user['display_name'] }
    names.each do |name|
      FindTwitterHandleJob.perform_later(name)
    end
    render json: users
  end
end
