import { ContendCard } from './ContentCard';
import type { ContendCardProps } from './ContentCard';
import { Box } from '@chakra-ui/react';

interface ContendCardOutputProps {
    cards : ContendCardProps[];
}

export const ContendCardOutput = ({ cards }:ContendCardOutputProps) => {
    return(
        <Box>
            {cards.map((card, index) => (
                <Box key={index}>
                    <Box width="21rem">
                        <ContendCard {...card}/>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};