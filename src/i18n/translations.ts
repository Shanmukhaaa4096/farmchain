export type SupportedLanguage = 'en' | 'hi' | 'te';

export interface TranslationSchema {
  nav: {
    home: string;
    forFarmers: string;
    forBuyers: string;
    howItWorks: string;
    marketplace: string;
    prices: string;
    signIn: string;
    join: string;
    dashboard: string;
    orders: string;
    signOut: string;
  };
  hero: {
    tagline: string;
    headlinePart1: string;
    headlinePart2: string;
    corePromise: string;
    farmerCta: string;
    buyerCta: string;
    freeNotice: string;
  };
  trustStrip: {
    verifiedBuyers: string;
    verifiedBuyersSub: string;
    zeroBroker: string;
    zeroBrokerSub: string;
    directPayout: string;
    directPayoutSub: string;
    villagePickup: string;
    villagePickupSub: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    farmerTrackTitle: string;
    buyerTrackTitle: string;
    farmerStep1: string;
    farmerStep2: string;
    farmerStep3: string;
    farmerStep4: string;
    buyerStep1: string;
    buyerStep2: string;
    buyerStep3: string;
    buyerStep4: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      forFarmers: 'For Farmers',
      forBuyers: 'For Buyers',
      howItWorks: 'How It Works',
      marketplace: 'Marketplace',
      prices: 'Mandi Prices',
      signIn: 'Sign In',
      join: 'Join FarmChain',
      dashboard: 'Dashboard',
      orders: 'My Orders',
      signOut: 'Sign Out',
    },
    hero: {
      tagline: 'DIRECT AGRICULTURAL MARKETPLACE • 0% BROKER COMMISSION',
      headlinePart1: 'Fair Harvest Prices.',
      headlinePart2: 'Zero Middlemen.',
      corePromise: 'Sell crops directly to verified wholesale buyers. Agree on harvest prices in advance. Village pickup. 100% direct bank payout. 0% broker fee.',
      farmerCta: "I'm a Farmer →",
      buyerCta: "I'm a Wholesale Buyer →",
      freeNotice: 'Free registration for smallholders & FPOs • Escrow-secured bank payouts',
    },
    trustStrip: {
      verifiedBuyers: 'Verified Buyers',
      verifiedBuyersSub: 'Enterprise kitchens & food processors with audited GSTIN',
      zeroBroker: '0% Broker Fee',
      zeroBrokerSub: '100% of agreed harvest price deposited directly to bank',
      directPayout: 'Direct Bank Payout',
      directPayoutSub: 'Simulated escrow funds released within 2 hours of delivery',
      villagePickup: 'Village Pickup',
      villagePickupSub: 'Scheduled refrigerated milk-runs direct from your farm-gate',
    },
    howItWorks: {
      eyebrow: '02 / TWO TRANSPARENT TRACKS',
      title: 'How FarmChain Works',
      farmerTrackTitle: 'For Farmers & FPOs',
      buyerTrackTitle: 'For Wholesale Buyers',
      farmerStep1: 'List Crop & Yield: Share upcoming harvest volume, expected rate, and village gate.',
      farmerStep2: 'Get Direct Offers: Verified institutional buyers bid and lock contracts in advance.',
      farmerStep3: 'Village Pickup: Coordinated reefer trucks collect directly from your village point.',
      farmerStep4: 'Instant Bank Payout: Escrow releases 100% payment within 2 hours of QC signoff.',
      buyerStep1: 'Browse Live Harvests: Search verified farmer listings by crop, grade, and district.',
      buyerStep2: 'Make Direct Offer: Negotiate lot specs and lock pre-harvest procurement price.',
      buyerStep3: 'Deposit into Escrow: Funds held securely in simulation until produce delivery.',
      buyerStep4: 'Dock Delivery: Single-invoice refrigerated delivery straight to your processing unit.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      forFarmers: 'किसानों के लिए',
      forBuyers: 'खरीदारों के लिए',
      howItWorks: 'यह कैसे काम करता है',
      marketplace: 'मंडी बाजार',
      prices: 'मंडी भाव',
      signIn: 'लॉग इन',
      join: 'शामिल हों',
      dashboard: 'डैशबोर्ड',
      orders: 'मेरे आर्डर',
      signOut: 'लॉग आउट',
    },
    hero: {
      tagline: 'सीधा कृषि बाजार • 0% दलाली कमीशन',
      headlinePart1: 'फसल का सही दाम।',
      headlinePart2: 'बिचौलियों का अंत।',
      corePromise: 'सीधे सत्यापित थोक खरीदारों को फसल बेचें। फसल की कटाई से पहले भाव तय करें। गांव से पिकअप। 100% सीधा बैंक भुगतान। 0% दलाली शुल्क।',
      farmerCta: 'मैं एक किसान हूँ →',
      buyerCta: 'मैं एक खरीदार हूँ →',
      freeNotice: 'छोटे किसानों और FPO के लिए निःशुल्क पंजीकरण • एस्क्रो सुरक्षित भुगतान',
    },
    trustStrip: {
      verifiedBuyers: 'सत्यापित खरीदार',
      verifiedBuyersSub: 'GSTIN सत्यापित व्यावसायिक रसोई और प्रोसेसर',
      zeroBroker: '0% दलाल कटौती',
      zeroBrokerSub: 'तय मूल्य का 100% सीधा आपके बैंक खाते में',
      directPayout: 'सीधा बैंक भुगतान',
      directPayoutSub: 'डिलीवरी के 2 घंटे के भीतर बैंक खाते में पैसा जमा',
      villagePickup: 'गांव से पिकअप',
      villagePickupSub: 'आपके खेत या गांव केAggregation पॉइंट से सीधी लोडिंग',
    },
    howItWorks: {
      eyebrow: '02 / पारदर्शी प्रक्रिया',
      title: 'फार्मचेन कैसे काम करता है',
      farmerTrackTitle: 'किसानों और FPO के लिए',
      buyerTrackTitle: 'थोक खरीदारों के लिए',
      farmerStep1: 'फसल दर्ज करें: कटाई की मात्रा, अपेक्षित भाव और गांव का पता साझा करें।',
      farmerStep2: 'सीधे ऑफर प्राप्त करें: सत्यापित थोक खरीदार कटाई से पहले अनुबंध तय करते हैं।',
      farmerStep3: 'गांव से पिकअप: निर्धारित समय पर रेफ्रिजरेटेड ट्रक गांव से फसल उठाते हैं।',
      farmerStep4: 'सीधा बैंक ट्रांसफर: डिजिटल तौल सत्यापन के 2 घंटे में पूरा भुगतान।',
      buyerStep1: 'ताज़ा फसलें खोजें: ग्रेड, जिले और मूल्य के आधार पर सीधी फसलें ब्राउज़ करें।',
      buyerStep2: 'सीधा ऑफर दें: किसान के साथ बातचीत करें और अग्रिम खरीद मूल्य तय करें।',
      buyerStep3: 'एस्क्रो जमा: सुरक्षित एस्क्रो में राशि जमा रहती है जब तक डिलीवरी न हो जाए।',
      buyerStep4: 'गोदाम पर डिलीवरी: सीधे आपके किचन या वेयरहाउस डॉक पर सिंगल-बिल आपूर्ति।',
    },
  },
  te: {
    nav: {
      home: 'హోమ్',
      forFarmers: 'రైతుల కోసం',
      forBuyers: 'కొనుగోలుదారుల కోసం',
      howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
      marketplace: 'మార్కెట్‌ప్లేస్',
      prices: 'మార్కెట్ ధరలు',
      signIn: 'లాగిన్',
      join: 'చేరండి',
      dashboard: 'డాష్‌బోర్డ్',
      orders: 'నా ఆర్డర్లు',
      signOut: 'లాగౌట్',
    },
    hero: {
      tagline: 'రైతుకు నేరుగా మార్కెట్ • 0% దళారీ కమీషన్',
      headlinePart1: 'పంటకు సరైన ధర.',
      headlinePart2: 'దళారీలు లేని మార్కెట్.',
      corePromise: 'ధృవీకరించబడిన హోల్‌సేల్ కొనుగోలుదారులకు నేరుగా పంటలను అమ్మండి. కోతకు ముందే ధరలను ఖరారు చేసుకోండి. గ్రామంలోనే వాహన పికప్. 100% నేరుగా బ్యాంక్ డిపాజిట్. 0% దళారీ రుసుము.',
      farmerCta: 'నేను రైతును →',
      buyerCta: 'నేను కొనుగోలుదారును →',
      freeNotice: 'రైతులకు మరియు FPO లకు ఉచిత నమోదు • ఎస్క్రో రక్షిత చెల్లింపులు',
    },
    trustStrip: {
      verifiedBuyers: 'ధృవీకరించబడిన కొనుగోలుదారులు',
      verifiedBuyersSub: 'GSTIN మరియు ఆడిట్ చేయబడిన వ్యాపార సంస్థలు',
      zeroBroker: '0% దళారీ కమీషన్',
      zeroBrokerSub: 'ఒప్పందం చేసుకున్న ధరకు 100% నేరుగా రైతు ఖాతాలోకి',
      directPayout: 'నేరుగా బ్యాంక్ డిపాజిట్',
      directPayoutSub: 'డెలివరీ జరిగిన 2 గంటల్లో ఖాతాలో డబ్బులు జమవుతాయి',
      villagePickup: 'గ్రామంలోనే పికప్',
      villagePickupSub: 'రైతు కళ్లం లేదా గ్రామం నుండే పికప్ వెహికిల్ లోడింగ్',
    },
    howItWorks: {
      eyebrow: '02 / పారదర్శక విధానం',
      title: 'ఫార్మ్‌చైన్ ఎలా పనిచేస్తుంది',
      farmerTrackTitle: 'రైతులు మరియు FPOల కోసం',
      buyerTrackTitle: 'హోల్‌సేల్ కొనుగోలుదారుల కోసం',
      farmerStep1: 'పంట వివరాలు నమోదు: రాబోయే పంట పరిమాణం, ఆశించిన రేటు మరియు గ్రామం తెలపండి.',
      farmerStep2: 'నేరుగా ఆఫర్లు పొందండి: సంస్థాగత కొనుగోలుదారులు ముందే రేటును లాక్ చేస్తారు.',
      farmerStep3: 'గ్రామ పికప్: షెడ్యూల్ చేసిన వాహనాలు మీ గ్రామం నుండే లోడ్ చేసుకుంటాయి.',
      farmerStep4: 'ఖాతాలో జమ: డిజిటల్ తూకం తర్వాత 2 గంటల్లో మొత్తం డబ్బులు మీ బ్యాంక్ ఖాతాలో.',
      buyerStep1: 'పంటలను శోధించండి: గ్రేడ్, జిల్లా మరియు రకం ఆధారంగా నేరుగా ఎంచుకోండి.',
      buyerStep2: 'డైరెక్ట్ ఆఫర్ ఇవ్వండి: రైతుతో చర్చించి ముందస్తు ధరను నిర్ధారించండి.',
      buyerStep3: 'ఎస్క్రో డిపాజిట్: డెలివరీ పూర్తయ్యే వరకు నగదు సురక్షిత ఎస్క్రోలో ఉంటుంది.',
      buyerStep4: 'డోర్ డెలివరీ: నేరుగా మీ ప్రాసెసింగ్ యూనిట్ లేదా కిచెన్ వద్దకే డెలివరీ.',
    },
  },
};
