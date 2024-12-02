import type { Meta, StoryObj } from '@storybook/react';
import LanguageSelector from './LanguageSelector';

const meta = {
  title: 'LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locale: 'pt',
  },
};
