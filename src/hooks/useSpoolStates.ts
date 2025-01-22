"use client";

import { routes } from "@/constants/api.routes";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useLocationStore, Location } from "@/store/location.store";

const useSpoolStates = () => {
  const headers = new Headers();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setStates, getStates } = useLocationStore();

  headers.append("X-CSCAPI-KEY", process.env.NEXT_PUBLIC_CSC_API_KEY || "");

  const requestOptions: RequestInit = {
    method: "GET",
    headers,
    redirect: "follow",
  };

  useEffect(() => {
    const fetchStates = async () => {
      const existingStates = getStates();

      if (existingStates.length > 0) {
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          routes.external.SPOOL_STATES,
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();

          const serializedStates: Location[] = result.map((r: any) => {
            const { name, iso2, latitude, longitude } = r;
            return {
              id: nanoid(),
              value: name,
              iso2,
              latitude,
              longitude,
            };
          });

          setTimeout(() => {
            setStates(serializedStates);
          }, 2000);
        } else {
          throw new Error("Failed to fetch states");
        }
      } catch (err: any) {
        setError(err?.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [getStates, setStates]);

  return { loading, error, states: getStates() };
};

export { useSpoolStates };
