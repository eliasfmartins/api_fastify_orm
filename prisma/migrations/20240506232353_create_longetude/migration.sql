/*
  Warnings:

  - Added the required column `longetude` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" ADD COLUMN     "longetude" DECIMAL(65,30) NOT NULL;
