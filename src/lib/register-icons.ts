import * as Icons from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import type { ComponentType } from "react";

Object.values(Icons).forEach((IconComponent) => {
  if (typeof IconComponent !== "function") {
    return;
  }

  cssInterop(IconComponent as ComponentType<unknown>, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        width: true,
        height: true,
        size: true,
      },
    },
  });
});
