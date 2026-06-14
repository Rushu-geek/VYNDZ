import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Row types matching the DB tables ─────────────────────────────────────────

export type VendorWaitlistRow = {
  name: string;
  city: string;
  email: string;
  phone: string;
  whatsapp?: string;
  brand: string;
  category: string;
  instagram?: string;
  source?: string;
  referral?: string;
};

export type OrganizerWaitlistRow = {
  name: string;
  city: string;
  email: string;
  phone: string;
  whatsapp?: string;
  orgname: string;
  event_type: string;
  stalls: string;
  frequency?: string;
  source?: string;
  referral?: string;
};

// ── Insert helpers ────────────────────────────────────────────────────────────

export async function insertVendor(data: VendorWaitlistRow) {
  const { error } = await supabase
    .from("vendor_waitlist")
    .insert([{ ...data, created_at: new Date().toISOString() }]);
  if (error) throw error;
}

export async function insertOrganizer(data: OrganizerWaitlistRow) {
  const { error } = await supabase
    .from("organizer_waitlist")
    .insert([{ ...data, created_at: new Date().toISOString() }]);
  if (error) throw error;
}
