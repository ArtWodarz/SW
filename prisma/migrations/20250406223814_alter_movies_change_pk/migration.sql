/*
  Warnings:

  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the `tv_series` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tv_series_episodes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tv_series_episodes" DROP CONSTRAINT "tv_series_episodes_narrative_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "tv_series_episodes" DROP CONSTRAINT "tv_series_episodes_tv_series_id_fkey";

-- AlterTable
ALTER TABLE "movies" DROP CONSTRAINT "movies_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("narrative_unit_id");

-- DropTable
DROP TABLE "tv_series";

-- DropTable
DROP TABLE "tv_series_episodes";
