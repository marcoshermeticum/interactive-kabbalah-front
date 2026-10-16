export type AlchemicalLocale = 'en-US' | 'pt-BR' | 'ja' | 'he';

const names: Record<AlchemicalLocale, readonly string[]> = {
  'en-US': [
    'Quintessence', 'Air', 'Fire', 'Earth', 'Water', 'Aqua fortis', 'Aqua regia', 'Aqua regia II',
    'Aqua vitae', 'Aqua vitae II', 'Vinegar', 'Vinegar II', 'Vinegar III', 'Sulfur',
    "Philosopher's sulfur", 'Black sulfur', 'Mercury sublimate', 'Mercury sublimate II',
    'Mercury sublimate III', 'Cinnabar', 'Salt', 'Nitre', 'Vitriol', 'Vitriol II', 'Rock salt',
    'Rock salt II', 'Gold', 'Silver', 'Iron ore', 'Iron ore II', 'Crocus of iron', 'Regulus of iron',
    'Copper ore', 'Iron-copper ore', 'Sublimate of copper', 'Crocus of copper', 'Crocus of copper II',
    'Copper antimoniate', 'Salt of copper antimoniate', 'Sublimate of salt of copper', 'Verdigris',
    'Tin ore', 'Lead ore', 'Antimony ore', 'Sublimate of antimony', 'Salt of antimony',
    'Sublimate of salt of antimony', 'Vinegar of antimony', 'Regulus of antimony',
    'Regulus of antimony II', 'Regulus', 'Regulus II', 'Regulus III', 'Regulus IV', 'Alkali',
    'Alkali II', 'Marcasite', 'Sal ammoniac', 'Arsenic', 'Realgar', 'Realgar II', 'Orpiment',
    'Bismuth ore', 'Tartar', 'Tartar II', 'Quicklime', 'Borax', 'Borax II', 'Borax III', 'Alum',
    'Oil', 'Spirit', 'Tincture', 'Gum', 'Wax', 'Powder', 'Calx', 'Tutty', 'Caput mortuum',
    'Scepter of Jove', 'Caduceus', 'Trident', 'Starred trident', 'Lodestone', 'Soap', 'Urine',
    'Horse dung', 'Ashes', 'Pot ashes', 'Brick', 'Powdered brick', 'Amalgam',
    'Stratum super stratum', 'Stratum super stratum II', 'Sublimation', 'Precipitate', 'Distill',
    'Dissolve', 'Dissolve II', 'Purify', 'Putrefaction', 'Crucible', 'Crucible II', 'Crucible III',
    'Crucible IV', 'Crucible V', 'Alembic', "Mary's bath", 'Vapour bath', 'Retort', 'Hour', 'Night',
    'Day and night', 'Month', 'Half dram', 'Half ounce',
  ],
  'pt-BR': [
    'Quintessência', 'Ar', 'Fogo', 'Terra', 'Água', 'Água-forte', 'Água régia', 'Água régia II',
    'Água da vida', 'Água da vida II', 'Vinagre', 'Vinagre II', 'Vinagre III', 'Enxofre',
    'Enxofre dos filósofos', 'Enxofre negro', 'Sublimado de mercúrio', 'Sublimado de mercúrio II',
    'Sublimado de mercúrio III', 'Cinábrio', 'Sal', 'Salitre', 'Vitríolo', 'Vitríolo II', 'Sal-gema',
    'Sal-gema II', 'Ouro', 'Prata', 'Minério de ferro', 'Minério de ferro II', 'Croco de ferro',
    'Régulo de ferro', 'Minério de cobre', 'Minério de ferro e cobre', 'Sublimado de cobre',
    'Croco de cobre', 'Croco de cobre II', 'Antimoniato de cobre', 'Sal de antimoniato de cobre',
    'Sublimado de sal de cobre', 'Verdete', 'Minério de estanho', 'Minério de chumbo',
    'Minério de antimônio', 'Sublimado de antimônio', 'Sal de antimônio',
    'Sublimado de sal de antimônio', 'Vinagre de antimônio', 'Regulo de antimônio',
    'Régulo de antimônio II', 'Régulo', 'Régulo II', 'Régulo III', 'Régulo IV', 'Álcali',
    'Álcali II', 'Marcasita', 'Sal amoníaco', 'Arsênio', 'Realgar', 'Realgar II', 'Oropimente',
    'Minério de bismuto', 'Tártaro', 'Tártaro II', 'Cal viva', 'Bórax', 'Bórax II', 'Bórax III',
    'Alúmen', 'Óleo', 'Espírito', 'Tintura', 'Goma', 'Cera', 'Pó', 'Cinza calcinada', 'Tútia', 'Cabeça morta',
    'Cetro de Júpiter', 'Caduceu', 'Tridente', 'Tridente estrelado', 'Pedra-ímã', 'Sabão', 'Urina',
    'Estrume de cavalo', 'Cinzas', 'Cinzas de pote', 'Tijolo', 'Tijolo em pó', 'Amálgama',
    'Estrato sobre estrato', 'Estrato sobre estrato II', 'Sublimação', 'Precipitação', 'Destilar',
    'Dissolver', 'Dissolver II', 'Purificar', 'Putrefação', 'Cadinho', 'Cadinho II', 'Cadinho III',
    'Cadinho IV', 'Cadinho V', 'Alambique', 'Banho de Maria', 'Banho de vapores', 'Retorta', 'Hora',
    'Noite', 'Dia e noite', 'Mês', 'Meia dracma', 'Meia onça',
  ],
  ja: [
    '第五元素', '空気', '火', '地', '水', '硝酸', '王水', '王水 II', '生命の水', '生命の水 II',
    '酢', '酢 II', '酢 III', '硫黄', '哲学者の硫黄', '黒硫黄', '昇汞', '昇汞 II', '昇汞 III',
    '辰砂', '塩', '硝石', '緑礬', '緑礬 II', '岩塩', '岩塩 II', '金', '銀', '鉄鉱石', '鉄鉱石 II',
    '鉄のクロッカス', '鉄のレグルス', '銅鉱石', '鉄銅鉱石', '銅の昇華物', '銅のクロッカス',
    '銅のクロッカス II', 'アンチモン酸銅', 'アンチモン酸銅の塩', '銅塩の昇華物', '緑青',
    'スズ鉱石', '鉛鉱石', 'アンチモン鉱石', 'アンチモンの昇華物', 'アンチモンの塩',
    'アンチモン塩の昇華物', 'アンチモン酢', 'アンチモンのレグルス', 'アンチモンのレグルス II',
    'レグルス', 'レグルス II', 'レグルス III', 'レグルス IV', 'アルカリ', 'アルカリ II',
    '白鉄鉱', '塩化アンモニウム', 'ヒ素', '鶏冠石', '鶏冠石 II', '石黄', 'ビスマス鉱石',
    '酒石', '酒石 II', '生石灰', 'ホウ砂', 'ホウ砂 II', 'ホウ砂 III', 'ミョウバン', '油',
    '精気', 'チンキ', '樹脂', '蝋', '粉末', '焼成灰', 'トゥッティ', 'カプト・モルトゥム',
    'ユピテルの王笏', 'カドゥケウス', '三叉槍', '星付き三叉槍', '磁石', '石鹸', '尿', '馬糞',
    '灰', '鍋灰', '煉瓦', '煉瓦粉', 'アマルガム', '層の上の層', '層の上の層 II', '昇華',
    '沈殿', '蒸留する', '溶解する', '溶解する II', '精製する', '腐敗', 'るつぼ', 'るつぼ II',
    'るつぼ III', 'るつぼ IV', 'るつぼ V', 'アランビック', 'マリアの浴槽', '蒸気浴', 'レトルト',
    '時', '夜', '昼夜', '月', '半ドラクマ', '半オンス',
  ],
  he: [
    'תמצית היסודות', 'אוויר', 'אש', 'אדמה', 'מים', 'מי חומצה חזקים', 'מי מלך', 'מי מלך II',
    'מי החיים', 'מי החיים II', 'חומץ', 'חומץ II', 'חומץ III', 'גופרית', 'גופרית הפילוסופים',
    'גופרית שחורה', 'תוצר המראה של כספית', 'תוצר המראה של כספית II', 'תוצר המראה של כספית III', 'צינובר',
    'מלח', 'מלחנית', 'ויטריול', 'ויטריול II', 'מלח סלעים', 'מלח סלעים II', 'זהב', 'כסף',
    'עפרת ברזל', 'עפרת ברזל II', 'כרכום הברזל', 'רגולוס הברזל', 'עפרת נחושת', 'עפרת ברזל-נחושת',
    'תוצר המראה של נחושת', 'כרכום הנחושת', 'כרכום הנחושת II', 'אנטימונאט נחושת', 'מלח אנטימונאט הנחושת',
    'תוצר המראה של מלח הנחושת', 'ירוקת נחושת', 'עפרת בדיל', 'עפרת עופרת', 'עפרת אנטימון',
    'תוצר המראה של אנטימון', 'מלח אנטימון', 'תוצר המראה של מלח האנטימון', 'חומץ אנטימון', 'רגולוס אנטימון',
    'רגולוס אנטימון II', 'רגולוס', 'רגולוס II', 'רגולוס III', 'רגולוס IV', 'אלקלי', 'אלקלי II',
    'מרקזיט', 'סאל אמוניאק', 'ארסן', 'ריאלגר', 'ריאלגר II', 'אורפימנט', 'עפרת ביסמוט',
    'טרטר', 'טרטר II', 'סיד חי', 'בורקס', 'בורקס II', 'בורקס III', 'אלום', 'שמן', 'רוח',
    'תמיסה', 'גומי', 'שעווה', 'אבקה', 'קליקס', 'טוטי', 'קפוט מורטום', 'שרביט יופיטר',
    'קדוקאוס', 'קלשון', 'קלשון מכוכב', 'אבן מגנטית', 'סבון', 'שתן', 'גללי סוסים', 'אפר',
    'אפר סיר', 'לבנה', 'אבקת לבנים', 'אמלגם', 'שכבה על שכבה', 'שכבה על שכבה II', 'המראה',
    'משקע', 'לזקק', 'להמיס', 'להמיס II', 'לטהר', 'ריקבון', 'כור היתוך', 'כור היתוך II',
    'כור היתוך III', 'כור היתוך IV', 'כור היתוך V', 'אלמביק', 'אמבטיית מרי', 'אמבט אדים',
    'רטורטה', 'שעה', 'לילה', 'יום ולילה', 'חודש', 'חצי דרכמה', 'חצי אונקיה',
  ],
};

export function getAlchemicalSymbolName(locale: string, index: number): string {
  switch (locale) {
    case 'en-US':
    case 'pt-BR':
    case 'ja':
    case 'he':
      return names[locale][index];
    default:
      throw new Error(`Unsupported alchemical symbol locale: ${locale}`);
  }
}

export function getAlchemicalSymbolTranslationCount(locale: AlchemicalLocale): number {
  return names[locale].length;
}
