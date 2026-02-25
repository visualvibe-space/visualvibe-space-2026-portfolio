import { useState, useEffect } from "react";
import { slidesApi, teamApi, websitesApi, logosApi, graphicsApi, flyersApi, uiuxApi, videosApi } from "../services/api";
import { getImageUrl } from "../utils/image";

export const useHomepageData = () => {
  const [slides, setSlides] = useState([]);
  const [teamData, setTeamData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slidesRes, teamRes] = await Promise.allSettled([
          slidesApi.getAll().catch(() => []),
          teamApi.getAll().catch(() => ({})),
        ]);

        setSlides(Array.isArray(slidesRes.value) ? slidesRes.value : []);
        setTeamData(teamRes.value || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { slides, teamData, loading, error };
};

export const usePortfolioData = () => {
  const [websites, setWebsites] = useState([]);
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [websitesRes, logosRes] = await Promise.allSettled([
          websitesApi.getAll().catch(() => []),
          logosApi.getAll().catch(() => []),
        ]);

        setWebsites(Array.isArray(websitesRes.value) ? websitesRes.value : []);
        setLogos(Array.isArray(logosRes.value) ? logosRes.value : []);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { websites, logos, loading };
};

export { getImageUrl };
