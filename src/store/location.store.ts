import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Location = { id: string; value: string; iso3?: string; iso2?: string; latitude?: string; longitude?: string };

export type LocationStore = {
  cities: Location[];
  states: Location[];
  countries: Location[];
  setCities: (cities: Location[]) => void;
  setStates: (states: Location[]) => void;
  setCountries: (countries: Location[]) => void;
  getCities: () => Location[];
  getStates: () => Location[];
  getCountries: () => Location[];
  getAllLocations: () => Location[];
};

const useLocationStore = create<LocationStore>()(
  devtools(
    persist(
      (set, get) => ({
        cities: [],
        states: [],
        countries: [],
        setCities: (cities) => set({ cities }),
        setStates: (states) => set({ states }),
        setCountries: (countries) => set({ countries }),
        getCities: () => get().cities,
        getStates: () => get().states,
        getCountries: () => get().countries,
        getAllLocations: () => [
          ...get().cities,
          ...get().states,
          ...get().countries,
        ],
      }),
      {
        name: "location-cache"
      }
    )
  )
);

export { useLocationStore };
