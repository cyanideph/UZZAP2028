export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      content_categories: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          kind: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          kind?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          kind?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'content_categories_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      content_category_items: {
        Row: {
          category_id: string
          content_id: string
          created_at: string
        }
        Insert: {
          category_id: string
          content_id: string
          created_at?: string
        }
        Update: {
          category_id?: string
          content_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'content_category_items_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'content_categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_category_items_content_id_fkey'
            columns: ['content_id']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['id']
          },
        ]
      }
      content_comment_votes: {
        Row: {
          comment_id: string
          created_at: string
          user_id: string
          value: number
        }
        Insert: {
          comment_id: string
          created_at?: string
          user_id: string
          value: number
        }
        Update: {
          comment_id?: string
          created_at?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: 'content_comment_votes_comment_id_fkey'
            columns: ['comment_id']
            isOneToOne: false
            referencedRelation: 'content_comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_comment_votes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      content_comments: {
        Row: {
          author_id: string
          body: string
          content_id: string
          created_at: string
          deleted_at: string | null
          id: string
          parent_id: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          content_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          parent_id?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          content_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          parent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'content_comments_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_comments_content_id_fkey'
            columns: ['content_id']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_comments_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'content_comments'
            referencedColumns: ['id']
          },
        ]
      }
      content_reactions: {
        Row: {
          content_id: string
          created_at: string
          reaction: string
          user_id: string
        }
        Insert: {
          content_id: string
          created_at?: string
          reaction: string
          user_id: string
        }
        Update: {
          content_id?: string
          created_at?: string
          reaction?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'content_reactions_content_id_fkey'
            columns: ['content_id']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_reactions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      content_saves: {
        Row: {
          content_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          content_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          content_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'content_saves_content_id_fkey'
            columns: ['content_id']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_saves_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      contents: {
        Row: {
          author_id: string
          body: string | null
          created_at: string
          id: string
          is_featured: boolean
          is_hidden: boolean
          is_published: boolean
          kind: string
          metadata: Json
          room_id: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          body?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean
          is_hidden?: boolean
          is_published?: boolean
          kind?: string
          metadata?: Json
          room_id?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string | null
          created_at?: string
          id?: string
          is_featured?: boolean
          is_hidden?: boolean
          is_published?: boolean
          kind?: string
          metadata?: Json
          room_id?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'contents_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'contents_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
        ]
      }
      conversation_invites: {
        Row: {
          accepted_at: string | null
          conversation_id: string
          created_at: string
          declined_at: string | null
          id: string
          invitee_id: string
          inviter_id: string
        }
        Insert: {
          accepted_at?: string | null
          conversation_id: string
          created_at?: string
          declined_at?: string | null
          id?: string
          invitee_id: string
          inviter_id: string
        }
        Update: {
          accepted_at?: string | null
          conversation_id?: string
          created_at?: string
          declined_at?: string | null
          id?: string
          invitee_id?: string
          inviter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'conversation_invites_conversation_id_fkey'
            columns: ['conversation_id']
            isOneToOne: false
            referencedRelation: 'conversations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversation_invites_invitee_id_fkey'
            columns: ['invitee_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversation_invites_inviter_id_fkey'
            columns: ['inviter_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      conversation_members: {
        Row: {
          conversation_id: string
          joined_at: string
          last_read_at: string | null
          role: Database['public']['Enums']['member_role']
          user_id: string
        }
        Insert: {
          conversation_id: string
          joined_at?: string
          last_read_at?: string | null
          role?: Database['public']['Enums']['member_role']
          user_id: string
        }
        Update: {
          conversation_id?: string
          joined_at?: string
          last_read_at?: string | null
          role?: Database['public']['Enums']['member_role']
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'conversation_members_conversation_id_fkey'
            columns: ['conversation_id']
            isOneToOne: false
            referencedRelation: 'conversations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversation_members_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      conversation_messages: {
        Row: {
          body: string | null
          conversation_id: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          sender_id: string
        }
        Insert: {
          body?: string | null
          conversation_id: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          kind?: Database['public']['Enums']['message_kind']
          metadata?: Json
          reply_to_id?: string | null
          sender_id: string
        }
        Update: {
          body?: string | null
          conversation_id?: string
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          kind?: Database['public']['Enums']['message_kind']
          metadata?: Json
          reply_to_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'conversation_messages_conversation_id_fkey'
            columns: ['conversation_id']
            isOneToOne: false
            referencedRelation: 'conversations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversation_messages_reply_to_id_fkey'
            columns: ['reply_to_id']
            isOneToOne: false
            referencedRelation: 'conversation_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'conversation_messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          created_by: string
          id: string
          kind: Database['public']['Enums']['room_kind']
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          kind?: Database['public']['Enums']['room_kind']
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          kind?: Database['public']['Enums']['room_kind']
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'conversations_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      featured_profiles: {
        Row: {
          created_at: string
          featured_by: string
          featured_until: string | null
          position: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          featured_by: string
          featured_until?: string | null
          position?: number
          profile_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          featured_by?: string
          featured_until?: string | null
          position?: number
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'featured_profiles_featured_by_fkey'
            columns: ['featured_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'featured_profiles_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      media: {
        Row: {
          bucket: string
          caption: string | null
          content_id: string | null
          created_at: string
          duration_ms: number | null
          filename: string | null
          height: number | null
          id: string
          message_id: string | null
          metadata: Json
          mime_type: string | null
          owner_id: string
          path: string
          position: number
          room_id: string | null
          size_bytes: number | null
          width: number | null
        }
        Insert: {
          bucket: string
          caption?: string | null
          content_id?: string | null
          created_at?: string
          duration_ms?: number | null
          filename?: string | null
          height?: number | null
          id?: string
          message_id?: string | null
          metadata?: Json
          mime_type?: string | null
          owner_id: string
          path: string
          position?: number
          room_id?: string | null
          size_bytes?: number | null
          width?: number | null
        }
        Update: {
          bucket?: string
          caption?: string | null
          content_id?: string | null
          created_at?: string
          duration_ms?: number | null
          filename?: string | null
          height?: number | null
          id?: string
          message_id?: string | null
          metadata?: Json
          mime_type?: string | null
          owner_id?: string
          path?: string
          position?: number
          room_id?: string | null
          size_bytes?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'media_content_id_fkey'
            columns: ['content_id']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
        ]
      }
      message_mentions: {
        Row: {
          mentioned_user_id: string
          message_id: string
        }
        Insert: {
          mentioned_user_id: string
          message_id: string
        }
        Update: {
          mentioned_user_id?: string
          message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'message_mentions_mentioned_user_id_fkey'
            columns: ['mentioned_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'message_mentions_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
        ]
      }
      message_reactions: {
        Row: {
          created_at: string
          message_id: string
          reaction: string
          user_id: string
        }
        Insert: {
          created_at?: string
          message_id: string
          reaction: string
          user_id: string
        }
        Update: {
          created_at?: string
          message_id?: string
          reaction?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'message_reactions_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'message_reactions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      message_reads: {
        Row: {
          message_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          message_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          message_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'message_reads_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'message_reads_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      message_replies: {
        Row: {
          message_id: string
          reply_to_message_id: string
        }
        Insert: {
          message_id: string
          reply_to_message_id: string
        }
        Update: {
          message_id?: string
          reply_to_message_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'message_replies_message_id_fkey'
            columns: ['message_id']
            isOneToOne: true
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'message_replies_reply_to_message_id_fkey'
            columns: ['reply_to_message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
        ]
      }
      moderation_actions: {
        Row: {
          action: Database['public']['Enums']['moderation_action_kind']
          created_at: string
          id: string
          metadata: Json
          moderator_id: string
          reason: string | null
          room_id: string
          target_message_id: string | null
          target_user_id: string | null
        }
        Insert: {
          action: Database['public']['Enums']['moderation_action_kind']
          created_at?: string
          id?: string
          metadata?: Json
          moderator_id: string
          reason?: string | null
          room_id: string
          target_message_id?: string | null
          target_user_id?: string | null
        }
        Update: {
          action?: Database['public']['Enums']['moderation_action_kind']
          created_at?: string
          id?: string
          metadata?: Json
          moderator_id?: string
          reason?: string | null
          room_id?: string
          target_message_id?: string | null
          target_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'moderation_actions_moderator_id_fkey'
            columns: ['moderator_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'moderation_actions_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'moderation_actions_target_message_id_fkey'
            columns: ['target_message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'moderation_actions_target_user_id_fkey'
            columns: ['target_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      notification_preferences: {
        Row: {
          block_enabled: boolean
          comment_reply_enabled: boolean
          content_comment_enabled: boolean
          content_reaction_enabled: boolean
          conversation_invite_enabled: boolean
          created_at: string
          follow_enabled: boolean
          mention_enabled: boolean
          profile_comment_enabled: boolean
          room_invite_enabled: boolean
          room_message_reaction_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          block_enabled?: boolean
          comment_reply_enabled?: boolean
          content_comment_enabled?: boolean
          content_reaction_enabled?: boolean
          conversation_invite_enabled?: boolean
          created_at?: string
          follow_enabled?: boolean
          mention_enabled?: boolean
          profile_comment_enabled?: boolean
          room_invite_enabled?: boolean
          room_message_reaction_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          block_enabled?: boolean
          comment_reply_enabled?: boolean
          content_comment_enabled?: boolean
          content_reaction_enabled?: boolean
          conversation_invite_enabled?: boolean
          created_at?: string
          follow_enabled?: boolean
          mention_enabled?: boolean
          profile_comment_enabled?: boolean
          room_invite_enabled?: boolean
          room_message_reaction_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notification_preferences_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      notifications: {
        Row: {
          actor_id: string | null
          created_at: string
          id: string
          payload: Json
          read_at: string | null
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          id?: string
          payload?: Json
          read_at?: string | null
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          id?: string
          payload?: Json
          read_at?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_actor_id_fkey'
            columns: ['actor_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      poll_options: {
        Row: {
          content_id: string
          id: string
          label: string
          position: number
        }
        Insert: {
          content_id: string
          id?: string
          label: string
          position: number
        }
        Update: {
          content_id?: string
          id?: string
          label?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: 'poll_options_content_id_fkey'
            columns: ['content_id']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['id']
          },
        ]
      }
      poll_votes: {
        Row: {
          content_id: string
          created_at: string
          option_id: string
          user_id: string
        }
        Insert: {
          content_id: string
          created_at?: string
          option_id: string
          user_id: string
        }
        Update: {
          content_id?: string
          created_at?: string
          option_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'poll_votes_content_id_fkey'
            columns: ['content_id']
            isOneToOne: false
            referencedRelation: 'contents'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'poll_votes_option_id_fkey'
            columns: ['option_id']
            isOneToOne: false
            referencedRelation: 'poll_options'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'poll_votes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profile_comment_votes: {
        Row: {
          comment_id: string
          created_at: string
          user_id: string
          value: number
        }
        Insert: {
          comment_id: string
          created_at?: string
          user_id: string
          value: number
        }
        Update: {
          comment_id?: string
          created_at?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: 'profile_comment_votes_comment_id_fkey'
            columns: ['comment_id']
            isOneToOne: false
            referencedRelation: 'profile_comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_comment_votes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profile_comments: {
        Row: {
          author_id: string
          body: string
          created_at: string
          deleted_at: string | null
          id: string
          parent_id: string | null
          profile_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          parent_id?: string | null
          profile_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          parent_id?: string | null
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_comments_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_comments_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'profile_comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_comments_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profile_visits: {
        Row: {
          id: string
          profile_id: string
          visited_at: string
          visitor_id: string
        }
        Insert: {
          id?: string
          profile_id: string
          visited_at?: string
          visitor_id: string
        }
        Update: {
          id?: string
          profile_id?: string
          visited_at?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_visits_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_visits_visitor_id_fkey'
            columns: ['visitor_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          status_text: string | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          is_active?: boolean
          last_seen_at?: string | null
          status_text?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          status_text?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      relationships: {
        Row: {
          created_at: string
          kind: Database['public']['Enums']['relationship_kind']
          target_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          kind: Database['public']['Enums']['relationship_kind']
          target_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          kind?: Database['public']['Enums']['relationship_kind']
          target_user_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'relationships_target_user_id_fkey'
            columns: ['target_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'relationships_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          id: string
          message_id: string | null
          reason: string
          reported_user_id: string | null
          reporter_id: string
          resolution: string | null
          resolved_at: string | null
          resolved_by: string | null
          room_id: string | null
          status: Database['public']['Enums']['report_status']
        }
        Insert: {
          created_at?: string
          id?: string
          message_id?: string | null
          reason: string
          reported_user_id?: string | null
          reporter_id: string
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          room_id?: string | null
          status?: Database['public']['Enums']['report_status']
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string | null
          reason?: string
          reported_user_id?: string | null
          reporter_id?: string
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          room_id?: string | null
          status?: Database['public']['Enums']['report_status']
        }
        Relationships: [
          {
            foreignKeyName: 'reports_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reports_reported_user_id_fkey'
            columns: ['reported_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reports_reporter_id_fkey'
            columns: ['reporter_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reports_resolved_by_fkey'
            columns: ['resolved_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reports_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
        ]
      }
      room_co_host_requests: {
        Row: {
          created_at: string
          id: string
          requester_id: string
          responded_at: string | null
          room_id: string
          status: string
          target_user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          requester_id: string
          responded_at?: string | null
          room_id: string
          status?: string
          target_user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          requester_id?: string
          responded_at?: string | null
          room_id?: string
          status?: string
          target_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_co_host_requests_requester_id_fkey'
            columns: ['requester_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_co_host_requests_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_co_host_requests_target_user_id_fkey'
            columns: ['target_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      room_co_hosts: {
        Row: {
          assigned_by: string
          created_at: string
          room_id: string
          user_id: string
        }
        Insert: {
          assigned_by: string
          created_at?: string
          room_id: string
          user_id: string
        }
        Update: {
          assigned_by?: string
          created_at?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_co_hosts_assigned_by_fkey'
            columns: ['assigned_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_co_hosts_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_co_hosts_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      room_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          declined_at: string | null
          id: string
          invitee_id: string
          inviter_id: string
          room_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          declined_at?: string | null
          id?: string
          invitee_id: string
          inviter_id: string
          room_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          declined_at?: string | null
          id?: string
          invitee_id?: string
          inviter_id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_invites_invitee_id_fkey'
            columns: ['invitee_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_invites_inviter_id_fkey'
            columns: ['inviter_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_invites_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
        ]
      }
      room_member_strikes: {
        Row: {
          created_at: string
          duration_minutes: number | null
          id: string
          issued_by: string
          reason: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          id?: string
          issued_by: string
          reason?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          id?: string
          issued_by?: string
          reason?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_member_strikes_issued_by_fkey'
            columns: ['issued_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_member_strikes_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_member_strikes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      room_members: {
        Row: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }
        Insert: {
          banned_until?: string | null
          chat_notifications_enabled?: boolean
          is_pinned?: boolean
          joined_at?: string
          last_read_at?: string | null
          last_seen_at?: string | null
          muted_until?: string | null
          nickname?: string | null
          role?: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }
        Update: {
          banned_until?: string | null
          chat_notifications_enabled?: boolean
          is_pinned?: boolean
          joined_at?: string
          last_read_at?: string | null
          last_seen_at?: string | null
          muted_until?: string | null
          nickname?: string | null
          role?: Database['public']['Enums']['member_role']
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_members_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_members_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      room_message_reactions: {
        Row: {
          created_at: string
          message_id: string
          reaction: string
          user_id: string
        }
        Insert: {
          created_at?: string
          message_id: string
          reaction: string
          user_id: string
        }
        Update: {
          created_at?: string
          message_id?: string
          reaction?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_message_reactions_message_id_fkey'
            columns: ['message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_message_reactions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      room_messages: {
        Row: {
          body: string | null
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          room_id: string
          sender_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          kind?: Database['public']['Enums']['message_kind']
          metadata?: Json
          reply_to_id?: string | null
          room_id: string
          sender_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          kind?: Database['public']['Enums']['message_kind']
          metadata?: Json
          reply_to_id?: string | null
          room_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_messages_reply_to_id_fkey'
            columns: ['reply_to_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_messages_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      rooms: {
        Row: {
          announcement: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_locked: boolean
          kind: Database['public']['Enums']['room_kind']
          members_can_invite: boolean
          name: string
          pinned_message_id: string | null
          province_code: string | null
          slug: string
          updated_at: string
          view_only: boolean
        }
        Insert: {
          announcement?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_locked?: boolean
          kind?: Database['public']['Enums']['room_kind']
          members_can_invite?: boolean
          name: string
          pinned_message_id?: string | null
          province_code?: string | null
          slug: string
          updated_at?: string
          view_only?: boolean
        }
        Update: {
          announcement?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_locked?: boolean
          kind?: Database['public']['Enums']['room_kind']
          members_can_invite?: boolean
          name?: string
          pinned_message_id?: string | null
          province_code?: string | null
          slug?: string
          updated_at?: string
          view_only?: boolean
        }
        Relationships: [
          {
            foreignKeyName: 'rooms_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'rooms_pinned_message_id_fkey'
            columns: ['pinned_message_id']
            isOneToOne: false
            referencedRelation: 'room_messages'
            referencedColumns: ['id']
          },
        ]
      }
      user_check_ins: {
        Row: {
          checkin_date: string
          created_at: string
          points: number
          streak: number
          user_id: string
        }
        Insert: {
          checkin_date: string
          created_at?: string
          points?: number
          streak?: number
          user_id: string
        }
        Update: {
          checkin_date?: string
          created_at?: string
          points?: number
          streak?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_check_ins_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      user_favorites: {
        Row: {
          created_at: string
          target_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          target_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          target_user_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_favorites_target_user_id_fkey'
            columns: ['target_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_favorites_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_content_poll_results: {
        Args: { p_content_id: string }
        Returns: Json
      }
      list_content_comments: {
        Args: {
          p_before_created_at?: string | null
          p_before_id?: string | null
          p_content_id: string
          p_limit?: number
        }
        Returns: Json
      }
      accept_room_co_host_request: {
        Args: { p_request_id: string }
        Returns: {
          created_at: string
          id: string
          requester_id: string
          responded_at: string | null
          room_id: string
          status: string
          target_user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_co_host_requests'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      add_content_comment: {
        Args: { p_body: string; p_content_id: string; p_parent_id?: string }
        Returns: {
          author_id: string
          body: string
          content_id: string
          created_at: string
          deleted_at: string | null
          id: string
          parent_id: string | null
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'content_comments'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      add_profile_comment: {
        Args: { p_body: string; p_parent_id?: string; p_profile_id: string }
        Returns: {
          author_id: string
          body: string
          created_at: string
          deleted_at: string | null
          id: string
          parent_id: string | null
          profile_id: string
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'profile_comments'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      assign_content_category: {
        Args: { p_category_id: string; p_content_id: string }
        Returns: boolean
      }
      attach_room_message_media: {
        Args: { p_media_ids: string[]; p_message_id: string }
        Returns: {
          bucket: string
          caption: string | null
          content_id: string | null
          created_at: string
          duration_ms: number | null
          filename: string | null
          height: number | null
          id: string
          message_id: string | null
          metadata: Json
          mime_type: string | null
          owner_id: string
          path: string
          position: number
          room_id: string | null
          size_bytes: number | null
          width: number | null
        }[]
        SetofOptions: {
          from: '*'
          to: 'media'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      cancel_room_co_host_request: {
        Args: { p_request_id: string }
        Returns: {
          created_at: string
          id: string
          requester_id: string
          responded_at: string | null
          room_id: string
          status: string
          target_user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_co_host_requests'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      check_in: { Args: never; Returns: Json }
      clear_notifications: { Args: never; Returns: number }
      create_content: {
        Args: {
          p_body: string
          p_kind: string
          p_metadata?: Json
          p_room_id: string
          p_title: string
        }
        Returns: {
          author_id: string
          body: string | null
          created_at: string
          id: string
          is_featured: boolean
          is_hidden: boolean
          is_published: boolean
          kind: string
          metadata: Json
          room_id: string | null
          title: string | null
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'contents'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_content_category: {
        Args: {
          p_description?: string
          p_kind?: string
          p_name: string
          p_slug: string
        }
        Returns: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          kind: string
          name: string
          slug: string
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'content_categories'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_conversation: {
        Args: {
          p_kind: Database['public']['Enums']['room_kind']
          p_member_ids?: string[]
          p_title?: string
        }
        Returns: {
          created_at: string
          created_by: string
          id: string
          kind: Database['public']['Enums']['room_kind']
          title: string | null
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversations'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_conversation_invite: {
        Args: { p_conversation_id: string; p_invitee_id: string }
        Returns: {
          accepted_at: string | null
          conversation_id: string
          created_at: string
          declined_at: string | null
          id: string
          invitee_id: string
          inviter_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversation_invites'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_room: {
        Args: {
          p_description?: string
          p_kind?: Database['public']['Enums']['room_kind']
          p_name: string
          p_province_code?: string
          p_slug: string
        }
        Returns: {
          announcement: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_locked: boolean
          kind: Database['public']['Enums']['room_kind']
          members_can_invite: boolean
          name: string
          pinned_message_id: string | null
          province_code: string | null
          slug: string
          updated_at: string
          view_only: boolean
        }
        SetofOptions: {
          from: '*'
          to: 'rooms'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_room_invite: {
        Args: { p_invitee_id: string; p_room_id: string }
        Returns: {
          accepted_at: string | null
          created_at: string
          declined_at: string | null
          id: string
          invitee_id: string
          inviter_id: string
          room_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_invites'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      decline_room_co_host_request: {
        Args: { p_request_id: string }
        Returns: {
          created_at: string
          id: string
          requester_id: string
          responded_at: string | null
          room_id: string
          status: string
          target_user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_co_host_requests'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      delete_content: { Args: { p_content_id: string }; Returns: boolean }
      delete_content_comment: {
        Args: { p_comment_id: string }
        Returns: boolean
      }
      delete_conversation_message: {
        Args: { p_message_id: string }
        Returns: {
          body: string | null
          conversation_id: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversation_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      delete_notification: {
        Args: { p_notification_id: string }
        Returns: boolean
      }
      delete_profile_comment: {
        Args: { p_comment_id: string }
        Returns: boolean
      }
      delete_room_message: {
        Args: { p_message_id: string }
        Returns: {
          body: string | null
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          room_id: string
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      edit_content: {
        Args: {
          p_body: string
          p_content_id: string
          p_metadata?: Json
          p_title: string
        }
        Returns: {
          author_id: string
          body: string | null
          created_at: string
          id: string
          is_featured: boolean
          is_hidden: boolean
          is_published: boolean
          kind: string
          metadata: Json
          room_id: string | null
          title: string | null
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'contents'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      edit_conversation_message: {
        Args: { p_body: string; p_message_id: string }
        Returns: {
          body: string | null
          conversation_id: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversation_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      edit_room_message: {
        Args: { p_body: string; p_message_id: string }
        Returns: {
          body: string | null
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          room_id: string
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_engagement_leaderboard: {
        Args: { p_limit?: number; p_offset?: number; p_period?: string }
        Returns: Json
      }
      get_notification_preferences: {
        Args: never
        Returns: {
          block_enabled: boolean
          comment_reply_enabled: boolean
          content_comment_enabled: boolean
          content_reaction_enabled: boolean
          conversation_invite_enabled: boolean
          created_at: string
          follow_enabled: boolean
          mention_enabled: boolean
          profile_comment_enabled: boolean
          room_invite_enabled: boolean
          room_message_reaction_enabled: boolean
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'notification_preferences'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      join_room: {
        Args: { p_room_id: string }
        Returns: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_members'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      kick_room_member: {
        Args: {
          p_allow_rejoin?: boolean
          p_reason?: string
          p_room_id: string
          p_target_user_id: string
        }
        Returns: {
          action: Database['public']['Enums']['moderation_action_kind']
          created_at: string
          id: string
          metadata: Json
          moderator_id: string
          reason: string | null
          room_id: string
          target_message_id: string | null
          target_user_id: string | null
        }
        SetofOptions: {
          from: '*'
          to: 'moderation_actions'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      leave_room: { Args: { p_room_id: string }; Returns: boolean }
      list_blocked_users: {
        Args: { p_limit?: number }
        Returns: {
          created_at: string
          kind: Database['public']['Enums']['relationship_kind']
          target_user_id: string
          user_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'relationships'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_category_content: {
        Args: {
          p_before_created_at?: string
          p_before_id?: string
          p_category_id: string
          p_limit?: number
        }
        Returns: Json
      }
      list_content_categories: { Args: { p_kind?: string }; Returns: Json }
      list_content_comment_votes: {
        Args: { p_comment_id: string }
        Returns: Json
      }
      list_content_feed: {
        Args: {
          p_author_id?: string
          p_before_created_at?: string
          p_before_id?: string
          p_limit?: number
          p_room_id?: string
        }
        Returns: Json
      }
      list_conversation_messages: {
        Args: {
          p_before_created_at?: string
          p_before_id?: string
          p_conversation_id: string
          p_limit?: number
        }
        Returns: Json
      }
      list_favorite_users: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          avatar_path: string
          display_name: string
          is_online: boolean
          last_seen_at: string
          user_id: string
          username: string
        }[]
      }
      list_featured_profiles: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: Json
      }
      list_followers: {
        Args: { p_limit?: number; p_user_id: string }
        Returns: {
          created_at: string
          kind: Database['public']['Enums']['relationship_kind']
          target_user_id: string
          user_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'relationships'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_following: {
        Args: { p_limit?: number; p_user_id: string }
        Returns: {
          created_at: string
          kind: Database['public']['Enums']['relationship_kind']
          target_user_id: string
          user_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'relationships'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_hidden_content: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: Json
      }
      list_moderation_history: {
        Args: {
          p_before_created_at?: string
          p_before_id?: string
          p_limit?: number
          p_room_id: string
        }
        Returns: Json
      }
      list_notifications: {
        Args: {
          p_before_created_at?: string
          p_before_id?: string
          p_limit?: number
        }
        Returns: Json
      }
      list_online_room_members: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_online_for?: string
          p_room_id: string
        }
        Returns: {
          is_online: boolean
          last_seen_at: string
          nickname: string
          role: Database['public']['Enums']['member_role']
          user_id: string
        }[]
      }
      list_online_users: {
        Args: { p_limit?: number; p_offset?: number; p_online_for?: string }
        Returns: {
          avatar_path: string
          display_name: string
          is_online: boolean
          last_seen_at: string
          status_text: string
          user_id: string
          username: string
        }[]
      }
      list_profile_comments: {
        Args: {
          p_before_created_at?: string
          p_before_id?: string
          p_limit?: number
          p_profile_id: string
        }
        Returns: Json
      }
      list_profile_visitors: {
        Args: { p_limit?: number }
        Returns: {
          id: string
          profile_id: string
          visited_at: string
          visitor_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'profile_visits'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_public_chats: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          created_at: string
          created_by: string
          description: string
          id: string
          member_count: number
          name: string
          online_count: number
          province_code: string
          slug: string
        }[]
      }
      list_public_rooms: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: {
          announcement: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_locked: boolean
          kind: Database['public']['Enums']['room_kind']
          members_can_invite: boolean
          name: string
          pinned_message_id: string | null
          province_code: string | null
          slug: string
          updated_at: string
          view_only: boolean
        }[]
        SetofOptions: {
          from: '*'
          to: 'rooms'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_room_banned_members: {
        Args: { p_limit?: number; p_offset?: number; p_room_id: string }
        Returns: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'room_members'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_room_co_hosts: {
        Args: { p_room_id: string }
        Returns: {
          assigned_by: string
          created_at: string
          room_id: string
          user_id: string
        }[]
      }
      list_room_members: {
        Args: { p_limit?: number; p_offset?: number; p_room_id: string }
        Returns: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'room_members'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_room_messages: {
        Args: {
          p_before_created_at?: string
          p_before_id?: string
          p_limit?: number
          p_room_id: string
        }
        Returns: Json
      }
      list_room_muted_members: {
        Args: { p_limit?: number; p_offset?: number; p_room_id: string }
        Returns: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'room_members'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      list_room_reports: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_room_id: string
          p_status?: Database['public']['Enums']['report_status']
        }
        Returns: {
          created_at: string
          id: string
          message_id: string | null
          reason: string
          reported_user_id: string | null
          reporter_id: string
          resolution: string | null
          resolved_at: string | null
          resolved_by: string | null
          room_id: string | null
          status: Database['public']['Enums']['report_status']
        }[]
        SetofOptions: {
          from: '*'
          to: 'reports'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      mark_all_notifications_read: { Args: never; Returns: number }
      mark_conversation_read: {
        Args: { p_conversation_id: string; p_read_at?: string }
        Returns: {
          conversation_id: string
          joined_at: string
          last_read_at: string | null
          role: Database['public']['Enums']['member_role']
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversation_members'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      mark_message_read: { Args: { p_message_id: string }; Returns: boolean }
      mark_notification_read: {
        Args: { p_notification_id: string }
        Returns: {
          actor_id: string | null
          created_at: string
          id: string
          payload: Json
          read_at: string | null
          type: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'notifications'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      mark_room_read: {
        Args: { p_read_at?: string; p_room_id: string }
        Returns: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_members'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      moderate_room_member: {
        Args: {
          p_action: Database['public']['Enums']['moderation_action_kind']
          p_duration_minutes?: number
          p_reason?: string
          p_room_id: string
          p_target_user_id: string
        }
        Returns: {
          action: Database['public']['Enums']['moderation_action_kind']
          created_at: string
          id: string
          metadata: Json
          moderator_id: string
          reason: string | null
          room_id: string
          target_message_id: string | null
          target_user_id: string | null
        }
        SetofOptions: {
          from: '*'
          to: 'moderation_actions'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      moderate_room_message: {
        Args: {
          p_action: Database['public']['Enums']['moderation_action_kind']
          p_message_id: string
          p_reason?: string
        }
        Returns: {
          action: Database['public']['Enums']['moderation_action_kind']
          created_at: string
          id: string
          metadata: Json
          moderator_id: string
          reason: string | null
          room_id: string
          target_message_id: string | null
          target_user_id: string | null
        }
        SetofOptions: {
          from: '*'
          to: 'moderation_actions'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      record_profile_visit: {
        Args: { p_profile_id: string }
        Returns: {
          id: string
          profile_id: string
          visited_at: string
          visitor_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'profile_visits'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      remove_content_category: {
        Args: { p_category_id: string; p_content_id: string }
        Returns: boolean
      }
      reorder_featured_profiles: {
        Args: { p_profile_ids: string[] }
        Returns: Json
      }
      reply_to_conversation_message: {
        Args: {
          p_body: string
          p_conversation_id: string
          p_metadata?: Json
          p_reply_to_id: string
        }
        Returns: {
          body: string | null
          conversation_id: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversation_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      reply_to_room_message: {
        Args: {
          p_body: string
          p_metadata?: Json
          p_reply_to_message_id: string
          p_room_id: string
        }
        Returns: {
          body: string | null
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          room_id: string
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      repost_content: {
        Args: { p_content_id: string; p_room_id?: string }
        Returns: {
          author_id: string
          body: string | null
          created_at: string
          id: string
          is_featured: boolean
          is_hidden: boolean
          is_published: boolean
          kind: string
          metadata: Json
          room_id: string | null
          title: string | null
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'contents'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      request_room_co_host: {
        Args: { p_room_id: string; p_target_user_id: string }
        Returns: {
          created_at: string
          id: string
          requester_id: string
          responded_at: string | null
          room_id: string
          status: string
          target_user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_co_host_requests'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      respond_conversation_invite: {
        Args: { p_accept: boolean; p_invite_id: string }
        Returns: {
          accepted_at: string | null
          conversation_id: string
          created_at: string
          declined_at: string | null
          id: string
          invitee_id: string
          inviter_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversation_invites'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      respond_room_invite: {
        Args: { p_accept: boolean; p_invite_id: string }
        Returns: {
          accepted_at: string | null
          created_at: string
          declined_at: string | null
          id: string
          invitee_id: string
          inviter_id: string
          room_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_invites'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      search_content: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_query: string
          p_room_id?: string
        }
        Returns: Json
      }
      search_profiles: {
        Args: { p_limit?: number; p_query: string }
        Returns: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          status_text: string | null
          updated_at: string
          username: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'profiles'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      search_public_chats: {
        Args: { p_limit?: number; p_query: string }
        Returns: {
          created_at: string
          created_by: string
          description: string
          id: string
          member_count: number
          name: string
          online_count: number
          province_code: string
          slug: string
        }[]
      }
      search_public_rooms: {
        Args: { p_limit?: number; p_query: string }
        Returns: {
          announcement: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_locked: boolean
          kind: Database['public']['Enums']['room_kind']
          members_can_invite: boolean
          name: string
          pinned_message_id: string | null
          province_code: string | null
          slug: string
          updated_at: string
          view_only: boolean
        }[]
        SetofOptions: {
          from: '*'
          to: 'rooms'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      send_conversation_message: {
        Args: {
          p_body: string
          p_conversation_id: string
          p_kind?: Database['public']['Enums']['message_kind']
          p_metadata?: Json
          p_reply_to_id?: string
        }
        Returns: {
          body: string | null
          conversation_id: string
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'conversation_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      send_room_message: {
        Args: {
          p_body: string
          p_kind?: Database['public']['Enums']['message_kind']
          p_metadata?: Json
          p_reply_to_id?: string
          p_room_id: string
        }
        Returns: {
          body: string | null
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          room_id: string
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      send_room_sticker: {
        Args: {
          p_media_id?: string
          p_metadata?: Json
          p_room_id: string
          p_sticker_id: string
        }
        Returns: {
          body: string | null
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          kind: Database['public']['Enums']['message_kind']
          metadata: Json
          reply_to_id: string | null
          room_id: string
          sender_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_messages'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_content_featured: {
        Args: { p_content_id: string; p_featured: boolean }
        Returns: {
          author_id: string
          body: string | null
          created_at: string
          id: string
          is_featured: boolean
          is_hidden: boolean
          is_published: boolean
          kind: string
          metadata: Json
          room_id: string | null
          title: string | null
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'contents'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_content_visibility: {
        Args: { p_content_id: string; p_hidden: boolean }
        Returns: {
          author_id: string
          body: string | null
          created_at: string
          id: string
          is_featured: boolean
          is_hidden: boolean
          is_published: boolean
          kind: string
          metadata: Json
          room_id: string | null
          title: string | null
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'contents'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_featured_profile: {
        Args: { p_duration_hours?: number; p_profile_id: string }
        Returns: {
          created_at: string
          featured_by: string
          featured_until: string | null
          position: number
          profile_id: string
          updated_at: string
        }
        SetofOptions: {
          from: '*'
          to: 'featured_profiles'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_notification_preferences: {
        Args: {
          p_block_enabled?: boolean
          p_comment_reply_enabled?: boolean
          p_content_comment_enabled?: boolean
          p_content_reaction_enabled?: boolean
          p_conversation_invite_enabled?: boolean
          p_follow_enabled?: boolean
          p_mention_enabled?: boolean
          p_profile_comment_enabled?: boolean
          p_room_invite_enabled?: boolean
          p_room_message_reaction_enabled?: boolean
        }
        Returns: {
          block_enabled: boolean
          comment_reply_enabled: boolean
          content_comment_enabled: boolean
          content_reaction_enabled: boolean
          conversation_invite_enabled: boolean
          created_at: string
          follow_enabled: boolean
          mention_enabled: boolean
          profile_comment_enabled: boolean
          room_invite_enabled: boolean
          room_message_reaction_enabled: boolean
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'notification_preferences'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_room_chat_settings: {
        Args: {
          p_announcement: string
          p_members_can_invite: boolean
          p_room_id: string
          p_view_only: boolean
        }
        Returns: {
          announcement: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_locked: boolean
          kind: Database['public']['Enums']['room_kind']
          members_can_invite: boolean
          name: string
          pinned_message_id: string | null
          province_code: string | null
          slug: string
          updated_at: string
          view_only: boolean
        }
        SetofOptions: {
          from: '*'
          to: 'rooms'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_room_co_host: {
        Args: {
          p_enabled: boolean
          p_room_id: string
          p_target_user_id: string
        }
        Returns: {
          assigned_by: string
          created_at: string
          room_id: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_co_hosts'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_room_lock: {
        Args: { p_locked: boolean; p_reason?: string; p_room_id: string }
        Returns: {
          announcement: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_locked: boolean
          kind: Database['public']['Enums']['room_kind']
          members_can_invite: boolean
          name: string
          pinned_message_id: string | null
          province_code: string | null
          slug: string
          updated_at: string
          view_only: boolean
        }
        SetofOptions: {
          from: '*'
          to: 'rooms'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_room_member_chat_preferences: {
        Args: {
          p_is_pinned?: boolean
          p_notifications_enabled?: boolean
          p_room_id: string
        }
        Returns: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_members'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_room_message_mentions: {
        Args: { p_mentioned_user_ids?: string[]; p_message_id: string }
        Returns: {
          mentioned_user_id: string
          message_id: string
        }[]
        SetofOptions: {
          from: '*'
          to: 'message_mentions'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      set_room_pinned_message: {
        Args: { p_message_id: string; p_room_id: string }
        Returns: {
          announcement: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          is_locked: boolean
          kind: Database['public']['Enums']['room_kind']
          members_can_invite: boolean
          name: string
          pinned_message_id: string | null
          province_code: string | null
          slug: string
          updated_at: string
          view_only: boolean
        }
        SetofOptions: {
          from: '*'
          to: 'rooms'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      strike_room_member: {
        Args: {
          p_duration_minutes?: number
          p_reason?: string
          p_room_id: string
          p_target_user_id: string
        }
        Returns: {
          created_at: string
          duration_minutes: number | null
          id: string
          issued_by: string
          reason: string | null
          room_id: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_member_strikes'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      toggle_block: { Args: { p_target_user_id: string }; Returns: boolean }
      toggle_content_comment_vote: {
        Args: { p_comment_id: string; p_value: number }
        Returns: Json
      }
      toggle_content_reaction: {
        Args: { p_content_id: string; p_reaction: string }
        Returns: boolean
      }
      toggle_content_save: { Args: { p_content_id: string }; Returns: boolean }
      toggle_favorite: { Args: { p_target_user_id: string }; Returns: boolean }
      toggle_follow: { Args: { p_target_user_id: string }; Returns: boolean }
      toggle_profile_comment_vote: {
        Args: { p_comment_id: string; p_value: number }
        Returns: Json
      }
      toggle_room_message_reaction: {
        Args: { p_message_id: string; p_reaction: string }
        Returns: Json
      }
      touch_presence: {
        Args: never
        Returns: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          status_text: string | null
          updated_at: string
          username: string
        }
        SetofOptions: {
          from: '*'
          to: 'profiles'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      touch_room_presence: {
        Args: { p_room_id: string }
        Returns: {
          banned_until: string | null
          chat_notifications_enabled: boolean
          is_pinned: boolean
          joined_at: string
          last_read_at: string | null
          last_seen_at: string | null
          muted_until: string | null
          nickname: string | null
          role: Database['public']['Enums']['member_role']
          room_id: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'room_members'
          isOneToOne: true
          isSetofReturn: false
        }
      }
      unfeature_profile: { Args: { p_profile_id: string }; Returns: boolean }
      vote_content_poll: {
        Args: { p_content_id: string; p_option_id: string }
        Returns: {
          content_id: string
          created_at: string
          option_id: string
          user_id: string
        }
        SetofOptions: {
          from: '*'
          to: 'poll_votes'
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      member_role: 'owner' | 'admin' | 'moderator' | 'member'
      message_kind: 'text' | 'system' | 'media' | 'reply' | 'sticker'
      moderation_action_kind:
        | 'warn'
        | 'mute'
        | 'kick'
        | 'ban'
        | 'unban'
        | 'delete_message'
        | 'lock_room'
        | 'unlock_room'
        | 'strike'
      relationship_kind: 'follow' | 'block'
      report_status: 'open' | 'reviewing' | 'resolved' | 'dismissed'
      room_kind: 'public' | 'private' | 'group'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      member_role: ['owner', 'admin', 'moderator', 'member'],
      message_kind: ['text', 'system', 'media', 'reply', 'sticker'],
      moderation_action_kind: [
        'warn',
        'mute',
        'kick',
        'ban',
        'unban',
        'delete_message',
        'lock_room',
        'unlock_room',
        'strike',
      ],
      relationship_kind: ['follow', 'block'],
      report_status: ['open', 'reviewing', 'resolved', 'dismissed'],
      room_kind: ['public', 'private', 'group'],
    },
  },
} as const
