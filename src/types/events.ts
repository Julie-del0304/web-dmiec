export interface EventFolder {
  id: string;
  name: string;
  description: string | null;
  event_date: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventPhoto {
  id: string;
  folder_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export interface CreateEventFolderInput {
  name: string;
  description?: string;
  event_date?: string;
  cover_image_url?: string;
}

export interface UpdateEventFolderInput {
  name?: string;
  description?: string;
  event_date?: string;
  cover_image_url?: string;
}

export interface CreateEventPhotoInput {
  folder_id: string;
  image_url: string;
  caption?: string;
  display_order?: number;
}

export interface EventFolderWithPhotoCount extends EventFolder {
  photo_count: number;
}
