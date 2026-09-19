export type SupportedLanguage = 'en' | 'hi' | 'te';

export interface TranslationSchema {
  nav: {
    home: string;
    buyFreshCrops: string;
    todaysPrices: string;
    howItWorks: string;
    help: string;
    login: string;
    myFarm: string;
    myCrops: string;
    myOrders: string;
    bestTimeToSell: string;
    cart: string;
    verificationRequests: string;
    allOrders: string;
    getVerifiedTick: string;
    signOut: string;
    techAndDesign: string;
    // sub-labels
    buyFreshCropsSub: string;
    todaysPricesSub: string;
    howItWorksSub: string;
    helpSub: string;
    bestTimeToSellSub: string;
    myOrdersSub: string;
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
    safePayment: string;
    safePaymentSub: string;
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
      buyFreshCrops: 'Buy Fresh Crops',
      todaysPrices: "Today's Prices",
      howItWorks: 'How it Works',
      help: 'Help',
      login: 'Login',
      myFarm: 'My Farm',
      myCrops: 'My Crops',
      myOrders: 'My Orders',
      bestTimeToSell: 'Best Time to Sell',
      cart: 'Cart',
      verificationRequests: 'Verification Requests',
      allOrders: 'All Orders',
      getVerifiedTick: 'Get Verified Tick',
      signOut: 'Sign Out',
      techAndDesign: 'Tech & Design',
      buyFreshCropsSub: 'Direct from village farmers',
      todaysPricesSub: 'See what crops sell for today',
      howItWorksSub: 'Safe payment & village pickup',
      helpSub: 'Call or message our support team',
      bestTimeToSellSub: '7-day price trends and harvest timing',
      myOrdersSub: 'Track active pickups and deliveries',
    },
    hero: {
      tagline: 'DIRECT FROM FARM • 0% BROKER COMMISSION',
      headlinePart1: 'Fair Harvest Prices.',
      headlinePart2: 'Zero Middlemen.',
      corePromise: 'Sell crops directly to verified wholesale buyers. Agree on harvest prices in advance. Village pickup. 100% direct bank payout. 0% broker fee.',
      farmerCta: 'Sell your crop →',
      buyerCta: 'Buy fresh crops →',
      freeNotice: 'Free registration for farmers & FPOs • Safe payment to bank account',
    },
    trustStrip: {
      verifiedBuyers: 'Verified Buyers',
      verifiedBuyersSub: 'Local kitchens, shops, and verified wholesale buyers',
      zeroBroker: '0% Broker Fee',
      zeroBrokerSub: '100% of agreed harvest price deposited directly to bank',
      safePayment: 'Safe Payment',
      safePaymentSub: 'Payment held safely and sent to your bank on delivery',
      villagePickup: 'Village Pickup',
      villagePickupSub: 'Scheduled collection trucks direct from your village point',
    },
    howItWorks: {
      eyebrow: '02 / TWO TRANSPARENT TRACKS',
      title: 'How FarmChain Works',
      farmerTrackTitle: 'For Farmers & FPOs',
      buyerTrackTitle: 'For Buyers & Kitchens',
      farmerStep1: 'List your crop: Tell us your harvest volume, variety, and village.',
      farmerStep2: 'Agree on price: Buyers make direct offers with no middleman.',
      farmerStep3: 'Village pickup: Trucks collect directly from your village point.',
      farmerStep4: 'Money in bank: Full payment sent to your bank within 2 hours of weighing.',
      buyerStep1: 'Browse fresh crops: Search verified farmer lots by crop and village.',
      buyerStep2: 'Buy for home or bulk: Buy 1–25 kg for home or quintals for business.',
      buyerStep3: 'Safe payment: Money is kept safe until produce is delivered and checked.',
      buyerStep4: 'Doorstep delivery: Clean, fresh harvest delivered directly to your door.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      buyFreshCrops: 'ताज़ा फसलें खरीदें',
      todaysPrices: 'आज के भाव',
      howItWorks: 'यह कैसे काम करता है',
      help: 'मदद',
      login: 'लॉग इन',
      myFarm: 'मेरा खेत',
      myCrops: 'मेरी फसलें',
      myOrders: 'मेरे आर्डर',
      bestTimeToSell: 'फसल बेचने का सही समय',
      cart: 'कार्ट',
      verificationRequests: 'सत्यापन अनुरोध',
      allOrders: 'सभी आर्डर',
      getVerifiedTick: 'वेरीफाइड टिक पाएं',
      signOut: 'लॉग आउट',
      techAndDesign: 'तकनीक और डिजाइन',
      buyFreshCropsSub: 'सीधे गांव के किसानों से',
      todaysPricesSub: 'आज मंडी और सीधा भाव देखें',
      howItWorksSub: 'सुरक्षित भुगतान और गांव से पिकअप',
      helpSub: 'फोन या मैसेज द्वारा सहायता पाएं',
      bestTimeToSellSub: '7 दिनों के भाव और कटाई का समय',
      myOrdersSub: 'पिकअप और डिलीवरी ट्रैक करें',
    },
    hero: {
      tagline: 'खेत से सीधा बाजार • 0% दलाली कमीशन',
      headlinePart1: 'फसल का सही दाम।',
      headlinePart2: 'बिचौलियों का अंत।',
      corePromise: 'सीधे सत्यापित थोक खरीदारों को फसल बेचें। फसल की कटाई से पहले भाव तय करें। गांव से पिकअप। 100% सीधा बैंक भुगतान। 0% दलाली शुल्क।',
      farmerCta: 'फसल बेचें →',
      buyerCta: 'ताज़ा फसलें खरीदें →',
      freeNotice: 'किसानों के लिए निःशुल्क पंजीकरण • सुरक्षित बैंक भुगतान',
    },
    trustStrip: {
      verifiedBuyers: 'सत्यापित खरीदार',
      verifiedBuyersSub: 'दुकानें, होटल और सत्यापित थोक खरीदार',
      zeroBroker: '0% दलाल कटौती',
      zeroBrokerSub: 'तय मूल्य का 100% सीधा आपके बैंक खाते में',
      safePayment: 'सुरक्षित भुगतान',
      safePaymentSub: 'तौल के बाद डिलीवरी होते ही बैंक खाते में पैसा जमा',
      villagePickup: 'गांव से पिकअप',
      villagePickupSub: 'आपके गांव के पॉइंट से सीधी गाड़ी लोडिंग',
    },
    howItWorks: {
      eyebrow: '02 / पारदर्शी प्रक्रिया',
      title: 'फार्मचेन कैसे काम करता है',
      farmerTrackTitle: 'किसानों और FPO के लिए',
      buyerTrackTitle: 'खरीदारों और दुकानों के लिए',
      farmerStep1: 'फसल बताएं: कटाई की मात्रा, किस्म और गांव का पता दर्ज करें।',
      farmerStep2: 'भाव तय करें: खरीदार से सीधा भाव तय करें, बिना किसी बिचौलिए के।',
      farmerStep3: 'गांव से पिकअप: गाड़ी सीधे आपके गांव के पॉइंट से फसल उठाएगी।',
      farmerStep4: 'खाते में पैसा: डिजिटल तौल के 2 घंटे में पूरा पैसा बैंक में।',
      buyerStep1: 'फसलें खोजें: सीधे किसानों की ताज़ा फसलें देखें।',
      buyerStep2: 'घर या दुकान के लिए: 1–25 किलो घर के लिए या क्विंटल में बल्क आर्डर।',
      buyerStep3: 'सुरक्षित भुगतान: डिलीवरी और जांच होने तक पैसा सुरक्षित रहता है।',
      buyerStep4: 'दरवाजे पर डिलीवरी: ताज़ा फसल सीधे आपके घर या दुकान पर।',
    },
  },
  te: {
    nav: {
      home: 'హోమ్',
      buyFreshCrops: 'తాజా పంటలు కొనండి',
      todaysPrices: 'నేటి ధరలు',
      howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
      help: 'సహాయం',
      login: 'లాగిన్',
      myFarm: 'నా తోట / పొలం',
      myCrops: 'నా పంటలు',
      myOrders: 'నా ఆర్డర్లు',
      bestTimeToSell: 'అమ్మడానికి సరైన సమయం',
      cart: 'కార్ట్',
      verificationRequests: 'ధృవీకరణ అభ్యర్థనలు',
      allOrders: 'మొత్తం ఆర్డర్లు',
      getVerifiedTick: 'వెరిఫైడ్ టిక్ పొందండి',
      signOut: 'లాగౌట్',
      techAndDesign: 'టెక్నాలజీ & డిజైన్',
      buyFreshCropsSub: 'గ్రామ రైతుల వద్ద నుండి నేరుగా',
      todaysPricesSub: 'ఈ రోజు మార్కెట్ ధరలు చూడండి',
      howItWorksSub: 'సురక్షిత చెల్లింపు & గ్రామ పికప్',
      helpSub: 'ఫోన్ లేదా మెసేజ్ ద్వారా సహాయం',
      bestTimeToSellSub: '7 రోజుల ధరల పోకడలు & కోత సమయం',
      myOrdersSub: 'పికప్ మరియు డెలివరీ ట్రాక్ చేయండి',
    },
    hero: {
      tagline: 'తోట నుండి నేరుగా • 0% దళారీ కమీషన్',
      headlinePart1: 'పంటకు సరైన ధర.',
      headlinePart2: 'దళారీలు లేని మార్కెట్.',
      corePromise: 'ధృవీకరించబడిన హోల్‌సేల్ కొనుగోలుదారులకు నేరుగా పంటలను అమ్మండి. కోతకు ముందే ధరలను ఖరారు చేసుకోండి. గ్రామంలోనే వాహన పికప్. 100% నేరుగా బ్యాంక్ డిపాజిట్. 0% దళారీ రుసుము.',
      farmerCta: 'మీ పంటను అమ్మండి →',
      buyerCta: 'తాజా పంటలు కొనండి →',
      freeNotice: 'రైతులకు ఉచిత నమోదు • సురక్షిత బ్యాంక్ చెల్లింపులు',
    },
    trustStrip: {
      verifiedBuyers: 'ధృవీకరించబడిన కొనుగోలుదారులు',
      verifiedBuyersSub: 'హోటళ్లు, దుకాణాలు మరియు సంస్థాగత కొనుగోలుదారులు',
      zeroBroker: '0% దళారీ కమీషన్',
      zeroBrokerSub: 'ఒప్పందం చేసుకున్న ధరకు 100% నేరుగా రైతు ఖాతాలోకి',
      safePayment: 'సురక్షిత చెల్లింపు',
      safePaymentSub: 'డెలివరీ జరిగిన వెంటనే డబ్బులు మీ బ్యాంక్ ఖాతాలో జమ',
      villagePickup: 'గ్రామంలోనే పికప్',
      villagePickupSub: 'రైతు గ్రామం నుండే పికప్ వెహికిల్ లోడింగ్',
    },
    howItWorks: {
      eyebrow: '02 / పారదర్శక విధానం',
      title: 'ఫార్మ్‌చైన్ ఎలా పనిచేస్తుంది',
      farmerTrackTitle: 'రైతులు మరియు FPOల కోసం',
      buyerTrackTitle: 'కొనుగోలుదారుల కోసం',
      farmerStep1: 'పంట వివరాలు నమోదు: రాబోయే పంట పరిమాణం, రకం తెలపండి.',
      farmerStep2: 'ధర నిర్ణయం: దళారులు లేకుండా నేరుగా ధరను ఖరారు చేసుకోండి.',
      farmerStep3: 'గ్రామ పికప్: వాహనాలు మీ గ్రామం నుండే పంటను లోడ్ చేస్తాయి.',
      farmerStep4: 'బ్యాంక్‌లో నగదు: డిజిటల్ తూకం తర్వాత 2 గంటల్లో మొత్తం డబ్బులు ఖాతాలో.',
      buyerStep1: 'పంటలను శోధించండి: నేరుగా రైతుల తాజా పంటలను ఎంచుకోండి.',
      buyerStep2: 'ఇంటికి లేదా వ్యాపారానికి: 1–25 కేజీలు ఇంటికి లేదా క్వింటాళ్లలో ఆర్డర్.',
      buyerStep3: 'సురక్షిత చెల్లింపు: డెలివరీ పూర్తయ్యే వరకు నగదు సురక్షితంగా ఉంటుంది.',
      buyerStep4: 'డోర్ డెలివరీ: నేరుగా మీ ఇంటికి లేదా వ్యాపార కేంద్రానికి డెలివరీ.',
    },
  },
};
