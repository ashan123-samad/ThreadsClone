import * as Icons from "@expo/vector-icons";
import { cssInterop } from "nativewind";

Object.values(Icons).forEach((IconComponent) => {
  if (typeof IconComponent !== "function") {
    return;
  }

  cssInterop(IconComponent as any, {
    className: "style",
  });
});