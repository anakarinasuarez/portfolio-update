import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto: hay otro lockfile en el home del usuario y
  // Turbopack, si no, infiere mal el workspace root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
