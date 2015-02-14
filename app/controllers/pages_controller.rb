class PagesController < ApplicationController
  def home
  end

  def search
    query = params['q']

    if query
      results = StackexchangeApi::Tags.top_users(query)
      @developers = process_results(results, query)
    end
  end

  private

    def process_results(results, query)
      results.map.with_index do |result, i|
        developer = Developer.where(stack_overflow_display_name: result['display_name']).first_or_create
        FindTwitterHandleJob.set(wait: (i / 5.0).seconds).perform_later({
          developer: developer,
          query: query
        })
        result['twitter_handle'] = developer.twitter_handle
        result
      end
    end
end
