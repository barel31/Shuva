import { PortableText } from '@portabletext/react';
import YouTubeBlock from '../Block/YouTubeBlock';
import ImageBlock from '../Block/ImageBlock';
import components from './RichTextComponents';

const UseRichText = ({ value }: { value: Topography[] }) => {
  // Group blocks into media and content based on type and order
  const groupElements = (blocks: Topography[]) => {
    const groupedElements: Array<{
      type: 'media' | 'content';
      blocks?: Topography[];
      block?: Topography;
    }> = [];

    let currentMediaGroup: Topography[] = [];

    blocks.forEach((block) => {
      const isMediaBlock = block._type === 'youtube' || block._type === 'image';

      if (isMediaBlock) {
        // Check if the current group is empty or the same type, otherwise push the group
        if (
          currentMediaGroup.length > 0 &&
          currentMediaGroup[0]._type !== block._type
        ) {
          groupedElements.push({ type: 'media', blocks: currentMediaGroup });
          currentMediaGroup = []; // Start a new group
        }
        currentMediaGroup.push(block);
      } else {
        // Push the current media group if it exists
        if (currentMediaGroup.length > 0) {
          groupedElements.push({ type: 'media', blocks: currentMediaGroup });
          currentMediaGroup = []; // Reset the media group
        }
        // Push non-media blocks directly
        groupedElements.push({ type: 'content', block });
      }
    });

    // Add any remaining media blocks to the grouped elements
    if (currentMediaGroup.length > 0) {
      groupedElements.push({ type: 'media', blocks: currentMediaGroup });
    }

    return groupedElements;
  };

  // Render media blocks (either images or videos) in a flex container
  const renderMediaGroup = (blocks: Topography[], index: number) => (
    <div key={index} className="flex flex-wrap justify-center gap-4 my-4">
      {blocks.map((block, blockIndex) => {
        if (block._type === 'youtube') {
          return (
            <YouTubeBlock
              key={blockIndex}
              value={block}
              index={blockIndex}
              isInline={false}
              renderNode={() => null}
            />
          );
        } else if (block._type === 'image') {
          return (
            <ImageBlock
              key={blockIndex}
              value={block}
              index={blockIndex}
              isInline={false}
              renderNode={() => null}
            />
          );
        }
        return null;
      })}
    </div>
  );

  // Render non-media content blocks
  const renderContentBlock = (block: Topography, index: number) => (
    <PortableText key={index} value={[block]} components={components} />
  );

  // Group the blocks and render them in order
  const groupedElements = groupElements(value);

  return (
    <>
      {groupedElements.map((group, index) => {
        if (group.type === 'media' && group.blocks) {
          return renderMediaGroup(group.blocks, index);
        } else if (group.type === 'content' && group.block) {
          return renderContentBlock(group.block, index);
        }
        return null;
      })}
    </>
  );
};

export default UseRichText;
