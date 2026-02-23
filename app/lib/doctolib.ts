export const DOCTOLIB_URLS = {
  Carvin:
    "https://www.doctolib.fr/cabinet-paramedical/carvin/cabinet-ergotherapie-sandrine-rombaut?pid=practice-233594",
  Haisnes: "https://www.doctolib.fr/ergotherapeute/haisnes/sandrine-rombaut",
} as const;

export type DoctolibLocation = keyof typeof DOCTOLIB_URLS;

export function getDoctolibUrl(location: string) {
  if (location === "Haisnes") {
    return DOCTOLIB_URLS.Haisnes;
  }

  return DOCTOLIB_URLS.Carvin;
}

export function isDoctolibUrl(url: string) {
  return /(^https?:\/\/)?(www\.)?doctolib\.fr/i.test(url);
}
