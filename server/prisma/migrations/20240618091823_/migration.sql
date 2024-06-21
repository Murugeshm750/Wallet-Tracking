-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "accountName" TEXT NOT NULL,
    "currencyDetail" TEXT NOT NULL,
    "currentBalance" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_id_key" ON "UserAccount"("id");
