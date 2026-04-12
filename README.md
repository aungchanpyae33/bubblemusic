# Bubble (ဘဘယ်လ်) <img src="https://bubblemusic.vercel.app/bubblelogo.svg" width=100 height=27.747  />

<p>
<img src="https://img.shields.io/github/v/release/aungchanpyae33/bubblemusic?cache=0">
<img  src="https://img.shields.io/badge/license-MIT-green">
</p>

**Bubble** is a modern music streaming platform where you can listen and stored songs , playlists , albums and can create your own playlists.

## Live Demo

[https://bubblemusic.vercel.app](https://bubblemusic.vercel.app)

## The main Tech stack i used in Bubble

![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![HLS.js](https://img.shields.io/badge/HLS.js-1E90FF?style=for-the-badge&logo=javascript&logoColor=white)

## Run Locally

This project uses **Supabase** for Auth, Database, and Storage. Follow the steps below to get the project running on your machine.

### Prerequisites

- **Node.js**: version `>22`
- **Package Manager**: `pnpm`
- **Docker**: Required for running Supabase locally.

---

### 1. Clone the Project

Bash

```
git clone https://github.com/aungchanpyae33/bubblemusic.git
```

```
cd bubblemusic
```

```
pnpm install
```

### 2. Environment Variables

1.  Rename `.env.example` to `.env.local`.
2.  Keep this file ready; you will fill in the keys after starting Supabase.

---

### 3. Start Supabase Locally

Ensure **Docker** is running, then execute:

Bash

```bash
pnpm dlx supabase start
```

\_This command will automatically create your `database tables`, `RLS policies`, and the `pg_function` `trigger` and `cron job`.

#### Notice

The above command will not create and seed any files or any database rows as i am not willing to share any other's copyrighted assets on online.
But you can make it by your own. Below is my overview current method to make files and insert database.

(_As this project is demo showcase and more focus on frontend , currently i don't have one-click simplify version to seed data audio and it is my low priority feature to do in future. If you find any questions about below setup , contact me freely on `aung.c.pyae@outlook.com`_)

- I use telegram bot to download the music files/album/artist mainly from **Deezload** and **Music Downloader**

- Then i use **ffmpeg** locally to make hls format file.
  ```
  ffmpeg -i input.mp3 -map 0:a -map_metadata -1 -vn -c:a aac -b:a 128k -f hls -hls_time 10 -hls_playlist_type vod -hls_segment_filename "seg-%d.ts" index.m3u8
  ```
- \*Before insert to database , it needs embedding of the song. I use `bge-small-en-v1.5` Text Embedding models from **baai** on cloudflare. Below is the example of how i prepare for embedding structure - - I use the website - https://audioaidynamics.com/music-analyzer to get analysis of the audio file. - I copy the output and convert to usable string output. **(Code is private)** - Then it is ready to insert like below embedding format. (For artist and album case , i just use google for that artist and album info and create text embedding with those info)

```
   const  embeddingInput  =  `

    The song is in C# minor. Camelot wheel position: 12A. fast tempo with 120 beats per minute. extremely high danceability (100/100). high happiness (65/100). moderate sadness (58/100). moderate relaxed (43/100). very low aggressiveness (15/100)

    GENRE: Korean Dance, Dance/Electronic, Korea Ballads, K-Pop

    TITLE: Bad Influence

    ARTIST: SEVENTEEN

    featured artist:Pharrell Williams

    COUNTRY: South Korea

    RELEASE DATE: 2025

    `;
```

**(Code is private)**

- After that , i have my interface that insert to both storage files and database rows (target to song table and song-artists table) by uploading files and also insert database. The code is only for song case and for album , artist case , i do manually inserted. **(Code is private)**

---

### 4. Connect the App

Once the command finishes, copy the key from the terminal output into your `.env.local` file.

## Deploying to Supabase Cloud

If you want to move your local changes to a live Supabase project, follow these steps:

### 1. Login & Link

Bash

```
pnpm dlx supabase login
```

```
pnpm dlx supabase link --project-ref your-project-id
```

### 2. Push Database & Policies

Bash

```
pnpm dlx supabase db push
```

---

## Support

If you find this project useful, please give it a ⭐!

[![GitHub stars](https://img.shields.io/github/stars/aungchanpyae33/bubblemusic?style=social)](https://github.com/aungchanpyae33/bubblemusic)

## Contribution

Contributions are welcome!

Please read the [contribution guide](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
