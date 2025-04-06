-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "planet" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_appearances" (
    "narrative_unit_id" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "character_appearances_pkey" PRIMARY KEY ("narrative_unit_id","character_id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "narrative_unit_id" INTEGER NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "narrative_units" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "narrative_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,

    CONSTRAINT "tv_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_series_episodes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "narrative_unit_id" INTEGER NOT NULL,
    "tv_series_id" INTEGER NOT NULL,

    CONSTRAINT "tv_series_episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_name_key" ON "characters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "movies_narrative_unit_id_key" ON "movies"("narrative_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "tv_series_episodes_narrative_unit_id_key" ON "tv_series_episodes"("narrative_unit_id");

-- AddForeignKey
ALTER TABLE "character_appearances" ADD CONSTRAINT "character_appearances_narrative_unit_id_fkey" FOREIGN KEY ("narrative_unit_id") REFERENCES "narrative_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_appearances" ADD CONSTRAINT "character_appearances_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_narrative_unit_id_fkey" FOREIGN KEY ("narrative_unit_id") REFERENCES "narrative_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_series_episodes" ADD CONSTRAINT "tv_series_episodes_narrative_unit_id_fkey" FOREIGN KEY ("narrative_unit_id") REFERENCES "narrative_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_series_episodes" ADD CONSTRAINT "tv_series_episodes_tv_series_id_fkey" FOREIGN KEY ("tv_series_id") REFERENCES "tv_series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
