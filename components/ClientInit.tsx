"use client";

import { registerServiceWorker } from "@/lib/register-sw";
import { useEffect } from "react";

export default function ClientInit() {
  useEffect(() => {
    registerServiceWorker();
  }, []);
  return null;
}
