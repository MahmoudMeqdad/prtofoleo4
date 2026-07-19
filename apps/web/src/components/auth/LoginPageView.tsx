"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/auth/use-auth";
import { resolvePostAuthPath } from "@/auth/auth-guards";
import { authErrorDictionaryKey, isAuthApiError } from "@/auth/auth-errors";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginPageView() {
  const dictionary = useDictionary();
  const locale = useLocale();
  const router = useRouter();
  const { login, status, user } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const schema = z.object({
    email: z.string().email(dictionary.auth.errors.emailInvalid),
    password: z.string().min(1, dictionary.auth.errors.required),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (status === "authenticated" && user) {
      router.replace(localizedPath(locale, resolvePostAuthPath(user)));
    }
  }, [status, user, locale, router]);

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const next = await login(values);
      router.push(localizedPath(locale, resolvePostAuthPath(next)));
    } catch (error) {
      if (isAuthApiError(error)) {
        const key = authErrorDictionaryKey(error.code) as keyof typeof dictionary.auth.errors;
        setFormError(dictionary.auth.errors[key] || dictionary.auth.errors.generic);
        return;
      }
      setFormError(dictionary.auth.errors.generic);
    }
  });

  return (
    <PublicPageShell>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f3ee] via-background to-background pb-16 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] sm:pb-24">
        <Container className="max-w-md">
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground sm:text-4xl">
            {dictionary.auth.signIn}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{dictionary.auth.noAccount}</p>
          <Link
            href={localizedPath(locale, "/register")}
            className="mt-1 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {dictionary.auth.createAccount}
          </Link>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <Input
              label={dictionary.auth.email}
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label={dictionary.auth.password}
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
            {formError && (
              <p role="alert" className="text-sm text-danger">
                {formError}
              </p>
            )}
            <Button type="submit" className="w-full" loading={isSubmitting}>
              {isSubmitting ? dictionary.auth.submitting : dictionary.auth.signIn}
            </Button>
          </form>
        </Container>
      </section>
    </PublicPageShell>
  );
}
