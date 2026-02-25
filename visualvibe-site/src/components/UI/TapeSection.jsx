import { Fragment } from 'react';
import { Star } from 'lucide-react';

const words = [
  "Performable",
  "Accessible",
  "Secure",
  "Interactive",
  "Scalable",
  "User Friendly",
  "Efficient",
  "Reliable",
  "Innovative",
  "Sustainable",
  "Maintainable",
  "Search Optimized",
  "Usable",
];

const TapeSection = () => {
  return (
    <div className="py-12 lg:py-16 overflow-x-clip">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rotate-1 -mx-2">
        <div className="flex [mask-image:linear-gradient(to_left,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-4 pr-4 animate-move-right flex-none py-3 [animation-duration:25s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, idx) => (
              <Fragment key={idx}>
                {words.map((word) => (
                  <div className="inline-flex gap-4 items-center" key={`${idx}-${word}`}>
                    <span className="text-white font-extrabold uppercase text-sm tracking-wider">
                      {word}
                    </span>
                    <Star className="w-5 h-5 text-white fill-white rotate-12" />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapeSection;
