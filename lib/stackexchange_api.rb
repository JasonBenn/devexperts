module StackexchangeApi
  class Tags
    class << self

      BASE_URL = 'https://api.stackexchange.com/2.2'

      def top_users(tag, period='month')
        tag = URI.encode(tag)
        parse(HTTParty.get("#{BASE_URL}/tags/#{tag}/top-answerers/#{period}?site=stackoverflow").parsed_response)
      end

      def parse(result)
        result['items'].map do |user|
          clean_user = user.merge(user['user'])
          clean_user.delete('user')
          clean_user
        end
      end
    end
  end
end
