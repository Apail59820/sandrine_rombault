"use client";

import {
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { useCabinetLocation } from "@/app/context/CabinetLocationContext";
import { getDoctolibUrl } from "@/app/lib/doctolib";

interface DoctolibLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function DoctolibLink({
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...anchorProps
}: DoctolibLinkProps) {
  const { location } = useCabinetLocation();

  return (
    <a href={getDoctolibUrl(location)} target={target} rel={rel} {...anchorProps}>
      {children}
    </a>
  );
}
