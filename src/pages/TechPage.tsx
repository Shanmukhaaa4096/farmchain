import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Zap, 
  Activity, 
  RotateCcw, 
  Server, 
  Layers, 
  CheckCircle2, 
  Lock, 
  KeyRound, 
  FileText,
  Clock,
  ArrowRight,
  Terminal,
  Play,
  Cpu,
  Code
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { db, SystemMetrics, AuditLogEntry } from '../services/db';

interface TechPageProps {
  onNavigate?: (view: string) => void;
}

export const TechPage: React.FC<TechPageProps> = ({ onNavigate }) => {
  const [metrics, setMetrics] = useState<SystemMetrics>(db.getMetrics());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(db.getAuditLogs());
  const [benchmarkResult, setBenchmarkResult] = useState<any | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [backupAlert, setBackupAlert] = useState<string | null>(null);

  const runBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      const res = db.simulate10kQueryBenchmark();
      setBenchmarkResult(res);
      setIsBenchmarking(false);
    }, 600);
  };

  const handleBackup = () => {
    const res = db.triggerManualBackup();
    setMetrics(db.getMetrics());
    setAuditLogs(db.getAuditLogs());
    setBackupAlert(`Backup snapshot ${res.snapshotId} generated and SHA-256 verified in ${res.durationMs}ms.`);
    setTimeout(() => setBackupAlert(null), 5000);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#F4EFE6] min-h-screen text-[#2F4A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-[#2F4A3A]/10 pb-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="bg-[#2F4A3A] text-[#FBF8F2] px-3 py-1 rounded-full uppercase flex items-center gap-1.5 shadow-soft-sm">
              <Database className="w-3.5 h-3.5" /> TECH &amp; DESIGN SPECIFICATION
            </span>
            <span className="text-[#2F4A3A]/75 bg-[#FBF8F2] border border-[#2F4A3A]/10 px-3 py-1 rounded-full">
              POSTGRESQL 16 + PGBOUNCER + SUPABASE RLS
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-editorial font-bold text-3xl sm:text-5xl tracking-tight text-[#163323] leading-none">
                System Architecture &amp; Benchmarks
              </h1>
              <p className="font-sans text-xs sm:text-base text-[#536458] mt-2 max-w-2xl leading-relaxed">
                Technical foundation of FarmChain: Normalized relational data model, cryptographic audit logs, simulated high-concurrency benchmarks, and strict Row-Level Security.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackup}
                className="text-xs uppercase font-semibold font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Trigger Backup
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={isBenchmarking}
                onClick={runBenchmark}
                className="text-xs uppercase font-semibold font-mono"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" /> {isBenchmarking ? 'Simulating...' : 'Run 10k Query Benchmark'}
              </Button>
            </div>
          </div>

          {backupAlert && (
            <div className="p-3 bg-[#A8B89A]/25 border border-[#A8B89A]/50 rounded-xl text-xs font-mono text-[#163323] flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-[#2F4A3A] shrink-0" />
              <span>{backupAlert}</span>
            </div>
          )}
        </div>

        {/* Live System Telemetry Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card variant="paper" className="p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#536458] uppercase">Active Connection Pool</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#163323]">
                {metrics.activeConnections}
              </span>
              <span className="text-xs text-[#536458] font-mono">/ {metrics.maxPoolSize} Max</span>
            </div>
            <div className="w-full bg-[#2F4A3A]/10 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-[#2F4A3A] h-full rounded-full transition-all duration-500" 
                style={{ width: `${(metrics.activeConnections / metrics.maxPoolSize) * 100}%` }}
              />
            </div>
          </Card>

          <Card variant="paper" className="p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#536458] uppercase">Avg Query Execution</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#2F4A3A]">
                {metrics.p99LatencyMs}ms
              </span>
              <span className="text-xs text-[#2F4A3A] font-mono">p99 &lt; 8.2ms</span>
            </div>
            <span className="text-[10px] font-mono text-[#536458] block mt-1">Indexed B-Tree &amp; GiST scans</span>
          </Card>

          <Card variant="paper" className="p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#536458] uppercase">Cache Hit Ratio</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#C77B58]">
                {metrics.cacheHitRatio}%
              </span>
              <span className="text-xs text-[#C77B58] font-mono">Buffer Cache</span>
            </div>
            <span className="text-[10px] font-mono text-[#536458] block mt-1">Shared buffers 4GB pre-warmed</span>
          </Card>

          <Card variant="paper" className="p-5 space-y-1">
            <span className="text-[10px] font-mono text-[#536458] uppercase">Last Snapshot Status</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-lg sm:text-xl font-bold text-[#163323] truncate">
                {metrics.lastBackupTimestamp}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#536458] block mt-1">Wal-G Continuous Archiving</span>
          </Card>
        </div>

        {/* Interactive Benchmark Simulation Modal / Results */}
        {benchmarkResult && (
          <div className="p-6 rounded-2xl bg-[#163323] text-[#FBF8F2] border border-[#163323] shadow-soft-lg space-y-4 font-mono text-xs animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#FBF8F2]/15 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#E5B94A]" />
                <span className="font-bold text-sm text-[#FBF8F2]">
                  10,000 CONCURRENT TRANSACTION SIMULATION RESULT
                </span>
              </div>
              <Badge variant="green" size="sm">PASSED // 0 DROPPED</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[#A8B89A] text-[10px] block">Execution Duration</span>
                <strong className="text-lg text-[#FBF8F2]">{benchmarkResult.durationMs}ms</strong>
              </div>
              <div>
                <span className="text-[#A8B89A] text-[10px] block">Throughput (TPS)</span>
                <strong className="text-lg text-[#E5B94A]">{benchmarkResult.queriesPerSecond.toLocaleString()} TPS</strong>
              </div>
              <div>
                <span className="text-[#A8B89A] text-[10px] block">p95 Latency</span>
                <strong className="text-lg text-[#FBF8F2]">{benchmarkResult.p95LatencyMs}ms</strong>
              </div>
              <div>
                <span className="text-[#A8B89A] text-[10px] block">Connection Efficiency</span>
                <strong className="text-lg text-[#A8B89A]">99.8% PgBouncer Pooled</strong>
              </div>
            </div>
          </div>
        )}

        {/* Database Schema Entities Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-2xl font-bold text-[#163323]">
              Relational Schema Architecture
            </h2>
            <span className="font-mono text-xs text-[#536458]">6 Core Relational Entities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="paper" className="p-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F4A3A]/10">
                <strong className="font-editorial text-base text-[#163323] font-bold">1. profiles</strong>
                <span className="text-[10px] text-[#2F4A3A] bg-[#2F4A3A]/10 px-2 py-0.5 rounded font-bold">RLS PROTECTED</span>
              </div>
              <p className="text-[11px] text-[#536458] font-sans">
                Identity records linked to Supabase auth.users. Role-based constraints for farmers, buyers, logistics, and admin.
              </p>
              <div className="text-[10px] text-[#2F4A3A]/80 space-y-1 bg-[#F4EFE6] p-2.5 rounded-lg border border-[#2F4A3A]/10">
                <div>• id (UUID, PK -&gt; auth.users)</div>
                <div>• role ('farmer' | 'buyer' | 'logistics' | 'admin')</div>
                <div>• kyc_status ('verified' | 'pending' | 'unverified')</div>
                <div>• location (GEOGRAPHY(Point, 4326))</div>
              </div>
            </Card>

            <Card variant="paper" className="p-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F4A3A]/10">
                <strong className="font-editorial text-base text-[#163323] font-bold">2. listings</strong>
                <span className="text-[10px] text-[#2F4A3A] bg-[#2F4A3A]/10 px-2 py-0.5 rounded font-bold">PUBLIC READ</span>
              </div>
              <p className="text-[11px] text-[#536458] font-sans">
                Active farm-gate produce lots. GIST spatial index on village coordinates for nearest-mile routing.
              </p>
              <div className="text-[10px] text-[#2F4A3A]/80 space-y-1 bg-[#F4EFE6] p-2.5 rounded-lg border border-[#2F4A3A]/10">
                <div>• id (TEXT, PK, 'lot-xxx')</div>
                <div>• farmer_id (UUID -&gt; profiles.id)</div>
                <div>• quantity_kg (NUMERIC CHECK &gt; 0)</div>
                <div>• price_per_kg (NUMERIC CHECK &gt; 0)</div>
              </div>
            </Card>

            <Card variant="paper" className="p-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F4A3A]/10">
                <strong className="font-editorial text-base text-[#163323] font-bold">3. demands</strong>
                <span className="text-[10px] text-[#2F4A3A] bg-[#2F4A3A]/10 px-2 py-0.5 rounded font-bold">BUYER MANAGED</span>
              </div>
              <p className="text-[11px] text-[#536458] font-sans">
                Commercial purchase requirements with quality specifications and target price limits.
              </p>
              <div className="text-[10px] text-[#2F4A3A]/80 space-y-1 bg-[#F4EFE6] p-2.5 rounded-lg border border-[#2F4A3A]/10">
                <div>• id (TEXT, PK, 'DEM-xxx')</div>
                <div>• buyer_id (UUID -&gt; profiles.id)</div>
                <div>• required_date (DATE)</div>
                <div>• status ('OPEN' | 'PARTIALLY_MATCHED' | 'FULFILLED')</div>
              </div>
            </Card>

            <Card variant="paper" className="p-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F4A3A]/10">
                <strong className="font-editorial text-base text-[#163323] font-bold">4. orders</strong>
                <span className="text-[10px] text-[#C77B58] bg-[#C77B58]/10 px-2 py-0.5 rounded font-bold">MUTUAL PARTIES</span>
              </div>
              <p className="text-[11px] text-[#536458] font-sans">
                5-stage state machine tracking Safe Payment locks, digital weighment slips, and bank payouts.
              </p>
              <div className="text-[10px] text-[#2F4A3A]/80 space-y-1 bg-[#F4EFE6] p-2.5 rounded-lg border border-[#2F4A3A]/10">
                <div>• id (UUID, PK)</div>
                <div>• status ('offered' | 'accepted' | 'scheduled' | 'delivered' | 'paid')</div>
                <div>• escrow_amount (NUMERIC)</div>
                <div>• weighment_slip_hash (SHA-256)</div>
              </div>
            </Card>

            <Card variant="paper" className="p-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F4A3A]/10">
                <strong className="font-editorial text-base text-[#163323] font-bold">5. audit_logs</strong>
                <span className="text-[10px] text-[#163323] bg-[#163323]/10 px-2 py-0.5 rounded font-bold">APPEND ONLY</span>
              </div>
              <p className="text-[11px] text-[#536458] font-sans">
                Tamper-evident chronological audit trail for administrative compliance and dispute resolution.
              </p>
              <div className="text-[10px] text-[#2F4A3A]/80 space-y-1 bg-[#F4EFE6] p-2.5 rounded-lg border border-[#2F4A3A]/10">
                <div>• id (UUID, PK)</div>
                <div>• actor_id (UUID -&gt; profiles.id)</div>
                <div>• action (TEXT)</div>
                <div>• payload_hash (SHA-256)</div>
              </div>
            </Card>

            <Card variant="paper" className="p-6 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#2F4A3A]/10">
                <strong className="font-editorial text-base text-[#163323] font-bold">6. mandi_cache</strong>
                <span className="text-[10px] text-[#2F4A3A] bg-[#2F4A3A]/10 px-2 py-0.5 rounded font-bold">READ ONLY</span>
              </div>
              <p className="text-[11px] text-[#536458] font-sans">
                Hourly synced APMC / Agmarknet mandi market rates cached in PostgreSQL memory with TTL.
              </p>
              <div className="text-[10px] text-[#2F4A3A]/80 space-y-1 bg-[#F4EFE6] p-2.5 rounded-lg border border-[#2F4A3A]/10">
                <div>• crop (TEXT)</div>
                <div>• mandi_name (TEXT)</div>
                <div>• modal_price (NUMERIC)</div>
                <div>• updated_at (TIMESTAMPTZ)</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Cryptographic Audit Trail View */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-editorial text-2xl font-bold text-[#163323]">
              Cryptographic Audit Stream
            </h2>
            <span className="font-mono text-xs text-[#536458]">Tamper-Evident SHA-256 Chain</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#FBF8F2] border border-[#2F4A3A]/15 shadow-soft font-mono text-xs space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#2F4A3A]/10 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#536458]">{log.timestamp}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#2F4A3A]/10 text-[#2F4A3A] font-bold text-[10px]">
                    {log.action}
                  </span>
                  <span className="text-[#163323] text-xs">{log.details}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#536458]">
                  <span>actor: {log.actor}</span>
                  <span className="text-[#C77B58] font-mono">{log.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
