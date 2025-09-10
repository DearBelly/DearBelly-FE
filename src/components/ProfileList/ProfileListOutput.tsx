import { ProfileList } from './ProfileList';
import type { ProfileListProps } from './ProfileList';
import { Box } from '@chakra-ui/react';

interface ProfileListOutputProps {
  cards: ProfileListProps[];
  onDelete?: (id: number) => void;
}

export const ProfileListOutput = ({ cards, onDelete }: ProfileListOutputProps) => {
  return (
    <Box backgroundColor='bg.bg3' borderRadius='0.75rem'>
      {cards.map((card) => (
        <Box key={card.id}>
          <ProfileList {...card} onDelete={onDelete}/>
        </Box>
      ))}
    </Box>
  );
};