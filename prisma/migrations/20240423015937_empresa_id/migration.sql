/*
  Warnings:

  - You are about to drop the column `EmpresaId` on the `categoriainversion` table. All the data in the column will be lost.
  - Added the required column `empresaId` to the `CategoriaInversion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoriainversion` DROP FOREIGN KEY `CategoriaInversion_EmpresaId_fkey`;

-- AlterTable
ALTER TABLE `categoriainversion` DROP COLUMN `EmpresaId`,
    ADD COLUMN `empresaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CategoriaInversion` ADD CONSTRAINT `CategoriaInversion_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
