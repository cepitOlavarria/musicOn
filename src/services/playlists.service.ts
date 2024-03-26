import { Injectable } from '@nestjs/common';
import Playlist from 'src/model/playlist.model';
import Track from 'src/model/track.model';
import { TracksService } from './tracks.service';

const playlistsMusic: Playlist[] = [
  {
    id: 1,
    duration: 100,
    title: 'rock nacional',
    cantCanciones: 10,
    tracks: [
      { id: 1, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
      { id: 15, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
      { id: 3, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
    ],
    estilo: 'rock & roll',
  },
  {
    id: 2,
    duration: 180,
    title: 'pop internacional',
    cantCanciones: 7,
    tracks: [
      { id: 4, artist: 'madonna ', duration: 2, title: 'Let it be' },
      { id: 5, artist: 'Adelle', duration: 2, title: 'Let it be' },
      { id: 6, artist: 'Bruno Mars', duration: 5, title: 'Let it be' },
    ],
    estilo: 'pop',
  },
  {
    id: 3,
    duration: 180,
    title: 'urbano ',
    cantCanciones: 3,
    tracks: [
      { id: 4, artist: 'duki ', duration: 2.6, title: 'Let it be' },
      { id: 5, artist: 'tini', duration: 2.4, title: 'Let it be' },
      { id: 6, artist: 'fmk', duration: 5.3, title: 'Let it be' },
    ],
    estilo: 'pop',
  },
];

@Injectable()
export class PlaylistsService {
  constructor(private readonly trackService: TracksService) {
    trackService.setPlaylistService(this);
  }

  private existeTrackArtist(tracks: Track[], artist: string): boolean {
    return (
      tracks.filter((tr) => {
        return tr.artist.toUpperCase().includes(artist.toUpperCase());
      }).length > 0
    );
  }

  getPlaylist(artist: string, playlistName: string): Playlist[] {
    console.log(playlistName);
    let playToReturn = [...playlistsMusic];
    playToReturn = playToReturn.filter((pl: Playlist) => {
      return (
        (!playlistName ||
          pl.title.toUpperCase().includes(playlistName.toUpperCase())) &&
        (!artist || this.existeTrackArtist(pl.tracks, artist))
      );
    });
    return playToReturn;
  }
  getPlaylistById(id: number) {
    return playlistsMusic.find((playlist) => playlist.id == id);
  }

  putNewTrackToPlaylist(id: number, newTrack: Track): Playlist | string {
    const playlist = playlistsMusic.find((pl) => pl.id == id);
    if (playlist) {
      playlist.tracks.push(newTrack);
      playlist.cantCanciones = playlist.tracks.length;
      return playlist;
    }
    return 'la playlist no existe';
  }
}
