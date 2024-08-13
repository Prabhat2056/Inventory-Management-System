-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `discount` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `items_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
