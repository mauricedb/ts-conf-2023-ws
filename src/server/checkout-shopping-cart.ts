'use server'

declare const _type: unique symbol

type Opaque<A, B> = A & {
  readonly [_type]: B
}

type Account = Opaque<string, 'Account'>

function isAccount(value: string): value is Account {
  return typeof value === 'string' && value.length === 4
}

function assertAccount(value: string): asserts value is Account {
  if (!isAccount(value)) {
    throw new Error(`Expected account with 4 digits, got ${value}`)
  }
}

type Amount = Opaque<number, 'Amount'>

function isAmount(value: number): value is Amount {
  return typeof value === 'number'
}

function assertAmount(value: number): asserts value is Amount {
  if (!isAmount(value)) {
    throw new Error(`Amount ${value} is not a amount`)
  }
}

type ClientName = Opaque<string, 'ClientName'>

function isClientName(value: string): value is ClientName {
  return typeof value === 'string' && value.length >= 2
}

function assertClientName(value: string): asserts value is ClientName {
  if (!isClientName(value)) {
    throw new Error(
      `Expected client name with at least 2 characters, got ${value}`,
    )
  }
}

export async function checkoutShoppingCart(
  account: string,
  name: string,
  amount: number,
) {
  assertAccount(account)
  assertClientName(name)
  assertAmount(amount)

  console.group(`checkout for ${name}`)
  chargeAccount(account, amount)
  schipMovies(name)
  console.groupEnd()
}

function chargeAccount(account: Account, amount: Amount) {
  console.log(
    `Charging account '${account}' for ${amount.toLocaleString('en', {
      style: 'currency',
      currency: 'EUR',
    })}`,
  )
}

function schipMovies(name: ClientName) {
  console.log(`Schiping movies to user ${name}`)
}
