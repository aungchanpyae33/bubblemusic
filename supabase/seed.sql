CREATE EXTENSION IF NOT EXISTS pg_cron;

-- fake_user_generate_song_plays
SELECT cron.schedule(
'fake_user_generate_song_plays',
'0 * * * *',
$$SELECT public.fake_user_generate_song_plays()$$
);

-- fake_user_generate_list_plays
SELECT cron.schedule(
'fake_user_generate_list_plays',
'10 * * * *',
$$SELECT public.fake_user_generate_list_plays()$$
);

-- batch_update_playlist_embeddings
SELECT cron.schedule(
'batch_update_playlist_embeddings',
'0 */2 * * *',
$$SELECT public.batch_update_playlist_embeddings()$$
);

-- delete_daily-song-count
SELECT cron.schedule(
'delete_daily-song-count',
'0 3 * * *',
$$
DELETE FROM public.daily_song_play_counts
WHERE day_date < current_date - interval '1 month'
$$
);

-- delete_week_played_list
SELECT cron.schedule(
'delete_week_played_list',
'0 3 * * *',
$$
DELETE FROM public.weekly_list_play_counts
WHERE week_start < date_trunc('week', current_date) - interval '1 month'
$$
);

-- weekly_list_play_counts_update
SELECT cron.schedule(
'weekly_list_play_counts_update',
'0 0 * * 1',
$$SELECT public.insert_weekly_list_play_counts()$$
);

-- daily_song_play_counts_update
SELECT cron.schedule(
'daily_song_play_counts_update',
'0 0 * * *',
$$SELECT public.insert_daily_song_play_counts()$$
);