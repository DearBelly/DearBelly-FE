import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      breakpoints: {
        base: { value: "" },
        sm: { value: "375px" },
        md: { value: "768px" },
        lg: { value: "1024px" },
        xl: { value: "1280px" },
      },
    },
  },
})