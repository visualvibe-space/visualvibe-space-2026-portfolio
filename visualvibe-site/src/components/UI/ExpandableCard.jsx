import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../../hooks/use-outside-click";

export function ExpandableCardDemo({ cards = [] }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (cards.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#0f172a] sm:rounded-3xl overflow-hidden border border-gray-700"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="w-full"
              >
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 object-cover"
                />
              </motion.div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-bold text-white text-xl mb-1"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-gray-400 text-sm"
                  >
                    {active.description}
                  </motion.p>
                </div>

                <div className="pt-2 pb-2 flex-grow overflow-auto">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-300 text-sm leading-relaxed"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>

                {active.ctaLink && (
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="mt-4 w-full py-3 px-4 text-center text-sm rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors border border-gray-600 hover:border-blue-500"
                  >
                    {active.ctaText}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="flex flex-col bg-[#0f172a] rounded-2xl cursor-pointer border border-gray-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden h-full"
          >
            <motion.div
              layoutId={`image-${card.title}-${id}`}
              className="w-full flex-shrink-0"
            >
              <img
                width={100}
                height={100}
                src={card.src}
                alt={card.title}
                className="h-48 w-full object-cover"
              />
            </motion.div>
            <div className="p-4 flex flex-col flex-grow">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-bold text-white text-lg mb-1"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-gray-400 text-sm mb-4"
              >
                {card.description}
              </motion.p>
              {card.ctaLink && (
                <motion.button
                  layoutId={`button-${card.title}-${id}`}
                  className="mt-auto w-full py-2.5 px-4 text-sm rounded-xl font-semibold bg-gray-800 text-white hover:bg-blue-600 transition-colors border border-gray-600 hover:border-blue-500"
                >
                  {card.ctaText || "View"}
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
