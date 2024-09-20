import Mission from "./Mission";

const Landing = () => {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="flex flex-col w-1/2 items-center justify-center px-8">
          <h1 className="text-6xl font-bold mb-28">
            Discover new music with Diggr
          </h1>
          <button className="rounded-full px-3 py-2 bg-gold text-white font-medium text-base hover:opacity-75">
            Discover more
          </button>
        </div>
        <div className="flex w-1/2 items-center justify-center">
          <video width={450} height={370} controls preload="none" autoPlay loop muted>
            <source src="/animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Mission />
    </>
  )
};

export default Landing;