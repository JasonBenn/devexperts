class PagesController < ApplicationController
  def home
  end

  def search
    users = StackexchangeApi::Tags.top_users(params['query'])
    # users.items.map {|user| user.name}.each(&:find_twitter_handle)
    render json: users
  end

  def find_twitter_handle(name)
    # background job:
      # search_twitter(name)
        # IF result:
          # Pusher.trigger('twitter_handles', 'result', { name: name, twitter: 'samsamskies' })
        # ELSE
          # Pusher.trigger('twitter_handles', 'result', { name: name, twitter: '' })
  end
end
