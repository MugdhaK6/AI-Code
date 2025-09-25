
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderLines = () => {
    const lines = content.split('\n');
    // FIX: Changed JSX.Element[] to React.ReactElement[] to resolve "Cannot find namespace 'JSX'" error.
    const elements: React.ReactElement[] = [];
    let listType: 'ol' | 'ul' | null = null;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag key={`list-${elements.length}`} className={`${ListTag === 'ol' ? 'list-decimal' : 'list-disc'} pl-5 space-y-2 my-4`}>
            {listItems.map((item, i) => {
              if (item.startsWith('- ')) {
                const parts = item.substring(2).split('**');
                 return <li key={i}>{parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-100 font-semibold">{part}</strong> : part)}</li>;
              }
              if (/^\d+\.\s/.test(item)) {
                return <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>;
              }
              return null;
            })}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const isOl = /^\d+\.\s/.test(line);
      const isUl = line.startsWith('- ');

      if (isOl) {
        if (listType !== 'ol') flushList();
        listType = 'ol';
        listItems.push(line);
      } else if (isUl) {
        if (listType !== 'ul') flushList();
        listType = 'ul';
        listItems.push(line);
      } else {
        flushList();
        if (line.startsWith('### ')) {
          elements.push(<h3 key={i} className="text-xl font-semibold text-brand-accent mt-8 mb-3 border-b border-slate-700 pb-2">{line.substring(4)}</h3>);
        } else if (line.trim() !== '') {
          elements.push(<p key={i} className="leading-relaxed">{line}</p>);
        }
      }
    }
    flushList(); // Flush any remaining list
    return elements;
  };

  return <div>{renderLines()}</div>;
};
