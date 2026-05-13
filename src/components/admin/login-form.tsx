import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Input = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm transition-all bg-black/20 text-white placeholder:text-gray-600"
    />
  </div>
);

export default function LoginForm({ onLogin }: LoginFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center navy-gradient px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/2 shadow-xl shadow-black/20 border border-white/5 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 rounded-full bg-brand-primary/10 text-brand-primary mb-2">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={onLogin} className="space-y-4">
          <Input
            label="Username"
            name="username"
            required
            placeholder="admin"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
          />
          <button className="w-full py-3 bg-brand-primary text-brand-dark rounded-xl font-semibold hover:opacity-90 transition-all active:scale-[0.98]">
            Login
          </button>
        </form>
        <p className="text-center text-xs text-gray-500">
          {/* Hint: admin / admin123 */}
        </p>
      </motion.div>
    </div>
  );
}
