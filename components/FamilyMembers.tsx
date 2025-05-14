import { HStack, Avatar, Tooltip, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface FamilyMember {
  name: string;
  role: string;
  image: string;
  isActive?: boolean;
}

const familyMembers: FamilyMember[] = [
  { name: 'Parent 1', role: 'Parent', image: '/avatars/PlaygroundImage6.png', isActive: true },
  { name: 'Parent 2', role: 'Parent', image: '/avatars/PlaygroundImage42.png', isActive: false },
  { name: 'Enfant 1', role: 'Enfant', image: '/avatars/PlaygroundImage45.png', isActive: true },
  { name: 'Enfant 2', role: 'Enfant', image: '/avatars/PlaygroundImage37.png', isActive: false },
];

export function FamilyMembers() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <HStack spacing={0}>
      {familyMembers.map((member, index) => (
        <Tooltip 
          key={member.name}
          label={`${member.name} (${member.role})`}
          placement="bottom"
        >
          <Box
            position="relative"
            style={{
              transform: isClient ? 'none' : 'translateX(20px)',
              opacity: isClient ? 1 : 0,
              transition: isClient ? `all 0.3s ease ${index * 0.1}s` : 'none'
            }}
            marginLeft={index === 0 ? '0' : '-10px'}
            zIndex={familyMembers.length - index}
          >
            <Avatar
              name={member.name}
              src={member.image}
              size="md"
              _hover={{
                transform: 'scale(1.1)',
                boxShadow: '0 0 15px 3px rgba(0, 0, 0, 0.3)',
                zIndex: 10
              }}
              transition="all 0.3s ease"
              position="relative"
              zIndex={member.isActive ? 5 : 0}
            />
          </Box>
        </Tooltip>
      ))}
    </HStack>
  );
} 