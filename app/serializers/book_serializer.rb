class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :ISBN , :course_code, :created_at, :user_id
end
