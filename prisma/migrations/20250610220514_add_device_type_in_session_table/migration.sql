/*
  Warnings:

  - Added the required column `device_type` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "device_type" TEXT NOT NULL;
