import { NextResponse } from 'next/server';
import axios from 'axios';

const getSpotifyToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
};

export async function POST(request) {
  const { link } = await request.json();

  try {
    const trackId = link.split('/').pop().split('?')[0];

    const accessToken = await getSpotifyToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const trackData = response.data;

    return NextResponse.json({
      artist: trackData.artists[0].name,
      title: trackData.name,
      albumImage: trackData.album.images[0].url,
      previewUrl: trackData.preview_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
};