'use server'

export async function checkoutShoppingCart(
  account: string,
  name: string,
  amount: number,
) {
  console.group(`checkout for ${name}`)
  chargeAccount(account, amount)
  schipMovies(account)
  console.groupEnd()
}

function chargeAccount(account: string, amount: number) {
  console.log(
    `Charging account '${account}' for ${amount.toLocaleString('en', {
      style: 'currency',
      currency: 'EUR',
    })}`,
  )
}

function schipMovies(name: string) {
  console.log(`Schiping movies to user ${name}`)
}
