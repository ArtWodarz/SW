import { Module } from '@nestjs/common';
import { CharactersModule } from './modules/characters/characters.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [CharactersModule, MoviesModule],
})
export class AppModule {}
