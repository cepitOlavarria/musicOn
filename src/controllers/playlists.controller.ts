/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import Playlist from 'src/model/playlist.model';
import { TracksService } from 'src/services/tracks.service';

import Track from 'src/model/track.model';
import { PlaylistsService } from 'src/services/playlists.service';
import { JwtMiddlewareGuard } from 'src/middleware/auth-guard';
import { EditoresGuard } from 'src/middleware/editores-guard';
@Controller('/api/playlist')
@UseGuards(JwtMiddlewareGuard)
export class PlaylistsController {
  constructor(
    private readonly trackService: TracksService, 
    private readonly playlistService: PlaylistsService) { }
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
  @UseGuards(EditoresGuard)
  addTrackFromPlaylist(@Param() params: any, @Body() body: Track, @Req() request: Request): Playlist | string {
    const track = body;
    const { id } = params;
    console.log(request['user']);
    const playlistUpdated = this.playlistService.putNewTrackToPlaylist(id, track);
    return playlistUpdated;
  }


}