class PagesController < ApplicationController
  def home
  end

  def search
    users = StackexchangeApi::Tags.top_users(params['query'])
    Rails.logger.debug "About to map over names"
    names = users['items'].map { |result| result['user']['display_name'] }
    Rails.logger.debug "About to fire jobs"
    names.each do |name| 
      FindTwitterHandleJob.perform_later(name)
    end
    Rails.logger.debug "About to render"
    render json: users
  end
end
