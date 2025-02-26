import store from '@/store'

export const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
  } else {
    next('/')
  }
}

export const shouldRedirectToLogin = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

export const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (
      window.location.pathname.includes('task') &&
      !window.location.pathname.includes('tasks')
    ) {
      next()
    }
    next('/doitnow')
  } else {
    next('/login')
  }
}

export const ifRouteNotExists = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next('/doitnow')
  } else {
    next('/login')
  }
}
