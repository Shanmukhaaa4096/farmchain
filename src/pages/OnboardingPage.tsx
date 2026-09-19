import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { 
  CheckCircle2, 
  UploadCloud, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Building2, 
  Sprout, 
  AlertCircle,
  FileCheck,
  Clock
} from 'lucide-react';

interface OnboardingPageProps {
  onNavigate: (view: string) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
  const { currentUser, updateProfile, submitVerification } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(
    currentUser?.verificationStatus === 'pending' || currentUser?.verificationStatus === 'verified' ? 3 : 1
  );

  const role = currentUser?.role || 'farmer';

  // Farmer form state
  const [village, setVillage] = useState(currentUser?.location?.split(',')[0] || 'Chevella');
  const [district, setDistrict] = useState('Ranga Reddy');
  const [stateName, setStateName] = useState('Telangana');
  const [landAcreage, setLandAcreage] = useState('4.5');
  const [crops, setCrops] = useState('Tomato, Chili, Cotton');
  const [fpoName, setFpoName] = useState(currentUser?.organization || 'Chevella Kisan Producer Co-op');

  // Buyer form state
  const [businessName, setBusinessName] = useState(currentUser?.organization || 'UrbanFork Kitchens');
  const [businessType, setBusinessType] = useState('Wholesale Trader');
  const [gstin, setGstin] = useState('36AAACU9120K1Z9');
  const [hubLocation, setHubLocation] = useState(currentUser?.location || 'Gachibowli Logistics Hub, Hyderabad');

  // Document upload state
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docPreviewUrl, setDocPreviewUrl] = useState<string | null>(currentUser?.verificationDocUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size exceeds 5MB limit. Please upload a smaller document.');
        return;
      }
      setDocFile(file);
      setSubmitError(null);
      const fakeUrl = URL.createObjectURL(file);
      setDocPreviewUrl(fakeUrl);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const locationString = role === 'farmer' ? `${village}, ${district}, ${stateName}` : hubLocation;
      const orgString = role === 'farmer' ? fpoName : businessName;

      // Simulated secure document storage upload
      const docPath = docPreviewUrl || `https://farmchain-docs.storage/verifications/${currentUser?.id || 'demo'}_kyc.pdf`;

      await submitVerification(docPath, {
        organization: orgString,
        location: locationString,
      });

      setIsSubmitting(false);
      setStep(3);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError('Failed to record verification submission. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C77B58]/10 text-[#C77B58] text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Smart India Hackathon • Trust Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2F4A3A] tracking-tight">
          {role === 'farmer' ? 'Farmer KYC & Land Verification' : 'Commercial Buyer Onboarding'}
        </h1>
        <p className="mt-2 text-base text-[#536458] max-w-xl mx-auto font-sans">
          To maintain 0% broker fee and guaranteed direct bank payouts, all traders verify identity credentials.
        </p>

        {/* Progress Stepper */}
        <div className="mt-8 max-w-md mx-auto flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#2F4A3A]/10 -translate-y-1/2 z-0" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              step >= 1 ? 'bg-[#C77B58] text-white shadow-soft-sm' : 'bg-[#FBF8F2] border border-[#2F4A3A]/20 text-[#536458]'
            }`}>
              1
            </div>
            <span className="text-[11px] font-mono mt-1 text-[#2F4A3A] font-semibold">Entity Info</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              step >= 2 ? 'bg-[#C77B58] text-white shadow-soft-sm' : 'bg-[#FBF8F2] border border-[#2F4A3A]/20 text-[#536458]'
            }`}>
              2
            </div>
            <span className="text-[11px] font-mono mt-1 text-[#2F4A3A] font-semibold">Verification Doc</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              step >= 3 ? 'bg-[#2F4A3A] text-white shadow-soft-sm' : 'bg-[#FBF8F2] border border-[#2F4A3A]/20 text-[#536458]'
            }`}>
              3
            </div>
            <span className="text-[11px] font-mono mt-1 text-[#2F4A3A] font-semibold">Confirmation</span>
          </div>
        </div>
      </div>

      {/* STEP 1: ENTITY DETAILS FORM */}
      {step === 1 && (
        <Card className="p-6 sm:p-8 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-[28px] shadow-soft-lg">
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2F4A3A]/10">
              <div className="w-10 h-10 rounded-2xl bg-[#C77B58]/10 text-[#C77B58] flex items-center justify-center">
                {role === 'farmer' ? <Sprout className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2F4A3A]">
                  {role === 'farmer' ? 'Agricultural Holding Details' : 'Commercial Trade Registration'}
                </h3>
                <p className="text-xs text-[#536458]">
                  {role === 'farmer' ? 'Specify your primary cultivation acreage and village cluster' : 'Confirm company GSTIN and regional fulfillment centers'}
                </p>
              </div>
            </div>

            {role === 'farmer' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    Village / Hamlet *
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    District *
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    Total Cultivated Land (Acres) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={landAcreage}
                    onChange={(e) => setLandAcreage(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    Primary Crops Grown *
                  </label>
                  <input
                    type="text"
                    value={crops}
                    onChange={(e) => setCrops(e.target.value)}
                    placeholder="e.g. Tomatoes, Chilies, Onions"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    FPO or Farmers Cooperative Affiliation (Optional)
                  </label>
                  <input
                    type="text"
                    value={fpoName}
                    onChange={(e) => setFpoName(e.target.value)}
                    placeholder="e.g. Ranga Reddy Agri Producers Society"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    Company / Entity Trade Name *
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    Buyer Business Type *
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  >
                    <option value="Wholesale Trader">Wholesale Trader</option>
                    <option value="Restaurant Chain">Restaurant Chain</option>
                    <option value="Food Processing Corp">Food Processing Corp</option>
                    <option value="Retail Supermarket">Retail Supermarket</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    GSTIN Identification Number *
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="36AAACU9120K1Z9"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm font-mono focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#536458] mb-1">
                    Primary Receiving Hub Location *
                  </label>
                  <input
                    type="text"
                    value={hubLocation}
                    onChange={(e) => setHubLocation(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] focus:ring-2 focus:ring-[#C77B58]/10"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-[#2F4A3A]/10">
              <Button variant="primary" size="lg" type="submit">
                <span>Continue to Document Upload</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* STEP 2: DOCUMENT UPLOAD */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-[28px] shadow-soft-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2F4A3A]/10">
              <div className="w-10 h-10 rounded-2xl bg-[#C77B58]/10 text-[#C77B58] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2F4A3A]">
                  {role === 'farmer' ? 'Upload Kisan Passbook or Land Record' : 'Upload GSTIN Certificate / Trade License'}
                </h3>
                <p className="text-xs text-[#536458]">
                  Supported formats: PDF, PNG, JPG (Max 5MB). Encrypted with private owner-only access.
                </p>
              </div>
            </div>

            {submitError && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="border-2 border-dashed border-[#2F4A3A]/20 rounded-3xl p-8 text-center bg-white hover:bg-[#F4EFE6]/30 transition-colors">
              <input
                type="file"
                id="kyc-doc-file"
                accept=".pdf,image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="kyc-doc-file" className="cursor-pointer flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#C77B58]/10 text-[#C77B58] flex items-center justify-center mb-3">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <span className="font-serif font-bold text-base text-[#2F4A3A] mb-1">
                  {docFile ? docFile.name : 'Choose a file or drag & drop here'}
                </span>
                <span className="text-xs text-[#536458]">
                  {docFile ? `${(docFile.size / 1024 / 1024).toFixed(2)} MB • Ready to verify` : 'Kisan Credit Card, PM-Kisan receipt, or GST registration copy'}
                </span>
                <span className="mt-4 px-4 py-2 rounded-full bg-[#F4EFE6] text-[#2F4A3A] font-mono text-xs font-semibold hover:bg-[#C77B58] hover:text-white transition-colors">
                  Browse Device Files
                </span>
              </label>
            </div>

            {docPreviewUrl && (
              <div className="p-4 rounded-2xl bg-[#A8B89A]/15 border border-[#A8B89A]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-[#2F4A3A]" />
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-[#2F4A3A] block">
                      Uploaded Proof Document
                    </span>
                    <span className="text-xs text-[#536458]">
                      {docFile?.name || 'verification_document.pdf'}
                    </span>
                  </div>
                </div>
                <Badge variant="success">Attached</Badge>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#2F4A3A]/10">
              <Button variant="ghost" size="md" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back</span>
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Securing Submission...' : 'Submit for Verification'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 3: SUBMITTED CONFIRMATION */}
      {step === 3 && (
        <Card className="p-8 sm:p-10 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-[28px] shadow-soft-lg text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <Badge variant="warning" className="mb-4">
            <Clock className="w-3.5 h-3.5 mr-1" />
            Verification Review Pending
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2F4A3A] mb-2">
            Credentials Received for Review
          </h2>

          <p className="text-sm text-[#536458] max-w-md mx-auto mb-6 leading-relaxed">
            Your verification dossier has been queued with the FarmChain Security Desk. For Smart India Hackathon evaluation, review takes under 2 hours.
          </p>

          <div className="p-4 rounded-2xl bg-white border border-[#2F4A3A]/10 max-w-sm mx-auto text-left mb-8 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#536458]">Profile Name:</span>
              <span className="font-bold text-[#2F4A3A]">{currentUser?.name || 'Verified User'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#536458]">Identifier:</span>
              <span className="font-mono font-bold text-[#2F4A3A]">{currentUser?.identifier}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#536458]">Current Status:</span>
              <span className="font-bold text-amber-600">Pending Review</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate(role === 'farmer' ? 'farmer' : 'buyer')}
            >
              Go to My Dashboard
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('marketplace')}
            >
              Browse Live Marketplace
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
