"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { UsernameData, usernameSchema } from "@/validations/username-schema"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createUsername } from "../actions/onboarding.actions"

const UsernameForm = () => {
  const router = useRouter()
  const form = useForm<UsernameData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(data: UsernameData) {
    const result = await createUsername(data)

    if (!result.success) {
      form.setError("username", {
        type: "server",
        message: result.message || "An error occurred",
      })
    } else {
      router.push("/home")
    }
  }

  return (
    <Card className="mx-auto w-full max-w-lg p-4 sm:max-w-md sm:p-6 md:max-w-lg md:p-8">
      <div className="mb-6 w-full space-y-3 text-center">
        <div>
          <CardHeader className="text-xl sm:text-2xl">
            Welcome to Postview
          </CardHeader>
          <CardDescription className="text-sm text-muted-foreground">
            Create a username to get started
          </CardDescription>
        </div>
        <CardContent>
          <form id="username-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="w-full">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text">Username</FieldLabel>
                    <Input
                      {...field}
                      maxLength={16}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your username"
                      autoComplete="off"
                      className="w-full"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <Field orientation="horizontal" className="mt-4">
            <Button type="submit" form="username-form" className="w-full">
              Submit
            </Button>
          </Field>
        </CardContent>
      </div>
    </Card>
  )
}

export default UsernameForm
