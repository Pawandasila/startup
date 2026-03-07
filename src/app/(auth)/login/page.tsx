import React from "react";
import Link from "next/link";
import { LoginForm } from "@/module/auth/component/login-form";
import { Sparkles } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full font-sans antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Left Side: Artistic Fashion Editorial Image */}
      <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 bg-[#ebebeb] dark:bg-slate-900 overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center grayscale mix-blend-multiply opacity-90 transition-all duration-700 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzvi6hUwx6pyv5ToLnMR2-lCk5A1yuFvFfQfurL8yAYjlXI0UgrR45QQ4qOWJtGQxQlTj7HggWj7DfalahhPj1HpzBnuDXaEoC6AhUf7WPWU2bE5FryOH-KgceCFcJNsEelePA7iY_1FjCm0jflnbgaporS-5u4Qhq5nrYjiK6f0S7a-JpzwfYQ0NPwCkJdbJII80Hu8SO1Km8aQOGBCIlbzbfCf2oGNq_t96MZqCCb5ISVfSkqidR7syihu1HXBmfWy2aw3W7L3-f')",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-12 left-12 z-10 text-white animate-in slide-in-from-bottom duration-700">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-serif font-bold tracking-tight">
              Luxe Rental
            </h2>
          </div>
          <p className="text-white/80 mt-2 font-serif italic text-xl max-w-sm leading-relaxed">
            Curated elegance for the modern nomad.
          </p>
        </div>
      </div>

      {/* Right Side: Minimalist Login Form */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-20 lg:px-32">
          <div className="max-w-[420px] w-full mx-auto space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-12">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                Luxe Rental
              </h2>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <h1 className="font-serif text-4xl md:text-5xl font-medium text-slate-900 dark:text-slate-50">
                Welcome Back
              </h1>
              <p className="text-slate-500 font-sans dark:text-slate-400 text-[11px] uppercase font-bold">
                Enter your credentials to access your luxury sanctuary
              </p>
            </div>

            <div className="pt-4">
              <LoginForm />
            </div>

            <div className="text-center pt-4 text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest text-[11px] border-b-2 border-primary/40 ml-2 hover:border-primary transition-all duration-300"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
