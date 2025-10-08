'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chakra } from '@chakra-ui/react';

const TAB_SYMBOL = '↹\u00A0';
const revealTabs = (s: string) => s.replace(/\t/g, TAB_SYMBOL);

export function Markdown({ source }: { source: string }) {
  const parsed = React.useMemo(() => revealTabs(source), [source]);

  return (
    <chakra.div textStyle="caption_12400" color="text.text1">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p:  (p) => <chakra.p mb="0.5rem" whiteSpace="pre-wrap" {...p} />,
          h1: (p) => <chakra.h1 mb="0.5rem" {...p} />,
          h2: (p) => <chakra.h2 mb="0.5rem" {...p} />,
          h3: (p) => <chakra.h3 mb="0.375rem" {...p} />,

          ul: (p) => (
            <chakra.ul
              listStyleType="disc"
              listStylePos="outside"
              pl="1rem"
              css={{
                display: 'grid',
                rowGap: '0.25rem',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                '&& li': { margin: 0 },
                '&& li > p': { margin: 0 },
                '&& li > ul, && li > ol': {
                  marginTop: '0.25rem',
                  marginBottom: 0,
                  paddingLeft: '1rem',
                  display: 'grid',
                  rowGap: '0.25rem',
                },
              }}
              {...p}
            />
          ),

          ol: (p) => (
            <chakra.ol
              listStyleType="decimal"
              listStylePos="outside"
              pl="1rem"
              css={{
                display: 'grid',
                rowGap: '0.25rem',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                '&& li': { margin: 0 },
                '&& li > p': { margin: 0 },
                '&& li > ul, && li > ol': {
                  marginTop: '0.25rem',
                  marginBottom: 0,
                  paddingLeft: '1rem',
                  display: 'grid',
                  rowGap: '0.25rem',
                },
              }}
              {...p}
            />
          ),

          li: (p) => <chakra.li whiteSpace="pre-wrap" {...p} />,

          blockquote: (p) => (
            <chakra.blockquote
              mb="0.75rem"
              pl="0.75rem"
              borderLeftWidth="3px"
              borderLeftColor="gray.300"
              color="text.text2"
              {...p}
            />
          ),
          strong: (p) => <chakra.strong fontWeight="inherit" {...p} />,
          em: (p) => <chakra.em fontStyle="italic" {...p} />,
          code: (p) => (
            <chakra.code px="0.25rem" py="0.125rem" borderRadius="md" bg="bg.bg4" {...p} />
          ),
          a: (p) => (
            <chakra.a color="brand.600" target="_blank" rel="noopener noreferrer" {...p} />
          ),
        }}
      >
        {parsed}
      </ReactMarkdown>
    </chakra.div>
  );
}
