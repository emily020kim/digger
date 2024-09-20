import Image from "next/image";
import albums from "../public/file.png";

const Mission = () => {
  return (
    <div className="flex flex-col w-full h-screen rounded-[100px] bg-gold p-12 items-center">
      <h1 className="w-1/3 text-3xl font-semibold text-white mt-8 mb-12 text-center">
        Trouble finding new music? Me too. That&apos;s where Diggr comes in.
      </h1>
      <Image src={albums} width={800} height={250} alt="Albums" className="mb-20" />
      <h1 className="text-4xl font-semibold text-white text-center mb-8">
        How will Diggr save you from music boredom?
      </h1>
      <div className="flex w-full justify-center gap-x-12">
        <div className="flex w-1/6 flex-col rounded-lg bg-white px-4 py-6 shadow-sm items-center">
          <div className="bg-cyan rounded-full py-3 px-5 text-white font-semibold text-lg mb-4">
            1
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Discover new tracks
          </h1>
          <p className="text-lg font-medium">
            Users will be able to listen to tracks submitted by the community.
          </p>
        </div>

        <div className="flex w-1/6 flex-col rounded-lg bg-white px-4 py-6 shadow-sm items-center">
          <div className="bg-cyan rounded-full py-3 px-5 text-white font-semibold text-lg mb-4">
            2
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Vote for tracks you like
          </h1>
          <p className="text-lg font-medium">
            Hear a submitted song that you like? Give it a like so others can discover it too.
          </p>
        </div>

        <div className="flex w-1/6 flex-col rounded-lg bg-white px-4 py-6 shadow-sm items-center">
          <div className="bg-cyan rounded-full py-3 px-5 text-white font-semibold text-lg mb-4">
            3
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Receive a new playlist every week
          </h1>
          <p className="text-lg font-medium">
            A new playlist consisting of the top 15 tracks with the most votes will be generated every week.
          </p>
        </div>
      </div>
    </div>
  )
};

export default Mission;