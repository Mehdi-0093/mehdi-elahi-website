"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const honeypot = React.useRef<HTMLInputElement>(null);
  const [status, setStatus] = React.useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    // Honeypot: silently accept obvious bots without sending.
    if (honeypot.current?.value) {
      setStatus("success");
      reset();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[16px] bg-[#f0eee6] p-6 sm:p-9"
    >
      <input
        ref={honeypot}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Subject" optional error={errors.subject?.message}>
          <Input placeholder="What's this about?" {...register("subject")} />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message" error={errors.message?.message}>
          <Textarea
            placeholder="Write your message…"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send message
            </>
          )}
        </Button>

        {status === "success" ? (
          <p className="inline-flex items-center gap-2 text-sm text-[#141413]">
            <CheckCircle2 className="h-4 w-4" />
            Thanks — I&apos;ll be in touch soon.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="inline-flex items-center gap-2 text-sm text-[#c6613f]">
            <AlertCircle className="h-4 w-4" />
            Something went wrong. Please email me directly.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-[#141413]">
        {label}
        {optional ? (
          <span className="font-sans text-xs normal-case tracking-normal text-[#87867f]">(optional)</span>
        ) : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
