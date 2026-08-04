import { useState, useEffect } from "react";
import { partnersApi } from "../../../services/api";
import CompanyMarquee from "./CompanyMarquee";

const TrustedCompanies = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    let isMounted = true;
    partnersApi
      .getAll()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setCompanies(data.filter((c) => c.image_url));
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  if (!companies || companies.length === 0) return null;

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Trusted by teams at"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] md:w-[1100px] md:h-[440px] bg-blue-900/15 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <h2 className="text-center text-sm md:text-base font-medium tracking-wide text-gray-500">
          Trusted by teams at
        </h2>
      </div>

      <div className="relative mt-10 md:mt-14">
        <CompanyMarquee logos={companies} />
      </div>
    </section>
  );
};

export default TrustedCompanies;
