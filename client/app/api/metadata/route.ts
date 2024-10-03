import { NextResponse } from 'next/server';
import axios from 'axios';

// get Spotify access token
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

// API route handler
export async function POST(request) {
  const { link } = await request.json();

  try {
    // Extract the track ID from the Spotify link
    const trackId = link.split('/').pop().split('?')[0];

    // Get Spotify access token
    const accessToken = await getSpotifyToken();

    // Fetch the track metadata from Spotify
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const trackData = response.data;

    // Return the track metadata as a response
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