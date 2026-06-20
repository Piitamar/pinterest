import { useState } from "react";
import { Link } from "react-router-dom";
import { addNewUserSupabase } from "./apiAuth";

const pageClass =
  "min-h-[calc(100vh-72px)] ml-[7vw] flex items-center justify-center box-border p-7 max-[1100px]:ml-0 max-[1100px]:p-5 max-[720px]:p-3 bg-[radial-gradient(circle_at_top_left,_#ffe2ea_0,_transparent_28%),radial-gradient(circle_at_bottom_right,_#ffd4c1_0,_transparent_24%),linear-gradient(135deg,_#fff8f3_0%,_#fffdfb_100%)]";

const cardClass =
  "w-[min(50vw,760px)] min-h-[760px] overflow-hidden rounded-[38px] bg-[rgba(255,255,255,0.96)] shadow-[0_28px_90px_rgba(113,67,27,0.12)] max-[1100px]:w-full max-[720px]:min-h-auto max-[720px]:rounded-[28px]";

const inputClass =
  "h-16 w-full rounded-[24px] border border-[#bcc7d9] bg-[#eaf1ff] px-[22px] text-[1.05rem] text-zinc-900 outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-[#e60023] focus:bg-[#f4f7ff] focus:shadow-[0_0_0_4px_rgba(230,0,35,0.08)] max-[720px]:h-[58px]";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    await addNewUserSupabase(formData);
  };

  return (
    <main className={pageClass}>
      <section className={cardClass}>
        <div className="relative flex flex-col justify-center px-12 pb-9 pt-10 max-[720px]:px-5 max-[720px]:py-7">
          <button
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border-0 bg-transparent text-[2.2rem] leading-none text-zinc-900"
            type="button"
            aria-label="Đóng"
          >
            x
          </button>

          <div className="mb-[28px] text-center">
            <span className="mx-auto mb-[18px] grid h-[54px] w-[54px] place-items-center rounded-full bg-[#e60023] text-[2rem] font-bold text-white">
              P
            </span>
            <h1 className="mb-3 text-[clamp(2rem,3vw,3.5rem)] font-extrabold leading-[1.08] text-zinc-900">
              Tạo tài khoản Pinterest
            </h1>
            <p className="m-0 text-base text-[#5f5f5f]">
              Lưu ý tưởng của bạn và chia sẻ đến mọi người.
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <label className="flex flex-col gap-2.5 text-base font-semibold text-zinc-900">
              <span>Họ và tên</span>
              <input
                className={inputClass}
                type="text"
                name="name"
                placeholder="Nhập họ tên của bạn"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label className="flex flex-col gap-2.5 text-base font-semibold text-zinc-900">
              <span>Email</span>
              <input
                className={inputClass}
                type="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="flex flex-col gap-2.5 text-base font-semibold text-zinc-900">
              <span>Mật khẩu</span>
              <div className="relative">
                <input
                  className={`${inputClass} pr-[70px]`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Tạo mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 h-[34px] w-[34px] -translate-y-1/2 border-0 bg-transparent p-0"
                  aria-label="Hiện mật khẩu"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-zinc-900">
                    <path d="M12 5C6.5 5 2.1 8.3.5 12c1.6 3.7 6 7 11.5 7s9.9-3.3 11.5-7C21.9 8.3 17.5 5 12 5Zm0 11.2A4.2 4.2 0 1 1 12 7.8a4.2 4.2 0 0 1 0 8.4Zm0-6.7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
                  </svg>
                </button>
              </div>
            </label>

            <button
              className="mt-2 h-[66px] rounded-full border-0 bg-[linear-gradient(135deg,_#ff2449_0%,_#e60023_100%)] text-[1.45rem] font-bold text-white shadow-[0_16px_28px_rgba(230,0,35,0.18)] transition-transform duration-200 hover:-translate-y-0.5 max-[720px]:h-[58px]"
              type="submit"
            >
              Đăng ký
            </button>
          </form>

          <div className="my-[22px] flex items-center gap-[14px] text-[0.95rem] text-[#767676] before:h-px before:flex-1 before:bg-[#e7e7e7] after:h-px after:flex-1 after:bg-[#e7e7e7]">
            <span>hoặc</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="flex h-[58px] items-center justify-center gap-3 rounded-full border border-[#d6d6d6] bg-white text-base font-bold text-[#222222] transition-transform duration-200 hover:-translate-y-0.5"
              type="button"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f2f2f2] text-[1.1rem] font-extrabold text-[#ea4335]">
                G
              </span>
              <span>Tiếp tục với Google</span>
            </button>

            <button
              className="flex h-[58px] items-center justify-center gap-3 rounded-full border-0 bg-[#1877f2] text-base font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
              type="button"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-[1.1rem] font-extrabold text-white">
                f
              </span>
              <span>Tiếp tục với Facebook</span>
            </button>
          </div>

          <p className="mt-[18px] text-center text-[0.98rem] text-[#333333]">
            Bạn đã có tài khoản? <Link className="font-bold text-zinc-900 no-underline" to="/signin">Đăng nhập</Link>
          </p>

          <p className="mx-auto mt-[18px] max-w-[420px] text-center text-[0.88rem] leading-[1.6] text-[#7b7b7b]">
            Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ và Chính sách quyền
            riêng tư của Pinterest.
          </p>
        </div>
      </section>
    </main>
  );
}
