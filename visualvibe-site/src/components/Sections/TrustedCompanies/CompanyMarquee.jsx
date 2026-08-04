import { useReducedMotion } from "framer-motion";
import { getImageUrl } from "../../../utils/image";
import "./marquee.css";

const CompanyMarquee = ({ logos }) => {
  const shouldReduceMotion = useReducedMotion();
  const copies = shouldReduceMotion ? 1 : 2;

  return (
    <div className="marquee">
      <div className="marquee-track animate-move-left [animation-duration:30s]">
        {[...new Array(copies)].fill(0).map((_, copy) =>
          logos.map((logo) => {
            const img = (
              <img
                src={getImageUrl(logo.image_url)}
                alt={`${logo.name} logo`}
                className="max-h-16 max-w-[200px] w-auto h-auto flex-shrink-0 opacity-60 grayscale transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0 hover:scale-[1.03]"
              />
            );
            const key = `${copy}-${logo.id ?? logo.name}`;
            const wrapperClass =
              "mx-6 md:mx-8 flex-shrink-0 flex items-center justify-center";
            return logo.website_url ? (
              <a
                key={key}
                href={logo.website_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${logo.name} website`}
                className={wrapperClass}
              >
                {img}
              </a>
            ) : (
              <div key={key} className={wrapperClass}>
                {img}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CompanyMarquee;
