# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170402113409) do

  create_table "iges", force: :cascade do |t|
    t.integer  "user_id"
    t.date     "test_date"
    t.integer  "test_category"
    t.decimal  "ige_value",                     precision: 24, scale: 20
    t.integer  "ige_unit"
    t.decimal  "allergen_housedust1_value"
    t.integer  "allergen_housedust1_unit"
    t.integer  "allergen_housedust1_class"
    t.decimal  "allergen_housedust2_value"
    t.integer  "allergen_housedust2_unit"
    t.integer  "allergen_housedust2_class"
    t.decimal  "allergen_yakehyouhidani_value"
    t.integer  "allergen_yakehyouhidani_unit"
    t.integer  "allergen_yakehyouhidani_class"
    t.decimal  "allergen_konahyouhidani_value"
    t.integer  "allergen_konahyouhidani_unit"
    t.integer  "allergen_konahyouhidani_class"
    t.decimal  "allergen_sugi_value"
    t.integer  "allergen_sugi_unit"
    t.integer  "allergen_sugi_class"
    t.decimal  "allergen_hinoki_value"
    t.integer  "allergen_hinoki_unit"
    t.integer  "allergen_hinoki_class"
    t.decimal  "allergen_hannoki_value"
    t.integer  "allergen_hannoki_unit"
    t.integer  "allergen_hannoki_class"
    t.decimal  "allergen_shirakanba_value"
    t.integer  "allergen_shirakanba_unit"
    t.integer  "allergen_shirakanba_class"
    t.decimal  "allergen_gyougisiba_value"
    t.integer  "allergen_gyougisiba_unit"
    t.integer  "allergen_gyougisiba_class"
    t.decimal  "allergen_harugaya_value"
    t.integer  "allergen_harugaya_unit"
    t.integer  "allergen_harugaya_class"
    t.decimal  "allergen_kamogaya_value"
    t.integer  "allergen_kamogaya_unit"
    t.integer  "allergen_kamogaya_class"
    t.decimal  "allergen_ooawagaeri_value"
    t.integer  "allergen_ooawagaeri_unit"
    t.integer  "allergen_ooawagaeri_class"
    t.decimal  "allergen_butakusa_value"
    t.integer  "allergen_butakusa_unit"
    t.integer  "allergen_butakusa_class"
    t.decimal  "allergen_yomogi_value"
    t.integer  "allergen_yomogi_unit"
    t.integer  "allergen_yomogi_class"
    t.decimal  "allergen_alternaria_value"
    t.integer  "allergen_alternaria_unit"
    t.integer  "allergen_alternaria_class"
    t.decimal  "allergen_aspergillosis_value"
    t.integer  "allergen_aspergillosis_unit"
    t.integer  "allergen_aspergillosis_class"
    t.decimal  "allergen_candida_value"
    t.integer  "allergen_candida_unit"
    t.integer  "allergen_candida_class"
    t.decimal  "allergen_malassezia_value"
    t.integer  "allergen_malassezia_unit"
    t.integer  "allergen_malassezia_class"
    t.decimal  "allergen_neko_value"
    t.integer  "allergen_neko_unit"
    t.integer  "allergen_neko_class"
    t.decimal  "allergen_inu_value"
    t.integer  "allergen_inu_unit"
    t.integer  "allergen_inu_class"
    t.decimal  "allergen_kato_value"
    t.integer  "allergen_kato_unit"
    t.integer  "allergen_kato_class"
    t.decimal  "allergen_gokiburi_value"
    t.integer  "allergen_gokiburi_unit"
    t.integer  "allergen_gokiburi_class"
    t.decimal  "allergen_ga_value"
    t.integer  "allergen_ga_unit"
    t.integer  "allergen_ga_class"
    t.decimal  "allergen_gyunyu_value"
    t.integer  "allergen_gyunyu_unit"
    t.integer  "allergen_gyunyu_class"
    t.decimal  "allergen_ranpaku_value"
    t.integer  "allergen_ranpaku_unit"
    t.integer  "allergen_ranpaku_class"
    t.decimal  "allergen_ovomucoid_value"
    t.integer  "allergen_ovomucoid_unit"
    t.integer  "allergen_ovomucoid_class"
    t.decimal  "allergen_kome_value"
    t.integer  "allergen_kome_unit"
    t.integer  "allergen_kome_class"
    t.decimal  "allergen_komugi_value"
    t.integer  "allergen_komugi_unit"
    t.integer  "allergen_komugi_class"
    t.decimal  "allergen_soba_value"
    t.integer  "allergen_soba_unit"
    t.integer  "allergen_soba_class"
    t.decimal  "allergen_daizu_value"
    t.integer  "allergen_daizu_unit"
    t.integer  "allergen_daizu_class"
    t.decimal  "allergen_peanuts_value"
    t.integer  "allergen_peanuts_unit"
    t.integer  "allergen_peanuts_class"
    t.decimal  "allergen_ringo_value"
    t.integer  "allergen_ringo_unit"
    t.integer  "allergen_ringo_class"
    t.decimal  "allergen_banana_value"
    t.integer  "allergen_banana_unit"
    t.integer  "allergen_banana_class"
    t.decimal  "allergen_kiwi_value"
    t.integer  "allergen_kiwi_unit"
    t.integer  "allergen_kiwi_class"
    t.decimal  "allergen_goma_value"
    t.integer  "allergen_goma_unit"
    t.integer  "allergen_goma_class"
    t.decimal  "allergen_gyuniku_value"
    t.integer  "allergen_gyuniku_unit"
    t.integer  "allergen_gyuniku_class"
    t.decimal  "allergen_butaniku_value"
    t.integer  "allergen_butaniku_unit"
    t.integer  "allergen_butaniku_class"
    t.decimal  "allergen_toriniku_value"
    t.integer  "allergen_toriniku_unit"
    t.integer  "allergen_toriniku_class"
    t.decimal  "allergen_ebi_value"
    t.integer  "allergen_ebi_unit"
    t.integer  "allergen_ebi_class"
    t.decimal  "allergen_kani_value"
    t.integer  "allergen_kani_unit"
    t.integer  "allergen_kani_class"
    t.decimal  "allergen_saba_value"
    t.integer  "allergen_saba_unit"
    t.integer  "allergen_saba_class"
    t.decimal  "allergen_sake_value"
    t.integer  "allergen_sake_unit"
    t.integer  "allergen_sake_class"
    t.decimal  "allergen_maguro_value"
    t.integer  "allergen_maguro_unit"
    t.integer  "allergen_maguro_class"
    t.decimal  "allergen_latex_value"
    t.integer  "allergen_latex_unit"
    t.integer  "allergen_latex_class"
    t.datetime "created_at",                                              null: false
    t.datetime "updated_at",                                              null: false
    t.index ["user_id"], name: "index_iges_on_user_id"
  end

  create_table "microposts", force: :cascade do |t|
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "picture"
    t.index ["user_id", "created_at"], name: "index_microposts_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_microposts_on_user_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id"
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
    t.index ["follower_id"], name: "index_relationships_on_follower_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "password_digest"
    t.boolean  "admin",             default: false
    t.text     "self_introduction"
    t.integer  "rank"
    t.string   "title_of_honor"
    t.integer  "latest_ige_id"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
