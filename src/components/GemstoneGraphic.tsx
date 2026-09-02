import React from 'react';

interface GemstoneGraphicProps {
  value: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showNumberPill?: boolean;
}

export const GemstoneGraphic: React.FC<GemstoneGraphicProps> = ({
  value,
  className = '',
  size = 'full',
  showNumberPill = true,
}) => {
  // Dimension helper
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    full: 'w-full h-full',
  };

  // Render dedicated SVG jewel depending on tier
  const renderJewelSVG = () => {
    switch (value) {
      case 2: // 2 - 柔光薰衣草紫晶 (Round Brilliant Cabochon)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(147,112,219,0.4)]">
            <defs>
              <radialGradient id="amethyst-base" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="40%" stopColor="#A855F7" />
                <stop offset="85%" stopColor="#6B21A8" />
                <stop offset="100%" stopColor="#3B0764" />
              </radialGradient>
              <linearGradient id="amethyst-facet-top" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF5FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Outer Aura */}
            <circle cx="50" cy="50" r="44" fill="url(#amethyst-base)" />
            {/* Table Facet */}
            <polygon points="50,16 76,32 76,68 50,84 24,68 24,32" fill="#9333EA" opacity="0.4" />
            <polygon points="50,22 70,35 70,65 50,78 30,65 30,35" fill="url(#amethyst-facet-top)" />
            {/* Star Facet lines */}
            <line x1="50" y1="6" x2="50" y2="22" stroke="#FAF5FF" strokeWidth="1.5" opacity="0.6" />
            <line x1="88" y1="28" x2="70" y2="35" stroke="#FAF5FF" strokeWidth="1.5" opacity="0.6" />
            <line x1="88" y1="72" x2="70" y2="65" stroke="#FAF5FF" strokeWidth="1.5" opacity="0.6" />
            <line x1="50" y1="94" x2="50" y2="78" stroke="#FAF5FF" strokeWidth="1.5" opacity="0.6" />
            <line x1="12" y1="72" x2="30" y2="65" stroke="#FAF5FF" strokeWidth="1.5" opacity="0.6" />
            <line x1="12" y1="28" x2="30" y2="35" stroke="#FAF5FF" strokeWidth="1.5" opacity="0.6" />
            {/* Specular Highlight */}
            <ellipse cx="38" cy="30" rx="9" ry="5" transform="rotate(-30 38 30)" fill="#FFFFFF" opacity="0.75" />
          </svg>
        );

      case 4: // 4 - 晨曦海藍寶 (Trillion Teardrop Facet)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_14px_rgba(56,189,248,0.45)]">
            <defs>
              <linearGradient id="aqua-grad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="35%" stopColor="#38BDF8" />
                <stop offset="75%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
            </defs>
            {/* Faceted Teardrop / Trillion Body */}
            <polygon points="50,8 88,78 12,78" fill="url(#aqua-grad)" stroke="#E0F2FE" strokeWidth="1.2" />
            {/* Inner Facets */}
            <polygon points="50,28 74,70 26,70" fill="#0369A1" opacity="0.35" />
            <polygon points="50,8 50,28 88,78" fill="#E0F2FE" opacity="0.4" />
            <polygon points="50,8 50,28 12,78" fill="#7DD3FC" opacity="0.65" />
            <polygon points="50,28 74,70 88,78" fill="#0284C7" opacity="0.5" />
            <polygon points="50,28 26,70 12,78" fill="#38BDF8" opacity="0.6" />
            {/* Center Table */}
            <polygon points="50,34 68,66 32,66" fill="#F0F9FF" opacity="0.45" />
            {/* Sparkle */}
            <circle cx="48" cy="24" r="3" fill="#FFFFFF" />
            <polygon points="48,16 50,24 56,24 51,28 53,34 48,30 43,34 45,28 40,24 46,24" fill="#FFFFFF" opacity="0.8" transform="scale(0.5) translate(48, 10)" />
          </svg>
        );

      case 8: // 8 - 凝翠帝王綠 (Octagonal Emerald Step-cut)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_14px_rgba(16,185,129,0.4)]">
            <defs>
              <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="30%" stopColor="#10B981" />
                <stop offset="70%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064E3B" />
              </linearGradient>
            </defs>
            {/* Outer Octagon */}
            <polygon points="28,10 72,10 90,28 90,72 72,90 28,90 10,72 10,28" fill="url(#emerald-grad)" stroke="#D1FAE5" strokeWidth="1.2" />
            {/* Step Facets */}
            <polygon points="34,20 66,20 80,34 80,66 66,80 34,80 20,66 20,34" fill="#065F46" opacity="0.35" />
            <polygon points="38,26 62,26 74,38 74,62 62,74 38,74 26,62 26,38" fill="#34D399" opacity="0.3" />
            {/* Table Facet */}
            <polygon points="42,32 58,32 68,42 68,58 58,68 42,68 32,58 32,42" fill="#ECFDF5" opacity="0.45" />
            {/* Step Corner lines */}
            <line x1="28" y1="10" x2="42" y2="32" stroke="#ECFDF5" strokeWidth="1" opacity="0.7" />
            <line x1="72" y1="10" x2="58" y2="32" stroke="#ECFDF5" strokeWidth="1" opacity="0.7" />
            <line x1="90" y1="28" x2="68" y2="42" stroke="#ECFDF5" strokeWidth="1" opacity="0.7" />
            <line x1="90" y1="72" x2="68" y2="58" stroke="#064E3B" strokeWidth="1" opacity="0.8" />
            <line x1="72" y1="90" x2="58" y2="68" stroke="#064E3B" strokeWidth="1" opacity="0.8" />
            <line x1="28" y1="90" x2="42" y2="68" stroke="#064E3B" strokeWidth="1" opacity="0.8" />
            <line x1="10" y1="72" x2="32" y2="58" stroke="#064E3B" strokeWidth="1" opacity="0.8" />
            <line x1="10" y1="28" x2="32" y2="42" stroke="#ECFDF5" strokeWidth="1" opacity="0.7" />
            {/* Top Sheen */}
            <polygon points="28,10 72,10 62,26 38,26" fill="#FFFFFF" opacity="0.6" />
          </svg>
        );

      case 16: // 16 - 香檳帝王拓帕 (Radiant Cushion Cut)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_16px_rgba(245,158,11,0.45)]">
            <defs>
              <linearGradient id="topaz-grad" x1="10%" y1="10%" x2="90%" y2="90%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            {/* Cushion Rounded Rectangle */}
            <rect x="12" y="12" width="76" height="76" rx="20" fill="url(#topaz-grad)" stroke="#FEF3C7" strokeWidth="1.2" />
            {/* Diamond Rhombus Facet */}
            <polygon points="50,16 84,50 50,84 16,50" fill="#B45309" opacity="0.35" />
            <polygon points="50,24 76,50 50,76 24,50" fill="#FDE68A" opacity="0.4" />
            {/* Table Facet */}
            <rect x="34" y="34" width="32" height="32" rx="6" fill="#FFFBEB" opacity="0.5" />
            {/* Facet Star Lines */}
            <line x1="50" y1="12" x2="50" y2="34" stroke="#FFFBEB" strokeWidth="1.2" opacity="0.8" />
            <line x1="88" y1="50" x2="66" y2="50" stroke="#FFFBEB" strokeWidth="1.2" opacity="0.8" />
            <line x1="50" y1="88" x2="50" y2="66" stroke="#FFFBEB" strokeWidth="1.2" opacity="0.8" />
            <line x1="12" y1="50" x2="34" y2="50" stroke="#FFFBEB" strokeWidth="1.2" opacity="0.8" />
            {/* Corner Star Glints */}
            <circle cx="36" cy="36" r="3.5" fill="#FFFFFF" />
          </svg>
        );

      case 32: // 32 - 絲絨石榴紅 (Velvet Garnet / Rose Marquise)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_16px_rgba(225,29,72,0.45)]">
            <defs>
              <linearGradient id="ruby-grad" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="30%" stopColor="#E11D48" />
                <stop offset="70%" stopColor="#9F1239" />
                <stop offset="100%" stopColor="#4C0519" />
              </linearGradient>
            </defs>
            {/* Marquise / Rhombus Flame Facet */}
            <polygon points="50,8 88,50 50,92 12,50" fill="url(#ruby-grad)" stroke="#FFE4E6" strokeWidth="1.2" />
            {/* Inner Facet Layers */}
            <polygon points="50,22 76,50 50,78 24,50" fill="#881337" opacity="0.4" />
            <polygon points="50,30 68,50 50,70 32,50" fill="#FB7185" opacity="0.45" />
            <polygon points="50,38 60,50 50,62 40,50" fill="#FFF1F2" opacity="0.6" />
            {/* Diagonal Facet Divisions */}
            <line x1="50" y1="8" x2="50" y2="92" stroke="#FFF1F2" strokeWidth="1.2" opacity="0.7" />
            <line x1="12" y1="50" x2="88" y2="50" stroke="#FFF1F2" strokeWidth="1.2" opacity="0.7" />
            <line x1="31" y1="29" x2="69" y2="71" stroke="#FFF1F2" strokeWidth="0.8" opacity="0.5" />
            <line x1="69" y1="29" x2="31" y2="71" stroke="#FFF1F2" strokeWidth="0.8" opacity="0.5" />
            {/* Glint */}
            <ellipse cx="44" cy="32" rx="4" ry="2" transform="rotate(-45 44 32)" fill="#FFFFFF" />
          </svg>
        );

      case 64: // 64 - 鉑金八心八箭純鑽 (58-Facet Brilliant Diamond with Hearts & Arrows)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_18px_rgba(186,230,253,0.65)]">
            <defs>
              <linearGradient id="diamond-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#E0F2FE" />
                <stop offset="60%" stopColor="#7DD3FC" />
                <stop offset="90%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>
            {/* Brilliant Circle Body */}
            <circle cx="50" cy="50" r="43" fill="url(#diamond-grad)" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Eight Arrows Optical Pattern */}
            <polygon points="50,15 54,32 50,30 46,32" fill="#0284C7" opacity="0.4" />
            <polygon points="50,85 54,68 50,70 46,68" fill="#0284C7" opacity="0.4" />
            <polygon points="15,50 32,54 30,50 32,46" fill="#0284C7" opacity="0.4" />
            <polygon points="85,50 68,54 70,50 68,46" fill="#0284C7" opacity="0.4" />
            <polygon points="25,25 40,36 38,34 36,40" fill="#0284C7" opacity="0.4" />
            <polygon points="75,25 60,36 62,34 64,40" fill="#0284C7" opacity="0.4" />
            <polygon points="25,75 40,64 38,66 36,60" fill="#0284C7" opacity="0.4" />
            <polygon points="75,75 60,64 62,66 64,60" fill="#0284C7" opacity="0.4" />
            {/* Center Octagonal Table */}
            <polygon points="40,28 60,28 72,40 72,60 60,72 40,72 28,60 28,40" fill="#F0F9FF" opacity="0.75" />
            <polygon points="44,36 56,36 64,44 64,56 56,64 44,64 36,56 36,44" fill="#FFFFFF" opacity="0.9" />
            {/* 8 Crown Star Lines */}
            <line x1="50" y1="7" x2="50" y2="28" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="80" y1="20" x2="60" y2="28" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="93" y1="50" x2="72" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="80" y1="80" x2="60" y2="72" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="50" y1="93" x2="50" y2="72" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="20" y1="80" x2="40" y2="72" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="7" y1="50" x2="28" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="40" y2="28" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Super Star Glint */}
            <polygon points="50,30 52,44 66,44 54,52 58,66 50,56 42,66 46,52 34,44 48,44" fill="#FFFFFF" opacity="0.95" />
          </svg>
        );

      case 128: // 128 - 幽月藍珀星石 (Moonlit Tanzanite Opal)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_18px_rgba(168,85,247,0.5)]">
            <defs>
              <radialGradient id="opal-grad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F5D0FE" />
                <stop offset="30%" stopColor="#C084FC" />
                <stop offset="65%" stopColor="#6366F1" />
                <stop offset="90%" stopColor="#312E81" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </radialGradient>
            </defs>
            {/* Hexagon Astral Geometry */}
            <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="url(#opal-grad)" stroke="#E9D5FF" strokeWidth="1.4" />
            {/* Hexagonal Inner Layer */}
            <polygon points="50,22 76,37 76,63 50,78 24,63 24,37" fill="#4338CA" opacity="0.35" />
            {/* Central Hexagram Starlight */}
            <polygon points="50,26 66,66 22,40 78,40 34,66" fill="#FDF4FF" opacity="0.5" stroke="#F5D0FE" strokeWidth="1" />
            {/* Facet Edge Connectors */}
            <line x1="50" y1="8" x2="50" y2="22" stroke="#FDF4FF" strokeWidth="1.2" opacity="0.8" />
            <line x1="88" y1="30" x2="76" y2="37" stroke="#FDF4FF" strokeWidth="1.2" opacity="0.8" />
            <line x1="88" y1="70" x2="76" y2="63" stroke="#FDF4FF" strokeWidth="1.2" opacity="0.8" />
            <line x1="50" y1="92" x2="50" y2="78" stroke="#FDF4FF" strokeWidth="1.2" opacity="0.8" />
            <line x1="12" y1="70" x2="24" y2="63" stroke="#FDF4FF" strokeWidth="1.2" opacity="0.8" />
            <line x1="12" y1="30" x2="24" y2="37" stroke="#FDF4FF" strokeWidth="1.2" opacity="0.8" />
            {/* Core Nebula Orb */}
            <circle cx="50" cy="50" r="10" fill="#FAF5FF" opacity="0.75" />
          </svg>
        );

      case 256: // 256 - 皇家六芒星光藍寶 (Royal Star Sapphire)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_20px_rgba(37,99,235,0.6)]">
            <defs>
              <radialGradient id="sapphire-grad" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="35%" stopColor="#2563EB" />
                <stop offset="75%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#0F172A" />
              </radialGradient>
            </defs>
            {/* Domed Cabochon Body */}
            <circle cx="50" cy="50" r="44" fill="url(#sapphire-grad)" stroke="#BFDBFE" strokeWidth="1.2" />
            {/* Six-Ray Asterism Star (六芒星光效應) */}
            <line x1="50" y1="10" x2="50" y2="90" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" filter="drop-shadow(0 0 4px #93C5FD)" />
            <line x1="15" y1="30" x2="85" y2="70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" filter="drop-shadow(0 0 4px #93C5FD)" />
            <line x1="15" y1="70" x2="85" y2="30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" filter="drop-shadow(0 0 4px #93C5FD)" />
            {/* Subtle Inner Ray Thin Lines */}
            <line x1="50" y1="12" x2="50" y2="88" stroke="#DBEAFE" strokeWidth="1" />
            <line x1="18" y1="32" x2="82" y2="68" stroke="#DBEAFE" strokeWidth="1" />
            <line x1="18" y1="68" x2="82" y2="32" stroke="#DBEAFE" strokeWidth="1" />
            {/* Central Asterism Core Intersection */}
            <circle cx="50" cy="50" r="6" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFFFFF)" />
          </svg>
        );

      case 512: // 512 - 暮光黑耀魔晶 (Twilight Obsidian Void Crystal)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_22px_rgba(147,51,234,0.55)]">
            <defs>
              <linearGradient id="obsidian-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="25%" stopColor="#581C87" />
                <stop offset="60%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#09090B" />
              </linearGradient>
            </defs>
            {/* Rhombic Dodecahedron Multi-Facet Structure */}
            <polygon points="50,6 88,24 94,66 64,94 20,90 6,52 18,18" fill="url(#obsidian-grad)" stroke="#E9D5FF" strokeWidth="1.2" />
            {/* Complex Crystal Facet Cleavage Planes */}
            <polygon points="50,6 64,36 88,24" fill="#A855F7" opacity="0.35" />
            <polygon points="88,24 64,36 74,66 94,66" fill="#6B21A8" opacity="0.45" />
            <polygon points="94,66 74,66 54,82 64,94" fill="#3B0764" opacity="0.6" />
            <polygon points="64,94 54,82 28,74 20,90" fill="#18181B" opacity="0.8" />
            <polygon points="20,90 28,74 18,48 6,52" fill="#2E1065" opacity="0.65" />
            <polygon points="6,52 18,48 34,26 18,18" fill="#581C87" opacity="0.5" />
            <polygon points="18,18 34,26 50,6" fill="#C084FC" opacity="0.45" />
            {/* Core Prism Table */}
            <polygon points="50,22 66,42 56,68 34,62 28,38" fill="#F3E8FF" opacity="0.3" stroke="#FAF5FF" strokeWidth="1" />
            {/* Cosmic Stardust Fractures */}
            <circle cx="48" cy="46" r="3" fill="#FFFFFF" filter="drop-shadow(0 0 6px #C084FC)" />
            <circle cx="62" cy="52" r="1.5" fill="#E9D5FF" />
            <circle cx="38" cy="38" r="1.5" fill="#E9D5FF" />
          </svg>
        );

      case 1024: // 1024 - 🌟 日耀金冕神石 (Solar Auric Sunstone - Key Milestone!)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_28px_rgba(245,158,11,0.7)] animate-pulse" style={{ animationDuration: '3s' }}>
            <defs>
              <radialGradient id="sun-grad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="25%" stopColor="#FDE047" />
                <stop offset="55%" stopColor="#F59E0B" />
                <stop offset="85%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>
            </defs>
            {/* 12-Point Solar Crown Corona Glow */}
            <polygon points="50,4 58,18 74,10 74,26 90,26 82,40 96,50 82,60 90,74 74,74 74,90 58,82 50,96 42,82 26,90 26,74 10,74 18,60 4,50 18,40 10,26 26,26 26,10 42,18" fill="#F59E0B" opacity="0.4" />
            {/* Main Faceted Solstice Disc */}
            <circle cx="50" cy="50" r="38" fill="url(#sun-grad)" stroke="#FEF08A" strokeWidth="1.5" />
            {/* Royal Cut Octagonal Table */}
            <polygon points="38,24 62,24 76,38 76,62 62,76 38,76 24,62 24,38" fill="#FEF9C3" opacity="0.45" stroke="#FFFFFF" strokeWidth="1" />
            {/* 8 Radiant Caustic Solar Rays */}
            <polygon points="50,14 54,32 50,30 46,32" fill="#FFFFFF" opacity="0.9" />
            <polygon points="50,86 54,68 50,70 46,68" fill="#D97706" opacity="0.6" />
            <polygon points="14,50 32,54 30,50 32,46" fill="#FFFFFF" opacity="0.9" />
            <polygon points="86,50 68,54 70,50 68,46" fill="#D97706" opacity="0.6" />
            {/* Blazing Center Star */}
            <polygon points="50,36 53,47 64,50 53,53 50,64 47,53 36,50 47,47" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFFFFF)" />
          </svg>
        );

      case 2048: // 2048 - 👑 創世星雲寶鑽 (Genesis Starlight Diadem - Grand Victory!)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_32px_rgba(236,72,153,0.75)] animate-pulse" style={{ animationDuration: '2.5s' }}>
            <defs>
              <linearGradient id="genesis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#FBCFE8" />
                <stop offset="45%" stopColor="#F472B6" />
                <stop offset="70%" stopColor="#A855F7" />
                <stop offset="90%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#312E81" />
              </linearGradient>
            </defs>
            {/* Astral Crown Point Aura */}
            <polygon points="50,2 62,22 84,12 78,34 98,42 82,58 92,80 70,78 62,98 50,84 38,98 30,78 8,80 18,58 2,42 22,34 16,12 38,22" fill="url(#genesis-grad)" opacity="0.4" />
            {/* Multi-layered Brilliant Cut Diadem */}
            <circle cx="50" cy="50" r="39" fill="url(#genesis-grad)" stroke="#FFFFFF" strokeWidth="1.8" />
            {/* Outer Diamond Ring Facets */}
            <polygon points="50,18 82,50 50,82 18,50" fill="#FDF2F8" opacity="0.4" stroke="#FFFFFF" strokeWidth="1" />
            <polygon points="30,30 70,30 70,70 30,70" fill="#F472B6" opacity="0.3" stroke="#FCE7F3" strokeWidth="1" />
            {/* Starlight Eight-Point Supernova */}
            <polygon points="50,22 53,42 73,42 57,54 63,74 50,60 37,74 43,54 27,42 47,42" fill="#FFFFFF" opacity="0.95" filter="drop-shadow(0 0 8px #FFFFFF)" />
            {/* Core Genesis Pearl */}
            <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
          </svg>
        );

      case 4096: // 4096 - 🌌 永恆星河晶核 (Infinite Singularity Astral Core)
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_35px_rgba(56,189,248,0.85)] animate-spin" style={{ animationDuration: '20s' }}>
            <defs>
              <linearGradient id="singularity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#67E8F9" />
                <stop offset="50%" stopColor="#E879F9" />
                <stop offset="75%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            {/* Hyper-dimensional Star Polygon */}
            <polygon points="50,4 64,24 88,12 80,36 98,50 80,64 88,88 64,76 50,96 36,76 12,88 20,64 2,50 20,36 12,12 36,24" fill="url(#singularity-grad)" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Inner Hexagram Matrix */}
            <polygon points="50,20 76,65 24,65" fill="#FFFFFF" opacity="0.5" />
            <polygon points="50,80 76,35 24,35" fill="#FDF4FF" opacity="0.5" />
            <circle cx="50" cy="50" r="12" fill="#FFFFFF" filter="drop-shadow(0 0 10px #FFFFFF)" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* 1. Main 3D Gemstone Vector Graphic */}
      <div className="w-full h-full p-1.5 sm:p-2 flex items-center justify-center transform transition-transform duration-200 hover:scale-105">
        {renderJewelSVG()}
      </div>

      {/* 2. Tasteful, Subtle Metallic Numerical Pill (Clean & Non-Intrusive) */}
      {showNumberPill && (
        <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 z-10 pointer-events-none">
          <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-cinzel font-bold tracking-wider bg-black/80 text-amber-200 border border-amber-500/40 shadow-sm backdrop-blur-xs">
            {value}
          </span>
        </div>
      )}
    </div>
  );
};
