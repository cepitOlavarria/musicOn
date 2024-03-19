/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import Playlist from 'src/model/playlist.model';
import { TracksService } from 'src/services/tracks.service';

import Track from 'src/model/track.model';
import { PlaylistsService } from 'src/services/playlists.service';
@Controller('/api/playlist')
export class PlaylistsController {
  constructor(private readonly trackService: TracksService, private readonly playlistService: PlaylistsService) { }
  @Get()
  getPlaylists(
    @Query('artist') artista: string,
    @Query('name') nombrePlaylist: string,
  ): Playlist[] {
    return this.playlistService.getPlaylist(artista, nombrePlaylist);
  }

  @Get('/:id')
  getTrackByID(@Param() params: any): Playlist | string {
    const { id } = params;
    const playlistMusic = this.playlistService.getPlaylistById(id);
    if (playlistMusic) {
      return playlistMusic;
    }
    return 'No se encontro La playlist que buscas';
  }

  @Put('/:id')
  addTrackFromPlaylist(@Param() params: any, @Body() body: Track): Playlist | string {
    const track = body;
    const { id } = params;
    const playlistUpdated = this.playlistService.putNewTrackToPlaylist(id, track);
    return playlistUpdated;
  }


}