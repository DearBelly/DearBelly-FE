import { ContendCard } from './ContentCard';
import type { ContendCardProps } from './ContentCard';
import { Box } from '@chakra-ui/react';
interface ContendCardOutputProps {
    cards : ContendCardProps[];
}

export const ContendCardOutput = ({ cards }:ContendCardOutputProps) => {
    return(
        <Box w='100%'>
            {cards.map((card, index) => (
                <Box key={index}>
                    <ContendCard {...card} isLast={index === cards.length-1}/>
                </Box>
            ))}
        </Box>
    );
};