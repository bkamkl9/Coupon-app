import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface CouponData {
  id?: string | number
  title: string
  discount?: number
  description?: string
  category?: string
  validUntil?: string
  store?: string
}

interface NotificationResult {
  success: boolean
  message: string
  notification?: any
  error?: string
}

export const useCouponNotification = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendCouponNotification = useCallback(async (couponData: CouponData): Promise<NotificationResult> => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate coupon data
      if (!couponData.title) {
        throw new Error('Tytuł kuponu jest wymagany')
      }

      // Call Supabase Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('send-coupon-notification', {
        body: { couponData }
      })

      if (functionError) {
        throw new Error(`Błąd funkcji: ${functionError.message}`)
      }

      if (!data?.success) {
        throw new Error(data?.message || 'Nie udało się wysłać powiadomienia')
      }

      return {
        success: true,
        message: data.message || 'Powiadomienie o nowym kuponie zostało wysłane!',
        notification: data.notification
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nieznany błąd'
      setError(errorMessage)
      
      return {
        success: false,
        message: 'Błąd podczas wysyłania powiadomienia',
        error: errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendNewCouponNotification = useCallback(async (couponData: CouponData) => {
    return await sendCouponNotification({
      ...couponData,
      // Add default Polish message if not provided
      title: couponData.title || 'Nowy kupon dostępny!'
    })
  }, [sendCouponNotification])

  const sendDiscountNotification = useCallback(async (couponData: CouponData) => {
    const discountText = couponData.discount 
      ? `Zniżka ${couponData.discount}%`
      : 'Specjalna oferta'
    
    return await sendCouponNotification({
      ...couponData,
      title: `🔥 ${discountText} - ${couponData.title}`,
      description: couponData.description || `Sprawdź nową ofertę w kategorii ${couponData.category || 'promocje'}`
    })
  }, [sendCouponNotification])

  const sendExpiringCouponNotification = useCallback(async (couponData: CouponData) => {
    return await sendCouponNotification({
      ...couponData,
      title: `⏰ Kupon wygasa wkrótce!`,
      description: `${couponData.title} - ważny do ${couponData.validUntil || 'końca miesiąca'}`
    })
  }, [sendCouponNotification])

  const sendStoreNotification = useCallback(async (couponData: CouponData) => {
    const storeText = couponData.store ? `w ${couponData.store}` : ''
    
    return await sendCouponNotification({
      ...couponData,
      title: `🏪 Nowa oferta ${storeText}`,
      description: `${couponData.title} - ${couponData.discount ? `${couponData.discount}% zniżki` : 'specjalna promocja'}`
    })
  }, [sendCouponNotification])

  return {
    // Main function
    sendCouponNotification,
    
    // Convenience functions with Polish messages
    sendNewCouponNotification,
    sendDiscountNotification,
    sendExpiringCouponNotification,
    sendStoreNotification,
    
    // State
    isLoading,
    error,
    
    // Utility
    clearError: () => setError(null)
  }
}

// Example usage hook for components
export const useCouponNotificationExample = () => {
  const {
    sendNewCouponNotification,
    sendDiscountNotification,
    isLoading,
    error
  } = useCouponNotification()

  const handleNewCoupon = async (coupon: CouponData) => {
    const result = await sendNewCouponNotification(coupon)
    
    if (result.success) {
      console.log('✅ Powiadomienie wysłane:', result.message)
    } else {
      console.error('❌ Błąd:', result.error)
    }
    
    return result
  }

  const handleDiscountCoupon = async (coupon: CouponData) => {
    const result = await sendDiscountNotification(coupon)
    
    if (result.success) {
      console.log('✅ Powiadomienie o zniżce wysłane:', result.message)
    } else {
      console.error('❌ Błąd:', result.error)
    }
    
    return result
  }

  return {
    handleNewCoupon,
    handleDiscountCoupon,
    isLoading,
    error
  }
}
