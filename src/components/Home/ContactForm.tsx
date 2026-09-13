"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_LEN = 500;

const contactSchema = z.object({
  message: z
    .string()
    .min(10, "At least 10 characters")
    .max(MAX_LEN, `Max ${MAX_LEN} characters`),
});

type ContactFormData = z.infer<typeof contactSchema>;

const fieldVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function ContactFormFields({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { message: "" },
  });

  const messageValue = watch("message") ?? "";
  const charCount = messageValue.length;

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: "Anonymous",
          email: "noreply@portfolio.local",
          subject: "Portfolio Contact: Anonymous Message",
          message: data.message,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error("Failed to send");
      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <motion.div
        className="flex flex-col gap-1.5"
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="relative group">
          <textarea
            id={compact ? "modal-message" : "message"}
            rows={compact ? 3 : 5}
            maxLength={MAX_LEN}
            placeholder="What's on your mind?"
            {...register("message")}
            className="w-full resize-none bg-background/40 border border-border rounded-lg px-3 py-2.5 pb-6 text-sm smalll placeholder:text-muted-foreground/40 outline-none focus:border-foreground focus:bg-background/60 transition-all"
          />
          <span
            className={`smalll absolute right-3 bottom-2 text-[10px] tabular-nums pointer-events-none ${
              charCount > MAX_LEN * 0.9
                ? "text-destructive"
                : "text-muted-foreground/60"
            }`}
          >
            {charCount}/{MAX_LEN}
          </span>
        </div>
        <AnimatePresence>
          {errors.message && (
            <motion.span
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="small-text text-[11px] text-destructive overflow-hidden"
            >
              {errors.message.message}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="flex items-center justify-between gap-3"
      >
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="small-text text-[11px] text-muted-foreground"
            >
              Thanks! I&apos;ll get back to you soon.
            </motion.p>
          ) : status === "error" ? (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="small-text text-[11px] text-destructive"
            >
              Something broke — try again.
            </motion.p>
          ) : (
            <motion.span
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="smalll text-[10px] text-muted-foreground/60"
            >
              No email needed.
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="smalll text-xs px-5 py-2 rounded-lg border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {status === "sending"
            ? "Sending..."
            : status === "sent"
              ? "Sent!"
              : "Send"}
        </motion.button>
      </motion.div>
    </form>
  );
}

export default function ContactForm() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      <motion.h2
        className="jap text-3xl mb-4"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        Get in Touch
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="BentoCard !items-start !justify-start !p-5"
      >
        <div className="BentoCard-content w-full">
          <ContactFormFields />
        </div>
      </motion.div>
    </div>
  );
}
