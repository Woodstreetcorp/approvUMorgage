import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read .env.local file
const envFile = readFileSync('.env.local', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    env[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('Checking mortgage_applications table...\n');
  
  const { data, error, count } = await supabase
    .from('mortgage_applications')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching applications:', error);
    return;
  }

  console.log(`Total applications: ${count}`);
  console.log('\nRecent applications:');
  console.log(JSON.stringify(data, null, 2));
  
  if (data && data.length > 0) {
    console.log('\n\nChecking profiles for these applications...');
    const userIds = data.map(app => app.user_id);
    
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .in('user_id', userIds);
    
    if (profileError) {
      console.error('Error fetching profiles:', profileError);
    } else {
      console.log('Profiles found:');
      console.log(JSON.stringify(profiles, null, 2));
    }
  }
}

checkDatabase();
