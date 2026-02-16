"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export const cabinetLocations = ["Carvin", "Haisnes"] as const;
export type CabinetLocation = (typeof cabinetLocations)[number];

interface CabinetLocationContextValue {
  location: CabinetLocation;
  setLocation: Dispatch<SetStateAction<CabinetLocation>>;
}

const STORAGE_KEY = "cabinet-location";
const LOCATION_CHANGE_EVENT = "cabinet-location-change";
const CabinetLocationContext = createContext<CabinetLocationContextValue | null>(
  null
);

function isCabinetLocation(value: string | null): value is CabinetLocation {
  return !!value && cabinetLocations.includes(value as CabinetLocation);
}

function getCurrentLocation() {
  if (typeof window === "undefined") {
    return cabinetLocations[0];
  }

  const storedLocation = window.localStorage.getItem(STORAGE_KEY);
  return isCabinetLocation(storedLocation) ? storedLocation : cabinetLocations[0];
}

function subscribeToLocationChanges(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key && event.key !== STORAGE_KEY) return;
    callback();
  };

  const handleLocalChange = () => {
    callback();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(LOCATION_CHANGE_EVENT, handleLocalChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(LOCATION_CHANGE_EVENT, handleLocalChange);
  };
}

export function CabinetLocationProvider({ children }: { children: ReactNode }) {
  const location = useSyncExternalStore(
    subscribeToLocationChanges,
    getCurrentLocation,
    () => cabinetLocations[0]
  );

  const setLocation = useCallback<Dispatch<SetStateAction<CabinetLocation>>>(
    (nextLocation) => {
      if (typeof window === "undefined") {
        return;
      }

      const resolvedLocation =
        typeof nextLocation === "function"
          ? (
              nextLocation as (currentLocation: CabinetLocation) => CabinetLocation
            )(getCurrentLocation())
          : nextLocation;

      if (!isCabinetLocation(resolvedLocation)) {
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, resolvedLocation);
      window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
    },
    []
  );

  const value = useMemo(
    () => ({
      location,
      setLocation,
    }),
    [location, setLocation]
  );

  return (
    <CabinetLocationContext.Provider value={value}>
      {children}
    </CabinetLocationContext.Provider>
  );
}

export function useCabinetLocation() {
  const context = useContext(CabinetLocationContext);

  if (!context) {
    throw new Error(
      "useCabinetLocation doit être utilisé dans CabinetLocationProvider"
    );
  }

  return context;
}
