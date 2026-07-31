// Daemon catalog — Qliphoth regents and Tunnel of Set daemons
// Based on Golden Dawn, Kenneth Grant's "Nightside of Eden", and goetic traditions

export interface DaemonAssociation {
  type: 'qliphah' | 'tunnel';
  refId: string; // id da qliphah ou número do túnel
}

export interface DaemonEntry {
  id: string; // identificador único (slug)
  canonicalName: string; // nome canônico
  aliases: string[]; // aliases (min 1)
  sigilUrl: string; // URL do sigilo
  associations: DaemonAssociation[];
}

/**
 * Normalizes a daemon name for URL generation:
 * - Convert to lowercase
 * - Remove diacritical marks (accents)
 * - Replace spaces with hyphens
 */
export function normalizeDaemonName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
}

const SIGIL_BASE_URL = 'https://daemons.com.br/wp-content/uploads';

// Local sigils for daemons we have downloaded images for
const LOCAL_SIGILS: Record<string, string> = {
  // Qliphoth regents (goetic daemons with existing images)
  baal: '/sigils/baal.png',
  ashtaroth: '/sigils/astaroth.png',
  asmodeus: '/sigils/asmoday.png',
  belial: '/sigils/belial.png',
  // Additional aliases that normalizeDaemonName might produce
  beelzebub: '/sigils/baal.png', // Beelzebub = Baal variant in goetic tradition
  // Generated sigils — Qliphoth regents
  satan: '/sigils/satan.png',
  moloch: '/sigils/moloch.png',
  'lucifuge-rofocale': '/sigils/lucifuge-rofocale.png',
  belphegor: '/sigils/belphegor.png',
  adramalech: '/sigils/adramalech.png',
  lilith: '/sigils/lilith.png',
  nahema: '/sigils/nahema.png',
  choronzon: '/sigils/choronzon.png',
  // Generated sigils — Tunnel of Set daemons
  amprodias: '/sigils/amprodias.png',
  baratchial: '/sigils/baratchial.png',
  gargophias: '/sigils/gargophias.png',
  dagdagiel: '/sigils/dagdagiel.png',
  hemethterith: '/sigils/hemethterith.png',
  uriens: '/sigils/uriens.png',
  zamradiel: '/sigils/zamradiel.png',
  characith: '/sigils/characith.png',
  temphioth: '/sigils/temphioth.png',
  yamatu: '/sigils/yamatu.png',
  kurgasiax: '/sigils/kurgasiax.png',
  lafcursiax: '/sigils/lafcursiax.png',
  malkunofat: '/sigils/malkunofat.png',
  niantiel: '/sigils/niantiel.png',
  saksaksalim: '/sigils/saksaksalim.png',
  "a'ano'nin": '/sigils/aanonin.png',
  parfaxitas: '/sigils/parfaxitas.png',
  tzuflifu: '/sigils/tzuflifu.png',
  qulielfi: '/sigils/qulielfi.png',
  raflifu: '/sigils/raflifu.png',
  shalicu: '/sigils/shalicu.png',
  thantifaxath: '/sigils/thantifaxath.png',
};

function buildSigilUrl(name: string): string {
  const normalized = normalizeDaemonName(name);
  // Use local image if available, otherwise external URL (will gracefully fallback)
  return LOCAL_SIGILS[normalized] || `${SIGIL_BASE_URL}/selo-${normalized}.png`;
}

// ─── Qliphoth Regents (11 qliphoth → 13 daemons due to paired regents) ───

const qliphothRegents: DaemonEntry[] = [
  {
    id: 'satan',
    canonicalName: 'Satan',
    aliases: ['Satã', 'Shaitan', 'Ha-Satan'],
    sigilUrl: buildSigilUrl('Satan'),
    associations: [{ type: 'qliphah', refId: 'thaumiel' }],
  },
  {
    id: 'moloch',
    canonicalName: 'Moloch',
    aliases: ['Molech', 'Melech', 'Malik'],
    sigilUrl: buildSigilUrl('Moloch'),
    associations: [{ type: 'qliphah', refId: 'thaumiel' }],
  },
  {
    id: 'beelzebub',
    canonicalName: 'Beelzebub',
    aliases: ['Belzebu', 'Baal Zebub', 'Beelzebuth'],
    sigilUrl: buildSigilUrl('Beelzebub'),
    associations: [{ type: 'qliphah', refId: 'ghogiel' }],
  },
  {
    id: 'belial',
    canonicalName: 'Belial',
    aliases: ['Beliar', 'Beli Ya\'al'],
    sigilUrl: buildSigilUrl('Belial'),
    associations: [{ type: 'qliphah', refId: 'ghogiel' }],
  },
  {
    id: 'lucifuge-rofocale',
    canonicalName: 'Lucifuge Rofocale',
    aliases: ['Lucifuge', 'Lucifugus Rofocalus', 'Rofocal'],
    sigilUrl: buildSigilUrl('Lucifuge Rofocale'),
    associations: [{ type: 'qliphah', refId: 'satariel' }],
  },
  {
    id: 'ashtaroth',
    canonicalName: 'Ashtaroth',
    aliases: ['Astaroth', 'Astarte', 'Ashtoreth'],
    sigilUrl: buildSigilUrl('Ashtaroth'),
    associations: [{ type: 'qliphah', refId: 'ghagsheblah' }],
  },
  {
    id: 'asmodeus',
    canonicalName: 'Asmodeus',
    aliases: ['Asmodai', 'Ashmedai', 'Asmodeius'],
    sigilUrl: buildSigilUrl('Asmodeus'),
    associations: [{ type: 'qliphah', refId: 'golohab' }],
  },
  {
    id: 'belphegor',
    canonicalName: 'Belphegor',
    aliases: ['Baal-Peor', 'Beelphegor', 'Baal Phegor'],
    sigilUrl: buildSigilUrl('Belphegor'),
    associations: [{ type: 'qliphah', refId: 'tagimron' }],
  },
  {
    id: 'baal',
    canonicalName: 'Baal',
    aliases: ['Ba\'al', 'Bael', 'Baell'],
    sigilUrl: buildSigilUrl('Baal'),
    associations: [{ type: 'qliphah', refId: 'gharab' }],
  },
  {
    id: 'adramalech',
    canonicalName: 'Adramalech',
    aliases: ['Adrammelech', 'Adramelek', 'Adramelech'],
    sigilUrl: buildSigilUrl('Adramalech'),
    associations: [{ type: 'qliphah', refId: 'samael' }],
  },
  {
    id: 'lilith',
    canonicalName: 'Lilith',
    aliases: ['Lilit', 'Lilis', 'Lilitu'],
    sigilUrl: buildSigilUrl('Lilith'),
    associations: [{ type: 'qliphah', refId: 'gamaliel' }],
  },
  {
    id: 'nahema',
    canonicalName: 'Nahema',
    aliases: ['Naamah', 'Na\'amah', 'Nahemah'],
    sigilUrl: buildSigilUrl('Nahema'),
    associations: [{ type: 'qliphah', refId: 'nahemoth' }],
  },
  {
    id: 'choronzon',
    canonicalName: 'Choronzon',
    aliases: ['333', 'Coronzon', 'Khoronzon'],
    sigilUrl: buildSigilUrl('Choronzon'),
    associations: [{ type: 'qliphah', refId: 'daath_qliphoth' }],
  },
];

// ─── Tunnel of Set Daemons (22 tunnels) ───

const tunnelDaemons: DaemonEntry[] = [
  {
    id: 'amprodias',
    canonicalName: 'Amprodias',
    aliases: ['Amphrodias', 'Amprhodias'],
    sigilUrl: buildSigilUrl('Amprodias'),
    associations: [{ type: 'tunnel', refId: '11' }],
  },
  {
    id: 'baratchial',
    canonicalName: 'Baratchial',
    aliases: ['Baratschial', 'Baratzial'],
    sigilUrl: buildSigilUrl('Baratchial'),
    associations: [{ type: 'tunnel', refId: '12' }],
  },
  {
    id: 'gargophias',
    canonicalName: 'Gargophias',
    aliases: ['Gargofias', 'Gargophyas'],
    sigilUrl: buildSigilUrl('Gargophias'),
    associations: [{ type: 'tunnel', refId: '13' }],
  },
  {
    id: 'dagdagiel',
    canonicalName: 'Dagdagiel',
    aliases: ['Dagdagiron', 'Dagdagael'],
    sigilUrl: buildSigilUrl('Dagdagiel'),
    associations: [{ type: 'tunnel', refId: '14' }],
  },
  {
    id: 'hemethterith',
    canonicalName: 'Hemethterith',
    aliases: ['Hemethtereth', 'Hemet-Terith'],
    sigilUrl: buildSigilUrl('Hemethterith'),
    associations: [{ type: 'tunnel', refId: '15' }],
  },
  {
    id: 'uriens',
    canonicalName: 'Uriens',
    aliases: ['Urieus', 'Uraeus'],
    sigilUrl: buildSigilUrl('Uriens'),
    associations: [{ type: 'tunnel', refId: '16' }],
  },
  {
    id: 'zamradiel',
    canonicalName: 'Zamradiel',
    aliases: ['Zamrhadiel', 'Tzamradiel'],
    sigilUrl: buildSigilUrl('Zamradiel'),
    associations: [{ type: 'tunnel', refId: '17' }],
  },
  {
    id: 'characith',
    canonicalName: 'Characith',
    aliases: ['Karakith', 'Charakith'],
    sigilUrl: buildSigilUrl('Characith'),
    associations: [{ type: 'tunnel', refId: '18' }],
  },
  {
    id: 'temphioth',
    canonicalName: 'Temphioth',
    aliases: ['Temphloth', 'Temphyoth'],
    sigilUrl: buildSigilUrl('Temphioth'),
    associations: [{ type: 'tunnel', refId: '19' }],
  },
  {
    id: 'yamatu',
    canonicalName: 'Yamatu',
    aliases: ['Yamato', 'Yamatzu'],
    sigilUrl: buildSigilUrl('Yamatu'),
    associations: [{ type: 'tunnel', refId: '20' }],
  },
  {
    id: 'kurgasiax',
    canonicalName: 'Kurgasiax',
    aliases: ['Kurgasax', 'Kurgasyax'],
    sigilUrl: buildSigilUrl('Kurgasiax'),
    associations: [{ type: 'tunnel', refId: '21' }],
  },
  {
    id: 'lafcursiax',
    canonicalName: 'Lafcursiax',
    aliases: ['Lafkursiax', 'Lafcursiaux'],
    sigilUrl: buildSigilUrl('Lafcursiax'),
    associations: [{ type: 'tunnel', refId: '22' }],
  },
  {
    id: 'malkunofat',
    canonicalName: 'Malkunofat',
    aliases: ['Malkunofath', 'Malkounofat'],
    sigilUrl: buildSigilUrl('Malkunofat'),
    associations: [{ type: 'tunnel', refId: '23' }],
  },
  {
    id: 'niantiel',
    canonicalName: 'Niantiel',
    aliases: ['Niantyel', 'Nyantiel'],
    sigilUrl: buildSigilUrl('Niantiel'),
    associations: [{ type: 'tunnel', refId: '24' }],
  },
  {
    id: 'saksaksalim',
    canonicalName: 'Saksaksalim',
    aliases: ['Saksasalim', 'Saksakasalim'],
    sigilUrl: buildSigilUrl('Saksaksalim'),
    associations: [{ type: 'tunnel', refId: '25' }],
  },
  {
    id: 'aanonin',
    canonicalName: "A'ano'nin",
    aliases: ['Aanonin', "A'anon'in", 'Aano-nin'],
    sigilUrl: buildSigilUrl("A'ano'nin"),
    associations: [{ type: 'tunnel', refId: '26' }],
  },
  {
    id: 'parfaxitas',
    canonicalName: 'Parfaxitas',
    aliases: ['Parfaksitas', 'Parphaxitas'],
    sigilUrl: buildSigilUrl('Parfaxitas'),
    associations: [{ type: 'tunnel', refId: '27' }],
  },
  {
    id: 'tzuflifu',
    canonicalName: 'Tzuflifu',
    aliases: ['Tsuflifu', 'Tzuflhifu'],
    sigilUrl: buildSigilUrl('Tzuflifu'),
    associations: [{ type: 'tunnel', refId: '28' }],
  },
  {
    id: 'qulielfi',
    canonicalName: 'Qulielfi',
    aliases: ['Qulielfy', 'Kulielfi'],
    sigilUrl: buildSigilUrl('Qulielfi'),
    associations: [{ type: 'tunnel', refId: '29' }],
  },
  {
    id: 'raflifu',
    canonicalName: 'Raflifu',
    aliases: ['Raphlifu', 'Raflhifu'],
    sigilUrl: buildSigilUrl('Raflifu'),
    associations: [{ type: 'tunnel', refId: '30' }],
  },
  {
    id: 'shalicu',
    canonicalName: 'Shalicu',
    aliases: ['Shaliku', 'Shalicou'],
    sigilUrl: buildSigilUrl('Shalicu'),
    associations: [{ type: 'tunnel', refId: '31' }],
  },
  {
    id: 'thantifaxath',
    canonicalName: 'Thantifaxath',
    aliases: ['Thantiphaxath', 'Tantifaxath'],
    sigilUrl: buildSigilUrl('Thantifaxath'),
    associations: [{ type: 'tunnel', refId: '32' }],
  },
];

// ─── Exported catalog ───

export const daemons: DaemonEntry[] = [...qliphothRegents, ...tunnelDaemons];
