// Copyright 2022-2023 @Kotlang/navachaar-admin-portal authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: [
        // add the paths to all of your template files
        "./src/*.{jsx,tsx}",
        "./src/**/*.{jsx,tsx}",
    ],
    darkMode: "class",
    important: true, // to generate utilities as !important
    plugins: [require("tailwind-scrollbar-hide")],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-primary":
                    "linear-gradient(180deg, #CAC9F9 0%, #332D82 100%)",
            },
            boxShadow: {
                large: "-3px 4px 10px #CAC9F9",
                siderBox: "-6px 10px 10px rgba(0, 0, 0, 0.23)",
                small: "-2px 3px 6px #CAC9F9",
                top: "0px -3px 4px #CAC9F9",
                inputShadow:
                    "-4px 5px 4px 0px rgba(0, 0, 0, 0.25) inset, 4px -4px 4px 0px #242424 inset",
                temp: "-4px 4px 8px 0px rgba(0, 0, 0, 0.25), 4px -4px 8px 0px #242424, -2px 2px 4px 0px rgba(0, 0, 0, 0.25), 2px -2px 4px 0px #262626",
            },

            colors: {
                NeutralButtonShadow: "#A8996D",
                NeutralButtonShadowLight: "#F0EBDD",
                NeutralButtonSurface: "#FCFBF5",
                NeutralShadowMeduim: "#EFE5C7",
                NeutralSurfaceBgUp: "#FFFFFF",
                OnNeutralActive: "#FFA500",
                OnNeutralButtons: "#1B1C1E",
                PrimarySurfaceDim: "#FED17B",
                PrimarySurfaceDimmer: "#FFEAC2",
                SecondarySurface: "#4ECB71",
                black_full: "#000",
                black_primary: "rgba(0, 0, 0, 0.9)",
                black_text: "#1F1F1F",
                blue_primary: "#645ADF",
                blue_primary1: "#EBEBFF",
                blue_secondary: "#CAC9F9",
                gray_primary: "#f6f7fE",
                gray_primary1: "#FBFAFC",
                gray_secondary: "#F5F5F5",
                green_primary: "#34C06E",
                purple_app_bg: "#F6F7FE",
                red_primary: "#CD4A56",
                primary: "#34C06E",
                main_black: "#171717",
                mid_black: "#1E1E1E",
                w_text: "#EFF3F4",
                f_text: "#828282",
                b_gradient: "linear-gradient(to left bottom, #CDCDCD, #262D2E)",
            },
            fontFamily: {
                // add new font family
                mainfont: ["Barlow"],
                primary: ["DM Sans"],
            },
            borderColor: (theme) => ({
                ...theme("colors"),
                b_gradient: "linear-gradient(to left bottom, #CDCDCD, #262D2E)",
            }),
            borderImage: {
                b_gradient:
                    "linear-gradient(to left bottom, #CDCDCD, #262D2E) 1",
            },
        },
    },
};
