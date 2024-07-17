import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pt-[120px] dark:bg-gray-dark md:pt-[150px] xl:pt-[180px] 2xl:pt-[210px] pb-8"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Simplify Your Fraction Learning
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  Your go-to for easy fraction learning. Enjoy interactive guides, instant feedback, and track your progress effortlessly. Start simplifying fractions today!
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div
                  className="cursor-pointer rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  🔥 <span className="text-pink-800 mr-2">Welcome</span> <span className="font-bold">Vasily Naumenko </span> 😉
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
