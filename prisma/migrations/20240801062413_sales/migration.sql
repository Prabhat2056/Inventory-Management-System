-- AlterTable
ALTER TABLE `items` ADD COLUMN `unit` VARCHAR(20) NOT NULL DEFAULT 'pcs';

-- CreateTable
CREATE TABLE `customers_vendors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NULL,
    `phone` INTEGER NULL,
    `street_address` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `zip_code` INTEGER NULL,
    `is_vendor` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `order_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `discount` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `tax` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `sub_total` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers_vendors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_items` ADD CONSTRAINT `sale_items_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sale_items` ADD CONSTRAINT `sale_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
