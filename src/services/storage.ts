import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export class StorageService {
  static async uploadProfileImage(userId: string, file: File): Promise<string> {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `profiles/${userId}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  static async uploadGameImage(gameId: string, file: File): Promise<string> {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `games/${gameId}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  static async uploadTempFile(file: File): Promise<string> {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `temp/${fileName}`);
    
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  static async deleteFile(path: string): Promise<void> {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  }

  static async getFileUrl(path: string): Promise<string> {
    const storageRef = ref(storage, path);
    return getDownloadURL(storageRef);
  }
} 