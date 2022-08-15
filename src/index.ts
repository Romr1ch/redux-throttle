import type { Middleware, AnyAction } from 'redux'
import isEqual from 'lodash.isequal'

const throttles: (AnyAction | null)[] = []

function throttleActionsMiddleware(delay = 60): Middleware<{}, AnyAction> {
  return () => (next) => (action) => {
    const time = action.meta?.memoOptions?.ttl || delay

    if (throttles.find((item) => isEqual(action, item))) {
      return
    }

    throttles.push(action)

    setTimeout(() => {
      throttles.pop()
    }, time)

    return next(action)
  }
}

export { throttleActionsMiddleware }

export default throttleActionsMiddleware
