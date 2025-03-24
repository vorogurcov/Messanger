import { Injectable, OnModuleInit } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFileDto } from './dto/uploaded-file.dto'; // DTO для ответов

@Injectable()
export class StorageService implements OnModuleInit {
    private storageClient;

    onModuleInit() {
        this.storageClient = cloudinary;
        this.storageClient.config({
            api_key: process.env.CLOUDINARY_STORAGE_API_KEY,
            api_secret: process.env.CLOUDINARY_STORAGE_API_SECRET,
            cloud_name: process.env.CLOUDINARY_STORAGE_CLOUD_NAME,
        });
    }

    async uploadFile(file: Express.Multer.File, folderPath: string, publicId:string): Promise<UploadedFileDto> {
        try {
            const result = await this.storageClient.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
                folder: folderPath,
                public_id: publicId,
            });

            return {
                url: result.secure_url,
                publicId: result.public_id,
            };
        } catch (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }
    }

    async deleteFile(publicId: string) {
        try {
            const result = await this.storageClient.uploader.destroy(publicId);

            return result.result === 'ok';
        } catch (error) {
            throw new Error(`Error deleting file: ${error.message}`);
        }
    }
}

