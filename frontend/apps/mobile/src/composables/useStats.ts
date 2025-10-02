import getSupabaseClient from "./useSupabase"

type EventType = 'coupon_click' | 'coupon_add_to_favourite' | 'coupon_remove_from_favourite'

export async function useStats(coupon_id: string, event_type: EventType) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('Stats').insert({
      event_type: event_type,
      reference: coupon_id,
    })

  return { data, error }
}