


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgroonga" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "hypopg" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "index_advisor" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";






CREATE TYPE "public"."album_type" AS (
	"id" "uuid",
	"name" "text"
);


ALTER TYPE "public"."album_type" OWNER TO "postgres";


CREATE TYPE "public"."artists_type" AS (
	"id" "uuid",
	"name" "text",
	"role" "text"
);


ALTER TYPE "public"."artists_type" OWNER TO "postgres";


CREATE TYPE "public"."media_item_flag" AS ENUM (
    'user-specific'
);


ALTER TYPE "public"."media_item_flag" OWNER TO "postgres";


CREATE TYPE "public"."media_item_type" AS ENUM (
    'playlist',
    'album',
    'artist',
    'track',
    'profile'
);


ALTER TYPE "public"."media_item_type" OWNER TO "postgres";


CREATE TYPE "public"."media_source_type" AS ENUM (
    'create',
    'reference',
    'none'
);


ALTER TYPE "public"."media_source_type" OWNER TO "postgres";


CREATE TYPE "public"."search_dropdown_result" AS (
	"top_result" "jsonb",
	"songs" "jsonb",
	"albums" "jsonb",
	"artists" "jsonb",
	"playlists" "jsonb",
	"profiles" "jsonb"
);


ALTER TYPE "public"."search_dropdown_result" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_playlist_song"("p_id" "text", "s_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  playlist_song JSONB;
BEGIN
  INSERT INTO public.playlist_songs (playlist_id, song_id)
  VALUES (p_id, s_id);

  -- Return the full playlist page as JSONB
  SELECT * INTO playlist_song FROM public.get_playlist_page(p_id);

  RETURN playlist_song;
END;
$$;


ALTER FUNCTION "public"."add_playlist_song"("p_id" "text", "s_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_recent_song"("p_song_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  v_user_id TEXT;
BEGIN
  -- Get current user ID
  v_user_id := public.get_user_id();

  -- Insert or update user's song play count
  INSERT INTO public.user_song_plays (user_id, song_id, played_at, play_count)
  VALUES (v_user_id, p_song_id, now(), 1)
  ON CONFLICT (user_id, song_id, day_start)
  DO UPDATE SET 
    played_at = EXCLUDED.played_at,
    play_count = public.user_song_plays.play_count + 1;

  -- Keep only the 50 most recent songs for this user
  DELETE FROM public.user_song_plays
  WHERE user_id = v_user_id
    AND id NOT IN (
      SELECT id
      FROM public.user_song_plays
      WHERE user_id = v_user_id
      ORDER BY played_at DESC
      LIMIT 50
    );
END;
$$;


ALTER FUNCTION "public"."add_recent_song"("p_song_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_recent_songs_batch"("p_songs" "jsonb", "p_user_id" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  -- Bulk insert using played_at from p_songs
  INSERT INTO public.user_song_plays (user_id, song_id, played_at, play_count)
  SELECT
      p_user_id,
      (song ->> 'id')::uuid AS song_id,
      (song ->> 'played_at')::timestamptz AS played_at,
      1 AS play_count
  FROM jsonb_array_elements(p_songs) AS t(song)
  ON CONFLICT (user_id, song_id, day_start)
  DO UPDATE
    SET played_at = EXCLUDED.played_at,
        play_count = public.user_song_plays.play_count + 1;

  -- Keep only 50 most recent songs
  DELETE FROM public.user_song_plays
  WHERE user_id = p_user_id
    AND id NOT IN (
        SELECT id
        FROM public.user_song_plays
        WHERE user_id = p_user_id
        ORDER BY played_at DESC
        LIMIT 50
    );
END;
$$;


ALTER FUNCTION "public"."add_recent_songs_batch"("p_songs" "jsonb", "p_user_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_recently_played"("p_item_id" "text", "p_type" "public"."media_item_type") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  recent_played JSONB;
BEGIN
  -- Insert or update the user's recently played item
  INSERT INTO public.recently_played_list (user_id, item_id, type, played_at, play_count)
  VALUES (public.get_user_id(), p_item_id, p_type, NOW(), 1)
  ON CONFLICT (user_id, item_id, type, week_start)
  DO UPDATE SET 
    played_at = EXCLUDED.played_at,
    play_count = public.recently_played_list.play_count + 1;

  -- Keep only 50 most recent items
  DELETE FROM public.recently_played_list
  WHERE user_id = public.get_user_id()
    AND id NOT IN (
      SELECT id
      FROM public.recently_played_list
      WHERE user_id = public.get_user_id()
      ORDER BY played_at DESC
      LIMIT 50
    );

  -- Return the full recent list as JSONB
  SELECT * INTO recent_played FROM public.get_recent_list();

  RETURN recent_played;
END;
$$;


ALTER FUNCTION "public"."add_recently_played"("p_item_id" "text", "p_type" "public"."media_item_type") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_recently_played_batch"("p_items" "jsonb", "p_user_id" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
    -- Bulk insert using the played_at from p_items
    INSERT INTO public.recently_played_list (user_id, item_id, type, played_at, play_count)
    SELECT
        p_user_id,
        item ->> 'id' AS item_id,
        (item ->> 'type')::public.media_item_type AS type,
        (item ->> 'played_at')::timestamptz AS played_at,
        1 AS play_count
    FROM jsonb_array_elements(p_items) AS t(item)
    ON CONFLICT (user_id, item_id, type, week_start)
    DO UPDATE
      SET played_at = EXCLUDED.played_at,
          play_count = public.recently_played_list.play_count + 1;

    -- Keep only 50 most recent items
    DELETE FROM public.recently_played_list
    WHERE user_id = public.get_user_id()
      AND id NOT IN (
          SELECT id
          FROM public.recently_played_list
          WHERE user_id = public.get_user_id()
          ORDER BY played_at DESC
          LIMIT 50
      );
END;
$$;


ALTER FUNCTION "public"."add_recently_played_batch"("p_items" "jsonb", "p_user_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_to_library"("p_item_id" "text", "p_item_type" "public"."media_item_type") RETURNS TABLE("id" "text", "name" "text", "related_id" "text", "related_name" "text", "cover_url" "text", "source" "public"."media_source_type", "type" "public"."media_item_type", "is_public" boolean, "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  -- Insert into user's library, skip if already exists
  INSERT INTO public.user_reference_items (user_id, item_id, item_type)
  VALUES (public.get_user_id(), p_item_id, p_item_type)
  ON CONFLICT (user_id, item_id, item_type) DO NOTHING;

  -- Return full user library
  RETURN QUERY
  SELECT * FROM public.get_user_library();
END;
$$;


ALTER FUNCTION "public"."add_to_library"("p_item_id" "text", "p_item_type" "public"."media_item_type") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."addlike"("p_song_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  -- Insert like, skip if already exists
  INSERT INTO public.likes (user_id, song_id)
  VALUES (public.get_user_id(), p_song_id)
  ON CONFLICT (user_id, song_id) DO NOTHING;
END;
$$;


ALTER FUNCTION "public"."addlike"("p_song_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."batch_update_playlist_embeddings"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
    r record;
BEGIN
    FOR r IN
        SELECT id
        FROM public.playlist
        WHERE embedding_dirty = true
        LIMIT 20
    LOOP
        UPDATE public.playlist p
        SET
            embedding = sub.avg_embedding,
            embedding_dirty = false
        FROM (
            SELECT
                ps.playlist_id,
                extensions.avg(s.embedding)::extensions.vector AS avg_embedding
            FROM public.playlist_songs ps
            JOIN public.song s ON s.id = ps.song_id
            WHERE ps.playlist_id = r.id
            GROUP BY ps.playlist_id
        ) sub
        WHERE p.id = sub.playlist_id;
    END LOOP;
END;
$$;


ALTER FUNCTION "public"."batch_update_playlist_embeddings"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."can_access_recently_played"("p_user_id" "text", "p_item_id" "text", "p_type" "public"."media_item_type") RETURNS boolean
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
BEGIN
    -- albums and artists are always public
    IF p_type != 'playlist' THEN
        RETURN true;
    END IF;

    -- check playlist
    RETURN EXISTS (
        SELECT 1
        FROM public.playlist p
        WHERE p.id = p_item_id
          AND (p.is_public = true OR p.user_id = p_user_id)
    );
END;
$$;


ALTER FUNCTION "public"."can_access_recently_played"("p_user_id" "text", "p_item_id" "text", "p_type" "public"."media_item_type") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_playlist_song"("p_id" "text", "target_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  playlist_song JSONB;
BEGIN
  -- Delete the song from the playlist
  DELETE FROM public.playlist_songs ps
  WHERE ps.id = target_id;

  -- Reuse get_playlist_page logic
  SELECT * INTO playlist_song FROM public.get_playlist_page(p_id);

  RETURN playlist_song;
END;
$$;


ALTER FUNCTION "public"."delete_playlist_song"("p_id" "text", "target_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_recently_played_album"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  -- Delete the album from recently_played_list
  DELETE FROM public.recently_played_list
  WHERE item_id = OLD.id
    AND type = 'album';

  RETURN OLD;
END;
$$;


ALTER FUNCTION "public"."delete_recently_played_album"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_recently_played_artist"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  DELETE FROM public.recently_played_list
  WHERE item_id = OLD.id
    AND type = 'artist';

  RETURN OLD;
END;
$$;


ALTER FUNCTION "public"."delete_recently_played_artist"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_recently_played_playlist"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  DELETE FROM public.recently_played_list
  WHERE item_id = OLD.id;

  RETURN OLD;
END;
$$;


ALTER FUNCTION "public"."delete_recently_played_playlist"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_user_playlist_item"("p_item_id" "text") RETURNS TABLE("id" "text", "name" "text", "related_id" "text", "related_name" "text", "cover_url" "text", "source" "public"."media_source_type", "type" "public"."media_item_type", "is_public" boolean, "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
    DELETE FROM public.playlist ps
    WHERE ps.user_id = public.get_user_id()
      AND ps.id = p_item_id;

    RETURN QUERY SELECT * FROM public.get_user_library();
END;
$$;


ALTER FUNCTION "public"."delete_user_playlist_item"("p_item_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_user_reference_item"("refer_item_id" "text") RETURNS TABLE("id" "text", "name" "text", "related_id" "text", "related_name" "text", "cover_url" "text", "source" "public"."media_source_type", "type" "public"."media_item_type", "is_public" boolean, "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
    DELETE FROM public.user_reference_items
    WHERE user_id = public.get_user_id()
      AND item_id = refer_item_id;

    RETURN QUERY SELECT * FROM public.get_user_library();
END;
$$;


ALTER FUNCTION "public"."delete_user_reference_item"("refer_item_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."edit_playlist"("p_playlist_id" "text", "p_new_name" "text", "p_is_public" boolean) RETURNS TABLE("id" "text", "name" "text", "related_id" "text", "related_name" "text", "cover_url" "text", "source" "public"."media_source_type", "type" "public"."media_item_type", "is_public" boolean, "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
    UPDATE public.playlist
    SET name = p_new_name,
        is_public = p_is_public
    WHERE public.playlist.id = p_playlist_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Playlist with id % does not exist.', p_playlist_id;
    END IF;

    RETURN QUERY SELECT * FROM public.get_user_library();
END;
$$;


ALTER FUNCTION "public"."edit_playlist"("p_playlist_id" "text", "p_new_name" "text", "p_is_public" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fake_user_generate_list_plays"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
    v_user_id text := '39770997-20a3-4964-ace5-0e5426ef88e4';
    v_item_record record;
    v_official_limit int;
    v_user_limit int;
    v_album_limit int;
    v_artist_limit int;
BEGIN

    -- Determine safe limits based on actual counts
    SELECT LEAST(COUNT(*), 8) INTO v_official_limit
    FROM public.playlist p
    WHERE p.user_id = public.get_official_id()
      AND EXISTS (SELECT 1 FROM public.playlist_songs ps WHERE ps.playlist_id = p.id);

    SELECT LEAST(COUNT(*), 8) INTO v_user_limit
    FROM public.playlist p
    WHERE p.user_id <> public.get_official_id()
      AND EXISTS (SELECT 1 FROM public.playlist_songs ps WHERE ps.playlist_id = p.id);

    SELECT LEAST(COUNT(*), 8) INTO v_album_limit
    FROM public.album a
    WHERE EXISTS (SELECT 1 FROM public.song s WHERE s.album_id = a.id);

    SELECT LEAST(COUNT(*), 8) INTO v_artist_limit
    FROM public.artist ar
    WHERE EXISTS (
        SELECT 1
        FROM public.song_artists sa
        JOIN public.song s ON s.id = sa.song_id
        WHERE sa.artist_id = ar.id
    );

    -- Loop through all candidates (playlist, albums, artists)
    FOR v_item_record IN
        WITH playlists_sub AS (
            -- official playlists random
            (
                SELECT p.id AS item_id
                FROM public.playlist p
                WHERE p.user_id = public.get_official_id()
                  AND EXISTS (SELECT 1 FROM public.playlist_songs ps WHERE ps.playlist_id = p.id)
                ORDER BY random()
                LIMIT v_official_limit
            )
            UNION ALL
            -- user playlists random
            (
                SELECT p.id AS item_id
                FROM public.playlist p
                WHERE p.user_id <> public.get_official_id()
                  AND EXISTS (SELECT 1 FROM public.playlist_songs ps WHERE ps.playlist_id = p.id)
                ORDER BY random()
                LIMIT v_user_limit
            )
        ),
        albums_sub AS (
            SELECT a.id AS item_id
            FROM public.album a
            WHERE EXISTS (SELECT 1 FROM public.song s WHERE s.album_id = a.id)
            ORDER BY random()
            LIMIT v_album_limit
        ),
        artists_sub AS (
            SELECT ar.id AS item_id
            FROM public.artist ar
            WHERE EXISTS (
                SELECT 1
                FROM public.song_artists sa
                JOIN public.song s ON s.id = sa.song_id
                WHERE sa.artist_id = ar.id
            )
            ORDER BY random()
            LIMIT v_artist_limit
        )
        SELECT item_id, 'playlist' AS type FROM playlists_sub
        UNION ALL
        SELECT item_id, 'album' AS type FROM albums_sub
        UNION ALL
        SELECT item_id, 'artist' AS type FROM artists_sub
    LOOP
        INSERT INTO public.recently_played_list
        (user_id, item_id, type, played_at, play_count)
        VALUES (
            v_user_id,
            v_item_record.item_id,
            v_item_record.type::public.media_item_type,
            now(),
            1
        )
        ON CONFLICT (user_id, item_id, type, week_start)
        DO UPDATE SET
            played_at = now(),
            play_count = public.recently_played_list.play_count + 1;
    END LOOP;

END;
$$;


ALTER FUNCTION "public"."fake_user_generate_list_plays"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."fake_user_generate_song_plays"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
    v_user_id text := '39770997-20a3-4964-ace5-0e5426ef88e4';
    v_song uuid;
    i int;
BEGIN
    -- simulate 30 plays
    FOR i IN 1..30 LOOP
        
        SELECT id
        INTO v_song
        FROM public.song
        ORDER BY random()
        LIMIT 1;

        INSERT INTO public.user_song_plays (user_id, song_id, played_at, play_count)
        VALUES (v_user_id, v_song, now(), 1)
        ON CONFLICT (user_id, song_id, day_start)
        DO UPDATE SET
            played_at = now(),
            play_count = public.user_song_plays.play_count + 1;

    END LOOP;
END;
$$;


ALTER FUNCTION "public"."fake_user_generate_song_plays"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_album_direct"("p_album_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  album_data JSONB;
BEGIN
  SELECT jsonb_build_object(
    'songs', jsonb_build_object(
      'id', a.id,
      'name', a.title,
      'related_id', ar.id,
      'related_name', ar.name,
      'cover_url', a.cover_url,
      'is_official', FALSE,
      'type', 'album',
      'songs', COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', (s.id || '_' || a.id),
            'song_id', s.id,
            'name', s.name,
            'url', s.url,
            'type', 'track',
            'cover_url', s.cover_url,
            'is_lyric', s.is_lyric,
            'duration', s.duration,
            'artists', (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'id', art.id,
                  'name', art.name,
                  'role', sa.role
                )
                ORDER BY
                  CASE WHEN sa.role = 'main' THEN 0
                       WHEN sa.role = 'feat' THEN 1
                       ELSE 2
                  END,
                  art.name
              )
              FROM public.song_artists sa
              JOIN public.artist art ON art.id = sa.artist_id
              WHERE sa.song_id = s.id
            ),
            'album', jsonb_build_object(
              'id', a.id,
              'name', a.title
            )
          )
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'::jsonb
      )
    )
  )
  INTO album_data
  FROM public.album a
  LEFT JOIN public.artist ar ON ar.id = a.artist_id
  LEFT JOIN public.song s ON s.album_id = a.id
  WHERE a.id = p_album_id
  GROUP BY a.id, a.title, ar.id, ar.name;

  RETURN album_data;
END;
$$;


ALTER FUNCTION "public"."get_album_direct"("p_album_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_album_page"("p_album_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  album_data JSONB;
BEGIN
  SELECT jsonb_build_object(
    'songs', jsonb_build_object(
      'id', a.id,
      'name', a.title,
      'related_id', ar.id,
      'cover_url', a.cover_url,
      'related_name', ar.name,
      'is_official', FALSE,
      'type', 'album',
      'songs', COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', (s.id || '_' || al.id),
            'song_id', s.id,
            'name', s.name,
            'url', s.url,
            'cover_url', s.cover_url,
            'type', 'track',
            'duration', s.duration,
            'is_lyric', s.is_lyric,
            'artists', (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'id', art.id,
                  'name', art.name,
                  'role', sa.role
                )
                ORDER BY
                  CASE WHEN sa.role = 'main' THEN 0
                       WHEN sa.role = 'feat' THEN 1
                       ELSE 2
                  END,
                  art.name
              )
              FROM public.song_artists sa
              JOIN public.artist art ON art.id = sa.artist_id
              WHERE sa.song_id = s.id
            ),
            'album', jsonb_build_object(
              'id', al.id,
              'name', al.title
            )
          )
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'::jsonb
      )
    )
  )
  INTO album_data
  FROM public.album a
  LEFT JOIN public.artist ar ON ar.id = a.artist_id
  LEFT JOIN public.song s ON s.album_id = a.id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE a.id = p_album_id
  GROUP BY a.id, a.title, ar.id, ar.name;

  RETURN album_data;
END;
$$;


ALTER FUNCTION "public"."get_album_page"("p_album_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_album_songs_queue"("p_album_id" "text") RETURNS "json"[]
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  song_items JSON[];
BEGIN
  SELECT
    CASE
      WHEN COUNT(s.id) > 0 THEN
        array_agg(
          json_build_object(
            'id', gen_random_uuid(),
            'song_id', s.id,
            'name', s.name,
            'url', s.url,
            'type', 'track',
            'cover_url', s.cover_url,
            'is_lyric', s.is_lyric,
            'duration', s.duration,
            'artists', (
              SELECT json_agg(
                json_build_object(
                  'id', art.id,
                  'name', art.name,
                  'role', sa.role
                )
                ORDER BY
                  CASE
                    WHEN sa.role = 'main' THEN 0
                    WHEN sa.role = 'feat' THEN 1
                    ELSE 2
                  END,
                  art.name
              )
              FROM public.song_artists sa
              JOIN public.artist art ON art.id = sa.artist_id
              WHERE sa.song_id = s.id
            ),
            'album', json_build_object(
              'id', al.id,
              'name', al.title
            )
          )
        )
      ELSE '{}'::json[]
    END
  INTO song_items
  FROM public.album a
  LEFT JOIN public.song s ON s.album_id = a.id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE a.id = p_album_id;

  RETURN song_items;
END;
$$;


ALTER FUNCTION "public"."get_album_songs_queue"("p_album_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_artist_direct"("p_artist_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  artist_data JSONB;
  songs_section JSONB;
BEGIN
  -- Build Songs Section
  SELECT jsonb_build_object(
    'id', p_artist_id,
    'name',  a.name,
    'related_id', a.id,
    'related_name', a.name,
    'cover_url', a.cover_url,
    'is_official', FALSE,
    'type', 'artist',
    'songs', COALESCE((
      SELECT jsonb_agg(song_obj)
      FROM (
        SELECT jsonb_build_object(
          'id', s.id || '_' || a.id,
          'song_id', s.id,
          'name', s.name,
          'url', s.url,
          'type', 'track',
          'duration', s.duration,
          'is_lyric', s.is_lyric,
          'cover_url', s.cover_url,
          'play_count', COALESCE(play_counts.total_play_count, 0),
          'artists', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'id', ar.id,
                'name', ar.name,
                'role', sa.role
              )
              ORDER BY
                CASE WHEN sa.role = 'main' THEN 0
                     WHEN sa.role = 'featured' THEN 1
                     ELSE 2
                END,
                ar.name
            )
            FROM public.song_artists sa
            JOIN public.artist ar ON ar.id = sa.artist_id
            WHERE sa.song_id = s.id
          ),
          'album', jsonb_build_object(
            'id', al.id,
            'name', al.title
          )
        ) AS song_obj
        FROM public.song s
        LEFT JOIN public.album al ON al.id = s.album_id
        LEFT JOIN (
            SELECT song_id, SUM(play_count) AS total_play_count
            FROM public.daily_song_play_counts
            GROUP BY song_id
        ) play_counts ON play_counts.song_id = s.id
        JOIN public.song_artists sa2 ON sa2.song_id = s.id
        WHERE sa2.artist_id = a.id
        ORDER BY COALESCE(play_counts.total_play_count, 0) DESC
        LIMIT 8
      ) sub
    ), '[]'::JSONB)
  )
  INTO songs_section
  FROM public.artist a
  WHERE a.id = p_artist_id;

  artist_data := jsonb_build_object(
    'songs', songs_section
  );

  RETURN artist_data;
END;
$$;


ALTER FUNCTION "public"."get_artist_direct"("p_artist_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_artist_page"("p_artist_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  artist_data JSONB;
  songs_section JSONB;
  albums_section JSONB;
BEGIN
  -- Build Songs Section
  SELECT jsonb_build_object(
    'id', p_artist_id,
    'name', a.name,
    'related_id', a.id,
    'related_name', a.name,
    'cover_url', a.cover_url,
    'is_official', FALSE,
    'type', 'artist',
    'songs', COALESCE((
      SELECT jsonb_agg(song_obj)
      FROM (
        SELECT jsonb_build_object(
          'id', s.id || '_' || a.id,
          'song_id', s.id,
          'name', s.name,
          'url', s.url,
          'type', 'track',
          'cover_url', s.cover_url,
          'duration', s.duration,
          'is_lyric', s.is_lyric,
          'play_count', COALESCE(play_counts.total_play_count, 0),
          'artists', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'id', ar.id,
                'name', ar.name,
                'role', sa.role
              )
              ORDER BY
                CASE WHEN sa.role = 'main' THEN 0
                     WHEN sa.role = 'featured' THEN 1
                     ELSE 2
                END,
                ar.name
            )
            FROM public.song_artists sa
            JOIN public.artist ar ON ar.id = sa.artist_id
            WHERE sa.song_id = s.id
          ),
          'album', jsonb_build_object(
            'id', al.id,
            'name', al.title
          )
        ) AS song_obj
        FROM public.song s
        LEFT JOIN public.album al ON al.id = s.album_id
        LEFT JOIN (
            SELECT song_id, SUM(play_count) AS total_play_count
            FROM public.daily_song_play_counts
            GROUP BY song_id
        ) play_counts ON play_counts.song_id = s.id
        JOIN public.song_artists sa2 ON sa2.song_id = s.id
        WHERE sa2.artist_id = a.id
        ORDER BY COALESCE(play_counts.total_play_count, 0) DESC
        LIMIT 8
      ) sub
    ), '[]'::JSONB)
  )
  INTO songs_section
  FROM public.artist a
  WHERE a.id = p_artist_id;

  -- Build Albums Section
  SELECT jsonb_agg(album_obj)
  INTO albums_section
  FROM (
    SELECT jsonb_build_object(
      'id', al.id,
      'name', al.title,
      'related_id', ar.id,
      'related_name', ar.name,
      'cover_url', al.cover_url,
      'is_official', FALSE,
      'type', 'album'
    ) AS album_obj
    FROM public.album al
    JOIN public.artist ar ON ar.id = al.artist_id
    WHERE al.artist_id = p_artist_id
    ORDER BY al.release_date DESC
    LIMIT 8
  ) sub;

  -- Final Artist Data Structure
  artist_data := jsonb_build_object(
    'songs', songs_section,
    'albums', albums_section
  );

  RETURN artist_data;
END;
$$;


ALTER FUNCTION "public"."get_artist_page"("p_artist_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_artist_songs_queue"("p_artist_id" "text") RETURNS "json"[]
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  song_items JSON[];
BEGIN
  SELECT
    CASE
      WHEN COUNT(s.id) > 0 THEN
        array_agg(
          json_build_object(
            'id', gen_random_uuid(),
            'song_id', s.id,
            'name', s.name,
            'url', s.url,
            'type', 'track', 
            'cover_url', s.cover_url,
            'is_lyric', s.is_lyric,
            'duration', s.duration,
            'artists', (
              SELECT json_agg(
                json_build_object(
                  'id', ar.id,
                  'name', ar.name,
                  'role', sa.role
                )
                ORDER BY
                  CASE
                    WHEN sa.role = 'main' THEN 0
                    WHEN sa.role = 'feat' THEN 1
                    ELSE 2
                  END,
                  ar.name
              )
              FROM public.song_artists sa
              JOIN public.artist ar ON ar.id = sa.artist_id
              WHERE sa.song_id = s.id
            ),
            'album', json_build_object(
              'id', al.id,
              'name', al.title
            )
          )
          ORDER BY s.play_count DESC NULLS LAST
        )
      ELSE '{}'::json[]
    END
  INTO song_items
  FROM public.artist a
  LEFT JOIN public.song_artists sa ON sa.artist_id = a.id
  LEFT JOIN public.song s ON s.id = sa.song_id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE a.id = p_artist_id
  GROUP BY a.id, a.name;

  RETURN song_items;
END;
$$;


ALTER FUNCTION "public"."get_artist_songs_queue"("p_artist_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_discover_media_items"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  top_mix_items JSONB;
  top_official_playlist_week JSONB;
  top_community_playlist_week JSONB;
  top_album_week JSONB;
  top_artist_week JSONB;
  trending_songs_week JSONB;
  trending_songs JSONB;
BEGIN

  -- Fetch top mix playlists (weekly)
  SELECT jsonb_agg(item)
  INTO top_mix_items
  FROM (
    SELECT
      jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'related_id', p.user_id,
        'cover_url', p.cover_url,
        'related_name', u.user_name,
        'type', 'playlist',
        'play_count', SUM(w.play_count)
      ) AS item
    FROM public.playlist p
    JOIN public.users u ON u.user_id = p.user_id
    JOIN public.playlist_genres pg ON pg.playlist_id = p.id
    JOIN public.genres g ON g.id = pg.genre_id
    JOIN public.weekly_list_play_counts w 
      ON w.item_id = p.id 
     AND w.item_type = 'playlist'
    WHERE g.name = 'mix'
      AND w.week_start >= (date_trunc('week', current_date) - interval '7 day')
    GROUP BY p.id, p.name, p.user_id, p.cover_url, u.user_name
    ORDER BY SUM(w.play_count) DESC
    LIMIT 8
  ) sub;

  -- Fetch top official playlists (weekly)
  SELECT jsonb_agg(item)
  INTO top_official_playlist_week
  FROM (
    SELECT
      jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'related_id', p.user_id,
        'cover_url', p.cover_url,
        'related_name', u.user_name,
        'type', 'playlist',
        'play_count', SUM(w.play_count)
      ) AS item
    FROM public.weekly_list_play_counts w
    JOIN public.playlist p ON p.id = w.item_id
    JOIN public.users u ON u.user_id = p.user_id
    WHERE w.week_start >= (date_trunc('week', current_date) - interval '7 day')
      AND w.item_type = 'playlist'
      AND p.user_id = public.get_official_id()
    GROUP BY p.id, p.name, p.user_id, p.cover_url, u.user_name
    ORDER BY SUM(w.play_count) DESC
    LIMIT 8
  ) sub;

  -- Fetch top community playlists (weekly)
  SELECT jsonb_agg(item)
  INTO top_community_playlist_week
  FROM (
    SELECT
      jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'related_id', p.user_id,
        'cover_url', p.cover_url,
        'related_name', u.user_name,
        'type', 'playlist',
        'play_count', SUM(w.play_count)
      ) AS item
    FROM public.weekly_list_play_counts w
    JOIN public.playlist p ON p.id = w.item_id
    JOIN public.users u ON u.user_id = p.user_id
    WHERE w.week_start >= (date_trunc('week', current_date) - interval '7 day')
      AND w.item_type = 'playlist'
      AND p.user_id <> public.get_official_id()
    GROUP BY p.id, p.name, p.user_id, p.cover_url, u.user_name
    ORDER BY SUM(w.play_count) DESC
    LIMIT 8
  ) sub;

  -- Fetch top albums (weekly)
  SELECT jsonb_agg(item)
  INTO top_album_week
  FROM (
    SELECT
      jsonb_build_object(
        'id', a.id,
        'name', a.title,
        'related_id', ar.id,
        'cover_url', a.cover_url,
        'related_name', ar.name,
        'type', 'album',
        'play_count', SUM(w.play_count)
      ) AS item
    FROM public.weekly_list_play_counts w
    JOIN public.album a ON a.id = w.item_id
    LEFT JOIN public.artist ar ON ar.id = a.artist_id
    WHERE w.week_start >= (date_trunc('week', current_date) - interval '7 day')
      AND w.item_type = 'album'
    GROUP BY a.id, a.title, ar.id, a.cover_url, ar.name
    ORDER BY SUM(w.play_count) DESC
    LIMIT 8
  ) sub;

  -- Fetch top artists (weekly)
  SELECT jsonb_agg(item)
  INTO top_artist_week
  FROM (
    SELECT
      jsonb_build_object(
        'id', ar.id,
        'name', ar.name,
        'related_id', ar.id,
        'cover_url', ar.cover_url,
        'related_name', ar.name,
        'type', 'artist',
        'play_count', SUM(w.play_count)
      ) AS item
    FROM public.weekly_list_play_counts w
    JOIN public.artist ar ON ar.id = w.item_id
    WHERE w.week_start >= (date_trunc('week', current_date) - interval '7 day')
      AND w.item_type = 'artist'
    GROUP BY ar.id, ar.name, ar.cover_url
    ORDER BY SUM(w.play_count) DESC
    LIMIT 8
  ) sub;

  -- Fetch trending songs (daily, yesterday)
  SELECT jsonb_agg(item)
  INTO trending_songs
  FROM (
    SELECT
      jsonb_build_object(
        'id', gen_random_uuid(),
        'song_id', s.id,
        'name', s.name,
        'url', s.url,
        'cover_url', s.cover_url,
        'type', 'track',
        'duration', s.duration,
        'is_lyric', s.is_lyric,
        'artists', (
          SELECT jsonb_agg(
                   jsonb_build_object(
                     'id', a.id,
                     'name', a.name,
                     'role', sa.role
                   )
                   ORDER BY
                     CASE WHEN sa.role = 'main' THEN 0
                          WHEN sa.role = 'feat' THEN 1
                          ELSE 2
                     END,
                     a.name
                 )
          FROM public.song_artists sa
          JOIN public.artist a ON a.id = sa.artist_id
          WHERE sa.song_id = s.id
        ),
        'album', jsonb_build_object(
          'id', al.id,
          'name', al.title
        ),
        'play_count', d.play_count
      ) AS item
    FROM public.daily_song_play_counts d
    JOIN public.song s ON s.id = d.song_id
    LEFT JOIN public.album al ON al.id = s.album_id
    WHERE d.day_date = current_date - interval '1 day'
    ORDER BY d.play_count DESC
    LIMIT 8
  ) sub;

  -- Fetch trending songs (weekly)
  SELECT jsonb_agg(item)
  INTO trending_songs_week
  FROM (
    SELECT
      jsonb_build_object(
        'id', gen_random_uuid(),
        'song_id', s.id,
        'name', s.name,
        'url', s.url,
        'cover_url', s.cover_url,
        'type', 'track',
        'duration', s.duration,
        'is_lyric', s.is_lyric,
        'artists', (
          SELECT jsonb_agg(
                   jsonb_build_object(
                     'id', a.id,
                     'name', a.name,
                     'role', sa.role
                   )
                   ORDER BY
                     CASE WHEN sa.role = 'main' THEN 0
                          WHEN sa.role = 'feat' THEN 1
                          ELSE 2
                     END,
                     a.name
                 )
          FROM public.song_artists sa
          JOIN public.artist a ON a.id = sa.artist_id
          WHERE sa.song_id = s.id
        ),
        'album', jsonb_build_object(
          'id', al.id,
          'name', al.title
        ),
        'play_count', SUM(d.play_count)
      ) AS item
    FROM public.daily_song_play_counts d
    JOIN public.song s ON s.id = d.song_id
    LEFT JOIN public.album al ON al.id = s.album_id
    WHERE d.day_date >= current_date - interval '7 days'
    GROUP BY s.id, s.name, s.url, s.cover_url, s.duration, s.is_lyric, al.id, al.title
    ORDER BY SUM(d.play_count) DESC
    LIMIT 8
  ) sub;

  RETURN jsonb_build_object(
    'trendingSongs', COALESCE(trending_songs, '[]'::jsonb),
    'trendingSongsWeek', COALESCE(trending_songs_week, '[]'::jsonb),
    'topMix', COALESCE(top_mix_items, '[]'::jsonb),
    'topOfficialPlaylistWeek', COALESCE(top_official_playlist_week, '[]'::jsonb),
    'topCommunityPlaylistWeek', COALESCE(top_community_playlist_week, '[]'::jsonb),
    'topAlbumWeek', COALESCE(top_album_week, '[]'::jsonb),
    'topArtistWeek', COALESCE(top_artist_week, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_discover_media_items"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_genre_page"("p_genre_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  recommended JSONB;
  popular JSONB;
  recent JSONB;
  user_playlist_embedding extensions.vector(384);
BEGIN
  -- get user embedding
  SELECT public.users.playlist_embedding
  INTO user_playlist_embedding
  FROM public.users
  WHERE public.users.user_id = public.get_user_id();

  -- Recommended for you (by genre)
  IF user_playlist_embedding IS NOT NULL THEN
    SELECT jsonb_agg(item)
    INTO recommended
    FROM (
      SELECT jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'related_id', p.user_id,
        'cover_url', p.cover_url,
        'related_name', u.user_name,
        'type', 'playlist'
      ) AS item
      FROM public.playlist p
      JOIN public.playlist_genres pg ON pg.playlist_id = p.id
      JOIN public.users u ON u.user_id = p.user_id
      WHERE pg.genre_id = p_genre_id
      ORDER BY p.embedding OPERATOR(extensions.<->) user_playlist_embedding
      LIMIT 8
    ) sub;
  ELSE
    recommended := '[]'::jsonb;
  END IF;

  -- Popular playlists in genre (same logic as get_discover_media_items)
  SELECT jsonb_agg(item)
  INTO popular
  FROM (
    SELECT 
      jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'related_id', p.user_id,
        'cover_url', p.cover_url,
        'related_name', u.user_name,
        'type', 'playlist',
        'play_count', SUM(w.play_count)
      ) AS item
    FROM public.weekly_list_play_counts w
    JOIN public.playlist p ON p.id = w.item_id
    JOIN public.playlist_genres pg ON pg.playlist_id = p.id
    JOIN public.users u ON u.user_id = p.user_id
    WHERE w.item_type = 'playlist'
      AND pg.genre_id = p_genre_id
      AND w.week_start >= (date_trunc('week', current_date) - interval '7 day')
    GROUP BY p.id, p.name, p.user_id, p.cover_url, u.user_name
    ORDER BY SUM(w.play_count) DESC
    LIMIT 8
  ) sub;

  -- Recently added playlists in genre
  SELECT jsonb_agg(item)
  INTO recent
  FROM (
    SELECT jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'type', 'playlist'
    ) AS item
    FROM public.playlist p
    JOIN public.playlist_genres pg ON pg.playlist_id = p.id
    JOIN public.users u ON u.user_id = p.user_id
    WHERE pg.genre_id = p_genre_id
    ORDER BY p.created_at DESC
    LIMIT 8
  ) sub;

  RETURN jsonb_build_object(
    'recommended', COALESCE(recommended, '[]'::jsonb),
    'popular', COALESCE(popular, '[]'::jsonb),
    'recent', COALESCE(recent, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_genre_page"("p_genre_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_last_created_playlists"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(item)
  INTO result
  FROM (
    SELECT jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'type', 'playlist'
    ) AS item
    -- Renamed table: playlists -> playlist
    FROM public.playlist p
    JOIN public.users u 
      ON u.user_id = p.user_id
    WHERE p.user_id = public.get_user_id()
    ORDER BY p.created_at DESC
  ) sub;

  RETURN jsonb_build_object(
    'result', COALESCE(result, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_last_created_playlists"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_last_liked_songs"("like_title" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  track_data JSONB;
BEGIN
  SELECT jsonb_build_object(
    'songs', jsonb_build_object(
      'id', gen_random_uuid(),
      'name', like_title,
      'related_id', u.user_id,
      'related_name', u.user_name,
      'cover_url', 'https://njjvikpbvsfomrpyxnta.supabase.co/storage/v1/object/public/bubblemusic/bubble-assets/image/like-cover.png',
      'type', 'playlist',
      'is_official', FALSE,
      'flag', 'user-specific',

      'songs',
      CASE
        WHEN COUNT(s.id) > 0 THEN
          jsonb_agg(
            jsonb_build_object(
              'id', s.id,
              'song_id', s.id,
              'name', s.name,
              'url', s.url,
              'cover_url', s.cover_url,
              'type', 'track',
              'is_lyric', s.is_lyric,
              'duration', s.duration,
              'artists', (
                SELECT jsonb_agg(
                  jsonb_build_object(
                    'id', a.id,
                    'name', a.name,
                    'role', sa.role
                  )
                  ORDER BY
                    CASE 
                      WHEN sa.role = 'main' THEN 0
                      WHEN sa.role = 'feat' THEN 1
                      ELSE 2
                    END,
                    a.name
                )
                FROM public.song_artists sa
                JOIN public.artist a ON a.id = sa.artist_id
                WHERE sa.song_id = s.id
              ),
              'album', jsonb_build_object(
                'id', al.id,
                'name', al.title
              )
            )
            ORDER BY l.created_at DESC
          )
        ELSE '[]'::jsonb
      END
    )
  )
  INTO track_data
  FROM public.users u
  LEFT JOIN public.likes l ON l.user_id = u.user_id
  LEFT JOIN public.song s ON s.id = l.song_id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE u.user_id = public.get_user_id()
  GROUP BY u.user_id, u.user_name;

  RETURN track_data;
END;
$$;


ALTER FUNCTION "public"."get_last_liked_songs"("like_title" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_last_saved_albums"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(item)
  INTO result
  FROM (
    SELECT jsonb_build_object(
      'id', al.id,
      'name', al.title,
      'related_id', ar.id,
      'cover_url', al.cover_url,
      'related_name', ar.name,
      'type', 'album'
    ) AS item
    FROM public.user_reference_items uri
    JOIN public.album al 
      ON al.id = uri.item_id
    JOIN public.artist ar 
      ON ar.id = al.artist_id
    WHERE uri.user_id = public.get_user_id()
      AND uri.item_type = 'album'
    ORDER BY uri.created_at DESC
  ) sub;

  RETURN jsonb_build_object(
    'result', COALESCE(result, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_last_saved_albums"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_last_saved_artists"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(item)
  INTO result
  FROM (
    SELECT jsonb_build_object(
      'id', ar.id,
      'name', ar.name,
      'related_id', ar.id,
      'cover_url', ar.cover_url,
      'related_name', ar.name,
      'type', 'artist'
    ) AS item
    FROM public.user_reference_items uri
    JOIN public.artist ar 
      ON ar.id = uri.item_id
    WHERE uri.user_id = public.get_user_id()
      AND uri.item_type = 'artist'
    ORDER BY uri.created_at DESC
  ) sub;

  RETURN jsonb_build_object(
    'result', COALESCE(result, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_last_saved_artists"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_last_saved_playlists"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(item)
  INTO result
  FROM (
    SELECT jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'type', 'playlist'
    ) AS item
    FROM public.user_reference_items uri
    -- Renamed table: playlists -> playlist
    JOIN public.playlist p 
      ON p.id = uri.item_id
    JOIN public.users u 
      ON u.user_id = p.user_id
    WHERE uri.user_id = public.get_user_id()
      AND uri.item_type = 'playlist'
    ORDER BY uri.created_at DESC
  ) sub;

  RETURN jsonb_build_object(
    'result', COALESCE(result, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_last_saved_playlists"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_library_overview"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  last_liked_songs      JSONB;
  last_saved_albums     JSONB;
  last_saved_playlists  JSONB;
  last_created_playlists JSONB;
  last_saved_artists    JSONB;
  recently_played_items JSONB;
BEGIN
  -----------------------------------------------------------------
  -- 1. Last Liked Songs (from likes table)
  -----------------------------------------------------------------
    -- 1. Last Liked Songs
  SELECT jsonb_agg(item)
  INTO last_liked_songs
  FROM (
    SELECT jsonb_build_object(
      'id', gen_random_uuid(),
      'song_id', s.id,
      'name', s.name,
      'url', s.url,
      'cover_url', s.cover_url,
      'type', 'track',
      'duration', s.duration,
      'is_lyric', s.is_lyric,
      'artists', (
        SELECT jsonb_agg(
          jsonb_build_object('id', a.id, 'name', a.name, 'role', sa.role)
          ORDER BY CASE WHEN sa.role = 'main' THEN 0
                        WHEN sa.role = 'feat' THEN 1
                        ELSE 2 END, a.name
        )
        FROM public.song_artists sa JOIN public.artist a ON a.id = sa.artist_id
        WHERE sa.song_id = s.id
      ),
      'album', jsonb_build_object('id', al.id, 'name', al.title),
      'play_count', NULL
    ) AS item
    FROM public.likes l
    JOIN public.song s ON s.id = l.song_id
    LEFT JOIN public.album al ON al.id = s.album_id
    WHERE l.user_id = public.get_user_id()
    ORDER BY l.created_at DESC
    LIMIT 8
  ) sub;

  -----------------------------------------------------------------
  -- 2. Last Saved Albums (from user_reference_items)
  -----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO last_saved_albums
  FROM (
    SELECT jsonb_build_object(
      'id', al.id,
      'name', al.title,
      'related_id', ar.id,
      'cover_url', al.cover_url,
      'related_name', ar.name,
      'type', 'album'
    ) AS item
    FROM public.user_reference_items uri
    JOIN public.album al ON al.id = uri.item_id
    JOIN public.artist ar ON ar.id = al.artist_id
    WHERE uri.user_id = public.get_user_id()
      AND uri.item_type = 'album'
    ORDER BY uri.created_at DESC
    LIMIT 8
  ) sub;

  -----------------------------------------------------------------
  -- 3. Last Saved Playlists (from user_reference_items)
  -----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO last_saved_playlists
  FROM (
    SELECT jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'type', 'playlist'
    ) AS item
    FROM public.user_reference_items uri
    JOIN public.playlist p ON p.id = uri.item_id
    JOIN public.users u ON u.user_id = p.user_id
    WHERE uri.user_id = public.get_user_id()
      AND uri.item_type = 'playlist'
    ORDER BY uri.created_at DESC
    LIMIT 8
  ) sub;

  -----------------------------------------------------------------
  -- 4. Last Created Playlists (user's own playlists)
  -----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO last_created_playlists
  FROM (
    SELECT jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'type', 'playlist'
    ) AS item
    FROM public.playlist p
    JOIN public.users u ON u.user_id = p.user_id
    WHERE p.user_id = public.get_user_id()
    ORDER BY p.created_at DESC
    LIMIT 8
  ) sub;

  -----------------------------------------------------------------
  -- 5. Last Saved Artists (from user_reference_items)
  -----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO last_saved_artists
  FROM (
    SELECT jsonb_build_object(
      'id', ar.id,
      'name', ar.name,
      'related_id', ar.id,
      'cover_url', ar.cover_url,
      'related_name', ar.name,
      'type', 'artist'
    ) AS item
    FROM public.user_reference_items uri
    JOIN public.artist ar ON ar.id = uri.item_id
    WHERE uri.user_id = public.get_user_id()
      AND uri.item_type = 'artist'
    ORDER BY uri.created_at DESC
    LIMIT 8
  ) sub;

  -----------------------------------------------------------------
  -- 6. Recently Played (exactly the same logic as your reference function)
  -----------------------------------------------------------------
  SELECT jsonb_agg(sub.item ORDER BY sub.last_played DESC)
  INTO recently_played_items
  FROM (
    SELECT DISTINCT ON (rpl.type, rpl.item_id)
      rpl.played_at AS last_played,
      jsonb_build_object(
        'id', rpl.item_id,
        'name', COALESCE(p.name, al.title, ar.name),
        'cover_url', COALESCE(p.cover_url, al.cover_url, ar.cover_url),
        'related_id', COALESCE(p.user_id, al.artist_id, ar.id),
        'related_name', COALESCE(u.user_name, al_ar.name, ar.name),
        'type', rpl.type,
        'played_at', rpl.played_at
      ) AS item
    FROM public.recently_played_list AS rpl
    LEFT JOIN public.playlist p ON (rpl.type = 'playlist' AND p.id = rpl.item_id)
    LEFT JOIN public.users u ON (p.user_id = u.user_id)
    LEFT JOIN public.album al ON (rpl.type = 'album' AND al.id = rpl.item_id)
    LEFT JOIN public.artist al_ar ON (al.artist_id = al_ar.id)
    LEFT JOIN public.artist ar ON (rpl.type = 'artist' AND ar.id = rpl.item_id)
    WHERE rpl.user_id = public.get_user_id()
    ORDER BY rpl.type, rpl.item_id, rpl.played_at DESC
    LIMIT 8
  ) AS sub;

  -----------------------------------------------------------------
  -- Return everything
  -----------------------------------------------------------------
  RETURN jsonb_build_object(
    'lastLikedSongs',     COALESCE(last_liked_songs, '[]'::jsonb),
    'recentlyPlayed',     COALESCE(recently_played_items, '[]'::jsonb),
    'lastSavedAlbums',    COALESCE(last_saved_albums, '[]'::jsonb),
    'lastSavedPlaylists', COALESCE(last_saved_playlists, '[]'::jsonb),
    'lastCreatedPlaylists', COALESCE(last_created_playlists, '[]'::jsonb),
    'lastSavedArtists',   COALESCE(last_saved_artists, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_library_overview"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_mood_page"("p_mood_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  recommended JSONB;
  popular     JSONB;
  recent      JSONB;
  user_playlist_embedding extensions.vector(384);
BEGIN
  SELECT u.playlist_embedding
  INTO user_playlist_embedding
  FROM public.users u
  WHERE u.user_id = public.get_user_id();

  -- Recommended for you (by mood)
  IF user_playlist_embedding IS NOT NULL THEN
    SELECT jsonb_agg(item)
    INTO recommended
    FROM (
      SELECT jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'related_id', p.user_id,
        'cover_url', p.cover_url,
        'related_name', u.user_name,
        'type', 'playlist'
      ) AS item
      FROM public.playlist p
      JOIN public.playlist_moods pm ON pm.playlist_id = p.id
      JOIN public.users u ON u.user_id = p.user_id
      WHERE pm.mood_id = p_mood_id
      ORDER BY p.embedding OPERATOR(extensions.<->) user_playlist_embedding
      LIMIT 8
    ) sub;
  ELSE
    recommended := '[]'::jsonb;
  END IF;

  -- Popular playlists in mood (Fixed - same logic as genre & discover)
  SELECT jsonb_agg(item)
  INTO popular
  FROM (
    SELECT 
      jsonb_build_object(
        'id', p.id,
        'name', p.name,
        'related_id', p.user_id,
        'cover_url', p.cover_url,
        'related_name', u.user_name,
        'type', 'playlist',
        'play_count', SUM(w.play_count)
      ) AS item
    FROM public.weekly_list_play_counts w
    JOIN public.playlist p ON p.id = w.item_id
    JOIN public.playlist_moods pm ON pm.playlist_id = p.id
    JOIN public.users u ON u.user_id = p.user_id
    WHERE w.item_type = 'playlist'
      AND pm.mood_id = p_mood_id
      AND w.week_start >= (date_trunc('week', current_date) - interval '7 day')
    GROUP BY p.id, p.name, p.user_id, p.cover_url, u.user_name
    ORDER BY SUM(w.play_count) DESC
    LIMIT 8
  ) sub;

  -- Recently added playlists in mood
  SELECT jsonb_agg(item)
  INTO recent
  FROM (
    SELECT jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'type', 'playlist'
    ) AS item
    FROM public.playlist p
    JOIN public.playlist_moods pm ON pm.playlist_id = p.id
    JOIN public.users u ON u.user_id = p.user_id
    WHERE pm.mood_id = p_mood_id
    ORDER BY p.created_at DESC
    LIMIT 8
  ) sub;

  RETURN jsonb_build_object(
    'recommended', COALESCE(recommended, '[]'::jsonb),
    'popular',     COALESCE(popular, '[]'::jsonb),
    'recent',      COALESCE(recent, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_mood_page"("p_mood_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_newly"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  newly_added_songs     JSONB;
  newly_added_artists   JSONB;
  newly_added_albums    JSONB;
  newly_added_playlists JSONB;
BEGIN
  ----------------------------------------------------------------
  -- NEWLY ADDED SONGS
  ----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO newly_added_songs
  FROM (
    SELECT
      jsonb_build_object(
        'id', gen_random_uuid(),
        'song_id', s.id,
        'name', s.name,
        'url', s.url,
        'cover_url', s.cover_url,
        'type', 'track',
        'duration', s.duration,
        'is_lyric', s.is_lyric,
        'artists', (
          SELECT jsonb_agg(
                   jsonb_build_object(
                     'id', a.id,
                     'name', a.name,
                     'role', sa.role
                   )
                   ORDER BY
                     CASE WHEN sa.role = 'main' THEN 0
                          WHEN sa.role = 'feat' THEN 1
                          ELSE 2
                     END,
                     a.name
                 )
          FROM public.song_artists sa
          JOIN public.artist a ON a.id = sa.artist_id
          WHERE sa.song_id = s.id
        ),
        'album', jsonb_build_object(
          'id', al.id,
          'name', al.title
        )
      ) AS item
    FROM public.song s
    LEFT JOIN public.album al ON al.id = s.album_id
    ORDER BY s.created_at DESC
    LIMIT 8
  ) sub;

  ----------------------------------------------------------------
  -- NEWLY ADDED ARTISTS
  ----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO newly_added_artists
  FROM (
    SELECT jsonb_build_object(
      'id', ar.id,
      'name', ar.name,
      'related_id', ar.id,
      'cover_url', ar.cover_url,
      'related_name', ar.name,
      'type', 'artist'
    ) AS item
    FROM public.artist ar
    ORDER BY ar.created_at DESC
    LIMIT 8
  ) sub;

  ----------------------------------------------------------------
  -- NEWLY ADDED ALBUMS
  ----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO newly_added_albums
  FROM (
    SELECT jsonb_build_object(
      'id', al.id,
      'name', al.title,
      'related_id', ar.id,
      'cover_url', al.cover_url,
      'related_name', ar.name,
      'type', 'album'
    ) AS item
    FROM public.album al
    JOIN public.artist ar ON ar.id = al.artist_id
    ORDER BY al.created_at DESC
    LIMIT 8
  ) sub;

  ----------------------------------------------------------------
  -- NEWLY ADDED OFFICIAL PLAYLISTS
  ----------------------------------------------------------------
  SELECT jsonb_agg(item)
  INTO newly_added_playlists
  FROM (
    SELECT jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'type', 'playlist'
    ) AS item
    FROM public.playlist p
    JOIN public.users u ON u.user_id = p.user_id
    WHERE p.user_id = public.get_official_id()
    ORDER BY p.created_at DESC
    LIMIT 8
  ) sub;

  -- Final result assembly
  RETURN jsonb_build_object(
    'newlyAddedSongs',     COALESCE(newly_added_songs, '[]'::jsonb),
    'newlyAddedArtists',   COALESCE(newly_added_artists, '[]'::jsonb),
    'newlyAddedAlbums',    COALESCE(newly_added_albums, '[]'::jsonb),
    'newlyAddedPlaylists', COALESCE(newly_added_playlists, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_newly"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_official_id"() RETURNS "text"
    LANGUAGE "sql" IMMUTABLE
    SET "search_path" TO ''
    AS $$
  SELECT 'c2fa7d7f-440d-4fbd-a94c-cdb8209c1312';
$$;


ALTER FUNCTION "public"."get_official_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_personalized_media_items"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  recently_played_items JSONB;
  artist_for_you JSONB;
  album_for_you JSONB;
  playlist_for_you JSONB;
  user_artist_embedding extensions.vector(384);
  user_album_embedding extensions.vector(384);
  user_playlist_embedding extensions.vector(384);
BEGIN
  -- Get user embeddings
  SELECT u.artist_embedding, u.album_embedding, u.playlist_embedding
  INTO user_artist_embedding, user_album_embedding, user_playlist_embedding
  FROM public.users u
  WHERE u.user_id = public.get_user_id();

  -- recently played
  SELECT jsonb_agg(sub.item ORDER BY sub.last_played DESC)
  INTO recently_played_items
  FROM (
    SELECT DISTINCT ON (rpl.type, rpl.item_id)
      rpl.played_at AS last_played,
      jsonb_build_object(
        'id', rpl.item_id,
        'name', COALESCE(p.name, al.title, ar.name),
        'cover_url', COALESCE(p.cover_url, al.cover_url, ar.cover_url),
        'related_id', COALESCE(p.user_id, al.artist_id, ar.id),
        'related_name', COALESCE(u.user_name, al_ar.name, ar.name),
        'type', rpl.type,
        'played_at', rpl.played_at
      ) AS item
    FROM public.recently_played_list AS rpl
      LEFT JOIN public.playlist p ON (rpl.type = 'playlist' AND p.id = rpl.item_id)
      LEFT JOIN public.users u ON (p.user_id = u.user_id)
      LEFT JOIN public.album al ON (rpl.type = 'album' AND al.id = rpl.item_id)
      LEFT JOIN public.artist al_ar ON (al.artist_id = al_ar.id)
      LEFT JOIN public.artist ar ON (rpl.type = 'artist' AND ar.id = rpl.item_id)
    WHERE rpl.user_id = public.get_user_id()
    ORDER BY rpl.type, rpl.item_id, rpl.played_at DESC
    LIMIT 8
  ) AS sub;

  -- ArtistForYou
  IF user_artist_embedding IS NOT NULL THEN
    SELECT jsonb_agg(item)
    INTO artist_for_you
    FROM (
      SELECT
        jsonb_build_object(
          'id', ar.id,
          'name', ar.name,
          'related_id', ar.id,
          'related_name', ar.name,
          'cover_url' , ar.cover_url,
          'type', 'artist'
        ) AS item
      FROM public.artist ar
      ORDER BY ar.embedding OPERATOR(extensions.<=>) user_artist_embedding
      LIMIT 8
    ) sub;
  ELSE
    artist_for_you := '[]'::jsonb;
  END IF;

  -- AlbumForYou
  IF user_album_embedding IS NOT NULL THEN
    SELECT jsonb_agg(item)
    INTO album_for_you
    FROM (
      SELECT
        jsonb_build_object(
          'id', al.id,
          'name', al.title,
          'related_id', ar.id,
          'cover_url' , al.cover_url,
          'related_name', ar.name,
          'type', 'album'
        ) AS item
      FROM public.album al
      JOIN public.artist ar ON ar.id = al.artist_id
      ORDER BY al.embedding OPERATOR(extensions.<=>) user_album_embedding
      LIMIT 8
    ) sub;
  ELSE
    album_for_you := '[]'::jsonb;
  END IF;

 
  IF user_playlist_embedding IS NOT NULL THEN
    SELECT jsonb_agg(item)
    INTO playlist_for_you
    FROM (
      SELECT
        jsonb_build_object(
          'id', p.id,
          'name', p.name,
          'related_id', p.user_id,
          'cover_url' , p.cover_url,
          'related_name', u.user_name,
          'type', 'playlist'
        ) AS item
      FROM public.playlist p
      JOIN public.users u ON u.user_id = p.user_id
      WHERE p.user_id != public.get_user_id()           -- exclude user's own playlists
        AND p.is_public = true                          -- only public playlists
        AND p.embedding IS NOT NULL                     -- must have embedding (has songs)
      ORDER BY p.embedding OPERATOR(extensions.<=>) user_playlist_embedding
      LIMIT 8
    ) sub;
  ELSE
    playlist_for_you := '[]'::jsonb;
  END IF;

  RETURN jsonb_build_object(
    'recentlyPlayed', COALESCE(recently_played_items, '[]'::jsonb),
    'artistForYou', COALESCE(artist_for_you, '[]'::jsonb),
    'albumForYou', COALESCE(album_for_you, '[]'::jsonb),
    'playlistForYou', COALESCE(playlist_for_you, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_personalized_media_items"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_playlist_direct"("p_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  playlist_songs JSONB;
BEGIN
  SELECT jsonb_build_object(
    'songs', jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', u.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'is_official', (u.user_id = public.get_official_id()),
      'type', 'playlist',
      'songs', CASE
                 WHEN COUNT(s.id) > 0 THEN
                   jsonb_agg(
                     jsonb_build_object(
                       'id', ps.id,
                       'song_id', s.id,
                       'name', s.name,
                       'url', s.url,
                       'cover_url', s.cover_url,
                       'type', 'track',
                       'is_lyric', s.is_lyric,
                       'duration', s.duration,
                       'artists', (
                         SELECT jsonb_agg(
                           jsonb_build_object(
                             'id', a.id,
                             'name', a.name,
                             'role', sa.role
                           )
                           ORDER BY
                             CASE WHEN sa.role = 'main' THEN 0
                                  WHEN sa.role = 'feat' THEN 1
                                  ELSE 2
                             END,
                             a.name
                         )
                         FROM public.song_artists sa
                         JOIN public.artist a ON a.id = sa.artist_id
                         WHERE sa.song_id = s.id
                       ),
                       'album', jsonb_build_object(
                         'id', al.id,
                         'name', al.title
                       )
                     )
                     ORDER BY ps.created_at
                   )
                 ELSE '[]'::jsonb
               END
    )
  )
  INTO playlist_songs
  FROM public.playlist p
  LEFT JOIN public.users u ON p.user_id = u.user_id
  LEFT JOIN public.playlist_songs ps ON ps.playlist_id = p.id
  LEFT JOIN public.song s ON s.id = ps.song_id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE p.id = p_id
  GROUP BY p.id, p.name, u.user_id, u.user_name;

  RETURN playlist_songs;
END;
$$;


ALTER FUNCTION "public"."get_playlist_direct"("p_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_playlist_page"("p_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  playlist_songs JSONB;
BEGIN
  SELECT jsonb_build_object(
    'songs', jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', u.user_id,
      'cover_url', p.cover_url,
      'related_name', u.user_name,
      'is_official', (u.user_id = public.get_official_id()),
      'type', 'playlist',
      'songs', CASE
                 WHEN COUNT(s.id) > 0 THEN
                   jsonb_agg(
                     jsonb_build_object(
                       'id', ps.id,
                       'song_id', s.id,
                       'name', s.name,
                       'url', s.url,
                       'type', 'track',
                       'cover_url', s.cover_url,
                       'duration', s.duration,
                       'is_lyric', s.is_lyric,
                       'artists', (
                         SELECT jsonb_agg(
                           jsonb_build_object(
                             'id', a.id,
                             'name', a.name,
                             'role', sa.role
                           )
                           ORDER BY
                             CASE WHEN sa.role = 'main' THEN 0
                                  WHEN sa.role = 'feat' THEN 1
                                  ELSE 2
                             END,
                             a.name
                         )
                         FROM public.song_artists sa
                         JOIN public.artist a ON a.id = sa.artist_id
                         WHERE sa.song_id = s.id
                       ),
                       'album', jsonb_build_object(
                         'id', al.id,
                         'name', al.title
                       )
                     )
                     ORDER BY ps.created_at
                   )
                 ELSE '[]'::jsonb
               END
    )
  )
  INTO playlist_songs
  FROM public.playlist p
  LEFT JOIN public.users u ON p.user_id = u.user_id
  LEFT JOIN public.playlist_songs ps ON ps.playlist_id = p.id
  LEFT JOIN public.song s ON s.id = ps.song_id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE p.id = p_id
  GROUP BY p.id, p.name, u.user_id, u.user_name;

  RETURN playlist_songs;
END;
$$;


ALTER FUNCTION "public"."get_playlist_page"("p_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_playlist_songs_queue"("p_id" "text") RETURNS "json"[]
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  song_items JSON[];
BEGIN
  SELECT
    CASE
      WHEN COUNT(s.id) > 0 THEN
        array_agg(
          json_build_object(
            'id', gen_random_uuid(),
            'song_id', s.id,
            'name', s.name,
            'url', s.url,
            'type', 'track',
            'cover_url', s.cover_url,
            'is_lyric', s.is_lyric,
            'duration', s.duration,
            'artists', (
              SELECT json_agg(
                json_build_object(
                  'id', a.id,
                  'name', a.name,
                  'role', sa.role
                )
                ORDER BY
                  CASE
                    WHEN sa.role = 'main' THEN 0
                    WHEN sa.role = 'feat' THEN 1
                    ELSE 2
                  END,
                  a.name
              )
              FROM public.song_artists sa
              JOIN public.artist a ON a.id = sa.artist_id
              WHERE sa.song_id = s.id
            ),
            'album', json_build_object(
              'id', al.id,
              'name', al.title
            )
          )
        )
      ELSE '{}'::json[]
    END
  INTO song_items
  FROM public.playlist p
  LEFT JOIN public.playlist_songs ps ON ps.playlist_id = p.id
  LEFT JOIN public.song s ON s.id = ps.song_id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE p.id = p_id;

  RETURN song_items;
END;
$$;


ALTER FUNCTION "public"."get_playlist_songs_queue"("p_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_recent_list"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  recently_played_items JSONB;
  userId TEXT;
BEGIN
  -- Get official user id dynamically
  userId := public.get_user_id();

  -- Fetch recently played items (latest per item, sorted by most recent)
  SELECT
    jsonb_agg(sub.item ORDER BY sub.last_played DESC)
  INTO
    recently_played_items
  FROM (
    SELECT DISTINCT ON (rpl.type, rpl.item_id)
      rpl.played_at AS last_played,
      jsonb_build_object(
        'id', rpl.item_id,
        'name', COALESCE(p.name, al.title, ar.name),
        'cover_url', COALESCE(p.cover_url, al.cover_url, ar.cover_url),
        'related_id', COALESCE(p.user_id, al.artist_id, ar.id),
        'related_name', COALESCE(u.user_name, al_ar.name, ar.name),
        'type', rpl.type,
        'played_at', rpl.played_at
      ) AS item
    FROM public.recently_played_list AS rpl
      LEFT JOIN public.playlist p ON (rpl.type = 'playlist' AND p.id = rpl.item_id)
      LEFT JOIN public.users u ON (p.user_id = u.user_id)
      LEFT JOIN public.album al ON (rpl.type = 'album' AND al.id = rpl.item_id)
      LEFT JOIN public.artist al_ar ON (al.artist_id = al_ar.id)
      LEFT JOIN public.artist ar ON (rpl.type = 'artist' AND ar.id = rpl.item_id)
    WHERE rpl.user_id = userId
    ORDER BY rpl.type, rpl.item_id, rpl.played_at DESC
  ) AS sub;

  -- Return combined JSON object
  RETURN jsonb_build_object(
    'recentlyPlayed', COALESCE(recently_played_items, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_recent_list"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_recently_played"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_agg(sub.item ORDER BY sub.last_played DESC)
  INTO result
  FROM (
    SELECT DISTINCT ON (rpl.type, rpl.item_id)
      rpl.played_at AS last_played,
      jsonb_build_object(
        'id', rpl.item_id,
        'name', COALESCE(p.name, al.title, ar.name),
        'cover_url', COALESCE(p.cover_url, al.cover_url, ar.cover_url),
        'related_id', COALESCE(p.user_id, al.artist_id, ar.id),
        'related_name', COALESCE(u.user_name, al_ar.name, ar.name),
        'type', rpl.type,
        'played_at', rpl.played_at
      ) AS item
    FROM public.recently_played_list AS rpl
      LEFT JOIN public.playlist p ON (rpl.type = 'playlist' AND p.id = rpl.item_id)
      LEFT JOIN public.users u ON (p.user_id = u.user_id)
      LEFT JOIN public.album al ON (rpl.type = 'album' AND al.id = rpl.item_id)
      LEFT JOIN public.artist al_ar ON (al.artist_id = al_ar.id)
      LEFT JOIN public.artist ar ON (rpl.type = 'artist' AND ar.id = rpl.item_id)
    WHERE rpl.user_id = public.get_user_id()
    ORDER BY rpl.type, rpl.item_id, rpl.played_at DESC
  ) AS sub;

  RETURN jsonb_build_object(
    'result', COALESCE(result, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."get_recently_played"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_similar_songs"("input_song_id" "uuid", "similarity_threshold" double precision) RETURNS "json"[]
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  song_items JSON[];
  song_embedding extensions.vector(384);
BEGIN
  -- Get embedding of the input song
  SELECT s.embedding INTO song_embedding
  FROM public.song s
  WHERE s.id = input_song_id;

  -- Fetch similar songs with artist and album info
  SELECT
    CASE
      WHEN COUNT(s.id) > 0 THEN
        array_agg(
          json_build_object(
            'id', gen_random_uuid(),
            'song_id', s.id,
            'url', s.url,
            'is_lyric', s.is_lyric,
            'cover_url', s.cover_url,
            'name', s.name,
            'type', 'track',
            'duration', s.duration,
            'artists', (
              SELECT json_agg(
                json_build_object(
                  'id', a.id,
                  'name', a.name,
                  'role', sa.role
                )
                ORDER BY
                  CASE
                    WHEN sa.role = 'main' THEN 0
                    WHEN sa.role = 'featured' THEN 1
                    ELSE 2
                  END,
                  a.name
              )
              FROM public.song_artists sa
              JOIN public.artist a ON a.id = sa.artist_id
              WHERE sa.song_id = s.id
            ),
            'album', json_build_object(
              'id', al.id,
              'name', al.title
            )
          )
          ORDER BY (1 - (s.embedding OPERATOR(extensions.<=>) song_embedding)) DESC
        )
      ELSE '{}'::json[]
    END
  INTO song_items
  FROM public.song s
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE s.id != input_song_id
    AND (1 - (s.embedding OPERATOR(extensions.<=>) song_embedding)) > similarity_threshold;

  RETURN song_items;
END;
$$;


ALTER FUNCTION "public"."get_similar_songs"("input_song_id" "uuid", "similarity_threshold" double precision) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_song_track"("p_song_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  track_data JSONB;
BEGIN
  SELECT jsonb_build_object(
    'songs', jsonb_build_object(
      'id', s.id,
      'name', s.name,
      'related_id', ar.id,
      'related_name', ar.name,
      'cover_url', s.cover_url,
      'type', 'track',
      'is_official', FALSE,
      'songs', jsonb_agg(
        jsonb_build_object(
          'id', s.id,
          'song_id', s.id,
          'name', s.name,
          'url', s.url,
          'cover_url', s.cover_url,
          'type', 'track',
          'is_lyric', s.is_lyric,
          'duration', s.duration,
          'artists', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'id', a.id,
                'name', a.name,
                'role', sa.role
              )
              ORDER BY
                CASE WHEN sa.role = 'main' THEN 0
                     WHEN sa.role = 'feat' THEN 1
                     ELSE 2
                END,
                a.name
            )
            FROM public.song_artists sa
            JOIN public.artist a ON a.id = sa.artist_id
            WHERE sa.song_id = s.id
          ),
          'album', jsonb_build_object(
            'id', al.id,
            'name', al.title
          )
        )
      )
    )
  )
  INTO track_data
  FROM public.song s
  LEFT JOIN public.song_artists sa_main ON sa_main.song_id = s.id AND sa_main.role = 'main'
  LEFT JOIN public.artist ar ON ar.id = sa_main.artist_id
  LEFT JOIN public.album al ON al.id = s.album_id
  WHERE s.id = p_song_id
  GROUP BY s.id, s.name, ar.id, ar.name, al.id, al.title;

  RETURN track_data;
END;
$$;


ALTER FUNCTION "public"."get_song_track"("p_song_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_id"() RETURNS "text"
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $$
  SELECT auth.uid();
$$;


ALTER FUNCTION "public"."get_user_id"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_library"() RETURNS TABLE("id" "text", "name" "text", "related_id" "text", "related_name" "text", "cover_url" "text", "source" "public"."media_source_type", "type" "public"."media_item_type", "is_public" boolean, "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    uri.item_id AS id,
    COALESCE(p.name, al.title, ar.name) AS name,
    COALESCE(u.user_id, al.artist_id, ar.id) AS related_id,
    COALESCE(u.user_name, al_ar.name, ar.name) AS related_name,
    COALESCE(p.cover_url,al.cover_url, ar.cover_url) AS cover_url,
    CASE
      WHEN uri.item_type = 'playlist' AND p.user_id = public.get_user_id() THEN 'create'::public.media_source_type
      ELSE 'reference'::public.media_source_type
    END AS source,
    uri.item_type::public.media_item_type AS type,
    true as is_public,
    uri.created_at
  FROM public.user_reference_items uri
  LEFT JOIN public.playlist p ON (uri.item_type = 'playlist' AND p.id = uri.item_id)
  LEFT JOIN public.users u ON (uri.item_type = 'playlist' AND u.user_id = p.user_id)
  LEFT JOIN public.album al ON (uri.item_type = 'album' AND al.id = uri.item_id)
  LEFT JOIN public.artist al_ar ON (al.artist_id = al_ar.id)
  LEFT JOIN public.artist ar ON (uri.item_type = 'artist' AND ar.id = uri.item_id)
  WHERE uri.user_id = public.get_user_id()

  UNION ALL
  -- Add playlists created by the user that are not in user_reference_items
  SELECT
    p.id,
    p.name,
    u.user_id as related_id,
    u.user_name as related_name,
    p.cover_url,
    'create'::public.media_source_type,
    'playlist'::public.media_item_type,
    p.is_public,
    p.created_at
  FROM public.playlist p
  JOIN public.users u ON u.user_id = p.user_id
  WHERE p.user_id = public.get_user_id()
    AND NOT EXISTS (
      SELECT 1 FROM public.user_reference_items uri2
      WHERE uri2.user_id = public.get_user_id()
        AND uri2.item_type = 'playlist'
        AND uri2.item_id = p.id
    )
  ORDER BY created_at DESC;
END;
$$;


ALTER FUNCTION "public"."get_user_library"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_page"("p_user_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  playlists_section JSONB;
  profile_section JSONB;
  user_data JSONB;
BEGIN
  -- Public playlists created by the user (limit 8, newest first)
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'related_id', p.user_id,
      'related_name', p.user_name,
      'cover_url', p.cover_url,
      'is_official', (p.user_id = public.get_official_id()),
      'type', 'playlist'
    )
  )
  INTO playlists_section
  FROM (
    SELECT p.*, u.user_name
    FROM public.playlist p
    JOIN public.users u ON u.user_id = p.user_id
    WHERE p.user_id = p_user_id
      AND p.is_public = TRUE
    ORDER BY p.created_at DESC
    LIMIT 8
  ) p;

  -- Profile section
  SELECT jsonb_build_object(
    'id', u.user_id,
    'name', u.user_name,
    'related_id', u.user_id,
    'related_name', u.user_name,
    'cover_url', u.cover_url,
    'is_official', (p_user_id = public.get_official_id()),
    'type', 'profile'
  )
  INTO profile_section
  FROM public.users u
  WHERE u.user_id = p_user_id;

  -- Final User Data Structure
  user_data := jsonb_build_object(
    'profile', profile_section,
    'playlists', COALESCE(playlists_section, '[]'::JSONB)
  );

  RETURN user_data;
END;
$$;


ALTER FUNCTION "public"."get_user_page"("p_user_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_playlist_profile"("p_user_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  playlists_section JSONB;
BEGIN
  -- Public playlists created by the user (newest first)
  SELECT jsonb_agg(
           jsonb_build_object(
             'id', p.id,
             'name', p.name,
             'related_id', p.user_id,
             'related_name', p.user_name,
             'cover_url', p.cover_url,
             'type', 'playlist'
           )
         )
  INTO playlists_section
  FROM (
    SELECT p.*, u.user_name
    FROM public.playlist p
    JOIN public.users u ON u.user_id = p.user_id
    WHERE p.user_id = p_user_id
      AND p.is_public = TRUE
    ORDER BY p.created_at DESC
  ) p;

  RETURN jsonb_build_object(
    'result', COALESCE(playlists_section, '[]'::JSONB)
  );
END;
$$;


ALTER FUNCTION "public"."get_user_playlist_profile"("p_user_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."getlikedid"() RETURNS TABLE("id" "uuid")
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  RETURN QUERY
    SELECT l.song_id as id
    FROM public.likes l
    WHERE l.user_id = public.get_user_id();
END;
$$;


ALTER FUNCTION "public"."getlikedid"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
  full_name text;
begin
  full_name := trim(both ' ' from (new.raw_user_meta_data ->> 'display_name'));
  -- Insert into public.users table
  insert into public.users (user_id, user_name, user_email)
  values (new.id, full_name, new.email);
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_daily_song_play_counts"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN

INSERT INTO public.daily_song_play_counts (day_date, song_id, play_count)
SELECT
    day_start AS day_date,
    song_id,
    SUM(play_count) AS play_count
FROM public.user_song_plays
WHERE day_start = date_trunc('day', now()) - interval '1 day'
GROUP BY day_start, song_id
ON CONFLICT (day_date, song_id)
DO UPDATE
    SET play_count = public.daily_song_play_counts.play_count + EXCLUDED.play_count;

END;
$$;


ALTER FUNCTION "public"."insert_daily_song_play_counts"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_playlist"("playlist_name" "text", "p_is_public" boolean) RETURNS TABLE("id" "text", "name" "text", "related_id" "text", "related_name" "text", "cover_url" "text", "source" "public"."media_source_type", "type" "public"."media_item_type", "is_public" boolean, "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  -- Insert the playlist
  INSERT INTO public.playlist (name, user_id , is_public)
  VALUES (playlist_name, public.get_user_id() , p_is_public);

  -- Return the full updated user library (reuse your get_user_library function here)
  RETURN QUERY SELECT * FROM public.get_user_library();
END;
$$;


ALTER FUNCTION "public"."insert_playlist"("playlist_name" "text", "p_is_public" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_playlist_with_songs"("playlist_name" "text", "song_ids" bigint[]) RETURNS TABLE("id" "text", "name" "text")
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  new_playlist public.playlist%ROWTYPE;
BEGIN
  INSERT INTO public.playlist (name, user_id)
  VALUES (playlist_name, (SELECT public.get_user_id()))
  RETURNING * INTO new_playlist;

  INSERT INTO public.playlist_songs (playlist_id, song_id)
  SELECT new_playlist.id, unnest(song_ids);

  RETURN QUERY
  SELECT new_playlist.id, new_playlist.name;
END;
$$;


ALTER FUNCTION "public"."insert_playlist_with_songs"("playlist_name" "text", "song_ids" bigint[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_song_with_refs"("p_url" "text", "p_name" "text", "p_duration" double precision, "p_embedding" "extensions"."vector", "p_song_album" "text", "p_song_cover" "text", "p_artists" "json") RETURNS "text"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  inserted_id UUID;
  album_id TEXT;
  artist JSON;
  artist_id TEXT;
  role TEXT;
BEGIN
  -- Get album ID by title
  SELECT id INTO album_id FROM public.album WHERE title = p_song_album;

  -- Insert the song
  INSERT INTO public.song (
    url, name, duration, embedding, album_id, cover_url
  ) VALUES (
    p_url, p_name, p_duration, p_embedding, album_id, p_song_cover
  )
  RETURNING id INTO inserted_id;

  -- Insert artist(s) into song_artists
  FOR artist IN SELECT * FROM json_array_elements(p_artists)
  LOOP
    artist_id := artist->>'artist_id';
    role := artist->>'role';
    INSERT INTO public.song_artists (song_id, artist_id, role)
    VALUES (inserted_id, artist_id, role);
  END LOOP;

  RETURN inserted_id::TEXT;
END;
$$;


ALTER FUNCTION "public"."insert_song_with_refs"("p_url" "text", "p_name" "text", "p_duration" double precision, "p_embedding" "extensions"."vector", "p_song_album" "text", "p_song_cover" "text", "p_artists" "json") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_weekly_list_play_counts"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN

INSERT INTO public.weekly_list_play_counts (week_start, item_id, play_count, item_type)
SELECT
    r.week_start,
    r.item_id,
    SUM(COALESCE(r.play_count, 1)) AS play_count,
    r.type AS item_type
FROM public.recently_played_list r
LEFT JOIN public.playlist p
    ON r.item_id = p.id AND r.type = 'playlist'  -- join only if type is playlist
WHERE
    r.week_start = date_trunc('week', now() - interval '1 day')
    AND (r.type != 'playlist' OR (r.type = 'playlist' AND p.is_public = true))
GROUP BY r.week_start, r.item_id, r.type
ON CONFLICT (week_start, item_id) DO UPDATE
    SET play_count = public.weekly_list_play_counts.play_count + EXCLUDED.play_count;

END;
$$;


ALTER FUNCTION "public"."insert_weekly_list_play_counts"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_playlist_owner"("playlist_id" "text") RETURNS boolean
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.playlist p
    WHERE p.id = playlist_id
      AND p.user_id = public.get_user_id()
  );
$$;


ALTER FUNCTION "public"."is_playlist_owner"("playlist_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_playlist_public"("playlist_id" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.playlist
    WHERE id = playlist_id
      AND is_public = true
  );
END;
$$;


ALTER FUNCTION "public"."is_playlist_public"("playlist_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."mark_playlist_embedding_dirty"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
    UPDATE public.playlist
    SET embedding_dirty = true
    WHERE id = COALESCE(NEW.playlist_id, OLD.playlist_id);

    RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."mark_playlist_embedding_dirty"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."removelike"("song_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  DELETE FROM public.likes l
  WHERE l.user_id = public.get_user_id()
    AND l.song_id = removeLike.song_id;
END;
$$;


ALTER FUNCTION "public"."removelike"("song_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."search_all"("query" "text") RETURNS TABLE("id" "text", "name" "text", "type" "text")
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  RETURN QUERY
  WITH combined AS (
    SELECT s.id::text, s.name, 'track' AS type
    FROM public.song s
    UNION ALL
    SELECT a.id::text, a.title AS name, 'album' AS type
    FROM public.album a
    UNION ALL
    SELECT u.user_id::text, u.user_name AS name, 'profile' AS type
    FROM public.users u
    UNION ALL
    SELECT p.id::text, p.name, 'playlist' AS type
    FROM public.playlist p
    UNION ALL
    SELECT ar.id::text, ar.name, 'artist' AS type
    FROM public.artist ar
  ),
  strict_match AS (
    SELECT c.id, c.name, c.type
    FROM combined c
    WHERE c.name OPERATOR(extensions.&^) query
    LIMIT 8
  ),
  strict_count AS (
    SELECT count(*) AS count FROM strict_match
  )
  SELECT sm.id, sm.name, sm.type FROM strict_match sm
  UNION ALL
  SELECT c.id, c.name, c.type
  FROM combined c
  WHERE (SELECT count FROM strict_count) < 8
    AND c.name OPERATOR(extensions.&@~) query
    AND NOT EXISTS (
      SELECT 1
      FROM strict_match sm
      WHERE sm.id = c.id AND sm.type = c.type
    )
  LIMIT 8;
END;
$$;


ALTER FUNCTION "public"."search_all"("query" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."search_dropdown"("query" "text") RETURNS "public"."search_dropdown_result"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  matched_songs jsonb;
  matched_albums jsonb;
  matched_artists jsonb;
  matched_playlists jsonb;
  matched_profiles jsonb;
  top_result jsonb;
  song_strict_count int := 0;
  album_strict_count int := 0;
  artist_strict_count int := 0;
  playlist_strict_count int := 0;
  profile_strict_count int := 0;
  song_pri int;
  album_pri int;
  artist_pri int;
  playlist_pri int;
  profile_pri int;
  min_priority int := 9999;
  min_category_rank int := 999;
BEGIN
  -------------------
  -- Songs
  -------------------
  WITH strict_match AS (
    SELECT gen_random_uuid() as id, s.name, s.url, s.cover_url, s.duration, s.is_lyric,
           s.id as song_id,
           'track'::text AS type,
           (
             SELECT json_agg(json_build_object('id', a.id, 'name', a.name, 'role', sa.role)
                             ORDER BY CASE WHEN sa.role='main' THEN 0 WHEN sa.role='feat' THEN 1 ELSE 2 END, a.name)
             FROM public.song_artists sa
             JOIN public.artist a ON a.id = sa.artist_id
             WHERE sa.song_id = s.id
           ) AS artists,
           json_build_object('id', al.id, 'name', al.title) AS album
    FROM public.song s
    LEFT JOIN public.album al ON al.id = s.album_id
    WHERE s.name OPERATOR(extensions.&^) query
    LIMIT 4
  ),
  strict_count AS (
    SELECT COUNT(*) AS c FROM strict_match
  ),
  combined AS (
    SELECT * FROM strict_match
    UNION ALL
    SELECT gen_random_uuid() as id, s.name, s.url, s.cover_url, s.duration, s.is_lyric,
           s.id as song_id,
           'track'::text AS type,
           (
             SELECT json_agg(json_build_object('id', a.id, 'name', a.name, 'role', sa.role)
                             ORDER BY CASE WHEN sa.role='main' THEN 0 WHEN sa.role='feat' THEN 1 ELSE 2 END, a.name)
             FROM public.song_artists sa
             JOIN public.artist a ON a.id = sa.artist_id
             WHERE sa.song_id = s.id
           ) AS artists,
           json_build_object('id', al.id, 'name', al.title) AS album
    FROM public.song s
    LEFT JOIN public.album al ON al.id = s.album_id
    WHERE s.name OPERATOR(extensions.&@~) query
      AND (SELECT c FROM strict_count) < 4
      AND NOT EXISTS (SELECT 1 FROM strict_match sm WHERE sm.song_id = s.id)
    LIMIT 4
  )
  SELECT
    (SELECT jsonb_agg(row_to_json(c)::jsonb) FROM combined c),
    (SELECT c FROM strict_count)
  INTO matched_songs, song_strict_count;

  song_pri := CASE WHEN song_strict_count > 0 THEN 1 WHEN jsonb_array_length(matched_songs) > 0 THEN 2 ELSE 9999 END;

  -------------------
  -- Albums
  -------------------
  WITH strict_match AS (
    SELECT al.id, al.cover_url, al.title AS name, ar.id AS related_id, ar.name AS related_name,
           'album'::text AS type
    FROM public.album al
    JOIN public.artist ar ON ar.id = al.artist_id
    WHERE al.title OPERATOR(extensions.&^) query
    LIMIT 4
  ),
  strict_count AS (
    SELECT COUNT(*) AS c FROM strict_match
  ),
  combined AS (
    SELECT * FROM strict_match
    UNION ALL
    SELECT al.id, al.cover_url, al.title AS name, ar.id AS related_id, ar.name AS related_name,
           'album'::text AS type
    FROM public.album al
    JOIN public.artist ar ON ar.id = al.artist_id
    WHERE al.title OPERATOR(extensions.&@~) query
      AND (SELECT c FROM strict_count) < 4
      AND NOT EXISTS (SELECT 1 FROM strict_match sm WHERE sm.id = al.id)
    LIMIT 4
  )
  SELECT
    (SELECT jsonb_agg(row_to_json(c)::jsonb) FROM combined c),
    (SELECT c FROM strict_count)
  INTO matched_albums, album_strict_count;

  album_pri := CASE WHEN album_strict_count > 0 THEN 1 WHEN jsonb_array_length(matched_albums) > 0 THEN 2 ELSE 9999 END;

  -------------------
  -- Artists
  -------------------
  WITH strict_match AS (
    SELECT ar.id, ar.cover_url, ar.name, ar.id as related_id, ar.name as related_name,
           'artist'::text AS type
    FROM public.artist ar
    WHERE ar.name OPERATOR(extensions.&^) query
    LIMIT 4
  ),
  strict_count AS (
    SELECT COUNT(*) AS c FROM strict_match
  ),
  combined AS (
    SELECT * FROM strict_match
    UNION ALL
    SELECT ar.id, ar.cover_url, ar.name, ar.id as related_id, ar.name as related_name,
           'artist'::text AS type
    FROM public.artist ar
    WHERE ar.name OPERATOR(extensions.&@~) query
      AND (SELECT c FROM strict_count) < 4
      AND NOT EXISTS (SELECT 1 FROM strict_match sm WHERE sm.id = ar.id)
    LIMIT 4
  )
  SELECT
    (SELECT jsonb_agg(row_to_json(c)::jsonb) FROM combined c),
    (SELECT c FROM strict_count)
  INTO matched_artists, artist_strict_count;

  artist_pri := CASE WHEN artist_strict_count > 0 THEN 1 WHEN jsonb_array_length(matched_artists) > 0 THEN 2 ELSE 9999 END;

  -------------------
  -- Playlists
  -------------------
  WITH strict_match AS (
    SELECT p.id, p.cover_url, p.name, u.user_id AS related_id, u.user_name AS related_name,
           'playlist'::text AS type
    FROM public.playlist p
    JOIN public.users u ON u.user_id = p.user_id
    WHERE p.name OPERATOR(extensions.&^) query
    LIMIT 4
  ),
  strict_count AS (
    SELECT COUNT(*) AS c FROM strict_match
  ),
  combined AS (
    SELECT * FROM strict_match
    UNION ALL
    SELECT p.id, p.cover_url, p.name, u.user_id AS related_id, u.user_name AS related_name,
           'playlist'::text AS type
    FROM public.playlist p
    JOIN public.users u ON u.user_id = p.user_id
    WHERE p.name OPERATOR(extensions.&@~) query
      AND (SELECT c FROM strict_count) < 4
      AND NOT EXISTS (SELECT 1 FROM strict_match sm WHERE sm.id = p.id)
    LIMIT 4
  )
  SELECT
    (SELECT jsonb_agg(row_to_json(c)::jsonb) FROM combined c),
    (SELECT c FROM strict_count)
  INTO matched_playlists, playlist_strict_count;

  playlist_pri := CASE WHEN playlist_strict_count > 0 THEN 1 WHEN jsonb_array_length(matched_playlists) > 0 THEN 2 ELSE 9999 END;

  -------------------
  -- Profiles
  -------------------
  WITH strict_match AS (
    SELECT user_id AS id, cover_url, user_name AS name, user_id AS related_id, user_name AS related_name,
           'profile'::text AS type
    FROM public.users
    WHERE user_name OPERATOR(extensions.&^) query
    LIMIT 4
  ),
  strict_count AS (
    SELECT COUNT(*) AS c FROM strict_match
  ),
  combined AS (
    SELECT * FROM strict_match
    UNION ALL
    SELECT user_id AS id, cover_url, user_name AS name, user_id AS related_id, user_name AS related_name,
           'profile'::text AS type
    FROM public.users
    WHERE user_name OPERATOR(extensions.&@~) query
      AND (SELECT c FROM strict_count) < 4
      AND NOT EXISTS (SELECT 1 FROM strict_match sm WHERE sm.id = user_id)
    LIMIT 4
  )
  SELECT
    (SELECT jsonb_agg(row_to_json(c)::jsonb) FROM combined c),
    (SELECT c FROM strict_count)
  INTO matched_profiles, profile_strict_count;

  profile_pri := CASE WHEN profile_strict_count > 0 THEN 1 WHEN jsonb_array_length(matched_profiles) > 0 THEN 2 ELSE 9999 END;

  -------------------
  -- Top Result Calculation
  -------------------
  top_result := NULL;

  IF matched_songs IS NOT NULL AND jsonb_array_length(matched_songs) > 0 THEN
    IF song_pri < min_priority OR (song_pri = min_priority AND 1 < min_category_rank) THEN
      top_result := matched_songs->0; min_priority := song_pri; min_category_rank := 1;
    END IF;
  END IF;
  IF matched_albums IS NOT NULL AND jsonb_array_length(matched_albums) > 0 THEN
    IF album_pri < min_priority OR (album_pri = min_priority AND 2 < min_category_rank) THEN
      top_result := matched_albums->0; min_priority := album_pri; min_category_rank := 2;
    END IF;
  END IF;
  IF matched_artists IS NOT NULL AND jsonb_array_length(matched_artists) > 0 THEN
    IF artist_pri < min_priority OR (artist_pri = min_priority AND 3 < min_category_rank) THEN
      top_result := matched_artists->0; min_priority := artist_pri; min_category_rank := 3;
    END IF;
  END IF;
  IF matched_playlists IS NOT NULL AND jsonb_array_length(matched_playlists) > 0 THEN
    IF playlist_pri < min_priority OR (playlist_pri = min_priority AND 4 < min_category_rank) THEN
      top_result := matched_playlists->0; min_priority := playlist_pri; min_category_rank := 4;
    END IF;
  END IF;
  IF matched_profiles IS NOT NULL AND jsonb_array_length(matched_profiles) > 0 THEN
    IF profile_pri < min_priority OR (profile_pri = min_priority AND 5 < min_category_rank) THEN
      top_result := matched_profiles->0; min_priority := profile_pri; min_category_rank := 5;
    END IF;
  END IF;

  -------------------
  -- Return clean result
  -------------------
  RETURN (
    top_result,
    COALESCE(matched_songs, '[]'::jsonb),
    COALESCE(matched_albums, '[]'::jsonb),
    COALESCE(matched_artists, '[]'::jsonb),
    COALESCE(matched_playlists, '[]'::jsonb),
    COALESCE(matched_profiles, '[]'::jsonb)
  );
END;
$$;


ALTER FUNCTION "public"."search_dropdown"("query" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_user_song_play_day_start"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  NEW.day_start := date_trunc('day', NEW.played_at)::date;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_user_song_play_day_start"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_week_start"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  NEW.week_start := date_trunc('week', NEW.played_at)::date;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_week_start"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_playlist_cover"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
BEGIN
  ------------------------------------------------------------------
  -- SONG ADDED TO PLAYLIST
  ------------------------------------------------------------------
  IF TG_OP = 'INSERT' THEN
    -- Set playlist cover only if it doesn't already have one
    UPDATE public.playlist p
    SET cover_url = (
      SELECT s.cover_url
      FROM public.song s
      WHERE s.id = NEW.song_id
      LIMIT 1
    )
    WHERE p.id = NEW.playlist_id
      AND p.cover_url IS NULL
      AND p.user_id <> public.get_official_id(); -- ignore official playlists
    RETURN NEW;
  END IF;

  ------------------------------------------------------------------
  -- SONG REMOVED FROM PLAYLIST
  ------------------------------------------------------------------
  IF TG_OP = 'DELETE' THEN
    -- Replace cover with earliest remaining song
    UPDATE public.playlist p
    SET cover_url = (
      SELECT s.cover_url
      FROM public.song s
      JOIN public.playlist_songs ps ON ps.song_id = s.id
      WHERE ps.playlist_id = OLD.playlist_id
      ORDER BY ps.created_at ASC
      LIMIT 1
    )
    WHERE p.id = OLD.playlist_id
      AND p.id <> public.get_official_id();

    -- If playlist is empty → remove cover
    UPDATE public.playlist p
    SET cover_url = NULL
    WHERE p.id = OLD.playlist_id
      AND NOT EXISTS (
        SELECT 1
        FROM public.playlist_songs ps
        WHERE ps.playlist_id = OLD.playlist_id
      );
    RETURN OLD;
  END IF;

  RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."update_playlist_cover"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_user_embedding_list"("p_type" "text", "p_id" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $_$
DECLARE
    new_avg extensions.vector;
    col_name text;
BEGIN
    IF p_type = 'artist' THEN
        col_name := 'artist_embedding';
    ELSIF p_type = 'album' THEN
        col_name := 'album_embedding';
    ELSIF p_type = 'playlist' THEN
        col_name := 'playlist_embedding';
    ELSE
        RAISE EXCEPTION 'Unknown embedding type: %', p_type;
    END IF;

    EXECUTE format(
        'SELECT extensions.avg(e)::extensions.vector
         FROM (
             SELECT u.%I AS e
             FROM public.users u
             WHERE u.user_id = public.get_user_id()
               AND u.%I IS NOT NULL
             UNION ALL
             SELECT t.embedding
             FROM public.%I t
             WHERE t.id::text = $1
               AND t.embedding IS NOT NULL
         ) t',
        col_name, col_name, p_type
    )
    INTO new_avg
    USING p_id;

    IF new_avg IS NOT NULL THEN
        EXECUTE format(
            'UPDATE public.users
             SET %I = $1
             WHERE user_id = public.get_user_id()',
            col_name
        )
        USING new_avg;
    END IF;
END;
$_$;


ALTER FUNCTION "public"."update_user_embedding_list"("p_type" "text", "p_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_user_song_embedding"("p_song_ids" "uuid"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
DECLARE
  new_avg_embedding extensions.vector;
BEGIN
  SELECT extensions.avg(e)::extensions.vector
  INTO new_avg_embedding
  FROM (
    SELECT u.song_embedding AS e
    FROM public.users u
    WHERE u.user_id = public.get_user_id()
      AND u.song_embedding IS NOT NULL
    UNION ALL
    SELECT s.embedding
    FROM public.song s
    WHERE s.id = ANY(p_song_ids)
      AND s.embedding IS NOT NULL
  ) t;

  IF new_avg_embedding IS NOT NULL THEN
    UPDATE public.users
    SET song_embedding = new_avg_embedding
    WHERE user_id = public.get_user_id();
  END IF;
END;
$$;


ALTER FUNCTION "public"."update_user_song_embedding"("p_song_ids" "uuid"[]) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."album" (
    "id" "text" DEFAULT "left"("replace"("replace"("encode"("extensions"."gen_random_bytes"(9), 'base64'::"text"), '/'::"text", ''::"text"), '+'::"text", ''::"text"), 12) NOT NULL,
    "title" "text" NOT NULL,
    "cover_url" "text",
    "release_date" "date",
    "artist_id" "text" NOT NULL,
    "embedding" "extensions"."vector"(384),
    "type" "text" DEFAULT 'album'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "album_type_check" CHECK (("type" = ANY (ARRAY['album'::"text", 'single'::"text", 'ep'::"text"])))
);


ALTER TABLE "public"."album" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."artist" (
    "id" "text" DEFAULT "left"("replace"("replace"("encode"("extensions"."gen_random_bytes"(9), 'base64'::"text"), '/'::"text", ''::"text"), '+'::"text", ''::"text"), 12) NOT NULL,
    "name" "text" NOT NULL,
    "cover_url" "text",
    "embedding" "extensions"."vector"(384),
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."artist" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."daily_song_play_counts" (
    "day_date" "date" NOT NULL,
    "play_count" bigint DEFAULT 0,
    "song_id" "uuid" NOT NULL
);


ALTER TABLE "public"."daily_song_play_counts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."genres" (
    "id" "text" DEFAULT "left"("replace"("replace"("encode"("extensions"."gen_random_bytes"(9), 'base64'::"text"), '/'::"text", ''::"text"), '+'::"text", ''::"text"), 12) NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."genres" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."likes" (
    "id" "uuid" DEFAULT "extensions"."gen_random_uuid"() NOT NULL,
    "user_id" "text" NOT NULL,
    "song_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."likes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."lyric" (
    "song_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "lyric_data" "jsonb" NOT NULL
);


ALTER TABLE "public"."lyric" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."moods" (
    "id" "text" DEFAULT "left"("replace"("replace"("encode"("extensions"."gen_random_bytes"(9), 'base64'::"text"), '/'::"text", ''::"text"), '+'::"text", ''::"text"), 12) NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."moods" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."playlist" (
    "id" "text" DEFAULT "left"("replace"("replace"("encode"("extensions"."gen_random_bytes"(9), 'base64'::"text"), '/'::"text", ''::"text"), '+'::"text", ''::"text"), 12) NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "user_id" "text",
    "is_public" boolean DEFAULT true NOT NULL,
    "cover_url" "text",
    "embedding" "extensions"."vector"(384),
    "embedding_dirty" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."playlist" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."playlist_genres" (
    "playlist_id" "text" NOT NULL,
    "genre_id" "text" NOT NULL
);


ALTER TABLE "public"."playlist_genres" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."playlist_moods" (
    "playlist_id" "text" NOT NULL,
    "mood_id" "text" NOT NULL
);


ALTER TABLE "public"."playlist_moods" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."playlist_songs" (
    "playlist_id" "text" NOT NULL,
    "song_id" "uuid",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."playlist_songs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."recently_played_list" (
    "id" bigint NOT NULL,
    "user_id" "text" DEFAULT ''::"text" NOT NULL,
    "item_id" "text" NOT NULL,
    "played_at" timestamp with time zone DEFAULT "now"(),
    "type" "public"."media_item_type" NOT NULL,
    "play_count" bigint,
    "week_start" "date" NOT NULL
);


ALTER TABLE "public"."recently_played_list" OWNER TO "postgres";


ALTER TABLE "public"."recently_played_list" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."recently_played_list_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."song" (
    "url" "text" NOT NULL,
    "name" "text" NOT NULL,
    "duration" double precision NOT NULL,
    "embedding" "extensions"."vector"(384),
    "album_id" "text",
    "cover_url" "text",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "is_lyric" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."song" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."song_artists" (
    "artist_id" "text" NOT NULL,
    "role" "text" NOT NULL,
    "song_id" "uuid",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    CONSTRAINT "song_artists_role_check" CHECK (("role" = ANY (ARRAY['main'::"text", 'featured'::"text"])))
);


ALTER TABLE "public"."song_artists" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_reference_items" (
    "user_id" "text" NOT NULL,
    "item_id" "text" NOT NULL,
    "item_type" "public"."media_item_type" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_reference_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_song_plays" (
    "user_id" "text" NOT NULL,
    "played_at" timestamp with time zone DEFAULT "now"(),
    "song_id" "uuid" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "play_count" bigint,
    "day_start" "date" NOT NULL
);


ALTER TABLE "public"."user_song_plays" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "user_id" "text" NOT NULL,
    "user_name" "text",
    "user_email" "text",
    "song_embedding" "extensions"."vector"(384),
    "artist_embedding" "extensions"."vector"(384),
    "album_embedding" "extensions"."vector"(384),
    "playlist_embedding" "extensions"."vector"(384),
    "cover_url" "text"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."weekly_list_play_counts" (
    "week_start" "date" DEFAULT "now"() NOT NULL,
    "item_id" "text" NOT NULL,
    "play_count" bigint DEFAULT 0,
    "item_type" "public"."media_item_type"
);


ALTER TABLE "public"."weekly_list_play_counts" OWNER TO "postgres";


ALTER TABLE ONLY "public"."album"
    ADD CONSTRAINT "album_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."artist"
    ADD CONSTRAINT "artist_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."daily_song_play_counts"
    ADD CONSTRAINT "daily_song_play_counts_pkey" PRIMARY KEY ("song_id", "day_date");



ALTER TABLE ONLY "public"."genres"
    ADD CONSTRAINT "genres_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."genres"
    ADD CONSTRAINT "genres_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_user_song_unique" UNIQUE ("user_id", "song_id");



ALTER TABLE ONLY "public"."lyric"
    ADD CONSTRAINT "lyric_pkey" PRIMARY KEY ("song_id");



ALTER TABLE ONLY "public"."moods"
    ADD CONSTRAINT "moods_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."moods"
    ADD CONSTRAINT "moods_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."playlist_genres"
    ADD CONSTRAINT "playlist_genres_pkey" PRIMARY KEY ("playlist_id", "genre_id");



ALTER TABLE ONLY "public"."playlist_moods"
    ADD CONSTRAINT "playlist_moods_pkey" PRIMARY KEY ("playlist_id", "mood_id");



ALTER TABLE ONLY "public"."playlist_songs"
    ADD CONSTRAINT "playlist_songs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."playlist"
    ADD CONSTRAINT "playlists_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."recently_played_list"
    ADD CONSTRAINT "recently_played_list_pkey" PRIMARY KEY ("user_id", "item_id", "type", "week_start");



ALTER TABLE ONLY "public"."song_artists"
    ADD CONSTRAINT "song_artists_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."song"
    ADD CONSTRAINT "song_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."artist"
    ADD CONSTRAINT "unique_artist_name" UNIQUE ("name");



ALTER TABLE ONLY "public"."user_reference_items"
    ADD CONSTRAINT "user_reference_items_pkey" PRIMARY KEY ("user_id", "item_id", "item_type");



ALTER TABLE ONLY "public"."user_song_plays"
    ADD CONSTRAINT "user_song_plays_pkey" PRIMARY KEY ("user_id", "song_id", "day_start");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id", "user_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."weekly_list_play_counts"
    ADD CONSTRAINT "weekly_list_play_counts_pkey" PRIMARY KEY ("week_start", "item_id");



CREATE INDEX "album_created_at_idx" ON "public"."album" USING "btree" ("created_at" DESC);



CREATE INDEX "album_embedding_idx" ON "public"."album" USING "hnsw" ("embedding" "extensions"."vector_cosine_ops");



CREATE INDEX "album_title_pgroonga_idx" ON "public"."album" USING "pgroonga" ("title");



CREATE INDEX "artist_created_at_idx" ON "public"."artist" USING "btree" ("created_at" DESC);



CREATE INDEX "artist_embedding_idx" ON "public"."artist" USING "hnsw" ("embedding" "extensions"."vector_cosine_ops");



CREATE INDEX "artist_name_pgroonga_idx" ON "public"."artist" USING "pgroonga" ("name");



CREATE INDEX "idx_album_artist_id" ON "public"."album" USING "btree" ("artist_id");



CREATE INDEX "idx_likes_song_id" ON "public"."likes" USING "btree" ("song_id");



CREATE INDEX "idx_likes_user_id_created_at" ON "public"."likes" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "idx_playlist_genres_genre_id" ON "public"."playlist_genres" USING "btree" ("genre_id");



CREATE INDEX "idx_playlist_id" ON "public"."playlist_songs" USING "btree" ("playlist_id");



CREATE INDEX "idx_playlist_moods_mood_id" ON "public"."playlist_moods" USING "btree" ("mood_id");



CREATE INDEX "idx_playlist_songs_song_id" ON "public"."playlist_songs" USING "btree" ("song_id");



CREATE INDEX "idx_playlists_user_id" ON "public"."playlist" USING "btree" ("user_id");



CREATE INDEX "idx_recently_played_played_at" ON "public"."recently_played_list" USING "btree" ("played_at");



CREATE INDEX "idx_recently_user_played" ON "public"."recently_played_list" USING "btree" ("user_id", "played_at" DESC);



CREATE INDEX "idx_song_album_id" ON "public"."song" USING "btree" ("album_id");



CREATE INDEX "idx_song_artists_artist_id" ON "public"."song_artists" USING "btree" ("artist_id");



CREATE INDEX "idx_song_artists_role" ON "public"."song_artists" USING "btree" ("role");



CREATE INDEX "idx_song_artists_song_id" ON "public"."song_artists" USING "btree" ("song_id");



CREATE INDEX "idx_user_reference_items_created_at" ON "public"."user_reference_items" USING "btree" ("created_at");



CREATE INDEX "idx_user_reference_items_item_type" ON "public"."user_reference_items" USING "btree" ("item_type");



CREATE INDEX "idx_user_reference_items_user_id_item_type" ON "public"."user_reference_items" USING "btree" ("user_id", "item_type");



CREATE INDEX "idx_user_song_plays_played_at" ON "public"."user_song_plays" USING "btree" ("played_at");



CREATE INDEX "idx_user_song_plays_song_id" ON "public"."user_song_plays" USING "btree" ("song_id");



CREATE INDEX "playlist_embedding_idx" ON "public"."users" USING "hnsw" ("playlist_embedding" "extensions"."vector_cosine_ops");



CREATE INDEX "playlist_official_created_at_idx" ON "public"."playlist" USING "btree" ("user_id", "created_at" DESC);



CREATE INDEX "playlists_name_pgroonga_idx" ON "public"."playlist" USING "pgroonga" ("name");



CREATE INDEX "song_created_at_idx" ON "public"."song" USING "btree" ("created_at" DESC);



CREATE INDEX "song_embedding_idx" ON "public"."song" USING "hnsw" ("embedding" "extensions"."vector_cosine_ops");



CREATE INDEX "songs_name_pgroonga_idx" ON "public"."song" USING "pgroonga" ("name");



CREATE INDEX "user_name_pgroonga_idx" ON "public"."users" USING "pgroonga" ("user_name");



CREATE OR REPLACE TRIGGER "playlist_songs_delete_trigger" AFTER DELETE ON "public"."playlist_songs" FOR EACH ROW EXECUTE FUNCTION "public"."update_playlist_cover"();



CREATE OR REPLACE TRIGGER "playlist_songs_insert_trigger" AFTER INSERT ON "public"."playlist_songs" FOR EACH ROW EXECUTE FUNCTION "public"."update_playlist_cover"();



CREATE OR REPLACE TRIGGER "trg_delete_recently_album" AFTER DELETE ON "public"."album" FOR EACH ROW EXECUTE FUNCTION "public"."delete_recently_played_album"();



CREATE OR REPLACE TRIGGER "trg_delete_recently_artist" AFTER DELETE ON "public"."artist" FOR EACH ROW EXECUTE FUNCTION "public"."delete_recently_played_artist"();



CREATE OR REPLACE TRIGGER "trg_delete_recently_playlist" AFTER DELETE ON "public"."playlist" FOR EACH ROW EXECUTE FUNCTION "public"."delete_recently_played_playlist"();



CREATE OR REPLACE TRIGGER "trg_playlist_embedding_dirty" AFTER INSERT OR DELETE OR UPDATE ON "public"."playlist_songs" FOR EACH ROW EXECUTE FUNCTION "public"."mark_playlist_embedding_dirty"();



CREATE OR REPLACE TRIGGER "trg_set_user_song_play_day_start" BEFORE INSERT OR UPDATE ON "public"."user_song_plays" FOR EACH ROW EXECUTE FUNCTION "public"."set_user_song_play_day_start"();



CREATE OR REPLACE TRIGGER "trg_set_week_start" BEFORE INSERT OR UPDATE ON "public"."recently_played_list" FOR EACH ROW EXECUTE FUNCTION "public"."set_week_start"();



ALTER TABLE ONLY "public"."album"
    ADD CONSTRAINT "fk_album_artist" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."playlist_songs"
    ADD CONSTRAINT "fk_song_id" FOREIGN KEY ("song_id") REFERENCES "public"."song"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_song_plays"
    ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."recently_played_list"
    ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."song"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."likes"
    ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id");



ALTER TABLE ONLY "public"."lyric"
    ADD CONSTRAINT "lyric_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."song"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."playlist_genres"
    ADD CONSTRAINT "playlist_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."playlist_genres"
    ADD CONSTRAINT "playlist_genres_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."playlist_moods"
    ADD CONSTRAINT "playlist_moods_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "public"."moods"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."playlist_moods"
    ADD CONSTRAINT "playlist_moods_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."playlist_songs"
    ADD CONSTRAINT "playlist_songs_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."playlist"
    ADD CONSTRAINT "playlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id");



ALTER TABLE ONLY "public"."song"
    ADD CONSTRAINT "song_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "public"."album"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."song_artists"
    ADD CONSTRAINT "song_artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."song_artists"
    ADD CONSTRAINT "song_artists_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."song"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_reference_items"
    ADD CONSTRAINT "user_reference_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_song_plays"
    ADD CONSTRAINT "user_song_plays_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."song"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."daily_song_play_counts"
    ADD CONSTRAINT "weekly_song_play_counts_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "public"."song"("id") ON DELETE CASCADE;



CREATE POLICY "Enable delete for dash" ON "public"."artist" FOR DELETE TO "dashboard_user" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."album" FOR DELETE TO "dashboard_user" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."genres" FOR DELETE TO "dashboard_user" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."likes" FOR DELETE TO "authenticated" USING ((( SELECT "public"."get_user_id"() AS "get_user_id") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."moods" FOR DELETE TO "dashboard_user" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."playlist" FOR DELETE TO "authenticated" USING ((( SELECT "public"."get_user_id"() AS "get_user_id") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."playlist_genres" FOR DELETE TO "dashboard_user" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."playlist_moods" FOR DELETE TO "dashboard_user" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."song" FOR DELETE TO "dashboard_user", "service_role" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."song_artists" FOR DELETE TO "dashboard_user", "service_role" USING (true);



CREATE POLICY "Enable delete for users based on user_id" ON "public"."user_reference_items" FOR DELETE USING ((( SELECT "public"."get_user_id"() AS "get_user_id") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."users" FOR DELETE TO "authenticated" USING (( SELECT ("public"."get_user_id"() = "users"."user_id")));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."album" FOR INSERT TO "dashboard_user" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."moods" FOR INSERT TO "dashboard_user" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."playlist" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "public"."get_user_id"()));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."playlist_moods" FOR INSERT TO "dashboard_user" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."playlist_songs" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_playlist_owner"("playlist_id"));



CREATE POLICY "Enable insert for authenticated users only" ON "public"."song" FOR INSERT TO "dashboard_user", "service_role" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."user_reference_items" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_user_id"() = "user_id"));



CREATE POLICY "Enable insert for dash users only" ON "public"."artist" FOR INSERT TO "dashboard_user" WITH CHECK (true);



CREATE POLICY "Enable insert for dashboard users only" ON "public"."genres" FOR INSERT TO "dashboard_user" WITH CHECK (true);



CREATE POLICY "Enable insert for dashboard users only" ON "public"."playlist_genres" FOR INSERT TO "dashboard_user" WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."likes" FOR INSERT WITH CHECK (("public"."get_user_id"() = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."recently_played_list" FOR INSERT TO "authenticated" WITH CHECK (("public"."get_user_id"() = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."song_artists" FOR INSERT TO "dashboard_user", "service_role" WITH CHECK (true);



CREATE POLICY "Enable insert for users based on user_id" ON "public"."user_song_plays" FOR INSERT WITH CHECK (("public"."get_user_id"() = "user_id"));



CREATE POLICY "Enable read access for all users" ON "public"."album" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."artist" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."daily_song_play_counts" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."genres" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."likes" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."lyric" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."moods" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."playlist_genres" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."playlist_moods" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."playlist_songs" FOR SELECT USING (("public"."is_playlist_public"("playlist_id") OR "public"."is_playlist_owner"("playlist_id")));



CREATE POLICY "Enable read access for all users" ON "public"."song" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."song_artists" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."user_reference_items" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."user_song_plays" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."users" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."weekly_list_play_counts" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users with public true or own playli" ON "public"."playlist" FOR SELECT USING ((("is_public" = true) OR ("user_id" = "public"."get_user_id"())));



CREATE POLICY "Policy with table joins" ON "public"."moods" FOR UPDATE TO "dashboard_user" USING (true);



CREATE POLICY "Policy with table joins" ON "public"."playlist_genres" FOR UPDATE TO "dashboard_user" USING (true);



CREATE POLICY "Policy with table joins" ON "public"."playlist_moods" FOR UPDATE TO "dashboard_user" USING (true);



CREATE POLICY "Policy with table joins" ON "public"."song" FOR UPDATE TO "dashboard_user", "service_role" USING (true);



CREATE POLICY "Policy with table joins" ON "public"."song_artists" FOR UPDATE TO "dashboard_user", "service_role" USING (true);



CREATE POLICY "Policy with table joins" ON "public"."user_reference_items" FOR UPDATE USING ((( SELECT "public"."get_user_id"() AS "get_user_id") = "user_id"));



CREATE POLICY "Policy with table joins" ON "public"."user_song_plays" FOR UPDATE USING (( SELECT ("public"."get_user_id"() = "user_song_plays"."user_id")));



CREATE POLICY "Policy with table joins" ON "public"."users" FOR UPDATE USING (( SELECT ("public"."get_user_id"() = "users"."user_id")));



CREATE POLICY "Policy with table joins" ON "public"."weekly_list_play_counts" FOR UPDATE TO "postgres" USING (true);



ALTER TABLE "public"."album" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."artist" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."daily_song_play_counts" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "dash board" ON "public"."genres" FOR UPDATE TO "dashboard_user" USING (true);



CREATE POLICY "delete" ON "public"."lyric" FOR DELETE TO "service_role" USING (true);



CREATE POLICY "enable delete to authenticated user onlt" ON "public"."recently_played_list" FOR DELETE TO "authenticated" USING (("public"."get_user_id"() = "user_id"));



CREATE POLICY "enable update authen" ON "public"."recently_played_list" FOR UPDATE TO "authenticated" USING (("public"."get_user_id"() = "user_id"));



CREATE POLICY "enable update on user_id" ON "public"."playlist" FOR UPDATE TO "authenticated" USING ((( SELECT "public"."get_user_id"() AS "get_user_id") = "user_id"));



ALTER TABLE "public"."genres" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "insert" ON "public"."lyric" FOR INSERT TO "service_role" WITH CHECK (true);



CREATE POLICY "insert postgress" ON "public"."weekly_list_play_counts" FOR INSERT TO "postgres" WITH CHECK (true);



ALTER TABLE "public"."likes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."lyric" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."moods" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "only for update user" ON "public"."album" FOR UPDATE TO "dashboard_user" USING (true);



ALTER TABLE "public"."playlist" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."playlist_genres" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."playlist_moods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."playlist_songs" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "read all (for playlist only allow public and owns playlist)" ON "public"."recently_played_list" FOR SELECT TO "authenticated" USING ("public"."can_access_recently_played"("user_id", "item_id", "type"));



ALTER TABLE "public"."recently_played_list" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."song" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."song_artists" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "update" ON "public"."lyric" FOR UPDATE TO "service_role" USING (true);



CREATE POLICY "update on dashboard" ON "public"."artist" FOR UPDATE TO "dashboard_user" USING (true);



CREATE POLICY "user can delete their own playlist songs" ON "public"."playlist_songs" FOR DELETE TO "authenticated" USING ("public"."is_playlist_owner"("playlist_id"));



ALTER TABLE "public"."user_reference_items" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_song_plays" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."weekly_list_play_counts" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";








GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";













































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































GRANT ALL ON FUNCTION "public"."add_playlist_song"("p_id" "text", "s_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."add_playlist_song"("p_id" "text", "s_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_playlist_song"("p_id" "text", "s_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_recent_song"("p_song_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."add_recent_song"("p_song_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_recent_song"("p_song_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_recent_songs_batch"("p_songs" "jsonb", "p_user_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_recent_songs_batch"("p_songs" "jsonb", "p_user_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_recent_songs_batch"("p_songs" "jsonb", "p_user_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_recently_played"("p_item_id" "text", "p_type" "public"."media_item_type") TO "anon";
GRANT ALL ON FUNCTION "public"."add_recently_played"("p_item_id" "text", "p_type" "public"."media_item_type") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_recently_played"("p_item_id" "text", "p_type" "public"."media_item_type") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_recently_played_batch"("p_items" "jsonb", "p_user_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."add_recently_played_batch"("p_items" "jsonb", "p_user_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_recently_played_batch"("p_items" "jsonb", "p_user_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."add_to_library"("p_item_id" "text", "p_item_type" "public"."media_item_type") TO "anon";
GRANT ALL ON FUNCTION "public"."add_to_library"("p_item_id" "text", "p_item_type" "public"."media_item_type") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_to_library"("p_item_id" "text", "p_item_type" "public"."media_item_type") TO "service_role";



GRANT ALL ON FUNCTION "public"."addlike"("p_song_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."addlike"("p_song_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."addlike"("p_song_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."batch_update_playlist_embeddings"() TO "anon";
GRANT ALL ON FUNCTION "public"."batch_update_playlist_embeddings"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."batch_update_playlist_embeddings"() TO "service_role";



GRANT ALL ON FUNCTION "public"."can_access_recently_played"("p_user_id" "text", "p_item_id" "text", "p_type" "public"."media_item_type") TO "anon";
GRANT ALL ON FUNCTION "public"."can_access_recently_played"("p_user_id" "text", "p_item_id" "text", "p_type" "public"."media_item_type") TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_access_recently_played"("p_user_id" "text", "p_item_id" "text", "p_type" "public"."media_item_type") TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_playlist_song"("p_id" "text", "target_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_playlist_song"("p_id" "text", "target_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_playlist_song"("p_id" "text", "target_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_recently_played_album"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_recently_played_album"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_recently_played_album"() TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_recently_played_artist"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_recently_played_artist"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_recently_played_artist"() TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_recently_played_playlist"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_recently_played_playlist"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_recently_played_playlist"() TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_user_playlist_item"("p_item_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user_playlist_item"("p_item_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user_playlist_item"("p_item_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_user_reference_item"("refer_item_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_user_reference_item"("refer_item_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_user_reference_item"("refer_item_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."edit_playlist"("p_playlist_id" "text", "p_new_name" "text", "p_is_public" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."edit_playlist"("p_playlist_id" "text", "p_new_name" "text", "p_is_public" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."edit_playlist"("p_playlist_id" "text", "p_new_name" "text", "p_is_public" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."fake_user_generate_list_plays"() TO "anon";
GRANT ALL ON FUNCTION "public"."fake_user_generate_list_plays"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fake_user_generate_list_plays"() TO "service_role";



GRANT ALL ON FUNCTION "public"."fake_user_generate_song_plays"() TO "anon";
GRANT ALL ON FUNCTION "public"."fake_user_generate_song_plays"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."fake_user_generate_song_plays"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_album_direct"("p_album_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_album_direct"("p_album_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_album_direct"("p_album_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_album_page"("p_album_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_album_page"("p_album_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_album_page"("p_album_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_album_songs_queue"("p_album_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_album_songs_queue"("p_album_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_album_songs_queue"("p_album_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_artist_direct"("p_artist_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_artist_direct"("p_artist_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_artist_direct"("p_artist_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_artist_page"("p_artist_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_artist_page"("p_artist_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_artist_page"("p_artist_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_artist_songs_queue"("p_artist_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_artist_songs_queue"("p_artist_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_artist_songs_queue"("p_artist_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_discover_media_items"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_discover_media_items"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_discover_media_items"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_genre_page"("p_genre_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_genre_page"("p_genre_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_genre_page"("p_genre_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_last_created_playlists"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_last_created_playlists"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_last_created_playlists"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_last_liked_songs"("like_title" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_last_liked_songs"("like_title" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_last_liked_songs"("like_title" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_last_saved_albums"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_last_saved_albums"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_last_saved_albums"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_last_saved_artists"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_last_saved_artists"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_last_saved_artists"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_last_saved_playlists"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_last_saved_playlists"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_last_saved_playlists"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_library_overview"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_library_overview"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_library_overview"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_mood_page"("p_mood_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_mood_page"("p_mood_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_mood_page"("p_mood_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_newly"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_newly"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_newly"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_official_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_official_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_official_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_personalized_media_items"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_personalized_media_items"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_personalized_media_items"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_playlist_direct"("p_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_playlist_direct"("p_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_playlist_direct"("p_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_playlist_page"("p_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_playlist_page"("p_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_playlist_page"("p_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_playlist_songs_queue"("p_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_playlist_songs_queue"("p_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_playlist_songs_queue"("p_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_recent_list"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_recent_list"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_recent_list"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_recently_played"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_recently_played"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_recently_played"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_similar_songs"("input_song_id" "uuid", "similarity_threshold" double precision) TO "anon";
GRANT ALL ON FUNCTION "public"."get_similar_songs"("input_song_id" "uuid", "similarity_threshold" double precision) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_similar_songs"("input_song_id" "uuid", "similarity_threshold" double precision) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_song_track"("p_song_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_song_track"("p_song_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_song_track"("p_song_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_id"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_library"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_library"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_library"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_page"("p_user_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_page"("p_user_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_page"("p_user_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_playlist_profile"("p_user_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_playlist_profile"("p_user_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_playlist_profile"("p_user_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."getlikedid"() TO "anon";
GRANT ALL ON FUNCTION "public"."getlikedid"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."getlikedid"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."insert_daily_song_play_counts"() TO "anon";
GRANT ALL ON FUNCTION "public"."insert_daily_song_play_counts"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_daily_song_play_counts"() TO "service_role";



GRANT ALL ON FUNCTION "public"."insert_playlist"("playlist_name" "text", "p_is_public" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."insert_playlist"("playlist_name" "text", "p_is_public" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_playlist"("playlist_name" "text", "p_is_public" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."insert_playlist_with_songs"("playlist_name" "text", "song_ids" bigint[]) TO "anon";
GRANT ALL ON FUNCTION "public"."insert_playlist_with_songs"("playlist_name" "text", "song_ids" bigint[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_playlist_with_songs"("playlist_name" "text", "song_ids" bigint[]) TO "service_role";






GRANT ALL ON FUNCTION "public"."insert_weekly_list_play_counts"() TO "anon";
GRANT ALL ON FUNCTION "public"."insert_weekly_list_play_counts"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_weekly_list_play_counts"() TO "service_role";



GRANT ALL ON FUNCTION "public"."is_playlist_owner"("playlist_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."is_playlist_owner"("playlist_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_playlist_owner"("playlist_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_playlist_public"("playlist_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."is_playlist_public"("playlist_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_playlist_public"("playlist_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."mark_playlist_embedding_dirty"() TO "anon";
GRANT ALL ON FUNCTION "public"."mark_playlist_embedding_dirty"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."mark_playlist_embedding_dirty"() TO "service_role";



GRANT ALL ON FUNCTION "public"."removelike"("song_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."removelike"("song_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."removelike"("song_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."search_all"("query" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."search_all"("query" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_all"("query" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."search_dropdown"("query" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."search_dropdown"("query" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_dropdown"("query" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_user_song_play_day_start"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_user_song_play_day_start"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_user_song_play_day_start"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_week_start"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_week_start"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_week_start"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_playlist_cover"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_playlist_cover"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_playlist_cover"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_user_embedding_list"("p_type" "text", "p_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."update_user_embedding_list"("p_type" "text", "p_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_user_embedding_list"("p_type" "text", "p_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_user_song_embedding"("p_song_ids" "uuid"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."update_user_song_embedding"("p_song_ids" "uuid"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_user_song_embedding"("p_song_ids" "uuid"[]) TO "service_role";










































GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."album" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."album" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."album" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."artist" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."artist" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."artist" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."daily_song_play_counts" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."daily_song_play_counts" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."daily_song_play_counts" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."genres" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."genres" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."genres" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."likes" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."likes" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."likes" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."lyric" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."lyric" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."lyric" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."moods" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."moods" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."moods" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_genres" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_genres" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_genres" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_moods" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_moods" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_moods" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_songs" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_songs" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."playlist_songs" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."recently_played_list" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."recently_played_list" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."recently_played_list" TO "service_role";



GRANT ALL ON SEQUENCE "public"."recently_played_list_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."recently_played_list_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."recently_played_list_id_seq" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."song" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."song" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."song" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."song_artists" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."song_artists" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."song_artists" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."user_reference_items" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."user_reference_items" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."user_reference_items" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."user_song_plays" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."user_song_plays" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."user_song_plays" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."users" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."users" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."users" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."weekly_list_play_counts" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."weekly_list_play_counts" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."weekly_list_play_counts" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "service_role";































CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


