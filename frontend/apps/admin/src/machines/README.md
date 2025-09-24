# Authentication Machine

A simple authentication state machine using XMachineVue and Supabase.

## Overview

The auth machine provides a clean, reactive way to handle user authentication with minimal complexity. It focuses on the essentials: **login**, **logout**, and **error handling**.

## Architecture

```
authMachine
├── States: IDLE, AUTHENTICATED
├── Reactive State: user, loading, error
├── Actions: signIn, signOut, checkSession
└── Global: clearError
```

## States

### `IDLE`
- **Initial state** when user is not authenticated
- **Actions available:**
  - `signIn(email, password)` - Authenticate user
  - `checkSession()` - Check for existing session

### `AUTHENTICATED` 
- **Active state** when user is logged in
- **Actions available:**
  - `signOut()` - Log out user

## Reactive State

The machine maintains three reactive properties:

```typescript
reactive: {
  user: null as User | null,      // Current user object from Supabase
  loading: false,                 // Loading state for async operations
  error: null as string | null,   // Error message for failed operations
}
```

## Usage

### Basic Authentication Flow

```typescript
import { authMachine } from '@/machines/authMachine'

// Login
const result = await authMachine.IDLE.signIn(email, password)
if (result.success) {
  // User is now authenticated, state is 'AUTHENTICATED'
  router.push('/dashboard')
}

// Logout  
const result = await authMachine.AUTHENTICATED.signOut()
if (result.success) {
  // User is now logged out, state is 'IDLE'
  router.push('/login')
}

// Check existing session
await authMachine.IDLE.checkSession()
// If session exists, state changes to 'AUTHENTICATED'
```

### Reactive State Access

```typescript
import { computed } from 'vue'
import { authMachine } from '@/machines/authMachine'

// Reactive computed properties
const user = computed(() => authMachine.reactive.user)
const loading = computed(() => authMachine.reactive.loading)
const error = computed(() => authMachine.reactive.error)
const isAuthenticated = computed(() => 
  authMachine.currentState.value === 'AUTHENTICATED'
)
```

### Error Handling

```typescript
// Errors are automatically set in reactive state
const error = computed(() => authMachine.reactive.error)

// Clear errors
authMachine.global.clearError()
```

## Integration with Vue Components

### Login Component
```vue
<script setup>
import { ref, computed } from 'vue'
import { authMachine } from '@/machines/authMachine'

const email = ref('')
const password = ref('')

const loading = computed(() => authMachine.reactive.loading)
const error = computed(() => authMachine.reactive.error)

async function handleLogin() {
  if (!email.value || !password.value) return
  
  const result = await authMachine.IDLE.signIn(email.value, password.value)
  if (result.success) {
    router.push('/dashboard')
  }
}

function clearError() {
  authMachine.global.clearError()
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" :disabled="loading" />
    <input v-model="password" type="password" :disabled="loading" />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Signing in...' : 'Sign in' }}
    </button>
    <div v-if="error" @click="clearError">{{ error }}</div>
  </form>
</template>
```

### Dashboard Component
```vue
<script setup>
import { computed } from 'vue'
import { authMachine } from '@/machines/authMachine'

const user = computed(() => authMachine.reactive.user)

async function handleLogout() {
  const result = await authMachine.AUTHENTICATED.signOut()
  if (result.success) {
    router.push('/login')
  }
}
</script>

<template>
  <div>
    <h1>Welcome, {{ user?.email }}</h1>
    <button @click="handleLogout">Logout</button>
  </div>
</template>
```

## Router Integration

The auth machine works seamlessly with Vue Router navigation guards:

```typescript
// router/index.ts
router.beforeEach(async (to, from, next) => {
  // Check session on first load
  if (authMachine.currentState.value === "IDLE") {
    await authMachine.IDLE.checkSession();
  }

  const isAuthenticated = authMachine.currentState.value === "AUTHENTICATED";
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});
```

## API Reference

### Actions

#### `IDLE.signIn(email: string, password: string)`
- **Purpose**: Authenticate user with email/password
- **Returns**: `{ success: boolean }`
- **Side Effects**: 
  - Sets `loading: true` during request
  - On success: sets `user` and changes state to `AUTHENTICATED`
  - On error: sets `error` message

#### `IDLE.checkSession()`
- **Purpose**: Check for existing Supabase session
- **Returns**: `void`
- **Side Effects**:
  - Sets `loading: true` during check
  - If session exists: sets `user` and changes state to `AUTHENTICATED`

#### `AUTHENTICATED.signOut()`
- **Purpose**: Log out current user
- **Returns**: `{ success: boolean }`
- **Side Effects**:
  - Sets `loading: true` during request
  - On success: clears `user` and changes state to `IDLE`
  - On error: sets `error` message

#### `global.clearError()`
- **Purpose**: Clear current error message
- **Returns**: `void`
- **Side Effects**: Sets `error: null`

### State Properties

- `authMachine.reactive.user` - Current authenticated user (or `null`)
- `authMachine.reactive.loading` - Loading state for async operations
- `authMachine.reactive.error` - Current error message (or `null`)
- `authMachine.currentState.value` - Current state: `"IDLE"` or `"AUTHENTICATED"`

## Benefits

- ✅ **Simple**: Only essential features, no complexity
- ✅ **Reactive**: Automatic UI updates with Vue's reactivity
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Predictable**: Clear state transitions
- ✅ **Error Handling**: Built-in error state management
- ✅ **Session Persistence**: Automatic session restoration
- ✅ **Router Integration**: Works seamlessly with navigation guards
