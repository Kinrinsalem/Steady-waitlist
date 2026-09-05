import Image from "next/image";
import WaitlistForm from "./waitlist-form";
import Loader from "./loader";
import ellipse from "./Assets/elipse.svg";

export default function Home() {
  return (
    <main className="grid min-h-svh grid-cols-1 bg-[#f3ecdd] md:grid-cols-2">
      <Loader />
      <section
        aria-label="Steady introduction"
        className="grid min-h-[22rem] grid-rows-[auto_1fr_auto] bg-[#16221c] px-7 py-7 sm:min-h-[26rem] sm:px-10 sm:py-9 md:min-h-svh md:px-12 md:py-11 lg:px-16 lg:py-14"
      >
        <p className="font-fraunces text-[2rem] font-bold leading-none tracking-[-0.035em] text-[#f3ecdd]">
          Steady.
        </p>

        <div
          className="relative place-self-center h-[16rem] w-[16rem] sm:h-[19rem] sm:w-[19rem] md:h-[min(34vw,32rem)] md:w-[min(34vw,32rem)]"
          aria-hidden="true"
        >
          <Image
            src={ellipse}
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        <div>
          <p className="mb-2 text-[0.75rem] font-medium leading-none tracking-[0.02em] text-[#9db8a8] sm:text-[0.8125rem]">
            a calmer way to feel steady
          </p>
          <p className="font-fraunces max-w-md text-[1.45rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#f3ecdd] sm:text-[1.7rem] md:text-[clamp(1.45rem,2vw,2rem)]">
            check in, reach out, keep going.
          </p>
        </div>
      </section>

      <section className="flex items-center px-7 py-14 sm:px-12 sm:py-20 md:px-12 md:py-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[31rem]">
          <header className="mb-10 sm:mb-12">
            <p className="mb-4 text-sm font-medium tracking-[-0.01em] text-[#77746d]">
              Join the waitlist
            </p>
            <h1 className="font-fraunces text-[2.55rem] font-bold leading-[0.98] tracking-[-0.045em] text-[#222622] sm:text-[3rem] md:text-[clamp(2.5rem,3.4vw,3.5rem)]">
              <span className="block">Be first to feel</span>
              <span className="block">Steady.</span>
            </h1>
            <p className="mt-6 max-w-[29rem] text-[0.97rem] leading-[1.65] tracking-[-0.01em] text-[#706f69] sm:text-base">
              Check in with yourself, understand how you're feeling, and
              reach a therapist when you need one.
            </p>
          </header>

          <WaitlistForm />
        </div>
      </section>
    </main>
  );
}
