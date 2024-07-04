import { ref } from 'vue'

export const cartUpdateEvent = ref(null)

export function emitCartUpdate() {
  cartUpdateEvent.value = Date.now()
}