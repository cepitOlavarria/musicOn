import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import Track from 'src/model/track.model';
import { PlaylistsService } from 'src/services/playlists.service';
import { TracksService } from 'src/services/tracks.service';

@Controller('/api/tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService
    ,private readonly playService: PlaylistsService) {}

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }

  @Get('/:id')
  getTrackByID(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: number,
  ): Track | string {
    const track = this.trackService.getTrackById(id);
    if (track) {
      return track;
    }
    return 'No se encontro track';
  }

  @Post()
  createTrack(@Body() body: Track): Track | string {
    const newTrack = body;
    const track = this.trackService.createTrack(newTrack);
    if (track) {
      return track;
    }
    return 'Fallo la creacion de track';
  }

  @Put('/:id')
  updateTrack(@Param() params: any, @Body() body: Track): Track | string {
    const newTrack = body;
    const { id } = params;
    const track = this.trackService.updateTrack(id, newTrack);
    if (track) {
      return track;
    }
    return 'Error actualizando Track';
  }

  @Delete('/:id')
  deleteTrack(@Param() params: any): void {
    const { id } = params;
    this.trackService.deleteTrack(id);
    return;
  }
}
