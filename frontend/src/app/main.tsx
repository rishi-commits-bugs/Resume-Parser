"use client";

import React, { useEffect } from "react";
import { testApiConnection } from "../api";

export default function AppConfig({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("Browser details:");
    console.log("User Agent:", navigator.userAgent);
    console.log("CORS Mode:", "cors");

    // Test API connectivity
    testApiConnection().then((isConnected) => {
      if (!isConnected) {
        console.error("❌ API connectivity test failed - please check server");
      } else {
        console.log("✅ API connectivity test successful");
      }
    });
  }, []);

  return <>{children}</>;
}

export function initializeApp() {
  console.log("Resume Parser application initialized");
}
