import { chakra } from "@chakra-ui/react";
import * as MynauiIcons from "@mynaui/icons-react";

type IconComponents = typeof MynauiIcons;

export const withChakraIcons = (icons: IconComponents) => {
  const wrapped: Record<string, any> = {};
  Object.entries(icons).forEach(([name, Icon]) => {
    wrapped[name] = chakra(Icon as any);
  });
  return wrapped as IconComponents;
};

export const ChakraIcons = withChakraIcons(MynauiIcons);
