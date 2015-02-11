class CreateDevelopers < ActiveRecord::Migration
  def change
    create_table :developers do |t|
      t.string :stack_overflow_display_name
      t.string :twitter_handle

      t.timestamps
    end
  end
end
