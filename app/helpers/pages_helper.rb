module PagesHelper
  def display_twitter_handle twitter_handle
    if twitter_handle
      raw('<a href="https://twitter.com/' + twitter_handle + '">@' + twitter_handle + '</a>')
    else
      raw('Searching... <i class="fa fa-spinner fa-spin"></i>')
    end
  end
end
