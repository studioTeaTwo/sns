namespace :personal_assistant do
  desc "daily_logの通知を有効にするタスク"
  task daily_log: :environment do
    User.all.each do |user|
      params = {}
      params[:user_id] = user.id
      params[:daily_atopic] = true if user.atopic
      params[:daily_asthma] = true if user.asthma
      params[:daily_rhinitis] = true if user.rhinitis
      params[:daily_pollen] = true if user.pollen
      params[:daily_gastroenteritis] = true if user.gastroenteritis
      params[:daily_conjunctivitis] = true if user.conjunctivitis
      user.personal_assistant.update_attributes(params)
    end
  end
end
