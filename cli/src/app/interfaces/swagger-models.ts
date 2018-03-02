export interface Chat {
  id?: number; // int32
  chatThreadId?: number; // int32
  senderId?: number; // int32
  contentType?: number; // int32
  body?: string;
  itemList?: {}[];
  result?: string;
  expired?: boolean;
  createdAt?: string; // date-time
}
export interface ChatRequestBody {
  chat?: ChatStrongParameter;
}
export interface ChatStatus {
  id?: number; // int32
  chatThreadId?: number; // int32
  userId?: number; // int32
  readUntil?: number; // int32
  hasUnread?: boolean;
  createdAt?: string; // date-time
  updatedAt?: string; // date-time
}
export interface ChatStrongParameter {
  id?: number; // int32
  chatThreadId?: number; // int32
  senderId?: number; // int32
  contentType?: number; // int32
  body?: string;
  itemList?: {}[];
  result?: string;
  expired?: boolean;
}
export interface ChatThread {
  id?: number; // int32
  createdAt?: string; // date-time
  updatedAt?: string; // date-time
  participants?: User[];
  statuses?: ChatStatus[];
  newestChat?: Chat;
}
export interface ChatThreadRequestBody {
  chatThread?: ChatThreadStrongParameter;
}
export interface ChatThreadStrongParameter {
  id?: number; // int32
  participants?: number /* int32 */[];
  newestChatId?: number; // int32
}
export interface DailyLog {
  id?: number; // int32
  userId?: number; // int32
  date?: string; // date
  symptom?: string;
  health?: number; // int32
  healthMemo?: string;
  medicina?: boolean;
  medicinaMemo?: string;
  photograph?: string[];
  photographMemo?: string;
  updatedAt?: string; // date-time
}
export interface DailyLogRequestBody {
  daily_log?: DailyLogStrongParameter;
}
export interface DailyLogStrongParameter {
  id?: number; // int32
  userId?: number; // int32
  date?: string; // date
  symptom?: string;
  health?: number; // int32
  healthMemo?: string;
  medicina?: boolean;
  medicinaMemo?: string;
  photograph?: string[];
  photographMemo?: string;
}
export interface EmailVerifyRequestBody {
  email?: string;
}
export interface Experience {
  mine?: Notification[];
  friend?: Notification[];
}
export interface FriendExperienceStrongParameter {
  id?: number; // int32
  userId?: number; // int32
  activityId?: number; // int32
  activityType?: string;
  fromUserId?: number; // int32
  createdAt?: string; // date-time
  updatedAt?: string; // date-time
  name?: string;
}
export interface Ige {
  id?: number; // int32
  testDate?: string; // date
  latestTestResult?: boolean;
  testCategory?: number; // int32
  igeValue?: number; // double
  igeUnit?: number; // int32
  allergenGroupInekakafun?: boolean;
  allergenGroupZassoukafun?: boolean;
  allergenGroupJyukikafun?: boolean;
  allergenGroupChiri?: boolean;
  allergenGroupDani?: boolean;
  allergenGroupShinkin?: boolean;
  allergenGroupSaikin?: boolean;
  allergenGroupDoubutsu?: boolean;
  allergenGroupSyokugyou?: boolean;
  allergenGroupTamago?: boolean;
  allergenGroupNyuuseihin?: boolean;
  allergenGroupGyorui?: boolean;
  allergenGroupKoukakurui?: boolean;
  allergenGroupIkatako?: boolean;
  allergenGroupKomugi?: boolean;
  allergenGroupKomugiigai?: boolean;
  allergenGroupNikurui?: boolean;
  allergenGroupMamerui?: boolean;
  allergenGroupKudamonorui?: boolean;
  allergenGroupYasai?: boolean;
  allergenGroupSonota?: boolean;
  allergenGroupKiseityuu?: boolean;
  allergenGroupYakubutsu?: boolean;
  allergenGroupKontyuu?: boolean;
  allergenGroupMaruti?: boolean;
  allergenHarugayaClass?: number; // int32
  allergenGyougishibaClass?: number; // int32
  allergenKamogayaClass?: number; // int32
  allergenHirohaushinokegusaClass?: number; // int32
  allergenHosomugiClass?: number; // int32
  allergenOoawagaeriClass?: number; // int32
  allergenAshiClass?: number; // int32
  allergenNagahagusaClass?: number; // int32
  allergenKonukagusazokuClass?: number; // int32
  allergenSeibanmorokoshiClass?: number; // int32
  allergenKomugizokuClass?: number; // int32
  allergenOosuzumenoteppouClass?: number; // int32
  allergenSuzumenohiezokuClass?: number; // int32
  allergenButakusakongoubu1Class?: number; // int32
  allergenButakusaClass?: number; // int32
  allergenButakusamodokiClass?: number; // int32
  allergenOobutakusaClass?: number; // int32
  allergenNigayomogiClass?: number; // int32
  allergenYomogiClass?: number; // int32
  allergenHuransugikuClass?: number; // int32
  allergenTanpopozokuClass?: number; // int32
  allergenHeraobakoClass?: number; // int32
  allergenShirozaClass?: number; // int32
  allergenAkinokirinsouClass?: number; // int32
  allergenHimesuibaClass?: number; // int32
  allergenIrakusazokuClass?: number; // int32
  allergenKanamuguraClass?: number; // int32
  allergenKaedezokuClass?: number; // int32
  allergenHannokizokuClass?: number; // int32
  allergenShirakanbazokuClass?: number; // int32
  allergenBunazokuClass?: number; // int32
  allergenByakushinzokuClass?: number; // int32
  allergenKonarazokuClass?: number; // int32
  allergenNirezokuClass?: number; // int32
  allergenOliveClass?: number; // int32
  allergenKurumizokuClass?: number; // int32
  allergenYanagizokuClass?: number; // int32
  allergenMatsuzokuClass?: number; // int32
  allergenSugiClass?: number; // int32
  allergenAcaciazokuClass?: number; // int32
  allergenHinokiClass?: number; // int32
  allergenKuwazokuClass?: number; // int32
  allergenHousedust1Class?: number; // int32
  allergenHousedust2Class?: number; // int32
  allergenYakehyouhidaniClass?: number; // int32
  allergenKonahyouhidaniClass?: number; // int32
  allergenAshibutokonadaniClass?: number; // int32
  allergenSayaashinidaniClass?: number; // int32
  allergenKenagakonadaniClass?: number; // int32
  allergenPenicilliumClass?: number; // int32
  allergenCladosporiumClass?: number; // int32
  allergenAspergillosisClass?: number; // int32
  allergenMucorClass?: number; // int32
  allergenCandidaClass?: number; // int32
  allergenAlternariaClass?: number; // int32
  allergenHelminthosporiumClass?: number; // int32
  allergenPityrosporiumClass?: number; // int32
  allergenTrichophytonClass?: number; // int32
  allergenMalasseziaClass?: number; // int32
  allergenKiirobudoukyukinaClass?: number; // int32
  allergenKiirobudoukyukinbClass?: number; // int32
  allergenNekohisetsuClass?: number; // int32
  allergenUmahisetsuClass?: number; // int32
  allergenUshihisetsuClass?: number; // int32
  allergenInuhisetsuClass?: number; // int32
  allergenMarmotjyouhiClass?: number; // int32
  allergenHatofunClass?: number; // int32
  allergenGatyouumouClass?: number; // int32
  allergenSekiseiinkofunClass?: number; // int32
  allergenSekiseiinkoumouClass?: number; // int32
  allergenYagijyouhiClass?: number; // int32
  allergenHitsujijyouhiClass?: number; // int32
  allergenKatojyouhiClass?: number; // int32
  allergenButajyouhiClass?: number; // int32
  allergenHamsterjyouhiClass?: number; // int32
  allergenNiwatoriumouClass?: number; // int32
  allergenAhiruumouClass?: number; // int32
  allergenRattClass?: number; // int32
  allergenMouseClass?: number; // int32
  allergenOobakosyushiClass?: number; // int32
  allergenKinuClass?: number; // int32
  allergenIsocyanatetdiClass?: number; // int32
  allergenIsocyanatemdiClass?: number; // int32
  allergenIsocyanatehdiClass?: number; // int32
  allergenEthyleneoxideClass?: number; // int32
  allergenMusuihutalsanClass?: number; // int32
  allergenFormalinClass?: number; // int32
  allergenLatexClass?: number; // int32
  allergenMenClass?: number; // int32
  allergenRanpakuClass?: number; // int32
  allergenRanouClass?: number; // int32
  allergenOvomucoidClass?: number; // int32
  allergenMilkClass?: number; // int32
  allergenAlphaActalbuminClass?: number; // int32
  allergenBetaLactoglobulinClass?: number; // int32
  allergenCaseinClass?: number; // int32
  allergenCheeseClass?: number; // int32
  allergenMoldcheeseClass?: number; // int32
  allergenTaraClass?: number; // int32
  allergenMaguroClass?: number; // int32
  allergenSakeClass?: number; // int32
  allergenSabaClass?: number; // int32
  allergenAjiClass?: number; // int32
  allergenIwashiClass?: number; // int32
  allergenKareiClass?: number; // int32
  allergenIkuraClass?: number; // int32
  allergenTarakoClass?: number; // int32
  allergenKaniClass?: number; // int32
  allergenEbiClass?: number; // int32
  allergenMurasakigaiClass?: number; // int32
  allergenLobsterClass?: number; // int32
  allergenAsariClass?: number; // int32
  allergenKakiClass?: number; // int32
  allergenHotateClass?: number; // int32
  allergenIkaClass?: number; // int32
  allergenTakoClass?: number; // int32
  allergenKomugiClass?: number; // int32
  allergenGlutenClass?: number; // int32
  allergenOh5gliadinClass?: number; // int32
  allergenRaimugiClass?: number; // int32
  allergenOomugiClass?: number; // int32
  allergenOotomugiClass?: number; // int32
  allergenToumorokoshiClass?: number; // int32
  allergenKomeClass?: number; // int32
  allergenSobaClass?: number; // int32
  allergenBeerkouboClass?: number; // int32
  allergenKibiClass?: number; // int32
  allergenAwaClass?: number; // int32
  allergenHieClass?: number; // int32
  allergenBakugaClass?: number; // int32
  allergenButanikuClass?: number; // int32
  allergenGyunikuClass?: number; // int32
  allergenTorinikuClass?: number; // int32
  allergenYounikuClass?: number; // int32
  allergenEndouClass?: number; // int32
  allergenPeanutsClass?: number; // int32
  allergenDaizuClass?: number; // int32
  allergenIngenClass?: number; // int32
  allergenHashibamiClass?: number; // int32
  allergenBrazilnutsClass?: number; // int32
  allergenAlmondClass?: number; // int32
  allergenCoconutClass?: number; // int32
  allergenCacaoClass?: number; // int32
  allergenCashewnutsClass?: number; // int32
  allergenKurumiClass?: number; // int32
  allergenArah2Class?: number; // int32
  allergenOrangeClass?: number; // int32
  allergenIchigoClass?: number; // int32
  allergenRingoClass?: number; // int32
  allergenKiwiClass?: number; // int32
  allergenMelonClass?: number; // int32
  allergenMangoClass?: number; // int32
  allergenBananaClass?: number; // int32
  allergenYounashiClass?: number; // int32
  allergenMomoClass?: number; // int32
  allergenAvocadoClass?: number; // int32
  allergenGrapefruitClass?: number; // int32
  allergenSuikaClass?: number; // int32
  allergenTomatoClass?: number; // int32
  allergenNinjinClass?: number; // int32
  allergenJyagaimoClass?: number; // int32
  allergenNinnikuClass?: number; // int32
  allergenTamanegiClass?: number; // int32
  allergenTakenokoClass?: number; // int32
  allergenSatsumaimoClass?: number; // int32
  allergenCeleryClass?: number; // int32
  allergenParsleyClass?: number; // int32
  allergenYamaimoClass?: number; // int32
  allergenHourensouClass?: number; // int32
  allergenKabochaClass?: number; // int32
  allergenHitoinsulinFoodClass?: number; // int32
  allergenGelatinClass?: number; // int32
  allergenGomaClass?: number; // int32
  allergenMustardClass?: number; // int32
  allergenKaichuClass?: number; // int32
  allergenAnisakisClass?: number; // int32
  allergenHitoinsulinEtcClass?: number; // int32
  allergenMitsubachiClass?: number; // int32
  allergenSuzumebachiClass?: number; // int32
  allergenAshinagabachiClass?: number; // int32
  allergenGokiburiClass?: number; // int32
  allergenYusurikaClass?: number; // int32
  allergenGaClass?: number; // int32
  allergenYabukaClass?: number; // int32
  allergenDoubutsujyouhiClass?: number; // int32
  allergenSyokumotsuClass?: number; // int32
  allergenKokumotsuClass?: number; // int32
  allergenInekaClass?: number; // int32
  allergenKabiClass?: number; // int32
  allergenZassouClass?: number; // int32
}
export interface IgeRequestBody {
  ige?: IgeStrongParameter;
}
export interface IgeStrongParameter {
  id?: number; // int32
  testDate?: string; // date
  latestTestResult?: boolean;
  testCategory?: number; // int32
  igeValue?: number; // float
  igeUnit?: number; // int32
  allergenGroupInekakafun?: boolean;
  allergenGroupZassoukafun?: boolean;
  allergenGroupJyukikafun?: boolean;
  allergenGroupChiri?: boolean;
  allergenGroupDani?: boolean;
  allergenGroupShinkin?: boolean;
  allergenGroupSaikin?: boolean;
  allergenGroupDoubutsu?: boolean;
  allergenGroupSyokugyou?: boolean;
  allergenGroupTamago?: boolean;
  allergenGroupNyuuseihin?: boolean;
  allergenGroupGyorui?: boolean;
  allergenGroupKoukakurui?: boolean;
  allergenGroupIkatako?: boolean;
  allergenGroupKomugi?: boolean;
  allergenGroupKomugiigai?: boolean;
  allergenGroupNikurui?: boolean;
  allergenGroupMamerui?: boolean;
  allergenGroupKudamonorui?: boolean;
  allergenGroupYasai?: boolean;
  allergenGroupSonota?: boolean;
  allergenGroupKiseityuu?: boolean;
  allergenGroupYakubutsu?: boolean;
  allergenGroupKontyuu?: boolean;
  allergenGroupMaruti?: boolean;
  allergenHarugayaClass?: number; // int32
  allergenGyougishibaClass?: number; // int32
  allergenKamogayaClass?: number; // int32
  allergenHirohaushinokegusaClass?: number; // int32
  allergenHosomugiClass?: number; // int32
  allergenOoawagaeriClass?: number; // int32
  allergenAshiClass?: number; // int32
  allergenNagahagusaClass?: number; // int32
  allergenKonukagusazokuClass?: number; // int32
  allergenSeibanmorokoshiClass?: number; // int32
  allergenKomugizokuClass?: number; // int32
  allergenOosuzumenoteppouClass?: number; // int32
  allergenSuzumenohiezokuClass?: number; // int32
  allergenButakusakongoubu1Class?: number; // int32
  allergenButakusaClass?: number; // int32
  allergenButakusamodokiClass?: number; // int32
  allergenOobutakusaClass?: number; // int32
  allergenNigayomogiClass?: number; // int32
  allergenYomogiClass?: number; // int32
  allergenHuransugikuClass?: number; // int32
  allergenTanpopozokuClass?: number; // int32
  allergenHeraobakoClass?: number; // int32
  allergenShirozaClass?: number; // int32
  allergenAkinokirinsouClass?: number; // int32
  allergenHimesuibaClass?: number; // int32
  allergenIrakusazokuClass?: number; // int32
  allergenKanamuguraClass?: number; // int32
  allergenKaedezokuClass?: number; // int32
  allergenHannokizokuClass?: number; // int32
  allergenShirakanbazokuClass?: number; // int32
  allergenBunazokuClass?: number; // int32
  allergenByakushinzokuClass?: number; // int32
  allergenKonarazokuClass?: number; // int32
  allergenNirezokuClass?: number; // int32
  allergenOliveClass?: number; // int32
  allergenKurumizokuClass?: number; // int32
  allergenYanagizokuClass?: number; // int32
  allergenMatsuzokuClass?: number; // int32
  allergenSugiClass?: number; // int32
  allergenAcaciazokuClass?: number; // int32
  allergenHinokiClass?: number; // int32
  allergenKuwazokuClass?: number; // int32
  allergenHousedust1Class?: number; // int32
  allergenHousedust2Class?: number; // int32
  allergenYakehyouhidaniClass?: number; // int32
  allergenKonahyouhidaniClass?: number; // int32
  allergenAshibutokonadaniClass?: number; // int32
  allergenSayaashinidaniClass?: number; // int32
  allergenKenagakonadaniClass?: number; // int32
  allergenPenicilliumClass?: number; // int32
  allergenCladosporiumClass?: number; // int32
  allergenAspergillosisClass?: number; // int32
  allergenMucorClass?: number; // int32
  allergenCandidaClass?: number; // int32
  allergenAlternariaClass?: number; // int32
  allergenHelminthosporiumClass?: number; // int32
  allergenPityrosporiumClass?: number; // int32
  allergenTrichophytonClass?: number; // int32
  allergenMalasseziaClass?: number; // int32
  allergenKiirobudoukyukinaClass?: number; // int32
  allergenKiirobudoukyukinbClass?: number; // int32
  allergenNekohisetsuClass?: number; // int32
  allergenUmahisetsuClass?: number; // int32
  allergenUshihisetsuClass?: number; // int32
  allergenInuhisetsuClass?: number; // int32
  allergenMarmotjyouhiClass?: number; // int32
  allergenHatofunClass?: number; // int32
  allergenGatyouumouClass?: number; // int32
  allergenSekiseiinkofunClass?: number; // int32
  allergenSekiseiinkoumouClass?: number; // int32
  allergenYagijyouhiClass?: number; // int32
  allergenHitsujijyouhiClass?: number; // int32
  allergenKatojyouhiClass?: number; // int32
  allergenButajyouhiClass?: number; // int32
  allergenHamsterjyouhiClass?: number; // int32
  allergenNiwatoriumouClass?: number; // int32
  allergenAhiruumouClass?: number; // int32
  allergenRattClass?: number; // int32
  allergenMouseClass?: number; // int32
  allergenOobakosyushiClass?: number; // int32
  allergenKinuClass?: number; // int32
  allergenIsocyanatetdiClass?: number; // int32
  allergenIsocyanatemdiClass?: number; // int32
  allergenIsocyanatehdiClass?: number; // int32
  allergenEthyleneoxideClass?: number; // int32
  allergenMusuihutalsanClass?: number; // int32
  allergenFormalinClass?: number; // int32
  allergenLatexClass?: number; // int32
  allergenMenClass?: number; // int32
  allergenRanpakuClass?: number; // int32
  allergenRanouClass?: number; // int32
  allergenOvomucoidClass?: number; // int32
  allergenMilkClass?: number; // int32
  allergenAlphaActalbuminClass?: number; // int32
  allergenBetaLactoglobulinClass?: number; // int32
  allergenCaseinClass?: number; // int32
  allergenCheeseClass?: number; // int32
  allergenMoldcheeseClass?: number; // int32
  allergenTaraClass?: number; // int32
  allergenMaguroClass?: number; // int32
  allergenSakeClass?: number; // int32
  allergenSabaClass?: number; // int32
  allergenAjiClass?: number; // int32
  allergenIwashiClass?: number; // int32
  allergenKareiClass?: number; // int32
  allergenIkuraClass?: number; // int32
  allergenTarakoClass?: number; // int32
  allergenKaniClass?: number; // int32
  allergenEbiClass?: number; // int32
  allergenMurasakigaiClass?: number; // int32
  allergenLobsterClass?: number; // int32
  allergenAsariClass?: number; // int32
  allergenKakiClass?: number; // int32
  allergenHotateClass?: number; // int32
  allergenIkaClass?: number; // int32
  allergenTakoClass?: number; // int32
  allergenKomugiClass?: number; // int32
  allergenGlutenClass?: number; // int32
  allergenOh5gliadinClass?: number; // int32
  allergenRaimugiClass?: number; // int32
  allergenOomugiClass?: number; // int32
  allergenOotomugiClass?: number; // int32
  allergenToumorokoshiClass?: number; // int32
  allergenKomeClass?: number; // int32
  allergenSobaClass?: number; // int32
  allergenBeerkouboClass?: number; // int32
  allergenKibiClass?: number; // int32
  allergenAwaClass?: number; // int32
  allergenHieClass?: number; // int32
  allergenBakugaClass?: number; // int32
  allergenButanikuClass?: number; // int32
  allergenGyunikuClass?: number; // int32
  allergenTorinikuClass?: number; // int32
  allergenYounikuClass?: number; // int32
  allergenEndouClass?: number; // int32
  allergenPeanutsClass?: number; // int32
  allergenDaizuClass?: number; // int32
  allergenIngenClass?: number; // int32
  allergenHashibamiClass?: number; // int32
  allergenBrazilnutsClass?: number; // int32
  allergenAlmondClass?: number; // int32
  allergenCoconutClass?: number; // int32
  allergenCacaoClass?: number; // int32
  allergenCashewnutsClass?: number; // int32
  allergenKurumiClass?: number; // int32
  allergenArah2Class?: number; // int32
  allergenOrangeClass?: number; // int32
  allergenIchigoClass?: number; // int32
  allergenRingoClass?: number; // int32
  allergenKiwiClass?: number; // int32
  allergenMelonClass?: number; // int32
  allergenMangoClass?: number; // int32
  allergenBananaClass?: number; // int32
  allergenYounashiClass?: number; // int32
  allergenMomoClass?: number; // int32
  allergenAvocadoClass?: number; // int32
  allergenGrapefruitClass?: number; // int32
  allergenSuikaClass?: number; // int32
  allergenTomatoClass?: number; // int32
  allergenNinjinClass?: number; // int32
  allergenJyagaimoClass?: number; // int32
  allergenNinnikuClass?: number; // int32
  allergenTamanegiClass?: number; // int32
  allergenTakenokoClass?: number; // int32
  allergenSatsumaimoClass?: number; // int32
  allergenCeleryClass?: number; // int32
  allergenParsleyClass?: number; // int32
  allergenYamaimoClass?: number; // int32
  allergenHourensouClass?: number; // int32
  allergenKabochaClass?: number; // int32
  allergenHitoinsulinFoodClass?: number; // int32
  allergenGelatinClass?: number; // int32
  allergenGomaClass?: number; // int32
  allergenMustardClass?: number; // int32
  allergenKaichuClass?: number; // int32
  allergenAnisakisClass?: number; // int32
  allergenHitoinsulinEtcClass?: number; // int32
  allergenMitsubachiClass?: number; // int32
  allergenSuzumebachiClass?: number; // int32
  allergenAshinagabachiClass?: number; // int32
  allergenGokiburiClass?: number; // int32
  allergenYusurikaClass?: number; // int32
  allergenGaClass?: number; // int32
  allergenYabukaClass?: number; // int32
  allergenDoubutsujyouhiClass?: number; // int32
  allergenSyokumotsuClass?: number; // int32
  allergenKokumotsuClass?: number; // int32
  allergenInekaClass?: number; // int32
  allergenKabiClass?: number; // int32
  allergenZassouClass?: number; // int32
}
export interface MasterAllergen {
  id?: number; // int32
  en?: string;
  ja?: string;
  category?: string;
  allergenGroup?: string;
}
export interface MasterAllergenGroup {
  id?: number; // int32
  en?: string;
  ja?: string;
}
export interface MasterTestCategory {
  id?: number; // int32
  sort?: string;
  name?: string;
}
export interface MasterTestUnit {
  id?: number; // int32
  sort?: string;
  name?: string;
}
export interface MasterUserHonoraryTitle {
  id?: number; // int32
  name?: string;
}
export interface MasterUserRank {
  id?: number; // int32
  name?: string;
}
export interface Micropost {
  id?: number; // int32
  userId?: number; // int32
  content?: string;
  picture?: string;
  createdAt?: string; // date-time
}
export interface MicropostRequestBody {
  micropost?: MicropostStrongParameter;
}
export interface MicropostStrongParameter {
  id?: number; // int32
  content?: string;
  picture?: string;
}
export interface MyExperienceStrongParameter {
  id?: number; // int32
  userId?: number; // int32
  activityId?: number; // int32
  activityType?: string;
  fromUserId?: number; // int32
  createdAt?: string; // date-time
  updatedAt?: string; // date-time
}
export interface Notification {
  id?: number; // int32
  type?: string;
  linkId?: string;
  userId?: number; // int32
  name?: string;
  avatarUrl?: string;
  description?: string;
  createdAt?: string; // date-time
}
export interface Profile {
  latestIge?: number; // int32
  positiveAllergenGroups?: string[];
  followers?: number; // int32
  followings?: number; // int32
  isFollow?: boolean;
  id?: number; // int32
  email?: string;
  name?: string;
  selfIntroduction?: string;
  rank?: number; // int32
  titleOfHonor?: number; // int32
  classification?: number; // int32
  atopic?: boolean;
  asthma?: boolean;
  rhinitis?: boolean;
  pollen?: boolean;
  gastroenteritis?: boolean;
  conjunctivitis?: boolean;
  avatarUrl?: string;
  iges?: Ige[];
  microposts?: Micropost[];
}
export interface RelationshipRequestBody {
  relationship?: RelationshipStrongParameter;
}
export interface RelationshipStrongParameter {
  id?: number; // int32
  followerId?: number; // int32
  followedId?: number; // int32
}
export interface SessionRequestBody {
  session?: SessionStrongParameter;
}
export interface SessionStrongParameter {
  email?: string;
  password?: string;
}
export interface User {
  id?: number; // int32
  email?: string;
  name?: string;
  admin?: boolean;
  selfIntroduction?: string;
  rank?: number; // int32
  titleOfHonor?: number; // int32
  classification?: number; // int32
  atopic?: boolean;
  asthma?: boolean;
  rhinitis?: boolean;
  pollen?: boolean;
  gastroenteritis?: boolean;
  conjunctivitis?: boolean;
  allergenGroupInekakafun?: boolean;
  allergenGroupZassoukafun?: boolean;
  allergenGroupJyukikafun?: boolean;
  allergenGroupChiri?: boolean;
  allergenGroupDani?: boolean;
  allergenGroupShinkin?: boolean;
  allergenGroupSaikin?: boolean;
  allergenGroupDoubutsu?: boolean;
  allergenGroupSyokugyou?: boolean;
  allergenGroupTamago?: boolean;
  allergenGroupNyuuseihin?: boolean;
  allergenGroupGyorui?: boolean;
  allergenGroupKoukakurui?: boolean;
  allergenGroupIkatako?: boolean;
  allergenGroupKomugi?: boolean;
  allergenGroupKomugiigai?: boolean;
  allergenGroupNikurui?: boolean;
  allergenGroupMamerui?: boolean;
  allergenGroupKudamonorui?: boolean;
  allergenGroupYasai?: boolean;
  allergenGroupSonota?: boolean;
  allergenGroupKiseityuu?: boolean;
  allergenGroupYakubutsu?: boolean;
  allergenGroupKontyuu?: boolean;
  avatarUrl?: string;
  accessToken?: string;
  createdAt?: string; // date-time
  currentSignInAt?: string; // date-time
}
export interface UserRequestBody {
  user?: UserStrongParameter;
}
export interface UserStrongParameter {
  id?: number; // int32
  email?: string;
  encryptedPassword?: string;
  resetPasswordToken?: string;
  resetPasswordSentAt?: string; // date-time
  rememberCreatedAt?: string; // date-time
  signInCount?: number; // int32
  currentSignInAt?: string; // date-time
  lastSignInAt?: string; // date-time
  currentSignInIp?: string;
  lastSignInIp?: string;
  confirmationToken?: string;
  confirmedAt?: string; // date-time
  confirmationSentAt?: string; // date-time
  unconfirmedEmail?: string;
  name?: string;
  admin?: boolean;
  selfIntroduction?: string;
  rank?: number; // int32
  titleOfHonor?: number; // int32
  classification?: number; // int32
  atopic?: boolean;
  asthma?: boolean;
  rhinitis?: boolean;
  pollen?: boolean;
  gastroenteritis?: boolean;
  conjunctivitis?: boolean;
  allergenGroupInekakafun?: boolean;
  allergenGroupZassoukafun?: boolean;
  allergenGroupJyukikafun?: boolean;
  allergenGroupChiri?: boolean;
  allergenGroupDani?: boolean;
  allergenGroupShinkin?: boolean;
  allergenGroupSaikin?: boolean;
  allergenGroupDoubutsu?: boolean;
  allergenGroupSyokugyou?: boolean;
  allergenGroupTamago?: boolean;
  allergenGroupNyuuseihin?: boolean;
  allergenGroupGyorui?: boolean;
  allergenGroupKoukakurui?: boolean;
  allergenGroupIkatako?: boolean;
  allergenGroupKomugi?: boolean;
  allergenGroupKomugiigai?: boolean;
  allergenGroupNikurui?: boolean;
  allergenGroupMamerui?: boolean;
  allergenGroupKudamonorui?: boolean;
  allergenGroupYasai?: boolean;
  allergenGroupSonota?: boolean;
  allergenGroupKiseityuu?: boolean;
  allergenGroupYakubutsu?: boolean;
  allergenGroupKontyuu?: boolean;
  accessToken?: string;
}
