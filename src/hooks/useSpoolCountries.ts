"use client";

import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useLocationStore, Location } from "@/store/location.store";
import { routes } from "@/constants/api.routes";

const useSpoolCountries = () => {
  const headers = new Headers();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setCountries, getCountries } = useLocationStore();

  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY || "");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const existingCountries = getCountries();

      if (existingCountries.length > 0) {
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          routes.external.SPOOL_COUNTRIES,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();

          const serializedCountries: Location[] = result.map((r: any) => {
            const { name, iso2, iso3 } = r;
            return {
              id: nanoid(),
              value: name,
              iso2,
              iso3,
            };
          });

          setTimeout(() => {
            setCountries(serializedCountries);
          }, 2000);
        } else {
          throw new Error("Failed to fetch countries");
        }
      } catch (err: any) {
        setError(err?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [getCountries, setCountries]);

  return { loading, error, countries: getCountries() };
};

export { useSpoolCountries };
