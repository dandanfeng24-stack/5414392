import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="section-shell py-16">
      <section className="surface rounded p-8 md:p-10">
        <div className="text-sm text-gold">账号入口</div>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-paper md:text-6xl">注册</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-linen">
          注册后默认成为注册用户，可进入用户中心，并用于后续保存诊断记录、资料包权益和服务进度。
        </p>
      </section>

      <RegisterForm />
    </div>
  );
}
