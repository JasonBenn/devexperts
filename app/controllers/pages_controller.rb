class PagesController < ApplicationController
  def home
  end

  def search
    query = params['query']
    users = StackexchangeApi::Tags.top_users(query)
    names = users.map { |user| user['display_name'] }
    names.each.with_index do |name, i|
      FindTwitterHandleJob.set(wait: (i / 5.0).seconds).perform_later({name: name, query: query })
    end
    render json: users
  end
end
