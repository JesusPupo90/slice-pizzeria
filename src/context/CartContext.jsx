import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)
const CartDispatchContext = createContext(null)

function getItemPrice(item) {
  if (item.product.prices && item.size) {
    return item.product.prices[item.size] ?? 0
  }
  return item.product.price ?? 0
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload
      const key = size ? `${product.id}-${size}` : product.id
      const existing = state.items.find((i) => {
        const k = i.size ? `${i.product.id}-${i.size}` : i.product.id
        return k === key
      })
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { product, size, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM': {
      const index = action.payload
      return {
        ...state,
        items: state.items.filter((_, i) => i !== index),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { index, quantity } = action.payload
      if (quantity < 1) return state
      const items = [...state.items]
      items[index] = { ...items[index], quantity }
      return { ...state, items }
    }

    case 'CHANGE_SIZE': {
      const { index, size } = action.payload
      const targetItem = state.items[index]
      const targetKey = `${targetItem.product.id}-${size}`

      const existingIndex = state.items.findIndex((item, idx) => {
        if (idx === index) return false
        const itemKey = item.size ? `${item.product.id}-${item.size}` : item.product.id
        return itemKey === targetKey
      })

      if (existingIndex !== -1) {
        const updatedItems = state.items
          .map((item, idx) => {
            if (idx === existingIndex) {
              return { ...item, quantity: item.quantity + targetItem.quantity }
            }
            return item
          })
          .filter((_, idx) => idx !== index) // Eliminamos el elemento antiguo

        return { ...state, items: updatedItems }
      }

      const items = state.items.map((item, idx) =>
        idx === index ? { ...item, size } : item
      )
      return { ...state, items }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    default:
      return state
  }
}

const initialState = { items: [], isOpen: false }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const subtotal = state.items.reduce(
    (acc, item) => acc + getItemPrice(item) * item.quantity,
    0
  )

  const totalItems = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  const value = { ...state, subtotal, totalItems }

  return (
    <CartContext.Provider value={value}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext)
  if (!ctx) throw new Error('useCartDispatch must be used within CartProvider')
  return ctx
}
