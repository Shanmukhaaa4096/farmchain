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
  Play
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { db, SystemMetrics, AuditLogEntry } from '../services/db';

export const DatabasePage: React.FC = () => {
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
    <div className="py-12 bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="space-y-3 border-b-brutal pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-ink-black text-harvest-yellow font-mono text-xs font-bold px-3 py-1 border-2 border-ink-black shadow-brutal-sm uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> PRODUCTION DATABASE & SCALABILITY ARCHITECTURE
            </span>
            <span className="font-mono text-xs font-bold text-farm-green bg-paper-white border border-ink-black px-2.5 py-0.5">
              POSTGRESQL 16 + PGBOUNCER + POSTGIS
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-ink-black">
            DATABASE SCALABILITY & SYSTEM RELIABILITY
          </h1>

          <p className="font-body text-base text-gray-800 max-w-3xl font-medium leading-relaxed">
            Engineered to handle 10,000+ concurrent farmers and commercial buyers without performance degradation. 
            Features sub-10ms PostGIS radius queries, strict Argon2id security, token-bucket rate limiting, and automated point-in-time recovery.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-paper-white border-brutal shadow-brutal">
            <span className="font-mono text-[10px] text-gray-600 block uppercase font-bold">PGBOUNCER POOL</span>
            <strong className="font-heading font-black text-2xl text-ink-black block mt-1">
              {metrics.activeConnections} / {metrics.maxPoolSize}
            </strong>
            <span className="font-mono text-[10px] text-farm-green font-bold">TRANSACTION POOLING MODE</span>
          </div>

          <div className="p-4 bg-paper-white border-brutal shadow-brutal">
            <span className="font-mono text-[10px] text-gray-600 block uppercase font-bold">P99 QUERY LATENCY</span>
            <strong className="font-heading font-black text-2xl text-farm-green block mt-1">
              {metrics.p99LatencyMs} ms
            </strong>
            <span className="font-mono text-[10px] text-gray-600">TARGET: &lt; 15.0 MS</span>
          </div>

          <div className="p-4 bg-paper-white border-brutal shadow-brutal">
            <span className="font-mono text-[10px] text-gray-600 block uppercase font-bold">CACHE HIT RATIO</span>
            <strong className="font-heading font-black text-2xl text-ink-black block mt-1">
              {metrics.cacheHitRatio}%
            </strong>
            <span className="font-mono text-[10px] text-farm-green font-bold">REDIS L1 QUERY CACHE</span>
          </div>

          <div className="p-4 bg-harvest-yellow border-brutal shadow-brutal">
            <span className="font-mono text-[10px] text-ink-black block uppercase font-bold">DISASTER RECOVERY</span>
            <strong className="font-heading font-black text-xl text-ink-black block mt-1">
              RPO &lt; 5 MIN
            </strong>
            <span className="font-mono text-[10px] text-ink-black/80 font-bold">CONTINUOUS WAL ARCHIVE</span>
          </div>
        </div>

        {/* Scalability & 10k User Benchmark Section */}
        <div className="bg-paper-white border-brutal-thick p-6 sm:p-8 shadow-brutal-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-ink-black">
            <div>
              <span className="font-mono text-xs font-bold text-farm-green uppercase block">
                PERFORMANCE VALIDATION
              </span>
              <h2 className="font-heading font-black text-xl sm:text-2xl uppercase text-ink-black">
                10,000 CONCURRENT USER BENCHMARK SIMULATION
              </h2>
            </div>

            <Button
              variant="yellow"
              size="md"
              onClick={runBenchmark}
              disabled={isBenchmarking}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-ink-black" />
              <span>{isBenchmarking ? 'EXECUTING QUERIES...' : 'RUN 10K QUERY BENCHMARK'}</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-3 font-body text-xs text-gray-700 leading-relaxed">
              <h3 className="font-heading font-black text-sm uppercase text-ink-black">
                HOW FARMCHAIN HANDLES SCALE:
              </h3>
              <ul className="space-y-2 list-disc pl-4">
                <li>
                  <strong>Connection Multiplexing:</strong> 10,000 app sessions share 50 backend PostgreSQL connections via PgBouncer. Zero memory thrashing.
                </li>
                <li>
                  <strong>PostGIS Spatial Indexing:</strong> Radius queries (`ST_DWithin`) between farmer coordinates and delivery hubs utilize spatial GIST trees, bypassing table scans.
                </li>
                <li>
                  <strong>Partial B-Tree Indexing:</strong> `idx_demands_open` indexes only demands with `status = 'OPEN'`, eliminating overhead from millions of historical records.
                </li>
                <li>
                  <strong>Table Partitioning:</strong> Telemetry and audit logs partition quarterly (`system_audit_logs PARTITION BY RANGE`).
                </li>
              </ul>
            </div>

            {/* Benchmark Output Card */}
            <div className="bg-ink-black text-paper-white border-2 border-ink-black p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-gray-700 pb-2 text-harvest-yellow">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-4 h-4" /> BENCHMARK TELEMETRY
                </span>
                <span className="text-[10px] bg-farm-green text-paper-white px-1.5 py-0.5">EXPLAIN ANALYZE</span>
              </div>

              {benchmarkResult ? (
                <div className="space-y-1.5 pt-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>SIMULATED CLIENTS:</span>
                    <strong className="text-harvest-yellow">{benchmarkResult.concurrentUsers.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>THROUGHPUT:</span>
                    <strong className="text-paper-white">{benchmarkResult.qps.toLocaleString()} QPS</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>P50 LATENCY:</span>
                    <strong className="text-paper-white">{benchmarkResult.p50Ms} ms</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>P95 LATENCY:</span>
                    <strong className="text-paper-white">{benchmarkResult.p95Ms} ms</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>P99 LATENCY:</span>
                    <strong className="text-farm-green font-bold">{benchmarkResult.p99Ms} ms</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>ERROR RATE:</span>
                    <strong className="text-farm-green font-bold">{benchmarkResult.errorRate}</strong>
                  </div>
                  <div className="pt-2 border-t border-gray-700 text-[10px] text-gray-400">
                    <span>INDEX EXECUTED:</span> {benchmarkResult.indexUsed}
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-gray-500">
                  Click 'RUN 10K QUERY BENCHMARK' to execute synthetic load testing against the PostGIS matching engine.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security & Multi-Tenant Protection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="white" shadow="default" className="p-6 border-brutal space-y-3">
            <div className="w-10 h-10 bg-farm-green text-harvest-yellow border-2 border-ink-black flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              PASSWORD & DATA HASHING
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              Enforces <strong>Argon2id</strong> (OWASP gold standard) with 64 MB memory cost. Kisan bank accounts and PII are ciphertext-encrypted with AES-256-GCM via KMS.
            </p>
          </Card>

          <Card variant="white" shadow="default" className="p-6 border-brutal space-y-3">
            <div className="w-10 h-10 bg-harvest-yellow text-ink-black border-2 border-ink-black flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              API KEY HASH PROTECTION
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              API tokens are hashed using <strong>SHA-256</strong> prior to storage. Stolen database dumps cannot compromise live keys. Token-bucket rate limiting restricts abuse.
            </p>
          </Card>

          <Card variant="white" shadow="default" className="p-6 border-brutal space-y-3">
            <div className="w-10 h-10 bg-ink-black text-paper-white border-2 border-ink-black flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-black text-lg uppercase text-ink-black">
              ROW-LEVEL SECURITY (RLS)
            </h3>
            <p className="font-body text-xs text-gray-700 leading-relaxed">
              PostgreSQL enforces multi-tenant tenancy directly in the storage engine. Farmers can only access their own allocations, preventing data leaks.
            </p>
          </Card>
        </div>

        {/* Disaster Recovery & Point-In-Time Backup */}
        <div className="bg-warm-cream border-brutal p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-bold text-ink-black uppercase block">
                RELIABILITY & BACKUP VERIFICATION
              </span>
              <h3 className="font-heading font-black text-xl uppercase text-ink-black">
                POINT-IN-TIME RECOVERY (PITR) & ROLLBACK RUNBOOK
              </h3>
            </div>

            <Button variant="primary" size="sm" onClick={handleBackup}>
              TRIGGER WAL BACKUP SNAPSHOT
            </Button>
          </div>

          {backupAlert && (
            <div className="p-3 bg-green-50 border-2 border-farm-green text-farm-green font-mono text-xs">
              ✓ {backupAlert}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-paper-white border border-ink-black">
              <span className="text-gray-600 block text-[10px]">LAST BACKUP:</span>
              <strong className="text-ink-black">{metrics.lastBackupTimestamp}</strong>
            </div>
            <div className="p-3 bg-paper-white border border-ink-black">
              <span className="text-gray-600 block text-[10px]">RECOVERY TARGET:</span>
              <strong className="text-farm-green">RTO &lt; 15 MIN // RPO &lt; 5 MIN</strong>
            </div>
            <div className="p-3 bg-paper-white border border-ink-black">
              <span className="text-gray-600 block text-[10px]">DEPLOYMENT ROLLBACK:</span>
              <strong className="text-ink-black">BLUE-GREEN (1-CLICK &lt; 10 SEC)</strong>
            </div>
          </div>
        </div>

        {/* System Audit Logs Stream */}
        <div className="bg-paper-white border-brutal p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
            <span className="font-mono text-xs font-bold text-ink-black uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-farm-green" />
              SYSTEM AUDIT & LOGS STREAM
            </span>
            <span className="font-mono text-[10px] text-gray-500">LIVE JSON LOGGING</span>
          </div>

          <div className="divide-y divide-gray-200 font-mono text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink-black">{log.action}</span>
                    <Badge variant="green" size="sm">{log.status}</Badge>
                    <span className="text-gray-500 text-[10px]">{log.actor}</span>
                  </div>
                  <p className="text-gray-700 text-[11px] font-sans">{log.details}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-farm-green font-bold block">{log.latencyMs} ms</span>
                  <span className="text-gray-400 text-[10px]">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
