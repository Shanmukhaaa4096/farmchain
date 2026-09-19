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
  Terminal
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { db, AuditLogEntry } from '../services/db';

export const DatabasePage: React.FC = () => {
  const designTargets = db.getDesignTargets();
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(db.getAuditLogs());
  const [backupAlert, setBackupAlert] = useState<string | null>(null);

  const handleBackup = () => {
    const res = db.triggerManualBackup();
    setAuditLogs(db.getAuditLogs());
    setBackupAlert(`Backup simulation ${res.snapshotId} triggered in ${res.durationMs}ms. (Design simulation — not a live system action.)`);
    setTimeout(() => setBackupAlert(null), 5000);
  };

  return (
    <div className="py-10 sm:py-16 bg-paper-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 border-b border-dark-text/10 pb-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="bg-farm-green text-pure-white px-3 py-1 rounded-full uppercase flex items-center gap-1.5 shadow-soft-sm">
              <Database className="w-3.5 h-3.5" /> PRODUCTION DATABASE & SCALABILITY ARCHITECTURE
            </span>
            <span className="text-dark-text/75 bg-pure-white border border-dark-text/10 px-3 py-1 rounded-full">
              POSTGRESQL 16 + PGBOUNCER + POSTGIS
            </span>
          </div>

          <h1 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-dark-text max-w-3xl leading-[1.1]">
            Database Scalability & System Reliability
          </h1>

          <p className="font-sans text-sm sm:text-base text-dark-text/70 max-w-3xl leading-relaxed">
            Engineered to handle 10,000+ concurrent farmers and commercial buyers without performance degradation. 
            Features sub-10ms PostGIS radius queries, strict Argon2id security, token-bucket rate limiting, and automated point-in-time recovery.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft-sm">
            <span className="font-mono text-[10px] text-dark-text/60 block uppercase font-bold">PGBOUNCER POOL</span>
            <strong className="font-serif font-bold text-2xl text-dark-text block mt-1">
              {designTargets.maxConcurrentUsers} / {designTargets.maxPoolSize}
            </strong>
            <span className="font-mono text-[10px] text-farm-green font-bold">TRANSACTION POOLING MODE</span>
          </div>

          <div className="p-5 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft-sm">
            <span className="font-mono text-[10px] text-dark-text/60 block uppercase font-bold">P99 QUERY LATENCY</span>
            <strong className="font-serif font-bold text-2xl text-farm-green block mt-1">
              &lt;{designTargets.p99LatencyTargetMs} ms
            </strong>
            <span className="font-mono text-[10px] text-dark-text/60">DESIGN TARGET (p99)</span>
          </div>

          <div className="p-5 bg-pure-white rounded-2xl border border-dark-text/10 shadow-soft-sm">
            <span className="font-mono text-[10px] text-dark-text/60 block uppercase font-bold">CACHE HIT RATIO</span>
            <strong className="font-serif font-bold text-2xl text-dark-text block mt-1">
              {designTargets.pitRecoveryWindowHours}h PITR
            </strong>
            <span className="font-mono text-[10px] text-farm-green font-bold">POINT-IN-TIME RECOVERY</span>
          </div>

          <div className="p-5 bg-harvest-yellow/20 rounded-2xl border border-accent-yellow/40 shadow-soft-sm">
            <span className="font-mono text-[10px] text-dark-text/80 block uppercase font-bold">DISASTER RECOVERY</span>
            <strong className="font-serif font-bold text-xl text-dark-text block mt-1">
              RPO &lt; 5 MIN
            </strong>
            <span className="font-mono text-[10px] text-dark-text/70 font-bold">CONTINUOUS WAL ARCHIVE</span>
          </div>
        </div>

        {/* Scalability Architecture & System Targets */}
        <div className="bg-pure-white rounded-3xl border border-dark-text/10 p-6 sm:p-10 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-text/10">
            <div>
              <span className="font-mono text-xs font-bold text-farm-green uppercase block">
                DESIGN SPECIFICATION
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-dark-text">
                Scalability Architecture for Pilot Deployment
              </h2>
              <p className="text-xs text-dark-text/60 mt-1 font-sans">
                These are design targets — not live benchmark results. Actual performance depends on infrastructure and real traffic.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-3 font-sans text-xs text-dark-text/75 leading-relaxed">
              <h3 className="font-serif font-bold text-base text-dark-text">
                HOW FARMCHAIN HANDLES SCALE:
              </h3>
              <ul className="space-y-2 list-disc pl-4">
                <li>
                  <strong className="text-dark-text">Connection Multiplexing:</strong> Up to {designTargets.maxConcurrentUsers} concurrent pilot users share {designTargets.maxPoolSize} PostgreSQL connections via PgBouncer. Zero memory thrashing.
                </li>
                <li>
                  <strong className="text-dark-text">PostGIS Spatial Indexing:</strong> Radius queries (ST_DWithin) between farmer coordinates and delivery hubs utilize spatial GIST trees, bypassing table scans.
                </li>
                <li>
                  <strong className="text-dark-text">Partial B-Tree Indexing:</strong> idx_demands_open indexes only demands with status = 'OPEN', eliminating overhead from historical records.
                </li>
                <li>
                  <strong className="text-dark-text">Point-in-Time Recovery:</strong> {designTargets.pitRecoveryWindowHours}-hour WAL archive window. Target RPO &lt; 5 minutes.
                </li>
              </ul>
            </div>

            <div className="bg-dark-text text-pure-white rounded-2xl border border-dark-text/20 p-5 font-mono text-xs space-y-2.5 shadow-soft">
              <div className="flex items-center justify-between border-b border-pure-white/10 pb-2 text-harvest-yellow">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-4 h-4" /> DESIGN TARGETS
                </span>
                <span className="text-[10px] bg-farm-green text-pure-white px-2 py-0.5 rounded">PILOT SCALE</span>
              </div>
              <div className="space-y-1.5 pt-2 text-pure-white/80">
                <div className="flex justify-between">
                  <span>MAX CONCURRENT USERS:</span>
                  <strong className="text-harvest-yellow">{designTargets.maxConcurrentUsers.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>CONNECTION POOL:</span>
                  <strong className="text-pure-white">{designTargets.maxPoolSize} (PgBouncer)</strong>
                </div>
                <div className="flex justify-between">
                  <span>P99 LATENCY TARGET:</span>
                  <strong className="text-farm-green font-bold">&lt;{designTargets.p99LatencyTargetMs}ms</strong>
                </div>
                <div className="flex justify-between">
                  <span>PITR WINDOW:</span>
                  <strong className="text-pure-white">{designTargets.pitRecoveryWindowHours}h WAL Archive</strong>
                </div>
                <div className="pt-2 border-t border-pure-white/10 text-[10px] text-pure-white/60">
                  <span>NOTE: Design targets for pilot. Not live benchmark data.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Multi-Tenant Protection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="paper" className="p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-farm-green text-pure-white flex items-center justify-center shadow-soft-sm">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-dark-text">
              Password & Data Hashing
            </h3>
            <p className="font-sans text-xs text-dark-text/70 leading-relaxed">
              Enforces <strong>Argon2id</strong> (OWASP gold standard) with 64 MB memory cost. Kisan bank accounts and PII are ciphertext-encrypted with AES-256-GCM via KMS.
            </p>
          </Card>

          <Card variant="paper" className="p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta text-pure-white flex items-center justify-center shadow-soft-terracotta">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-dark-text">
              API Key Hash Protection
            </h3>
            <p className="font-sans text-xs text-dark-text/70 leading-relaxed">
              API tokens are hashed using <strong>SHA-256</strong> prior to storage. Stolen database dumps cannot compromise live keys. Token-bucket rate limiting restricts abuse.
            </p>
          </Card>

          <Card variant="paper" className="p-7 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-dark-text text-pure-white flex items-center justify-center shadow-soft">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-dark-text">
              Row-Level Security (RLS)
            </h3>
            <p className="font-sans text-xs text-dark-text/70 leading-relaxed">
              PostgreSQL enforces multi-tenant tenancy directly in the storage engine. Farmers can only access their own allocations, preventing data leaks.
            </p>
          </Card>
        </div>

        {/* Disaster Recovery & Point-In-Time Backup */}
        <div className="bg-pure-white rounded-3xl border border-dark-text/10 p-7 space-y-4 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-farm-green uppercase block">
                RELIABILITY & BACKUP VERIFICATION
              </span>
              <h3 className="font-serif font-bold text-xl text-dark-text">
                Point-in-Time Recovery (PITR) & Rollback Runbook
              </h3>
            </div>

            <Button variant="primary" size="sm" onClick={handleBackup}>
              TRIGGER WAL BACKUP SNAPSHOT
            </Button>
          </div>

          {backupAlert && (
            <div className="p-3.5 bg-farm-green/10 border border-farm-green/30 rounded-xl text-farm-green font-mono text-xs">
              ✓ {backupAlert}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-4 bg-paper-bg rounded-xl border border-dark-text/10">
              <span className="text-dark-text/60 block text-[10px]">LAST BACKUP:</span>
              <strong className="text-dark-text">{designTargets.lastBackupTimestamp}</strong>
            </div>
            <div className="p-4 bg-paper-bg rounded-xl border border-dark-text/10">
              <span className="text-dark-text/60 block text-[10px]">RECOVERY TARGET:</span>
              <strong className="text-farm-green">RTO &lt; 15 MIN // RPO &lt; 5 MIN</strong>
            </div>
            <div className="p-4 bg-paper-bg rounded-xl border border-dark-text/10">
              <span className="text-dark-text/60 block text-[10px]">DEPLOYMENT ROLLBACK:</span>
              <strong className="text-dark-text">BLUE-GREEN (1-CLICK &lt; 10 SEC)</strong>
            </div>
          </div>
        </div>

        {/* System Audit Logs Stream */}
        <div className="bg-pure-white rounded-3xl border border-dark-text/10 p-7 space-y-4 shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-dark-text/10">
            <span className="font-mono text-xs font-bold text-dark-text uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-farm-green" />
              SYSTEM AUDIT & LOGS STREAM
            </span>
            <span className="font-mono text-[10px] text-dark-text/50">LIVE JSON LOGGING</span>
          </div>

          <div className="divide-y divide-dark-text/10 font-mono text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-dark-text">{log.action}</span>
                    <Badge variant="green" size="sm">{log.status}</Badge>
                    <span className="text-dark-text/50 text-[10px]">{log.actor}</span>
                  </div>
                  <p className="text-dark-text/70 text-[11px] font-sans">{log.details}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-farm-green font-bold block">{log.latencyMs} ms</span>
                  <span className="text-dark-text/40 text-[10px]">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
