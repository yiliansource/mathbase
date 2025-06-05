import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "solvely",
        short_name: "solvely",
        description: "browse and study mathematical problems",
        id: "/?source=pwa",
        start_url: "/?source=pwa",
        scope: "/",
        background_color: "#ffffff",
        theme_color: "#2b7fff",
        display: "standalone",
        prefer_related_applications: false,
        icons: [
            {
                src: "/apple-icon.png",
                type: "image/png",
                sizes: "180x180",
            },
        ],
    };
}
