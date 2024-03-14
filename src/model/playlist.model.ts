import Track from './track.model';

interface Playlist {
  id?: number;
  title: string;
  duration: number;
  cantCanciones: number;
  tracks: Track[];
  estilo: string;
}

export default Playlist;
