import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistsController } from './controllers/playlists.controller';
import { TracksController } from './controllers/tracks.controller';
import { PlaylistsService } from './services/playlists.service';
import { TracksService } from './services/tracks.service';

@Module({
  imports: [],
  controllers: [AppController, TracksController, PlaylistsController],
  providers: [AppService, TracksService, PlaylistsService],
})
export class AppModule {}
