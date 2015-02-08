class FindTwitterHandleJob < ActiveJob::Base
  queue_as :default

  def perform(options)
    name = options[:name]
    query = options[:query]
    page = Google::Search::Web.new { |search| search.query = "site:twitter.com #{name} #{query}" }.first

    handle = page ? parse(page.uri) : nil
    Pusher.trigger('twitter_handles', 'result', { name: name, twitter: handle })
  end

  TWITTER_HANDLE_REGEX = /twitter.com\/([\w\d]+)/
  def parse(page_uri)
    page_uri.match(TWITTER_HANDLE_REGEX)[1]
  end
end
