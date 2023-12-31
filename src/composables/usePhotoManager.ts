import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';
import { useWebClient, PhotoResult } from '@/composables/useWebClient';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  predictedClass: string;
  googleSearchLink: string;
}

export const usePhotoManager = () => {

  const { uploadPhoto } = useWebClient();

  const photos = ref<UserPhoto[]>([]);
  const PHOTO_STORAGE = 'photos';

  const deletedPhotos = ref<UserPhoto[]>([]);
  const DELETED_STORAGE = 'deleted';

  const cachePhotos = () => {
    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(photos.value),
    });
  };

  const cacheDeletedPhotos = () => {
    Preferences.set({
      key: DELETED_STORAGE,
      value: JSON.stringify(deletedPhotos.value),
    });
  };


  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    deletedPhotos.value = [photo, ...deletedPhotos.value];
    photos.value = photos.value.filter((p) => p.filepath !== photo.filepath);

    //save the deleted photo in the deletedPhotos array


    // delete photo file from filesystem
    //const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    //await Filesystem.deleteFile({
    //  path: filename,
    //  directory: Directory.Data,
    //});
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string;
    // "hybrid" will detect mobile - iOS or Android
    if (isPlatform('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      base64Data = (await convertBlobToBase64(blob)) as string;
    }
    const photoResult = await uploadPhoto(base64Data);
    base64Data = photoResult.manipulatedData;
    photo.webPath = base64Data;

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });


    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        predictedClass: photoResult.predictedClass,
        googleSearchLink: photoResult.googleSearchLink,
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
        predictedClass: photoResult.predictedClass,
        googleSearchLink: photoResult.googleSearchLink,
      };
    }
  };

  const takePhoto = async () => {
    /*
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    */

    const galleryPhotos = await Camera.pickImages({
      quality: 100,
      limit: 1,
    });

    const galleryPhoto = galleryPhotos.photos[0];

    const photo: Photo = {
      path: galleryPhoto.webPath,
      format: 'jpeg',
      webPath: galleryPhoto.webPath,
      saved: true,
    };

    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = await savePicture(photo, fileName);

    photos.value = [savedFileImage, ...photos.value];

  };

  const loadSaved = async () => {
    const photoList = await Preferences.get({ key: PHOTO_STORAGE });
    const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

    // If running on the web...
    if (!isPlatform('hybrid')) {
      for (const photo of photosInPreferences) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
    }

    photos.value = photosInPreferences;
  };

  const loadDeleted = async () => {
    const photoList = await Preferences.get({ key: DELETED_STORAGE });
    const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

    // If running on the web...
    if (!isPlatform('hybrid')) {
      for (const photo of photosInPreferences) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
    }

    deletedPhotos.value = photosInPreferences;
  };

  onMounted(loadSaved);
  watch(photos, cachePhotos);

  onMounted(loadDeleted);
  watch(deletedPhotos, cacheDeletedPhotos);

  return {
    photos,
    deletedPhotos,
    takePhoto,
    deletePhoto
  };
};