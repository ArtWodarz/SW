import { Module } from '@nestjs/common';
import { CharactersModule } from './modules/characters/characters.module';
import { MoviesModule } from './modules/movies/movies.module';
import { TvSeriesModule } from './modules/tv-series/tv-series.module';

@Module({
  imports: [CharactersModule, MoviesModule, TvSeriesModule],
})
export class AppModule {}
