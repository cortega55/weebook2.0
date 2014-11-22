class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :ISBN
      t.string :course_code

      t.timestamps
    end
  end
end
