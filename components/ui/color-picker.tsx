'use client';

import { useState } from 'react';
import { Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  label?: string;
}

const presetColors = [
  '#000000', '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da',
  '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529',
  '#ff0000', '#ff4d4d', '#ff9999', '#ffcccc',
  '#ff6600', '#ff9933', '#ffcc99',
  '#ffcc00', '#ffdd66', '#ffeeaa',
  '#00ff00', '#66ff66', '#ccffcc',
  '#00ccff', '#66ddff', '#ccf2ff',
  '#0066ff', '#3385ff', '#99c2ff',
  '#6600ff', '#9966ff', '#ccb3ff',
  '#ff00ff', '#ff66ff', '#ffccff',
  '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc',
  '#ef4444', '#f87171', '#fca5a5',
  '#f59e0b', '#fbbf24', '#fcd34d',
  '#10b981', '#34d399', '#6ee7b7',
  '#3b82f6', '#60a5fa', '#93c5fd',
  '#8b5cf6', '#a78bfa', '#c4b5fd',
];

export function ColorPicker({ value = '#ffffff', onChange, label }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color: string) => {
    setCustomColor(color);
    onChange(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    onChange(color);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <div className="flex items-center gap-2 w-full">
              <div
                className="h-6 w-6 rounded border border-gray-300"
                style={{ backgroundColor: value }}
              />
              <span className="flex-1">{value}</span>
              <Paintbrush className="h-4 w-4 text-muted-foreground" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Preset Colors</Label>
              <div className="grid grid-cols-11 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="h-8 w-8 rounded border-2 hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: color,
                      borderColor: value === color ? '#000' : '#e5e7eb',
                    }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Custom Color</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="#000000"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="flex-1"
                />
                <input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="h-10 w-10 rounded border cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleColorSelect('transparent')}
              >
                Transparent
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
