import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Textarea,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  useToast,
  Switch,
  FormHelperText,
} from '@chakra-ui/react';
import { FaGamepad, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { ROUTES } from '@/config/routes';

interface GameFormData {
  title: string;
  description: string;
  type: 'calculation' | 'memory' | 'puzzle' | 'drag';
  difficulty: 'easy' | 'medium' | 'hard';
  isPublic: boolean;
  questions: {
    question: string;
    answer: string;
    options?: string[];
  }[];
}

export default function CreateGamePage() {
  const router = useRouter();
  const toast = useToast();
  const [formData, setFormData] = useState<GameFormData>({
    title: '',
    description: '',
    type: 'calculation',
    difficulty: 'easy',
    isPublic: true,
    questions: [{ question: '', answer: '', options: [] }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement game creation logic
      toast({
        title: 'Jeu créé !',
        description: 'Votre jeu a été créé avec succès.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push(ROUTES.GAMES.INDEX);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création du jeu.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: '', answer: '', options: [] }],
    });
  };

  const removeQuestion = (index: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl" textAlign="center">
          Créer un Nouveau Jeu
        </Heading>

        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Titre du jeu</FormLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Entrez le titre du jeu"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez le jeu"
                  />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Type de jeu</FormLabel>
                    <Select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    >
                      <option value="calculation">Calcul</option>
                      <option value="memory">Mémoire</option>
                      <option value="puzzle">Puzzle</option>
                      <option value="drag">Glisser-Déposer</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Difficulté</FormLabel>
                    <Select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    >
                      <option value="easy">Facile</option>
                      <option value="medium">Moyen</option>
                      <option value="hard">Difficile</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Jeu public</FormLabel>
                  <Switch
                    isChecked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                  <FormHelperText>
                    Un jeu public sera visible par tous les utilisateurs
                  </FormHelperText>
                </FormControl>

                <Box>
                  <HStack justify="space-between" mb={4}>
                    <Heading size="md">Questions</Heading>
                    <Button
                      leftIcon={<Icon as={FaPlus} />}
                      onClick={addQuestion}
                      colorScheme="brand"
                    >
                      Ajouter une question
                    </Button>
                  </HStack>

                  <VStack spacing={4} align="stretch">
                    {formData.questions.map((question, index) => (
                      <Card key={index}>
                        <CardBody>
                          <VStack spacing={4} align="stretch">
                            <HStack justify="space-between">
                              <Heading size="sm">Question {index + 1}</Heading>
                              <Button
                                leftIcon={<Icon as={FaTrash} />}
                                colorScheme="red"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeQuestion(index)}
                              >
                                Supprimer
                              </Button>
                            </HStack>

                            <FormControl isRequired>
                              <FormLabel>Question</FormLabel>
                              <Input
                                value={question.question}
                                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                                placeholder="Entrez la question"
                              />
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel>Réponse</FormLabel>
                              <Input
                                value={question.answer}
                                onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                                placeholder="Entrez la réponse"
                              />
                            </FormControl>

                            {formData.type === 'memory' && (
                              <FormControl>
                                <FormLabel>Options (séparées par des virgules)</FormLabel>
                                <Input
                                  value={question.options?.join(',')}
                                  onChange={(e) => updateQuestion(index, 'options', e.target.value.split(','))}
                                  placeholder="Option1, Option2, Option3"
                                />
                              </FormControl>
                            )}
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </Box>

                <Button
                  type="submit"
                  leftIcon={<Icon as={FaSave} />}
                  colorScheme="brand"
                  size="lg"
                  w="full"
                >
                  Créer le jeu
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
} 