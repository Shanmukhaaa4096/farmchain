import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Smartphone, 
  Languages, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  BellRing,
  Truck,
  Building2,
  PhoneCall
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { WashiTape, RubberStamp, SketchAnnotation } from '../ui/SketchAccents';

type LanguageCode = 'en' | 'te' | 'hi' | 'kn' | 'mr';

interface LanguageContent {
  label: string;
  nativeName: string;
  tagline: string;
  buyerRequirementTitle: string;
  buyerName: string;
  cropDetails: string;
  quantity: string;
  rate: string;
  totalPayout: string;
  deliveryDate: string;
  hubLocation: string;
  acceptButtonText: string;
  rejectButtonText: string;
  acceptedSuccessTitle: string;
  acceptedSuccessDesc: string;
  rejectedTitle: string;
  rejectedDesc: string;
  assistedCallout: string;
}

const REGIONAL_CONTENT: Record<LanguageCode, LanguageContent> = {
  en: {
    label: 'English',
    nativeName: 'English',
    tagline: 'Buyers post requirements. The order arrives on the farmer phone. Farmer simply taps Accept or Reject.',
    buyerRequirementTitle: 'VERIFIED PURCHASE ORDER PUSHED TO YOUR PHONE',
    buyerName: 'UrbanFork Kitchens (Hyderabad Central Hub)',
    cropDetails: 'Tomatoes (Grade A - Salad Firm)',
    quantity: '500 KG Required from Your Harvest',
    rate: 'Rs 24.00 / KG (Direct Farm-Gate)',
    totalPayout: 'Rs 12,000 Guaranteed Direct Bank Credit',
    deliveryDate: '28 September 2026',
    hubLocation: 'Pickup: Chevella FPO Collection Point',
    acceptButtonText: 'ACCEPT ORDER',
    rejectButtonText: 'REJECT ORDER',
    acceptedSuccessTitle: 'ORDER ACCEPTED AND LOCKED',
    acceptedSuccessDesc: 'Rs 12,000 held in Escrow. Reefer truck scheduled for 28 Sep at 06:30 AM at Chevella FPO Hub. 0% broker commission.',
    rejectedTitle: 'ORDER DECLINED',
    rejectedDesc: 'Requirement re-routed to next nearest verified farmer cluster. Zero penalty or obligation.',
    assistedCallout: 'Assisted by Local Village Kisan Coordinator: M. Srinivas (FPO #TS-CHE-09)'
  },
  te: {
    label: 'Telugu',
    nativeName: 'తెలుగు',
    tagline: 'రైతు వెతకాల్సిన అవసరం లేదు. కొనుగోలుదారు ఆర్డర్ నేరుగా ఫోన్‌కు వస్తుంది. అంగీకరించండి లేదా తిరస్కరించండి.',
    buyerRequirementTitle: 'కొనుగోలుదారుడి ధృవీకరించిన ఆర్డర్ మీ ఫోన్‌కు పంపబడింది',
    buyerName: 'అర్బన్‌ఫోర్క్ కిచెన్స్ (హైదరాబాద్ సెంట్రల్ హబ్)',
    cropDetails: 'టమోటాలు (గ్రేడ్ A - నాణ్యమైన కాయలు)',
    quantity: 'మీ పంట నుండి 500 కేజీలు అవసరం',
    rate: 'కేజీకి రూ. 24.00 (నేరుగా పొలం వద్ద రేటు)',
    totalPayout: 'రూ. 12,000 నేరుగా మీ బ్యాంక్ ఖాతాకు జమ',
    deliveryDate: '28 సెప్టెంబర్ 2026',
    hubLocation: 'సేకరణ స్థలం: చేవెళ్ల ఎఫ్‌పీఓ కేంద్రం',
    acceptButtonText: 'ఆర్డర్ అంగీకరించండి',
    rejectButtonText: 'తిరస్కరించండి',
    acceptedSuccessTitle: 'ఆర్డర్ విజయవంతంగా ఖరారైంది',
    acceptedSuccessDesc: 'రూ. 12,000 ఎస్క్రో ఖాతాలో భద్రపరచబడింది. సెప్టెంబర్ 28 ఉదయం 6:30 గంటలకు చేవెళ్ల కేంద్రం వద్ద ట్రక్ వస్తుంది. దళారుల కమీషన్ 0%.',
    rejectedTitle: 'ఆర్డర్ తిరస్కరించబడింది',
    rejectedDesc: 'ఈ ఆర్డర్ తదుపరి సమీప రైతు క్లస్టర్‌కు మళ్లించబడింది. ఎటువంటి రుసుము లేదు.',
    assistedCallout: 'గ్రామ కిసాన్ సమన్వయకర్త సహాయం: ఎం. శ్రీనివాస్ (చేవెళ్ల ఎఫ్‌పీఓ)'
  },
  hi: {
    label: 'Hindi',
    nativeName: 'हिन्दी',
    tagline: 'किसान को खरीदार ढूंढने की जरूरत नहीं। आर्डर सीधे फोन पर आता है। किसान केवल स्वीकार या अस्वीकार करे।',
    buyerRequirementTitle: 'सत्यापित खरीदार की मांग सीधे आपके फोन पर',
    buyerName: 'अर्बनफोर्क किचन्स (हैदराबाद सेंट्रल हब)',
    cropDetails: 'टमाटर (ग्रेड A - उत्तम गुणवत्ता)',
    quantity: 'आपकी फसल से 500 किलोग्राम आवश्यक',
    rate: 'रु 24.00 प्रति किलो (सीधा खेत का मूल्य)',
    totalPayout: 'रु 12,000 सीधे आपके बैंक खाते में',
    deliveryDate: '28 सितम्बर 2026',
    hubLocation: 'पिकअप: चेवेल्ला एफपीओ केंद्र',
    acceptButtonText: 'आर्डर स्वीकार करें',
    rejectButtonText: 'अस्वीकार करें',
    acceptedSuccessTitle: 'आर्डर सफलतापूर्वक स्वीकृत',
    acceptedSuccessDesc: 'रु 12,000 एस्क्रो में सुरक्षित। 28 सितम्बर सुबह 6:30 बजे चेवेल्ला एफपीओ पर गाड़ी पहुंचेगी। दलाली 0%.',
    rejectedTitle: 'आर्डर अस्वीकृत',
    rejectedDesc: 'मांग निकटतम दूसरे किसान को प्रेषित की गई। कोई जुर्माना या बाध्यता नहीं।',
    assistedCallout: 'ग्राम किसान समन्वयक सहायता: एम. श्रीनिवास (चेवेल्ला एफपीओ)'
  },
  kn: {
    label: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    tagline: 'ರೈತರು ಖರೀದಿದಾರರನ್ನು ಹುಡುಕಬೇಕಾಗಿಲ್ಲ. ಬೇಡಿಕೆ ನೇರವಾಗಿ ಮೊಬೈಲ್‌ಗೆ ಬರುತ್ತದೆ. ಸ್ವೀಕರಿಸಿ ಅಥವಾ ತಿರಸ್ಕರಿಸಿ.',
    buyerRequirementTitle: 'ಪರಿಶೀಲಿಸಿದ ಖರೀದಿದಾರರ ಬೇಡಿಕೆ ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಬಂದಿದೆ',
    buyerName: 'ಅರ್ಬನ್‌ಫೋರ್ಕ್ ಕಿಚನ್ಸ್ (ಹೈದರಾಬಾದ್ ಹಬ್)',
    cropDetails: 'ಟೊಮೆಟೊ (ಗ್ರೇಡ್ A - ಉತ್ತಮ ಗುಣಮಟ್ಟ)',
    quantity: 'ನಿಮ್ಮ ಸುಗ್ಗಿಯಿಂದ 500 ಕೆಜಿ ಅಗತ್ಯವಿದೆ',
    rate: 'ಪ್ರತಿ ಕೆಜಿಗೆ ರೂ. 24.00 (ನೇರ ತೋಟದ ದರ)',
    totalPayout: 'ರೂ. 12,000 ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ',
    deliveryDate: '28 ಸೆಪ್ಟೆಂಬರ್ 2026',
    hubLocation: 'ಸಂಗ್ರಹಣಾ ಸ್ಥಳ: ಚೇವೆಲ್ಲಾ ಎಫ್‌ಪಿಒ ಕೇಂದ್ರ',
    acceptButtonText: 'ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಿ',
    rejectButtonText: 'ತಿರಸ್ಕರಿಸಿ',
    acceptedSuccessTitle: 'ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ',
    acceptedSuccessDesc: 'ರೂ. 12,000 ಎಸ್ಕ್ರೊದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿದೆ. 28 ಸೆಪ್ಟೆಂಬರ್ ಬೆಳಿಗ್ಗೆ 6:30 ಕ್ಕೆ ಟ್ರಕ್ ಬರುತ್ತದೆ. 0% ಕಮಿಷನ್.',
    rejectedTitle: 'ಆರ್ಡರ್ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ',
    rejectedDesc: 'ಬೇಡಿಕೆಯನ್ನು ಮುಂದಿನ ಹತ್ತಿರದ ರೈತರಿಗೆ ವರ್ಗಾಯಿಸಲಾಗಿದೆ.',
    assistedCallout: 'ಗ್ರಾಮ ಕಿಸಾನ್ ಸಂಯೋಜಕರ ನೆರವು: ಎಂ. ಶ್ರೀನಿವಾಸ್'
  },
  mr: {
    label: 'Marathi',
    nativeName: 'मराठी',
    tagline: 'शेतकऱ्याला व्यापारी शोधण्याची गरज नाही. खरेदीदाराची मागणी थेट फोनवर येते. फक्त स्वीकारा किंवा नाकारा.',
    buyerRequirementTitle: 'सत्यापित खरेदीदाराची मागणी थेट आपल्या फोनवर',
    buyerName: 'अर्बनफोर्क किचन्स (हैदराबाद हब)',
    cropDetails: 'टोमॅटो (ग्रेड A - दर्जेदार माल)',
    quantity: 'आपल्या पिकातून 500 किलो आवश्यक',
    rate: 'रु 24.00 प्रति किलो (थेट शेतभाव)',
    totalPayout: 'रु 12,000 थेट बँक खात्यात जमा',
    deliveryDate: '28 सप्टेंबर 2026',
    hubLocation: 'संकलन केंद्र: चेवेल्ला एफपीओ केंद्र',
    acceptButtonText: 'ऑर्डर स्वीकारा',
    rejectButtonText: 'नाकारा',
    acceptedSuccessTitle: 'ऑर्डर यशस्वीरीत्या स्वीकारली',
    acceptedSuccessDesc: 'रु 12,000 एस्क्रो खात्यात सुरक्षित. 28 सप्टेंबर रोजी सकाळी 6:30 वाजता गाडी उपलब्ध होईल. दलाली 0%.',
    rejectedTitle: 'ऑर्डर नाकारली',
    rejectedDesc: 'मागणी पुढील जवळच्या शेतकरी समूहाकडे वर्ग केली आहे.',
    assistedCallout: 'ग्राम किसान समन्वयक सहाय्य: एम. श्रीनिवास'
  }
};

export const AssistedPushDemandShowcase: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('te');
  const [orderState, setOrderState] = useState<'PENDING' | 'ACCEPTED' | 'REJECTED'>('PENDING');

  const content = REGIONAL_CONTENT[selectedLang];

  const handleAccept = () => {
    setOrderState('ACCEPTED');
  };

  const handleReject = () => {
    setOrderState('REJECTED');
  };

  const handleReset = () => {
    setOrderState('PENDING');
  };

  return (
    <div className="bg-warm-cream border-brutal-thick p-6 sm:p-10 shadow-brutal-lg max-w-5xl mx-auto space-y-8">
      
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-ink-black">
          <span className="bg-farm-green text-harvest-yellow font-mono text-xs font-bold px-3 py-1 border-2 border-ink-black shadow-brutal-sm uppercase inline-flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> ASSISTED ONBOARDING AND PUSH-DEMAND MODEL
          </span>
          <span className="font-mono text-xs font-bold text-gray-700">
            ZERO COMPLEXITY FOR THE FARMER
          </span>
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-ink-black leading-tight">
          THE FARMER DOES NOT SEARCH FOR BUYERS. <br />
          <span className="text-farm-green">THE DEMAND COMES DIRECTLY TO THE FARMER.</span>
        </h2>

        <p className="font-body text-sm sm:text-base text-gray-800 font-medium leading-relaxed max-w-3xl">
          We do not put the burden of software, bidding, or buyer prospecting on the farmer. 
          Through local FPO field coordinators and a native regional-language interface, buyers post verified requirements, 
          and the matched farmer simply taps Accept or Reject.
        </p>
      </div>

      {/* Regional Language Selector Bar */}
      <div className="bg-paper-white border-brutal p-4 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink-black uppercase">
          <Languages className="w-4 h-4 text-farm-green" />
          <span>SELECT FARMER INTERFACE LANGUAGE:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(REGIONAL_CONTENT) as LanguageCode[]).map((code) => {
            const isSelected = selectedLang === code;
            return (
              <button
                key={code}
                onClick={() => {
                  setSelectedLang(code);
                  setOrderState('PENDING');
                }}
                className={`px-3.5 py-1.5 font-heading text-xs font-bold border-2 transition-all ${
                  isSelected
                    ? 'bg-harvest-yellow text-ink-black border-ink-black shadow-brutal-sm -translate-y-0.5'
                    : 'bg-warm-cream text-ink-black border-ink-black/40 hover:border-ink-black'
                }`}
              >
                {REGIONAL_CONTENT[code].nativeName} ({REGIONAL_CONTENT[code].label})
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Mobile Push Notification Simulation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: The Farmer 1-Tap Accept / Reject Card */}
        <div className="lg:col-span-7 bg-paper-white border-brutal-thick p-5 sm:p-6 shadow-brutal space-y-4 relative">
          <WashiTape color="yellow" className="-top-3 left-10 z-10" />
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-farm-green" />
              <span className="font-mono text-xs font-bold text-ink-black uppercase">
                FARMER DEVICE NOTIFICATION
              </span>
              <SketchAnnotation text="ONE-TAP CONTRACT" color="orange" className="text-xs font-bold -rotate-1 hidden sm:inline-block ml-2" />
            </div>
            <span className="bg-harvest-yellow text-ink-black font-mono text-[10px] font-bold px-2 py-0.5 border border-ink-black">
              SMS / WHATSAPP / APP
            </span>
          </div>

          {/* Push Content */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-2.5 bg-warm-cream border border-ink-black font-bold text-farm-green text-[11px] uppercase">
              {content.buyerRequirementTitle}
            </div>

            <div className="space-y-1.5 text-gray-800">
              <div className="flex items-start justify-between gap-2">
                <span className="text-gray-500 font-semibold">BUYER:</span>
                <span className="font-bold text-right text-ink-black">{content.buyerName}</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-gray-500 font-semibold">COMMODITY:</span>
                <strong className="font-heading font-black text-sm text-ink-black">{content.cropDetails}</strong>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-gray-500 font-semibold">QUANTITY:</span>
                <strong className="font-bold text-farm-green">{content.quantity}</strong>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-gray-500 font-semibold">AGREED RATE:</span>
                <strong className="font-bold text-ink-black">{content.rate}</strong>
              </div>
              <div className="flex items-start justify-between gap-2 pt-2 border-t border-gray-300">
                <span className="text-gray-600 font-bold">TOTAL PAYOUT:</span>
                <span className="font-heading font-black text-base text-farm-green bg-green-50 px-2 py-0.5 border border-green-300">
                  {content.totalPayout}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2 pt-1 text-[11px] text-gray-600">
                <span>SCHEDULE:</span>
                <span>{content.deliveryDate}</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-[11px] text-gray-600">
                <span>LOGISTICS:</span>
                <span>{content.hubLocation}</span>
              </div>
            </div>
          </div>

          {/* Accept / Reject Action Area */}
          {orderState === 'PENDING' && (
            <div className="pt-4 border-t-2 border-ink-black grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={handleAccept}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-heading font-black bg-farm-green"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>{content.acceptButtonText}</span>
              </Button>

              <Button
                variant="white"
                size="md"
                onClick={handleReject}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-heading font-bold"
              >
                <X className="w-5 h-5 stroke-[3] text-rust-red" />
                <span>{content.rejectButtonText}</span>
              </Button>
            </div>
          )}

          {orderState === 'ACCEPTED' && (
            <div className="pt-4 border-t-2 border-ink-black space-y-3">
              <div className="p-4 bg-green-50 border-2 border-farm-green text-farm-green space-y-1 font-mono text-xs relative">
                <RubberStamp text="DIRECT SALE ✓" variant="green" className="absolute top-3 right-3" />
                <div className="flex items-center gap-2 font-heading font-black text-sm uppercase">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{content.acceptedSuccessTitle}</span>
                </div>
                <p className="text-[11px] text-gray-800 leading-relaxed font-sans max-w-sm">
                  {content.acceptedSuccessDesc}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>
                RESET SIMULATION
              </Button>
            </div>
          )}

          {orderState === 'REJECTED' && (
            <div className="pt-4 border-t-2 border-ink-black space-y-3">
              <div className="p-4 bg-amber-50 border-2 border-amber-600 text-amber-900 space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2 font-heading font-black text-sm uppercase">
                  <X className="w-4 h-4 stroke-[3]" />
                  <span>{content.rejectedTitle}</span>
                </div>
                <p className="text-[11px] text-gray-800 leading-relaxed font-sans">
                  {content.rejectedDesc}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>
                RESET SIMULATION
              </Button>
            </div>
          )}

        </div>

        {/* Right 5 Cols: Assisted Onboarding & Operational Safeguards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-5 bg-warm-cream border-brutal space-y-3 relative">
            <WashiTape color="blue" className="-top-2.5 right-6 z-10" />
            <span className="bg-ink-black text-harvest-yellow font-mono text-[10px] font-bold px-2 py-0.5 uppercase block w-fit">
              STEP 1: ASSISTED ONBOARDING
            </span>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              NO APP DOWNLOAD REQUIRED
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              Village FPO coordinators visit the farm with a tablet. They verify the Kisan ID, plot acreage, crop cycle, and bank account in 60 seconds.
            </p>
            <div className="pt-1 font-mono text-[11px] font-bold text-farm-green flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{content.assistedCallout}</span>
            </div>
          </div>

          <div className="p-5 bg-paper-white border-brutal space-y-3 relative">
            <WashiTape color="red" className="-top-2.5 left-6 z-10" />
            <span className="bg-farm-green text-paper-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase block w-fit">
              STEP 2: ZERO-SEARCH SELLING
            </span>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              ALGORITHMIC DISPATCH
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              When institutional buyers like hotels or supermarkets log verified demand, our engine identifies available capacity in nearby village clusters and pushes direct contracts.
            </p>
            <div className="pt-1 font-mono text-[11px] font-bold text-ink-black flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-farm-green" />
              <span>COORDINATED LOGISTICS PICKUP</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
