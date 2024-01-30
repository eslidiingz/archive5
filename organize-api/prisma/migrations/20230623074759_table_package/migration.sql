-- CreateTable
CREATE TABLE "mst-package-list" (
    "id" SERIAL NOT NULL,
    "package_uid" TEXT NOT NULL,
    "permission_slug" TEXT NOT NULL,
    "limit_slug" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "unit" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "mst-package-list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mst-package" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "period" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "mst-package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mst-permission-list" (
    "slug" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "mst-permission-list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mst-package_uuid_key" ON "mst-package"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "mst-package_name_key" ON "mst-package"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mst-permission-list_slug_key" ON "mst-permission-list"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "mst-permission-list_name_key" ON "mst-permission-list"("name");

-- AddForeignKey
ALTER TABLE "mst-package-list" ADD CONSTRAINT "mst-package-list_package_uid_fkey" FOREIGN KEY ("package_uid") REFERENCES "mst-package"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mst-package-list" ADD CONSTRAINT "mst-package-list_permission_slug_fkey" FOREIGN KEY ("permission_slug") REFERENCES "mst-permission-list"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
