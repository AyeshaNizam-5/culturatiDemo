import React, { useState } from 'react';
import BaseStartInfo from './BaseStartInfo';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const GameStartInfo = ({ isExpanded, onExpand }: { isExpanded: boolean; onExpand: () => void }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Game Introduction');
  const [paragraph, setParagraph] = useState('This is a brief introduction to the game.');

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <>
      <BaseStartInfo title={title} paragraph={paragraph} isExpanded={isExpanded} onExpand={onExpand} onEdit={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="mb-2" />
          <Textarea value={paragraph} onChange={(e) => setParagraph(e.target.value)} placeholder="Paragraph" className="mb-2" />
          <Button onClick={handleSave}>Save</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameStartInfo;