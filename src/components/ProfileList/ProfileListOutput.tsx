import { ProfileList } from './ProfileList';
import type { ProfileListProps } from './ProfileList';
import { Box } from '@chakra-ui/react';

interface ProfileListOutputProps {
  cards: ProfileListProps[];
}

export const ProfileListOutput = ({ cards }: ProfileListOutputProps) => {
  return (
    <Box backgroundColor='var(--Background-3, #FFF)' borderRadius='0.75rem'>
      {cards.map((card, index) => (
        <Box key={index}>
          <ProfileList {...card} />
        </Box>
      ))}
    </Box>
  );
};
