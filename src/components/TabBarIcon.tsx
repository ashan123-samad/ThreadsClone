import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createElement, type ComponentProps } from "react";
import { Platform, View } from "react-native";

export type TabIconName = "home" | "search" | "add" | "activity" | "profile";

const IOS_ICON_NAMES: Record<
  TabIconName,
  ComponentProps<typeof Ionicons>["name"]
> = {
  home: "home",
  search: "search",
  add: "add-circle-outline",
  activity: "heart-outline",
  profile: "person-outline",
};

const ANDROID_ICON_NAMES: Record<
  TabIconName,
  ComponentProps<typeof MaterialCommunityIcons>["name"]
> = {
  home: "home",
  search: "magnify",
  add: "plus-circle-outline",
  activity: "heart-outline",
  profile: "account-outline",
};

type TabBarIconProps = {
  name: TabIconName;
  color: string;
  size?: number;
};

/** Avoid NativeWind JSX wrapping; Material icons are more reliable on Android. */
export function TabBarIcon({ name, color, size = 26 }: TabBarIconProps) {
  const iconSize = size;

  const icon =
    Platform.OS === "android"
      ? createElement(MaterialCommunityIcons, {
          name: ANDROID_ICON_NAMES[name],
          color,
          size: iconSize,
        })
      : createElement(Ionicons, {
          name: IOS_ICON_NAMES[name],
          color,
          size: iconSize,
        });

  return createElement(
    View,
    {
      style: {
        width: iconSize + 4,
        height: iconSize + 4,
        alignItems: "center",
        justifyContent: "center",
      },
    },
    icon
  );
}
