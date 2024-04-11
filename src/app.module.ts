import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistsController } from './controllers/playlists.controller';
import { TracksController } from './controllers/tracks.controller';
import { PlaylistsService } from './services/playlists.service';
import { TracksService } from './services/tracks.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { JwtMiddlewareGuard } from './middleware/auth-guard';
import { EditoresGuard } from './middleware/editores-guard';

@Module({
  imports: [
    JwtModule.register({
      secret:
        'hjfdsalhfdsahfjkdsakreaurceukfbukalsfyuej43243545y47988367+++fdsfjhdsifyhujdshfjkdsahfjkdskgfhjdsgfygsuyejkgfhdjgfsgejfgdjhsdgfhjsekfyhdbsyfjegfjdysgfjyefgydegfhjseyrfeyr63254342343',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AppController,
    TracksController,
    PlaylistsController,
    LoginController,
  ],
  providers: [
    AppService,
    TracksService,
    PlaylistsService,
    LoginService,
    JwtMiddlewareGuard,
    EditoresGuard,
  ],
})
export class AppModule {}
