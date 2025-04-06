import { Controller } from '@nestjs/common';
import { TvSeriesService } from './tv-series.service';

@Controller('/tv-series')
export class TvSeriesController {
  constructor(private readonly moviesService: TvSeriesService) {}
}
