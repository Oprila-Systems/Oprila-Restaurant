import {
  CalendarDays,
  AudioLines,
  Armchair,
  UserRoundPlus,
} from "lucide-react";

export const RESTAURANT_NAME = "Maître D' Pro";
export const SUBTITLE = "PREMIUM ADMIN";

export const DASHBOARD_STATS = [
  {
    title: "TODAY'S BOOKINGS",
    value: "24",
    subtitle: "+4 from yesterday",
    icon: CalendarDays,
    borderColor: "border-l-black",
    subtitleColor: "text-gray-500",
  },
  {
    title: "ACTIVE AI CALLS",
    value: "2",
    subtitle: "Live assistants",
    icon: AudioLines,
    borderColor: "border-l-[#B96A45]",
    subtitleColor: "text-gray-500",
  },
  {
    title: "TABLE OCCUPANCY",
    value: "85%",
    subtitle: "Peak imminent",
    icon: Armchair,
    borderColor: "border-l-black",
    subtitleColor: "text-[#C26D57]",
  },
  {
    title: "NEW CUSTOMERS",
    value: "12",
    subtitle: "60% of today",
    icon: UserRoundPlus,
    borderColor: "border-l-black",
    subtitleColor: "text-gray-500",
  },
];