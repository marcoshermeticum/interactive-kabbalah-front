'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Collapse,
  Input,
  Button,
  Spin,
  message,
  Tag,
  Space,
  Typography,
  Tooltip,
} from 'antd';
import { SaveOutlined, ReloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface ContentEditorProps {
  locale: string;
}

// Sephirot keys that we expect in the content
const SEPHIROT_KEYS = [
  'kether', 'chokmah', 'binah', 'daath', 'chesed',
  'gevurah', 'tiferet', 'netzach', 'hod', 'yesod', 'malkuth',
];

const SECTION_LABELS: Record<string, string> = {
  ui: '🎛️ Interface (labels, botões)',
  paths: '🛤️ Caminhos (Arcanos Maiores)',
  ornaments: '🏛️ Ornamentos (Véus, Pilares, Ain Soph)',
  notifications: '🔔 Notificações',
  guide: '📖 Guia de Orientação',
  qliphoth: '🌑 Qliphoth (textos de integração)',
  app: '⚙️ App',
};

export default function ContentEditor({ locale }: ContentEditorProps) {
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [sha, setSha] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modified, setModified] = useState(false);

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content?locale=${locale}`);
      if (!res.ok) throw new Error('Falha ao carregar');
      const data = await res.json();
      setContent(data.content);
      setSha(data.sha);
      setModified(false);
    } catch (err) {
      message.error(`Erro ao carregar conteúdo: ${err instanceof Error ? err.message : 'desconhecido'}`);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          content,
          sha,
          message: `[admin] Atualiza conteúdo ${locale} via painel`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao salvar');
      }

      const data = await res.json();
      message.success(`Salvo com sucesso! Commit: ${data.commitSha?.slice(0, 7)}`);
      setModified(false);
      // Reload to get new SHA
      await loadContent();
    } catch (err) {
      message.error(`${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string[], value: unknown) => {
    if (!content) return;
    const newContent = JSON.parse(JSON.stringify(content));
    let obj = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]];
    }
    obj[path[path.length - 1]] = value;
    setContent(newContent);
    setModified(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!content) {
    return <Text style={{ color: 'red' }}>Erro ao carregar conteúdo</Text>;
  }

  // Build collapsible sections
  const sephirotItems = SEPHIROT_KEYS
    .filter((key) => content[key])
    .map((key) => ({
      key,
      label: (
        <span>
          ✡ <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
          {' '}
          <Tag color="purple" style={{ fontSize: 10 }}>sephirah</Tag>
        </span>
      ),
      children: (
        <SephirahEditor
          data={content[key] as Record<string, unknown>}
          sephirahKey={key}
          onChange={(field, value) => updateField([key, ...field.split('.')], value)}
        />
      ),
    }));

  const otherSections = Object.keys(content)
    .filter((key) => !SEPHIROT_KEYS.includes(key))
    .map((key) => ({
      key,
      label: SECTION_LABELS[key] || `📄 ${key}`,
      children: (
        <JsonEditor
          data={content[key] as Record<string, unknown>}
          path={[key]}
          onChange={(path, value) => updateField(path, value)}
        />
      ),
    }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadContent}
            disabled={loading}
          >
            Recarregar
          </Button>
          <Tooltip title="As alterações criam um commit no repositório. O site é atualizado em ~1-2 min.">
            <InfoCircleOutlined style={{ color: 'rgba(255,255,255,0.4)' }} />
          </Tooltip>
        </Space>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={saving}
          disabled={!modified}
          style={{ background: modified ? '#7c3aed' : undefined }}
        >
          {modified ? 'Salvar Alterações' : 'Sem alterações'}
        </Button>
      </div>

      <Collapse
        items={[
          ...sephirotItems,
          ...otherSections,
        ]}
        accordion={false}
        style={{ background: 'rgba(15,15,30,0.5)' }}
      />
    </div>
  );
}

// Sub-editor for a single sephirah
function SephirahEditor({
  data,
  sephirahKey,
  onChange,
}: {
  data: Record<string, unknown>;
  sephirahKey: string;
  onChange: (field: string, value: unknown) => void;
}) {
  const sephirot = data.sephirot as Record<string, string> | undefined;
  const regent = data.regent as Record<string, string> | undefined;
  const world = data.world as Record<string, string> | undefined;
  const correspondences = data.correspondences as Record<string, string[]> | undefined;

  return (
    <div className="space-y-3">
      {/* Sephirot name/valor */}
      {sephirot && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Nome</label>
            <Input
              value={sephirot.name || ''}
              onChange={(e) => onChange('sephirot.name', e.target.value)}
              size="small"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Valor/Significado</label>
            <Input
              value={sephirot.valor || ''}
              onChange={(e) => onChange('sephirot.valor', e.target.value)}
              size="small"
            />
          </div>
        </div>
      )}

      {/* Planet */}
      {typeof data.planetName === 'string' && (
        <div>
          <label className="text-xs text-gray-400 block mb-1">Planeta</label>
          <Input
            value={data.planetName}
            onChange={(e) => onChange('planetName', e.target.value)}
            size="small"
          />
        </div>
      )}

      {/* Regent */}
      {regent && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Regente (título)</label>
            <Input
              value={regent.title || ''}
              onChange={(e) => onChange('regent.title', e.target.value)}
              size="small"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Regente (nome)</label>
            <Input
              value={regent.name || ''}
              onChange={(e) => onChange('regent.name', e.target.value)}
              size="small"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Defeito</label>
            <Input
              value={regent.defect || ''}
              onChange={(e) => onChange('regent.defect', e.target.value)}
              size="small"
            />
          </div>
        </div>
      )}

      {/* World */}
      {world && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Mundo</label>
            <Input
              value={world.title || ''}
              onChange={(e) => onChange('world.title', e.target.value)}
              size="small"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Aspecto</label>
            <Input
              value={world.aspect || ''}
              onChange={(e) => onChange('world.aspect', e.target.value)}
              size="small"
            />
          </div>
        </div>
      )}

      {/* Archetypes */}
      {Array.isArray(data.archetypes) && (
        <div>
          <label className="text-xs text-gray-400 block mb-1">Arquétipos (separados por vírgula)</label>
          <Input
            value={(data.archetypes as string[]).join(', ')}
            onChange={(e) => onChange('archetypes', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
            size="small"
          />
        </div>
      )}

      {/* Minor Arcana */}
      {Array.isArray(data.minorArcana) && (data.minorArcana as string[]).length > 0 && (
        <div>
          <label className="text-xs text-gray-400 block mb-1">Arcanos Menores</label>
          {(data.minorArcana as string[]).map((item, i) => (
            <Input
              key={i}
              value={item}
              onChange={(e) => {
                const arr = [...(data.minorArcana as string[])];
                arr[i] = e.target.value;
                onChange('minorArcana', arr);
              }}
              size="small"
              className="mb-1"
            />
          ))}
        </div>
      )}

      {/* Correspondences */}
      {correspondences && (
        <div className="border-t border-gray-700 pt-3 mt-3">
          <Text className="text-xs text-gray-400 block mb-2">Correspondências</Text>
          {Object.entries(correspondences).map(([key, values]) => (
            <div key={key} className="mb-2">
              <label className="text-xs text-gray-500 block mb-1">{key}</label>
              <Input
                value={values.join(', ')}
                onChange={(e) =>
                  onChange(`correspondences.${key}`, e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))
                }
                size="small"
              />
            </div>
          ))}
        </div>
      )}

      {/* Integration & DailyLife (qliphoth section in translations) */}
      {data.integration !== undefined && (
        <div>
          <label className="text-xs text-gray-400 block mb-1">🌱 Integração</label>
          <TextArea
            value={data.integration as string}
            onChange={(e) => onChange('integration', e.target.value)}
            rows={3}
            size="small"
          />
        </div>
      )}
      {data.dailyLife !== undefined && (
        <div>
          <label className="text-xs text-gray-400 block mb-1">🔄 Vida Cotidiana</label>
          <TextArea
            value={data.dailyLife as string}
            onChange={(e) => onChange('dailyLife', e.target.value)}
            rows={3}
            size="small"
          />
        </div>
      )}

      {/* Fallback: show raw fields not covered above */}
      {Object.entries(data)
        .filter(([key]) => !['sephirot', 'planetName', 'regent', 'world', 'archetypes', 'minorArcana', 'correspondences', 'integration', 'dailyLife'].includes(key))
        .map(([key, value]) => (
          <div key={`${sephirahKey}-${key}`}>
            <label className="text-xs text-gray-500 block mb-1">{key}</label>
            {typeof value === 'string' ? (
              <Input
                value={value}
                onChange={(e) => onChange(key, e.target.value)}
                size="small"
              />
            ) : (
              <TextArea
                value={JSON.stringify(value, null, 2)}
                onChange={(e) => {
                  try {
                    onChange(key, JSON.parse(e.target.value));
                  } catch { /* invalid JSON, ignore */ }
                }}
                rows={3}
                size="small"
                style={{ fontFamily: 'monospace', fontSize: 11 }}
              />
            )}
          </div>
        ))}
    </div>
  );
}

// Generic JSON editor for non-sephirah sections
function JsonEditor({
  data,
  path,
  onChange,
}: {
  data: unknown;
  path: string[];
  onChange: (path: string[], value: unknown) => void;
}) {
  if (typeof data === 'string') {
    return (
      <TextArea
        value={data}
        onChange={(e) => onChange(path, e.target.value)}
        rows={Math.min(6, Math.ceil(data.length / 60))}
        size="small"
      />
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-1">
        {data.map((item, i) => (
          <div key={i}>
            {typeof item === 'string' ? (
              <Input
                value={item}
                onChange={(e) => {
                  const arr = [...data];
                  arr[i] = e.target.value;
                  onChange(path, arr);
                }}
                size="small"
              />
            ) : (
              <JsonEditor data={item} path={[...path, String(i)]} onChange={onChange} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === 'object' && data !== null) {
    return (
      <div className="space-y-2 pl-2 border-l border-gray-700">
        {Object.entries(data as Record<string, unknown>).map(([key, value]) => (
          <div key={key}>
            <label className="text-xs text-gray-500 block mb-1">{key}</label>
            <JsonEditor data={value} path={[...path, key]} onChange={onChange} />
          </div>
        ))}
      </div>
    );
  }

  // Primitives (number, boolean)
  return (
    <Input
      value={String(data)}
      onChange={(e) => {
        const v = e.target.value;
        // Try to preserve type
        if (v === 'true') onChange(path, true);
        else if (v === 'false') onChange(path, false);
        else if (!isNaN(Number(v)) && v.trim()) onChange(path, Number(v));
        else onChange(path, v);
      }}
      size="small"
    />
  );
}
