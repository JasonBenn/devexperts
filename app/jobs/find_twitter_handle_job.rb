class FindTwitterHandleJob < ActiveJob::Base
  queue_as :default

  def perform(name)
    Pusher.trigger('twitter_handles', 'result', { name: name, twitter: 'samsamskies' })
    # background job:
      # search_twitter(name)
        # IF result:
          # Pusher.trigger('twitter_handles', 'result', { name: name, twitter: 'samsamskies' })
        # ELSE
          # Pusher.trigger('twitter_handles', 'result', { name: name, twitter: '' })
  end
end
