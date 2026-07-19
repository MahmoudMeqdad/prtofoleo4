"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SELF_REGISTER_ROLES, type SelfRegisterRole } from "@iplay/shared";
import { useAuth } from "@/auth/use-auth";
import { resolvePostAuthPath } from "@/auth/auth-guards";
import { authErrorDictionaryKey, isAuthApiError } from "@/auth/auth-errors";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: SelfRegisterRole;
  terms: boolean;
  whatsappNumber?: string;
  city?: string;
  businessOrPageName?: string;
  facebookPage?: string;
  instagramPage?: string;
  marketingMethod?: string;
  businessName?: string;
  businessType?: string;
  wholesaleCity?: string;
  address?: string;
  expectedOrderVolume?: string;
};

export function RegisterPageView() {
  const dictionary = useDictionary();
  const locale = useLocale();
  const router = useRouter();
  const { register: registerAccount } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(1, dictionary.auth.errors.required).max(120),
          email: z.string().email(dictionary.auth.errors.emailInvalid),
          phone: z
            .string()
            .regex(/^\d{7,15}$/, dictionary.auth.errors.phoneInvalid),
          password: z
            .string()
            .min(8, dictionary.auth.errors.passwordWeak)
            .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, dictionary.auth.errors.passwordWeak),
          confirmPassword: z.string().min(1, dictionary.auth.errors.required),
          role: z.enum(SELF_REGISTER_ROLES),
          terms: z.boolean().refine((value) => value === true, {
            message: dictionary.auth.termsRequired,
          }),
          whatsappNumber: z.string().optional(),
          city: z.string().optional(),
          businessOrPageName: z.string().optional(),
          facebookPage: z.string().optional(),
          instagramPage: z.string().optional(),
          marketingMethod: z.string().optional(),
          businessName: z.string().optional(),
          businessType: z.string().optional(),
          wholesaleCity: z.string().optional(),
          address: z.string().optional(),
          expectedOrderVolume: z.string().optional(),
        })
        .superRefine((values, ctx) => {
          if (values.password !== values.confirmPassword) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: dictionary.auth.errors.passwordMismatch,
              path: ["confirmPassword"],
            });
          }
          if (values.role === "MARKETER") {
            for (const key of [
              "whatsappNumber",
              "city",
              "businessOrPageName",
              "marketingMethod",
            ] as const) {
              if (!values[key]?.trim()) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: dictionary.auth.errors.required,
                  path: [key],
                });
              }
            }
          }
          if (values.role === "WHOLESALE_TRADER") {
            for (const key of [
              "businessName",
              "businessType",
              "wholesaleCity",
              "address",
            ] as const) {
              if (!values[key]?.trim()) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: dictionary.auth.errors.required,
                  path: [key],
                });
              }
            }
          }
        }),
    [dictionary],
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
      terms: false,
    },
  });

  const role = useWatch({ control, name: "role" });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      const next = await registerAccount({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
        whatsappNumber: values.whatsappNumber,
        city: values.city,
        businessOrPageName: values.businessOrPageName,
        facebookPage: values.facebookPage || undefined,
        instagramPage: values.instagramPage || undefined,
        marketingMethod: values.marketingMethod,
        businessName: values.businessName,
        businessType: values.businessType,
        wholesaleCity: values.wholesaleCity,
        address: values.address,
        expectedOrderVolume: values.expectedOrderVolume || undefined,
      });
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

  const roleLabels: Record<SelfRegisterRole, string> = {
    CUSTOMER: dictionary.auth.roleCustomer,
    MARKETER: dictionary.auth.roleMarketer,
    WHOLESALE_TRADER: dictionary.auth.roleWholesale,
  };

  return (
    <PublicPageShell>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f3ee] via-background to-background pb-16 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] sm:pb-20">
        <Container className="max-w-xl">
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground sm:text-4xl">
            {dictionary.auth.register}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{dictionary.auth.alreadyHaveAccount}</p>
          <Link
            href={localizedPath(locale, "/login")}
            className="mt-1 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {dictionary.auth.signIn}
          </Link>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <fieldset>
              <legend className="mb-2 text-sm font-medium">{dictionary.auth.accountType}</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {SELF_REGISTER_ROLES.map((value) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <input type="radio" value={value} {...register("role")} />
                    {roleLabels[value]}
                  </label>
                ))}
              </div>
            </fieldset>

            <Input label={dictionary.auth.fullName} error={errors.name?.message} {...register("name")} />
            <Input
              label={dictionary.auth.email}
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label={dictionary.auth.phone}
              inputMode="numeric"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label={dictionary.auth.password}
              type="password"
              autoComplete="new-password"
              hint={dictionary.auth.passwordHint}
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label={dictionary.auth.confirmPassword}
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {role === "MARKETER" && (
              <div className="space-y-4 border-t border-border pt-4">
                <Input
                  label={dictionary.auth.whatsappNumber}
                  error={errors.whatsappNumber?.message}
                  {...register("whatsappNumber")}
                />
                <Input label={dictionary.auth.city} error={errors.city?.message} {...register("city")} />
                <Input
                  label={dictionary.auth.businessOrPageName}
                  error={errors.businessOrPageName?.message}
                  {...register("businessOrPageName")}
                />
                <Input label={dictionary.auth.facebookPage} {...register("facebookPage")} />
                <Input label={dictionary.auth.instagramPage} {...register("instagramPage")} />
                <Input
                  label={dictionary.auth.marketingMethod}
                  error={errors.marketingMethod?.message}
                  {...register("marketingMethod")}
                />
              </div>
            )}

            {role === "WHOLESALE_TRADER" && (
              <div className="space-y-4 border-t border-border pt-4">
                <Input
                  label={dictionary.auth.businessName}
                  error={errors.businessName?.message}
                  {...register("businessName")}
                />
                <Input
                  label={dictionary.auth.businessType}
                  error={errors.businessType?.message}
                  {...register("businessType")}
                />
                <Input
                  label={dictionary.auth.city}
                  error={errors.wholesaleCity?.message}
                  {...register("wholesaleCity")}
                />
                <Input
                  label={dictionary.auth.address}
                  error={errors.address?.message}
                  {...register("address")}
                />
                <Input
                  label={dictionary.auth.expectedOrderVolume}
                  {...register("expectedOrderVolume")}
                />
              </div>
            )}

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" {...register("terms")} />
              <span>{dictionary.auth.termsAccept}</span>
            </label>
            {errors.terms && <p className="text-xs text-danger">{errors.terms.message}</p>}

            {formError && (
              <p role="alert" className="text-sm text-danger">
                {formError}
              </p>
            )}

            <Button type="submit" className="w-full" loading={isSubmitting}>
              {isSubmitting ? dictionary.auth.submitting : dictionary.auth.register}
            </Button>
          </form>
        </Container>
      </section>
    </PublicPageShell>
  );
}
