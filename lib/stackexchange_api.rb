module StackexchangeApi
  class Tags
    class << self

      BASE_URL = 'https://api.stackexchange.com/2.2'

      def top_users(tag, period='month')
        HTTParty.get("#{BASE_URL}/tags/#{tag}/top-answerers/#{period}?site=stackoverflow").parsed_response
      end
    end
  end
end