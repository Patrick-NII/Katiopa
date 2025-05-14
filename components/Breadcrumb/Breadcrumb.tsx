import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const hoverColor = useColorModeValue('gray.800', 'white');

  return (
    <ChakraBreadcrumb
      spacing="8px"
      separator={<ChevronRightIcon color={textColor} />}
      mb={4}
    >
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink
            as={Link}
            href={item.href}
            color={textColor}
            _hover={{ color: hoverColor }}
            fontSize="sm"
          >
            {item.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
} 