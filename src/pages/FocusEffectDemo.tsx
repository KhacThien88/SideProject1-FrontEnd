import React, { useState } from 'react';
import { Input, Textarea, Button, FocusPresets } from '../components/ui/FocusInput';
import { getFocusEffectClasses, createFocusEffect } from '../utils/focusEffects';
import { Search, Mail, Lock, Hash, Link, Eye, EyeOff } from 'lucide-react';

export const FocusEffectDemo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    search: '',
    number: '',
    url: '',
    message: '',
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-gradient-primary mb-4">
            Focus Effect System Demo
          </h1>
          <p className="text-lg text-gray-600">
            Experience smooth, modern focus effects across all form elements
          </p>
        </div>

        {/* Focus Effect Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Smooth Focus</h3>
            <input
              type="text"
              placeholder="Smooth focus effect"
              className={getFocusEffectClasses({ type: 'smooth', size: 'md', color: 'primary' }) + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gradient Focus</h3>
            <input
              type="text"
              placeholder="Gradient focus effect"
              className={getFocusEffectClasses({ type: 'gradient', size: 'md', color: 'primary' }) + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ripple Focus</h3>
            <input
              type="text"
              placeholder="Ripple focus effect"
              className={getFocusEffectClasses({ type: 'ripple', size: 'md', color: 'primary' }) + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Glow Focus</h3>
            <input
              type="text"
              placeholder="Glow focus effect"
              className={getFocusEffectClasses({ type: 'glow', size: 'md', color: 'primary' }) + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>
        </div>

        {/* Color Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Primary</h3>
            <input
              type="text"
              placeholder="Primary color focus"
              className={createFocusEffect.input('md', 'primary') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary</h3>
            <input
              type="text"
              placeholder="Secondary color focus"
              className={createFocusEffect.input('md', 'secondary') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Accent</h3>
            <input
              type="text"
              placeholder="Accent color focus"
              className={createFocusEffect.input('md', 'accent') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Success</h3>
            <input
              type="text"
              placeholder="Success color focus"
              className={createFocusEffect.input('md', 'success') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Warning</h3>
            <input
              type="text"
              placeholder="Warning color focus"
              className={createFocusEffect.input('md', 'warning') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Error</h3>
            <input
              type="text"
              placeholder="Error color focus"
              className={createFocusEffect.error('md') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 px-4 py-2 rounded-lg'}
            />
          </div>
        </div>

        {/* Size Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Extra Small</h3>
            <input
              type="text"
              placeholder="XS size"
              className={createFocusEffect.input('xs') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Small</h3>
            <input
              type="text"
              placeholder="SM size"
              className={createFocusEffect.input('sm') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Medium</h3>
            <input
              type="text"
              placeholder="MD size"
              className={createFocusEffect.input('md') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Large</h3>
            <input
              type="text"
              placeholder="LG size"
              className={createFocusEffect.input('lg') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 rounded-lg'}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Extra Large</h3>
            <input
              type="text"
              placeholder="XL size"
              className={createFocusEffect.input('xl') + ' w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500 rounded-lg'}
            />
          </div>
        </div>

        {/* Specialized Input Types */}
        <div className="bg-white rounded-2xl p-8 shadow-soft-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Specialized Input Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Search Input"
              placeholder="Search for something..."
              variant="search"
              leftIcon={<Search className="h-5 w-5" />}
              value={formData.search}
              onChange={handleInputChange('search')}
            />

            <Input
              label="Email Input"
              placeholder="Enter your email"
              variant="email"
              leftIcon={<Mail className="h-5 w-5" />}
              value={formData.email}
              onChange={handleInputChange('email')}
            />

            <Input
              label="Password Input"
              placeholder="Enter your password"
              variant="password"
              leftIcon={<Lock className="h-5 w-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
              value={formData.password}
              onChange={handleInputChange('password')}
            />

            <Input
              label="Number Input"
              placeholder="Enter a number"
              variant="number"
              leftIcon={<Hash className="h-5 w-5" />}
              value={formData.number}
              onChange={handleInputChange('number')}
            />

            <Input
              label="URL Input"
              placeholder="Enter a URL"
              variant="url"
              leftIcon={<Link className="h-5 w-5" />}
              value={formData.url}
              onChange={handleInputChange('url')}
            />

            <Textarea
              label="Message"
              placeholder="Enter your message..."
              rows={4}
              value={formData.message}
              onChange={handleInputChange('message')}
            />
          </div>
        </div>

        {/* Button Focus Effects */}
        <div className="bg-white rounded-2xl p-8 shadow-soft-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Button Focus Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Smooth Focus</h3>
              <div className="space-y-2">
                <Button focusType="smooth" variant="primary" size="sm">Small Button</Button>
                <Button focusType="smooth" variant="primary" size="md">Medium Button</Button>
                <Button focusType="smooth" variant="primary" size="lg">Large Button</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Gradient Focus</h3>
              <div className="space-y-2">
                <Button focusType="gradient" variant="secondary" size="sm">Small Button</Button>
                <Button focusType="gradient" variant="secondary" size="md">Medium Button</Button>
                <Button focusType="gradient" variant="secondary" size="lg">Large Button</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Color Variants</h3>
              <div className="space-y-2">
                <Button focusType="smooth" variant="success" size="sm">Success</Button>
                <Button focusType="smooth" variant="warning" size="sm">Warning</Button>
                <Button focusType="smooth" variant="error" size="sm">Error</Button>
                <Button focusType="smooth" variant="ghost" size="sm">Ghost</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-2xl p-8 shadow-soft-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Usage Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Usage</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { Input, Button } from '../components/ui/FocusInput';

<Input
  label="Email"
  placeholder="Enter your email"
  variant="email"
  focusConfig={{ type: 'smooth', size: 'md', color: 'primary' }}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Using Utility Functions</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { getFocusEffectClasses, createFocusEffect } from '../utils/focusEffects';

// Direct class generation
const classes = getFocusEffectClasses({ type: 'smooth', size: 'md', color: 'primary' });

// Using presets
const classes = createFocusEffect.input('md', 'primary');
const searchClasses = createFocusEffect.search('lg');`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Custom Styling</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<input
  className={cn(
    'w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-500',
    getFocusEffectClasses({ type: 'gradient', size: 'lg', color: 'accent' }),
    'px-4 py-3 rounded-xl'
  )}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
