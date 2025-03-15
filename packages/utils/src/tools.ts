type ToReturn<T, U = Error> = Promise<[U, undefined] | [null, T]>
type ToArrayReturn<T, U = Error> = Promise<Array<[U, undefined] | [null, T]>>

export function to<T, U = Error>(
  input: Promise<T> | Promise<T>[],
  errorExt?: object
): ToReturn<T, U> | ToArrayReturn<T, U> {
  const handlePromise = (promise: Promise<T>): ToReturn<T, U> => {
    return promise
      .then<[null, T]>((data: T) => [null, data])
      .catch<[U, undefined]>((err: U) => {
        if (errorExt) {
          const parsedError = Object.assign({}, err, errorExt)
          return [parsedError, undefined]
        }
        return [err, undefined]
      })
  }

  if (Array.isArray(input)) {
    return Promise.all(input.map((promise) => handlePromise(promise)))
  }

  return handlePromise(input)
}

export function numberToPx(num: number) {
  return `${num}px`
}
