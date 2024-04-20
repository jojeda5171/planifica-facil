/*
  Warnings:

  - You are about to drop the column `EmpresaId` on the `categoria_calculo` table. All the data in the column will be lost.
  - You are about to drop the column `EmpresaId` on the `categoria_credito` table. All the data in the column will be lost.
  - You are about to drop the column `EmpresaId` on the `tipo_persona` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Categoria_Calculo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Categoria_Credito` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ruc]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Tipo_Persona` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `empresaId` to the `Categoria_Credito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ruc` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoria_calculo` DROP FOREIGN KEY `Categoria_Calculo_EmpresaId_fkey`;

-- DropForeignKey
ALTER TABLE `categoria_credito` DROP FOREIGN KEY `Categoria_Credito_EmpresaId_fkey`;

-- DropForeignKey
ALTER TABLE `tipo_persona` DROP FOREIGN KEY `Tipo_Persona_EmpresaId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_empresaId_fkey`;

-- AlterTable
ALTER TABLE `categoria_calculo` DROP COLUMN `EmpresaId`;

-- AlterTable
ALTER TABLE `categoria_credito` DROP COLUMN `EmpresaId`,
    ADD COLUMN `empresaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `ruc` VARCHAR(191) NOT NULL,
    MODIFY `logo` VARCHAR(191) NULL,
    MODIFY `direccion` VARCHAR(191) NULL,
    MODIFY `telefono` VARCHAR(191) NULL,
    MODIFY `web` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tipo_persona` DROP COLUMN `EmpresaId`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `empresaId`;

-- CreateTable
CREATE TABLE `Empresa_Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa_Categoria_Calculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa_Tipo_Persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `tipoPersonaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Categoria_Calculo_nombre_key` ON `Categoria_Calculo`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `Categoria_Credito_nombre_key` ON `Categoria_Credito`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `Empresa_ruc_key` ON `Empresa`(`ruc`);

-- CreateIndex
CREATE UNIQUE INDEX `Empresa_email_key` ON `Empresa`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Rol_nombre_key` ON `Rol`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `Tipo_Persona_nombre_key` ON `Tipo_Persona`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);

-- AddForeignKey
ALTER TABLE `Empresa_Rol` ADD CONSTRAINT `Empresa_Rol_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa_Rol` ADD CONSTRAINT `Empresa_Rol_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa_Categoria_Calculo` ADD CONSTRAINT `Empresa_Categoria_Calculo_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa_Categoria_Calculo` ADD CONSTRAINT `Empresa_Categoria_Calculo_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria_Calculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categoria_Credito` ADD CONSTRAINT `Categoria_Credito_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa_Tipo_Persona` ADD CONSTRAINT `Empresa_Tipo_Persona_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa_Tipo_Persona` ADD CONSTRAINT `Empresa_Tipo_Persona_tipoPersonaId_fkey` FOREIGN KEY (`tipoPersonaId`) REFERENCES `Tipo_Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
