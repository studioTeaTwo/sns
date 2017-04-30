class User < ApplicationRecord
  has_many :microposts, dependent: :destroy
  has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy
  has_many :passive_relationships, class_name:  "Relationship",
                                   foreign_key: "followed_id",
                                   dependent:   :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :iges, dependent: :destroy
  
  before_save { self.email = email.downcase }
  #before_save {email.downcase!}
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
      format: { with: VALID_EMAIL_REGEX },
      uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
  validates :self_introduction, length: { maximum: 140 }
  
  # 渡された文字列のハッシュ値を返す
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
  
  # ユーザーのステータスフィードを返す
  def feed
    following_ids = "SELECT followed_id FROM relationships
                     WHERE follower_id = :user_id"
    Micropost.where("user_id IN (#{following_ids})
                     OR user_id = :user_id", user_id: id)
  end
  
  # ユーザーをフォローする
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  # ユーザーをフォロー解除する
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # 現在のユーザーがフォローしてたらtrueを返す
  def following?(other_user)
    following.include?(other_user)
  end
  
  # 現在のユーザーがフォローされてたらtrueを返す
  def followed_by?(other_user)
    followers.include?(other_user)
  end

  # ユーザー検索

  def self.search_by_newest
    @users = User.eager_load(:iges).where(:iges => {:latest_test_result => true}).order('test_date DESC').limit(10)
  end

  def self.search_by_ige(from_ige, to_ige)
    @users = User.eager_load(:iges).where(:iges => {:ige_value => (from_ige)..(to_ige), :latest_test_result => true})
  end

  def self.search_by_allergen(allegen_sort_name)
    @users = User.eager_load(:iges).where(:iges => {allegen_sort_name => true, :latest_test_result => true})
  end

  def self.search_by_name(user_name)
    @user = User.find(:name => name)
  end
end
