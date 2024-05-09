/*
  Warnings:

  - You are about to drop the `categoria_calculo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoria_credito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoria_inversion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `empresa_categoria_calculo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `empresa_rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `empresa_tipo_persona` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipo_persona` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoria_credito` DROP FOREIGN KEY `Categoria_Credito_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `categoria_inversion` DROP FOREIGN KEY `Categoria_Inversion_EmpresaId_fkey`;

-- DropForeignKey
ALTER TABLE `empresa_categoria_calculo` DROP FOREIGN KEY `Empresa_Categoria_Calculo_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `empresa_categoria_calculo` DROP FOREIGN KEY `Empresa_Categoria_Calculo_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `empresa_rol` DROP FOREIGN KEY `Empresa_Rol_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `empresa_rol` DROP FOREIGN KEY `Empresa_Rol_rolId_fkey`;

-- DropForeignKey
ALTER TABLE `empresa_tipo_persona` DROP FOREIGN KEY `Empresa_Tipo_Persona_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `empresa_tipo_persona` DROP FOREIGN KEY `Empresa_Tipo_Persona_tipoPersonaId_fkey`;

-- DropTable
DROP TABLE `categoria_calculo`;

-- DropTable
DROP TABLE `categoria_credito`;

-- DropTable
DROP TABLE `categoria_inversion`;

-- DropTable
DROP TABLE `empresa_categoria_calculo`;

-- DropTable
DROP TABLE `empresa_rol`;

-- DropTable
DROP TABLE `empresa_tipo_persona`;

-- DropTable
DROP TABLE `tipo_persona`;

-- CreateTable
CREATE TABLE `EmpresaRol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmpresaCategoriaCalculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaCalculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CategoriaCalculo_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaCredito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tasaInteres` INTEGER NOT NULL,
    `empresaId` INTEGER NOT NULL,

    UNIQUE INDEX `CategoriaCredito_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmpresaTipoPersona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `tipoPersonaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoPersona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoPersona_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaInversion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tasaInteres` INTEGER NOT NULL,
    `EmpresaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmpresaRol` ADD CONSTRAINT `EmpresaRol_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpresaRol` ADD CONSTRAINT `EmpresaRol_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpresaCategoriaCalculo` ADD CONSTRAINT `EmpresaCategoriaCalculo_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpresaCategoriaCalculo` ADD CONSTRAINT `EmpresaCategoriaCalculo_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `CategoriaCalculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriaCredito` ADD CONSTRAINT `CategoriaCredito_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpresaTipoPersona` ADD CONSTRAINT `EmpresaTipoPersona_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpresaTipoPersona` ADD CONSTRAINT `EmpresaTipoPersona_tipoPersonaId_fkey` FOREIGN KEY (`tipoPersonaId`) REFERENCES `TipoPersona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriaInversion` ADD CONSTRAINT `CategoriaInversion_EmpresaId_fkey` FOREIGN KEY (`EmpresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
