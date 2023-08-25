'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { checkoutShoppingCart } from '@/server/checkout-shopping-cart'
import { formatAsEuro } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { CheckoutForm, checkoutFormSchema } from '@/lib/checkout-form-schema'

type Props = {
  checkoutOpen: boolean
  setCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>
  itemCount: number
  clearCart: () => void
}

export function CheckoutDialog({
  checkoutOpen,
  itemCount,
  setCheckoutOpen,
  clearCart,
}: Props) {
  const totalAmount = itemCount * 9.95
  const { toast } = useToast()
  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      account: '',
    },
  })

  const onSubmit = async (data: CheckoutForm) => {
    try {
      await checkoutShoppingCart(data.name, data.account, totalAmount)
      toast({
        title: 'Success',
        description: 'Checkout completed',
      })
      setCheckoutOpen(false)
      clearCart()
    } catch (error) {
      const description =
        error instanceof Error ? error.message : 'Something went wrong'
      toast({
        title: 'Oops',
        description,
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={checkoutOpen} onOpenChange={(e) => setCheckoutOpen(e)}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>
                Please enter your name and account number to complete the
                checkout process.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Total amount</FormLabel>
              <FormControl>
                <Input value={formatAsEuro(totalAmount)} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>

            <DialogFooter>
              <Button type="submit">OK</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
