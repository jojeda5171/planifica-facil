/*
  Warnings:

  - Added the required column `tasa_interes` to the `Categoria_Inversion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria_inversion` ADD COLUMN `tasa_interes` INTEGER NOT NULL;
