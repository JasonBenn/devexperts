class Developer < ActiveRecord::Base
  validates :stack_overflow_display_name, :uniqueness => true, :presence => true
end