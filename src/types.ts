export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          id: string
          name: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name?: string
          created_by?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_by?: string
          created_at?: string
        }
      }
      members: {
        Row: {
          id: string
          name: string
          selected_by: string
        }
        Insert: {
          id?: string
          name: string
          selected_by: string
        }
        Update: {
          id?: string
          name?: string
          selected_by?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      draw_name: {
        Args: { groupid: string; username: string }
        Returns: string
      }
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}