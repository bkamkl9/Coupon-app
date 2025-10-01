import { onMounted, ref, watch } from 'vue'

export default function useLocalStorageFavourite() {
  const favourite = ref<string[]>([])

  watch(favourite, (newFavourite: string[]) => {
    localStorage.setItem('favourite', JSON.stringify(newFavourite))
  })

  onMounted(() => {
    const storedFavourite = localStorage.getItem('favourite')
    if (storedFavourite) {
      favourite.value = JSON.parse(storedFavourite)
    }
  })

  function toggleFavourite(id: string) {
    if (favourite.value.includes(id)) {
      favourite.value = favourite.value.filter((id) => id !== id)
    } else {
      favourite.value = [...favourite.value, id]
    }
  }

  return {
    favourite,
    toggleFavourite,
  }
}