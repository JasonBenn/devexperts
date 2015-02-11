class FindTwitterHandleJob < ActiveJob::Base
  queue_as :default

  def perform(options)
    developer = options[:developer]
    query = options[:query]
    name = developer.stack_overflow_display_name

    return if developer.twitter_handle

    begin
      page = Google::Search::Web.new { |search| search.query = "site:twitter.com #{name} #{query}" }.first
      twitter_handle = page ? parse(page.uri) : nil
      developer.update(twitter_handle: twitter_handle)
    rescue StandardError => e
      Rails.logger.error("ERROR RUNNING JOB: #{e}")
    ensure
      Pusher.trigger('twitter_handles', 'result', { name: name, twitter_handle: twitter_handle })
    end
  end

  TWITTER_HANDLE_REGEX = /twitter.com\/([\w\d]+)/
  def parse(page_uri)
    page_uri.match(TWITTER_HANDLE_REGEX)[1]
  end
end
