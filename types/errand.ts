export type ErrandStatus = "pending" | "completed" | "cancelled";
export type ErrandPriority = "low" | "normal" | "high";

export interface Errand {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  status: ErrandStatus;
  priority: ErrandPriority;
  dueDate: string | null; // ISO date
  dueTime: string | null; // HH:mm
  locationId: string | null;
  placeName: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  estimatedDuration: number | null; // minuti
  notes: string | null;
  isRecurring: boolean;
  recurrenceRule: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface Place {
  id: string;
  userId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  googlePlaceId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SuggestionType =
  | "nearby"
  | "closing_soon"
  | "route_opportunity"
  | "overdue"
  | "planning";

export interface Suggestion {
  id: string;
  userId: string;
  errandId: string | null;
  type: SuggestionType;
  payload: Record<string, unknown>;
  shownAt: string | null;
  dismissedAt: string | null;
  openedAt: string | null;
}
