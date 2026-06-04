# Admin Dashboard — Frontend System Design

> Next.js 14 (App Router) + shadcn/ui + Tailwind CSS  
> Frontend-only. All data comes from your existing backend API.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Routing & Pages](#routing--pages)
4. [Layout Architecture](#layout-architecture)
5. [Page-by-Page Design](#page-by-page-design)
   - [Analytics (Home)](#1-analytics-home)
   - [Calls & Transcripts](#2-calls--transcripts)
   - [Bookings](#3-bookings)
   - [Menu Manager](#4-menu-manager)
   - [Settings](#5-settings)
6. [Component Architecture](#component-architecture)
7. [Data Fetching Strategy](#data-fetching-strategy)
8. [State Management](#state-management)
9. [Authentication Flow](#authentication-flow)
10. [API Integration Layer](#api-integration-layer)
11. [Environment Variables](#environment-variables)
12. [shadcn/ui Components Used](#shadcnui-components-used)
13. [Getting Started](#getting-started)

---

## Tech Stack

| Concern       | Library               | Version   |
| ------------- | --------------------- | --------- |
| Framework     | Next.js (App Router)  | 14.x      |
| Language      | TypeScript            | 5.x       |
| Styling       | Tailwind CSS          | 3.x       |
| Component kit | shadcn/ui             | latest    |
| Forms         | React Hook Form + Zod | 7.x / 3.x |
| Charts        | Recharts              | 2.x       |
| Date handling | date-fns              | 3.x       |
| Calendar view | react-big-calendar    | latest    |
| Table         | TanStack Table        | 8.x       |
| Notifications | sonner (toast)        | latest    |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx               # Root dashboard layout (sidebar + topbar)
│   │   ├── page.tsx                 # /  → Analytics
│   │   ├── calls/
│   │   │   ├── page.tsx             # /calls → Calls table
│   │   │   └── [id]/
│   │   │       └── page.tsx         # /calls/:id → Call detail
│   │   ├── bookings/
│   │   │   ├── page.tsx             # /bookings → Bookings list + calendar
│   │   │   └── [id]/
│   │   │       └── page.tsx         # /bookings/:id → Booking detail
│   │   ├── menu/
│   │   │   └── page.tsx             # /menu → Category + items manager
│   │   └── settings/
│   │       └── page.tsx             # /settings
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts         # NextAuth handler
│   ├── layout.tsx                   # Root layout (fonts, providers)
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── nav-item.tsx
│   ├── calls/
│   │   ├── calls-table.tsx
│   │   ├── call-filters.tsx
│   │   ├── call-detail-drawer.tsx
│   │   ├── transcript-viewer.tsx
│   │   └── audio-player.tsx
│   ├── bookings/
│   │   ├── bookings-table.tsx
│   │   ├── bookings-calendar.tsx
│   │   ├── booking-form.tsx
│   │   ├── booking-status-badge.tsx
│   │   └── booking-filters.tsx
│   ├── menu/
│   │   ├── category-sidebar.tsx
│   │   ├── items-grid.tsx
│   │   ├── item-card.tsx
│   │   ├── item-form.tsx
│   │   └── category-form.tsx
│   ├── analytics/
│   │   ├── kpi-card.tsx
│   │   ├── calls-volume-chart.tsx
│   │   ├── intent-pie-chart.tsx
│   │   ├── bookings-bar-chart.tsx
│   │   └── peak-hours-heatmap.tsx
│   └── ui/                          # shadcn/ui generated components
│
├── lib/
│   ├── api/
│   │   ├── client.ts                # Base fetch wrapper with auth headers
│   │   ├── calls.ts                 # Calls API functions
│   │   ├── bookings.ts              # Bookings API functions
│   │   ├── menu.ts                  # Menu API functions
│   │   └── analytics.ts             # Analytics API functions
│   ├── auth.ts                      # NextAuth config
│   ├── query-client.ts              # TanStack Query client setup
│   └── utils.ts                     # cn(), formatDate(), etc.
│
├── hooks/
│   ├── use-calls.ts
│   ├── use-bookings.ts
│   ├── use-menu.ts
│   └── use-analytics.ts
│
├── types/
│   ├── call.ts
│   ├── booking.ts
│   ├── menu.ts
│   └── analytics.ts
│
└── providers/
    └── query-provider.tsx           # TanStack Query + Toaster wrapper
```

---

## Routing & Pages

```
/login                    Public — login page
/                         Protected — analytics dashboard (home)
/calls                    Protected — calls list with filters
/calls/:id                Protected — single call detail + transcript
/bookings                 Protected — bookings list + calendar toggle
/bookings/:id             Protected — single booking detail + edit
/menu                     Protected — category sidebar + items grid
/settings                 Protected — restaurant config + admin users
```

All routes under `(dashboard)/` are protected by a layout-level auth check. Unauthenticated users are redirected to `/login`.

---

## Layout Architecture

### Root dashboard layout (`app/(dashboard)/layout.tsx`)

```
┌─────────────────────────────────────────────────────┐
│  Sidebar (240px fixed)  │  Main area (flex-1)        │
│                         │  ┌────────────────────┐   │
│  Logo                   │  │  Topbar             │   │
│  ─────────────          │  └────────────────────┘   │
│  Nav links              │  ┌────────────────────┐   │
│   • Analytics           │  │                    │   │
│   • Calls               │  │  <children />      │   │
│   • Bookings            │  │                    │   │
│   • Menu                │  │                    │   │
│   • Settings            │  └────────────────────┘   │
│                         │                            │
│  ─────────────          │                            │
│  User avatar + name     │                            │
│  Logout                 │                            │
└─────────────────────────────────────────────────────┘
```

---

## Page-by-Page Design

### 1. Analytics (Home)

**Route:** `/`  
**Layout:**

```
┌──────────────────────────────────────────────────┐
│  KPI row (4 cards)                               │
│  Calls today | Bookings this week | Avg duration │
│  Conversion rate                                 │
├────────────────────────┬─────────────────────────┤
│  Call volume (line)    │  Intent breakdown (pie) │
├────────────────────────┴─────────────────────────┤
│  Booking status (stacked bar)                    │
├──────────────────────────────────────────────────┤
│  Peak hours heatmap (day × hour grid)            │
└──────────────────────────────────────────────────┘
```

**Components:**

- `<KpiCard label value trend />` — shows value with % change vs last period
- `<CallsVolumeChart />` — Recharts `LineChart`, toggle hourly/daily/weekly
- `<IntentPieChart />` — Recharts `PieChart` with legend
- `<BookingsBarChart />` — Recharts `BarChart` stacked by status
- `<PeakHoursHeatmap />` — CSS grid 7×24, cell opacity = call count

**Data fetching:** All charts use `useQuery` with a shared `dateRange` state that drives refetch when the date picker changes.

---

### 2. Calls & Transcripts

**Route:** `/calls` and `/calls/:id`  
**Data:** `GET /api/calls`, `GET /api/calls/:id`, `GET /api/calls/:id/transcript`

**`/calls` layout:**

```
┌──────────────────────────────────────────────────┐
│  Search bar        [Date range]  [Intent ▾]      │
│                                  [Status ▾] [Export CSV]│
├──────────────────────────────────────────────────┤
│  Table                                           │
│  Caller       Date/Time   Duration  Intent  Status│
│  +91 98765… | 3 Jun 9am  | 2m 14s | Booking| ✓  │
│  …                                               │
├──────────────────────────────────────────────────┤
│  Pagination                                      │
└──────────────────────────────────────────────────┘
```

**`/calls/:id` layout:**

```
┌──────────────────────────────────────────────────┐
│  ← Back   Call detail — RST-CALL-001             │
├────────────────────┬─────────────────────────────┤
│  Meta panel        │  Transcript                 │
│  Caller: …         │  [00:00] Hello, I'd like…   │
│  Duration: 2m 14s  │  [00:04] Of course! …       │
│  Intent: Booking   │  …                          │
│  Status: Completed │                             │
│  Booking: RST-001  │                             │
│                    ├─────────────────────────────┤
│  ─────────         │  Audio player               │
│  Audio player      │  ▶ ──────────────── 2:14    │
└────────────────────┴─────────────────────────────┘
```

---

### 3. Bookings

**Route:** `/bookings` and `/bookings/:id`

**`/bookings` layout:**

```
┌──────────────────────────────────────────────────┐
│  [+ New booking]   [List ▾ / Calendar]           │
│  Search…   [Date ▾]  [Status ▾]  [Source ▾]     │
├──────────────────────────────────────────────────┤
│  List view:                                      │
│  Ref      Guest    Date/Time  Party  Status      │
│  RST-001  John D.  4 Jun 7pm  4      Confirmed   │
│  …                                               │
│                                                  │
│  Calendar view:                                  │
│  react-big-calendar month/week/day view          │
│  Each slot shows guest name + party size         │
└──────────────────────────────────────────────────┘
```

**`/bookings/:id` — Booking detail + edit:**

```
┌──────────────────────────────────────────────────┐
│  ← Back   RST-20240604-001   [Edit] [Cancel]     │
├────────────────────┬─────────────────────────────┤
│  Guest info        │  Booking info               │
│  Name: John Doe    │  Date: 4 Jun 2024           │
│  Phone: …          │  Time: 7:00 PM              │
│  Email: …          │  Party: 4                   │
│                    │  Status: Confirmed           │
│                    │  Source: Phone AI            │
│                    │  Linked call: RST-CALL-001   │
├────────────────────┴─────────────────────────────┤
│  Notes                                           │
│  Window seat requested                           │
└──────────────────────────────────────────────────┘
```

---

### 4. Menu Manager

**Route:** `/menu`

**Layout:**

```
┌──────────────────────────────────────────────────┐
│  [+ Add item]                                    │
├──────────────┬───────────────────────────────────┤
│  Categories  │  Items grid                       │
│  ──────────  │  ┌────────┐ ┌────────┐ ┌────────┐│
│  All (42)    │  │ Item 1 │ │ Item 2 │ │ Item 3 ││
│  Starters(8) │  │ $12.00 │ │ $18.50 │ │  …     ││
│  Mains (14)  │  │ ✓ Avail│ │ ✗ N/A  │ │        ││
│  Desserts(6) │  └────────┘ └────────┘ └────────┘│
│  Drinks (14) │  …                               │
│              │                                  │
│  [+ Category]│                                  │
└──────────────┴───────────────────────────────────┘
```

**Item card actions:** Edit (opens Sheet form), toggle availability inline, delete with confirm dialog.

---

### 5. Settings

**Route:** `/settings`  
**Layout:** Tabbed panel

**Tabs:**

| Tab           | Fields                                                              |
| ------------- | ------------------------------------------------------------------- |
| Restaurant    | Name, address, phone, email, timezone                               |
| Hours         | Opening/closing time per day, closed days toggle                    |
| Bookings      | Max party size, slot duration (mins), advance booking window (days) |
| AI agent      | Greeting message, agent persona name, fallback message              |
| Notifications | New booking email, missed call alert email, SMS toggle              |
| Admins        | List of admin users, invite by email, change role, deactivate       |

**Settings are saved per-section** — each tab has its own Save button and its own `useMutation`.

---

## Component Architecture

### Shared patterns

**Page header** — consistent across all pages:

```tsx
// Used at top of every page
<PageHeader
  title="Calls & transcripts"
  description="All inbound calls from your AI phone line"
>
  <Button>Export CSV</Button>
</PageHeader>
```

**Data table** — built on TanStack Table + shadcn Table:

```tsx
<DataTable
  columns={columns}
  data={calls}
  isLoading={isLoading}
  pagination={pagination}
  onPaginationChange={setPagination}
/>
```

**Status badges** — semantic color per status:

```ts
const statusConfig = {
  confirmed: { label: "Confirmed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  completed: { label: "Completed", variant: "secondary" },
  no_show: { label: "No show", variant: "warning" },
  missed: { label: "Missed", variant: "destructive" },
};
```

**Intent badges:**

```ts
const intentConfig = {
  BOOKING_CREATE: { label: "New booking", color: "blue" },
  BOOKING_INQUIRY: { label: "Booking inquiry", color: "purple" },
  BOOKING_CANCEL: { label: "Cancellation", color: "red" },
  MENU_INQUIRY: { label: "Menu inquiry", color: "amber" },
  HOURS_INQUIRY: { label: "Hours", color: "gray" },
  GENERAL_INQUIRY: { label: "General", color: "gray" },
};
```

**Empty states** — shown when queries return no results:

```tsx
<EmptyState
  icon={PhoneOff}
  title="No calls yet"
  description="Calls will appear here once your Twilio number receives its first inbound call."
/>
```

**Loading skeletons** — one per data-heavy component:

```tsx
// Each list/table/chart has a matching skeleton
<CallsTableSkeleton />
<BookingsCalendarSkeleton />
<KpiCardSkeleton />
```

---

## Data Fetching Strategy

### Query key conventions

```ts
// Always an array — makes invalidation precise
["calls"][("calls", filters)][("calls", id)]["bookings"][("bookings", filters)][ // list // filtered list // single record
  ("bookings", id)
]["menu-categories"][("menu-items", categoryId)][
  ("analytics", "calls", dateRange)
][("analytics", "bookings", dateRange)];
```

### Stale times

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // 30s default — list pages
      gcTime: 5 * 60_000, // 5min cache
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Per-query overrides
useQuery({
  queryKey: ["analytics", "calls", dateRange],
  staleTime: 60_000, // analytics — 1min
});
```

### Server components vs client components

| Component   | Type   | Reason                              |
| ----------- | ------ | ----------------------------------- |
| Page layout | Server | Auth check, no interactivity        |
| KPI cards   | Server | Initial render, no filters          |
| Data tables | Client | Sorting, filtering, pagination      |
| Charts      | Client | Recharts requires browser           |
| Forms       | Client | React Hook Form                     |
| Calendar    | Client | react-big-calendar requires browser |

---

## State Management

No global state library needed. All state lives in:

| State                                     | Where                                                  |
| ----------------------------------------- | ------------------------------------------------------ |
| Server data (calls, bookings, menu)       | TanStack Query cache                                   |
| Form state                                | React Hook Form                                        |
| Filter state (date range, intent, status) | `useState` in the page component, passed down as props |
| Active category (menu)                    | `useState` in menu page                                |
| Calendar view mode (list/calendar)        | `useState` in bookings page                            |
| Toast notifications                       | sonner (via `toast.success()` / `toast.error()`)       |
| Auth session                              | NextAuth `useSession()`                                |

---

## Authentication Flow

```
User visits /calls
   → Layout server component calls auth()
   → No session → redirect("/login")

User submits login form
   → POST /api/auth/callback/credentials
   → NextAuth validates against backend POST /api/auth/login
   → Session created (JWT in httpOnly cookie)
   → redirect("/")

API calls (client-side)
   → fetch() with credentials: "include"
   → Cookie sent automatically
   → 401 response → logout + redirect("/login")
```

### NextAuth config

```ts
// lib/auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return null;
        return res.json(); // { id, email, name, role }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
```

---

## API Integration Layer

### Base client

```ts
// lib/api/client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? "Request failed");
  }

  return res.json();
}
```

### Calls API

```ts
// lib/api/calls.ts
export const callsApi = {
  list: (filters: CallFilters) =>
    apiClient<PaginatedResponse<Call>>(
      `/api/calls?${new URLSearchParams(filters as any)}`,
    ),

  get: (id: string) => apiClient<CallDetail>(`/api/calls/${id}`),

  getTranscript: (id: string) =>
    apiClient<Transcript>(`/api/calls/${id}/transcript`),
};
```

### Bookings API

```ts
// lib/api/bookings.ts
export const bookingsApi = {
  list: (filters: BookingFilters) =>
    apiClient<PaginatedResponse<Booking>>(
      `/api/bookings?${new URLSearchParams(filters as any)}`,
    ),

  get: (id: string) => apiClient<Booking>(`/api/bookings/${id}`),

  create: (data: CreateBookingInput) =>
    apiClient<Booking>(`/api/bookings`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CreateBookingInput>) =>
    apiClient<Booking>(`/api/bookings/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  cancel: (id: string) =>
    apiClient<void>(`/api/bookings/${id}`, { method: "DELETE" }),
};
```

### Menu API

```ts
// lib/api/menu.ts
export const menuApi = {
  listCategories: () => apiClient<Category[]>(`/api/menu/categories`),

  listItems: (categoryId?: string) =>
    apiClient<MenuItem[]>(
      `/api/menu/items${categoryId ? `?categoryId=${categoryId}` : ""}`,
    ),

  createItem: (data: MenuItemForm) =>
    apiClient<MenuItem>(`/api/menu/items`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateItem: (id: string, data: Partial<MenuItemForm>) =>
    apiClient<MenuItem>(`/api/menu/items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteItem: (id: string) =>
    apiClient<void>(`/api/menu/items/${id}`, { method: "DELETE" }),
};
```

---

## TypeScript Types

```ts
// types/call.ts
export interface Call {
  id: string;
  twilioSid: string;
  callerNumber: string;
  startedAt: string;
  endedAt: string | null;
  durationSecs: number | null;
  intent: CallIntent | null;
  status: "completed" | "missed" | "failed";
  bookingId: string | null;
}

export type CallIntent =
  | "BOOKING_CREATE"
  | "BOOKING_INQUIRY"
  | "BOOKING_CANCEL"
  | "MENU_INQUIRY"
  | "HOURS_INQUIRY"
  | "GENERAL_INQUIRY";

// types/booking.ts
export interface Booking {
  id: string;
  reference: string;
  guestName: string;
  guestPhone: string | null;
  guestEmail: string | null;
  partySize: number;
  bookedDate: string;
  bookedTime: string;
  status: "confirmed" | "cancelled" | "completed" | "no_show";
  notes: string | null;
  source: "phone" | "manual" | "online";
  callId: string | null;
  createdAt: string;
}

// types/menu.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
}
```

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend.com
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

---

## shadcn/ui Components Used

Run these to install all required components:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add card
npx shadcn@latest add tabs
npx shadcn@latest add dropdown-menu
npx shadcn@latest add calendar
npx shadcn@latest add popover
npx shadcn@latest add separator
npx shadcn@latest add skeleton
npx shadcn@latest add switch
npx shadcn@latest add textarea
npx shadcn@latest add toast
npx shadcn@latest add avatar
npx shadcn@latest add alert-dialog
```

---

## Getting Started

```bash
# 1. Create Next.js app
npx create-next-app@latest restaurant-admin --typescript --tailwind --app

cd restaurant-admin

# 2. Install dependencies
npm install @tanstack/react-query @tanstack/react-table
npm install react-hook-form @hookform/resolvers zod
npm install recharts react-big-calendar date-fns
npm install next-auth@beta
npm install sonner

# 3. Set up shadcn/ui
npx shadcn@latest init
# Run the component installs from the section above

# 4. Add environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_API_URL, NEXTAUTH_URL, NEXTAUTH_SECRET

# 5. Run dev server
npm run dev
```

---

## Key Design Decisions

| Decision                          | Choice                 | Reason                                                                                                  |
| --------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| Data fetching                     | TanStack Query         | Caching, background refetch, optimistic updates, no boilerplate vs useEffect                            |
| Forms                             | React Hook Form + Zod  | Performance (uncontrolled inputs), schema-driven validation shared with backend types                   |
| Tables                            | TanStack Table         | Headless — full control over markup, works with shadcn Table primitives                                 |
| No global state                   | —                      | Everything is either server state (React Query) or local UI state (useState). Redux/Zustand not needed. |
| Server components for layout      | Next.js App Router     | Auth check without client-side flash, faster initial load                                               |
| Client components for data tables | —                      | Sorting, filtering, pagination need browser interactivity                                               |
| Optimistic updates on toggles     | React Query `onMutate` | Availability toggles feel instant; roll back on error                                                   |
