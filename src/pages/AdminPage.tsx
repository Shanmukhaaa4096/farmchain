import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ExternalLink, 
  Clock, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (view: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { 
    currentUser, 
    getAllUsers, 
    approveVerification, 
    rejectVerification,
    quickLoginAs 
  } = useAuth();

  const [users, setUsers] = useState(getAllUsers());
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('pending');
  const [selectedUserForReject, setSelectedUserForReject] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Document scan was illegible. Please re-upload clear photo.');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const refreshUsers = () => {
    setUsers(getAllUsers());
  };

  const handleApprove = async (userId: string) => {
    await approveVerification(userId);
    refreshUsers();
    setActionNotice(`User ${userId} marked as VERIFIED.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleRejectConfirm = async (userId: string) => {
    await rejectVerification(userId, rejectReason);
    setSelectedUserForReject(null);
    refreshUsers();
    setActionNotice(`User ${userId} verification marked as REJECTED.`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const pendingCount = users.filter(u => u.verificationStatus === 'pending').length;
  const verifiedCount = users.filter(u => u.verificationStatus === 'verified').length;
  const farmerCount = users.filter(u => u.role === 'farmer').length;
  const buyerCount = users.filter(u => u.role === 'buyer').length;

  const filteredUsers = users.filter(u => {
    if (activeFilter === 'all') return true;
    return u.verificationStatus === activeFilter;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2F4A3A]/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Smart India Hackathon • Compliance Oversight</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#2F4A3A]">
            FarmChain Security & Verification Desk
          </h1>
          <p className="text-sm text-[#536458] mt-1 font-sans">
            Validate farmer land records, Kisan IDs, and buyer GST credentials for zero-fraud direct trading.
          </p>
        </div>

        {/* Quick Simulator Switch for Evaluators */}
        <div className="flex flex-wrap items-center gap-2 bg-[#FBF8F2] p-2 rounded-2xl border border-[#2F4A3A]/10">
          <span className="text-xs font-mono uppercase text-[#536458] px-2 font-bold">Preview As:</span>
          <button
            onClick={() => { quickLoginAs('farmer'); onNavigate('farmer'); }}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#2F4A3A]/10 text-xs font-semibold text-[#2F4A3A] hover:bg-[#C77B58] hover:text-white transition-colors"
          >
            Farmer
          </button>
          <button
            onClick={() => { quickLoginAs('buyer'); onNavigate('buyer'); }}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#2F4A3A]/10 text-xs font-semibold text-[#2F4A3A] hover:bg-[#C77B58] hover:text-white transition-colors"
          >
            Buyer
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-2xl shadow-soft-sm">
          <span className="text-xs font-mono uppercase text-[#536458] block">Pending Review</span>
          <div className="text-3xl font-serif font-bold text-[#C77B58] mt-1">{pendingCount}</div>
          <span className="text-[11px] text-[#536458] mt-1 block">Awaiting KYC Approval</span>
        </Card>
        <Card className="p-5 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-2xl shadow-soft-sm">
          <span className="text-xs font-mono uppercase text-[#536458] block">Verified Accounts</span>
          <div className="text-3xl font-serif font-bold text-[#2F4A3A] mt-1">{verifiedCount}</div>
          <span className="text-[11px] text-[#536458] mt-1 block">Cleared to Trade</span>
        </Card>
        <Card className="p-5 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-2xl shadow-soft-sm">
          <span className="text-xs font-mono uppercase text-[#536458] block">Registered Farmers</span>
          <div className="text-3xl font-serif font-bold text-[#2F4A3A] mt-1">{farmerCount}</div>
          <span className="text-[11px] text-[#536458] mt-1 block">Village Producers</span>
        </Card>
        <Card className="p-5 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-2xl shadow-soft-sm">
          <span className="text-xs font-mono uppercase text-[#536458] block">Verified Buyers</span>
          <div className="text-3xl font-serif font-bold text-[#2F4A3A] mt-1">{buyerCount}</div>
          <span className="text-[11px] text-[#536458] mt-1 block">Wholesale Entities</span>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter('pending')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold transition-all ${
            activeFilter === 'pending'
              ? 'bg-[#C77B58] text-white shadow-soft-sm'
              : 'bg-[#FBF8F2] text-[#536458] hover:bg-white border border-[#2F4A3A]/10'
          }`}
        >
          Pending Queue ({pendingCount})
        </button>
        <button
          onClick={() => setActiveFilter('verified')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold transition-all ${
            activeFilter === 'verified'
              ? 'bg-[#2F4A3A] text-white shadow-soft-sm'
              : 'bg-[#FBF8F2] text-[#536458] hover:bg-white border border-[#2F4A3A]/10'
          }`}
        >
          Verified Traders ({verifiedCount})
        </button>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#2F4A3A] text-white shadow-soft-sm'
              : 'bg-[#FBF8F2] text-[#536458] hover:bg-white border border-[#2F4A3A]/10'
          }`}
        >
          All Users ({users.length})
        </button>
      </div>

      {/* Verification Queue List */}
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <Card className="p-12 text-center bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-[28px]">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#2F4A3A]">
              Queue Clear
            </h3>
            <p className="text-xs text-[#536458] mt-1">
              No trader accounts in {activeFilter} status right now.
            </p>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="p-5 sm:p-6 bg-[#FBF8F2] border border-[#2F4A3A]/10 rounded-2xl hover:shadow-soft-sm transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#2F4A3A]/10 flex items-center justify-center text-[#2F4A3A] shrink-0 font-serif font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-serif font-bold text-base text-[#2F4A3A]">
                      {user.name}
                    </h4>
                    <Badge variant={user.role === 'farmer' ? 'primary' : 'neutral'}>
                      {user.role.toUpperCase()}
                    </Badge>
                    <Badge variant={
                      user.verificationStatus === 'verified'
                        ? 'success'
                        : user.verificationStatus === 'pending'
                        ? 'warning'
                        : 'error'
                    }>
                      {user.verificationStatus || 'pending'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-[#536458] mt-2">
                    <div>
                      <strong className="text-[#2F4A3A]">Mobile:</strong> +91 {user.mobileNumber}
                    </div>
                    <div>
                      <strong className="text-[#2F4A3A]">Identifier:</strong> {user.identifier}
                    </div>
                    <div>
                      <strong className="text-[#2F4A3A]">Location:</strong> {user.location || 'Chevella, Telangana'}
                    </div>
                  </div>

                  {user.organization && (
                    <div className="text-xs text-[#536458] mt-1">
                      <strong className="text-[#2F4A3A]">Entity:</strong> {user.organization}
                    </div>
                  )}

                  {user.verificationDocUrl && (
                    <div className="mt-2 inline-flex items-center gap-1 text-xs font-mono text-[#C77B58] hover:underline">
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Uploaded KYC Document</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                {user.verificationStatus !== 'verified' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(user.id)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    <span>Approve</span>
                  </Button>
                )}

                {user.verificationStatus !== 'rejected' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedUserForReject(user.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" />
                    <span>Reject</span>
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Rejection Reason Modal */}
      {selectedUserForReject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full bg-[#FBF8F2] border border-[#2F4A3A]/15 rounded-[28px] p-6 shadow-soft-lg">
            <h3 className="font-serif font-bold text-lg text-[#2F4A3A] mb-2">
              Reject Verification Submission
            </h3>
            <p className="text-xs text-[#536458] mb-4">
              Specify reason provided to the trader so they can upload correct documents.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-[#2F4A3A]/15 text-[#2F4A3A] text-sm focus:outline-none focus:border-[#C77B58] mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedUserForReject(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleRejectConfirm(selectedUserForReject)}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
