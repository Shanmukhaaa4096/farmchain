/**
 * FarmChain Supabase Auto-Setup Script
 *
 * Automates:
 * 1. Running `supabase/migrations/001_init.sql` against your remote project
 * 2. Creating demo farmer and buyer accounts (with profiles)
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN="sbp_..." SUPABASE_PROJECT_REF="xyz..." npx tsx scripts/setup-supabase.ts
 *
 * Alternatively, you can run the SQL directly in the Supabase Dashboard SQL Editor
 * (https://supabase.com/dashboard/project/<ref>/sql) by pasting 001_init.sql.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('🚀 FarmChain Supabase Setup Script');
  console.log('====================================\n');

  const projectRef = process.env.SUPABASE_PROJECT_REF || process.env.VITE_SUPABASE_PROJECT_REF;
  const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

  if (!projectRef || !accessToken) {
    console.error('❌ Missing environment variables.');
    console.error('Required:');
    console.error('  SUPABASE_PROJECT_REF   (your Supabase project ID, e.g. "abcxyz123")');
    console.error('  SUPABASE_ACCESS_TOKEN  (your Supabase personal access token from supabase.com/account/tokens)\n');
    console.log('💡 Manual Alternative:');
    console.log('  1. Go to https://supabase.com/dashboard/project/' + (projectRef || '<your-project-id>') + '/sql');
    console.log('  2. Open and copy: supabase/migrations/001_init.sql');
    console.log('  3. Paste into the SQL editor and click "Run"\n');
    process.exit(1);
  }

  const migrationPath = path.resolve(__dirname, '../supabase/migrations/001_init.sql');
  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ Migration file not found at: ${migrationPath}`);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(migrationPath, 'utf8');

  console.log(`📡 Connecting to Supabase Management API for project: ${projectRef}...`);

  try {
    // 1. Run the database migration via Supabase Management API SQL endpoint
    const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: sqlContent,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`❌ Migration failed with HTTP status ${response.status}:`, errText);
      process.exit(1);
    }

    console.log('✅ 001_init.sql migration applied successfully!');

    // 2. Seed initial demo profile accounts if needed
    const seedSql = `
      -- Create demo user profiles if auth users exist or insert demo directory entries
      INSERT INTO public.profiles (id, mobile_number, name, role, identifier, location, district, state, verification_status)
      VALUES 
        (gen_random_uuid(), '+919876543210', 'Ramesh Reddy', 'farmer', 'KISAN: TS-RR-902184', 'Chevella', 'Rangareddy', 'Telangana', 'verified'),
        (gen_random_uuid(), '+919876543211', 'FreshCart Organics', 'buyer', 'GSTIN: 36AAACU9120K', 'Banjara Hills', 'Hyderabad', 'Telangana', 'verified')
      ON CONFLICT (mobile_number) DO NOTHING;
    `;

    const seedResponse = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: seedSql }),
    });

    if (seedResponse.ok) {
      console.log('✅ Demo profiles verified in database.');
    } else {
      console.warn('⚠️  Note on seeding:', await seedResponse.text());
    }

    console.log('\n🎉 Supabase setup complete! Your tables and RLS policies are active.');
  } catch (error) {
    console.error('❌ Network error during setup:', error);
    process.exit(1);
  }
}

main();
