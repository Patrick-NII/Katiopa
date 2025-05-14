import { useState, useCallback } from 'react';
import { Box, Button, Image, Text, useToast, Progress } from '@chakra-ui/react';
import { StorageService } from '../services/storage';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  uploadType: 'profile' | 'game' | 'temp';
  userId?: string;
  gameId?: string;
  maxSize?: number; // en MB
  acceptedTypes?: string[];
}

export const ImageUpload = ({
  onUploadComplete,
  uploadType,
  userId,
  gameId,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const toast = useToast();

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérification du type de fichier
    if (!acceptedTypes.includes(file.type)) {
      toast({
        title: "Type de fichier non supporté",
        description: "Veuillez sélectionner une image (JPG, PNG ou WEBP)",
        status: "error",
        duration: 3000,
      });
      return;
    }

    // Vérification de la taille
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: `La taille maximum est de ${maxSize}MB`,
        status: "error",
        duration: 3000,
      });
      return;
    }

    // Création de l'aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setIsUploading(true);
      let uploadedUrl: string;

      switch (uploadType) {
        case 'profile':
          if (!userId) throw new Error('userId is required for profile uploads');
          uploadedUrl = await StorageService.uploadProfileImage(userId, file);
          break;
        case 'game':
          if (!gameId) throw new Error('gameId is required for game uploads');
          uploadedUrl = await StorageService.uploadGameImage(gameId, file);
          break;
        case 'temp':
          uploadedUrl = await StorageService.uploadTempFile(file);
          break;
        default:
          throw new Error('Invalid upload type');
      }

      onUploadComplete(uploadedUrl);
      toast({
        title: "Téléchargement réussi",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Erreur lors du téléchargement",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }, [uploadType, userId, gameId, maxSize, acceptedTypes, onUploadComplete, toast]);

  return (
    <Box>
      <input
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          as="span"
          colorScheme="blue"
          isLoading={isUploading}
          cursor="pointer"
        >
          Sélectionner une image
        </Button>
      </label>

      {isUploading && (
        <Progress
          value={progress}
          size="sm"
          colorScheme="blue"
          mt={2}
        />
      )}

      {previewUrl && (
        <Box mt={4}>
          <Text mb={2}>Aperçu :</Text>
          <Image
            src={previewUrl}
            alt="Aperçu"
            maxH="200px"
            borderRadius="md"
          />
        </Box>
      )}
    </Box>
  );
}; 