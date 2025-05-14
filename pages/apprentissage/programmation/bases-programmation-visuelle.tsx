import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
  DragHandleIcon,
} from '@chakra-ui/react';
import ExerciseLayout from '@/components/exercises/ExerciseLayout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CodeBlock = ({ text, type, onDrag }: { text: string; type: string; onDrag: () => void }) => {
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('blue.200', 'blue.700');

  return (
    <HStack
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth={1}
      borderColor={borderColor}
      cursor="grab"
      _hover={{ shadow: 'md' }}
      onClick={onDrag}
    >
      <DragHandleIcon />
      <Text>{text}</Text>
    </HStack>
  );
};

const VisualProgrammingExercise = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [codeBlocks, setCodeBlocks] = useState<string[]>([]);
  const [availableBlocks] = useState([
    { text: 'Avancer', type: 'movement' },
    { text: 'Tourner à droite', type: 'movement' },
    { text: 'Tourner à gauche', type: 'movement' },
    { text: 'Répéter 3 fois', type: 'control' },
    { text: 'Si chemin bloqué', type: 'condition' },
  ]);

  const handleAddBlock = (block: string) => {
    setCodeBlocks([...codeBlocks, block]);
  };

  const handleRemoveBlock = (index: number) => {
    const newBlocks = [...codeBlocks];
    newBlocks.splice(index, 1);
    setCodeBlocks(newBlocks);
  };

  const handleRunCode = () => {
    // Logique pour exécuter le code
    console.log('Exécution du code:', codeBlocks);
  };

  return (
    <ExerciseLayout
      title="Les bases de la programmation visuelle"
      theme="Programmation"
      currentStep={currentStep}
      totalSteps={5}
    >
      <DndProvider backend={HTML5Backend}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Text fontSize="lg" mb={4}>
              Utilisez les blocs de code pour guider le robot jusqu'à l'objectif.
            </Text>
          </Box>

          <SimpleGrid columns={2} spacing={8}>
            <VStack align="stretch" spacing={4}>
              <Text fontWeight="bold">Blocs disponibles</Text>
              <VStack align="stretch" spacing={2}>
                {availableBlocks.map((block, index) => (
                  <CodeBlock
                    key={index}
                    text={block.text}
                    type={block.type}
                    onDrag={() => handleAddBlock(block.text)}
                  />
                ))}
              </VStack>
            </VStack>

            <VStack align="stretch" spacing={4}>
              <Text fontWeight="bold">Programme</Text>
              <VStack
                align="stretch"
                spacing={2}
                bg={useColorModeValue('gray.50', 'gray.700')}
                p={4}
                borderRadius="md"
                minH="200px"
              >
                {codeBlocks.map((block, index) => (
                  <HStack
                    key={index}
                    p={4}
                    bg={useColorModeValue('white', 'gray.600')}
                    borderRadius="md"
                    justify="space-between"
                  >
                    <Text>{block}</Text>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleRemoveBlock(index)}
                    >
                      ×
                    </Button>
                  </HStack>
                ))}
              </VStack>
              <Button
                colorScheme="green"
                onClick={handleRunCode}
                isDisabled={codeBlocks.length === 0}
              >
                Exécuter le programme
              </Button>
            </VStack>
          </SimpleGrid>

          <Box
            bg={useColorModeValue('gray.100', 'gray.700')}
            p={8}
            borderRadius="md"
            h="300px"
          >
            {/* Zone de visualisation du robot et de son environnement */}
            <Text textAlign="center">Visualisation du robot</Text>
          </Box>
        </VStack>
      </DndProvider>
    </ExerciseLayout>
  );
};

export default VisualProgrammingExercise; 