import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Users,
  TableProperties,
  AudioLines,
  Armchair,
  UserRoundPlus,
} from "lucide-react";

export const RESTAURANT_NAME = "Maître D' Pro";
export const SUBTITLE = "PREMIUM ADMIN";
export const NAV_ITEMS = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Bookings",
    icon: CalendarDays,
  },
  {
    label: "Menu",
    icon: UtensilsCrossed,
  },
  {
    label: "Call History",
    icon: Users,
  },
  {
    label: "Floor Plan",
    icon: TableProperties,
  },
];

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


export const AI_ACTIVITY_DATA = [
  {
    title: "Booking Confirmed",
    status: "COMPLETED",
    statusBg: "bg-[#E7F0E3]",
    statusText: "text-[#56724F]",
    dotColor: "bg-[#0E1E16]",
    description:
      '"Table for 4 at 8 PM. Guest requested window seat for anniversary."',
    footer: "Assistant #4 • 2m ago",
    italic: true,
  },

  {
    title: "Inbound Inquiry",
    status: "IN PROGRESS",
    statusBg: "bg-[#F8DDD7]",
    statusText: "text-[#8B5A4A]",
    dotColor: "bg-[#B96A45]",
    description:
      "Clarifying dietary restrictions for a private event inquiry on Nov 12th.",
    footer: "Assistant #1 • Live",
    italic: false,
  },

  {
    title: "Rescheduling",
    status: "COMPLETED",
    statusBg: "bg-[#E7F0E3]",
    statusText: "text-[#56724F]",
    dotColor: "bg-[#0E1E16]",
    description:
      '"Moved Henderson party (6) from 7:30 to 8:15 PM."',
    footer: "Assistant #2 • 15m ago",
    italic: true,
  },
  
];