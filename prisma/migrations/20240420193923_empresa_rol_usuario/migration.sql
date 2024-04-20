/*
  Warnings:

  - You are about to drop the column `rolId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `empresarol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `empresarol` DROP FOREIGN KEY `EmpresaRol_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `empresarol` DROP FOREIGN KEY `EmpresaRol_rolId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_rolId_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `rolId`;

-- DropTable
DROP TABLE `empresarol`;

-- CreateTable
CREATE TABLE `EmpresaRolUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,
    `usuarioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmpresaRolUsuario` ADD CONSTRAINT `EmpresaRolUsuario_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpresaRolUsuario` ADD CONSTRAINT `EmpresaRolUsuario_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpresaRolUsuario` ADD CONSTRAINT `EmpresaRolUsuario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
