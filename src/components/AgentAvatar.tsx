import React from 'react';
import { AgentId } from '../types';

interface AgentAvatarProps {
  agentId: AgentId | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({
  agentId,
  size = 'md',
  showBadge = false,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const containerClasses = `${sizeMap[size]} relative inline-flex items-center justify-center flex-shrink-0 select-none ${onClick ? 'cursor-pointer transition-transform hover:scale-105 active:scale-95' : ''} ${className}`;

  const renderArtwork = () => {
    switch (agentId) {
      case 'pudding':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="2" />
            {/* Pudding Body */}
            <path
              d="M32 90 C32 94 88 94 88 90 L80 46 C79 43 41 43 40 46 Z"
              fill="#FDE047"
              stroke="#D97706"
              strokeWidth="2.5"
            />
            {/* Pudding Gradient Base Highlight */}
            <path
              d="M36 86 C36 89 84 89 84 86 L81 72 C60 76 45 74 39 72 Z"
              fill="#FACC15"
            />
            {/* Caramel Syrup Top */}
            <path
              d="M40 46 C40 43 79 43 80 46 C80 50 78 55 75 56 C71 57 69 53 66 57 C63 61 58 60 55 56 C52 52 48 58 45 56 C42 54 40 50 40 46 Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="2"
            />
            {/* Caramel Gloss */}
            <path
              d="M46 47 C50 45 70 45 74 47 C70 48 50 48 46 47 Z"
              fill="#B45309"
              opacity="0.8"
            />
            <ellipse cx="50" cy="46" rx="4" ry="1.5" fill="#FEF08A" opacity="0.9" />
            {/* Crown */}
            <path
              d="M49 38 L45 28 L53 32 L60 25 L67 32 L75 28 L71 38 Z"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="60" cy="29" r="1.8" fill="#EF4444" />
            <circle cx="53" cy="33" r="1.4" fill="#3B82F6" />
            <circle cx="67" cy="33" r="1.4" fill="#10B981" />
            {/* Eyes */}
            <circle cx="50" cy="67" r="3.2" fill="#1E293B" />
            <circle cx="70" cy="67" r="3.2" fill="#1E293B" />
            <circle cx="51.2" cy="65.8" r="1.2" fill="#FFFFFF" />
            <circle cx="71.2" cy="65.8" r="1.2" fill="#FFFFFF" />
            {/* Cheeks */}
            <ellipse cx="44" cy="71" rx="3.5" ry="2" fill="#FB7185" opacity="0.65" />
            <ellipse cx="76" cy="71" rx="3.5" ry="2" fill="#FB7185" opacity="0.65" />
            {/* Smile */}
            <path
              d="M57 71 Q60 76 63 71"
              stroke="#78350F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Hands */}
            <circle cx="34" cy="74" r="3.5" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="86" cy="74" r="3.5" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
          </svg>
        );

      case 'creme_brulee':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#EEF2FF" stroke="#E0E7FF" strokeWidth="2" />
            {/* Crème Brûlée Body */}
            <path
              d="M34 88 C34 93 86 93 86 88 L81 46 C80 43 40 43 39 46 Z"
              fill="#FEF08A"
              stroke="#CA8A04"
              strokeWidth="2.5"
            />
            {/* Torched Crust Sugar Pattern */}
            <path
              d="M39 46 C40 43 80 43 81 46 C81 51 77 54 73 54 C69 54 67 52 64 54 C60 56 57 53 54 55 C50 57 47 52 44 54 C41 55 39 50 39 46 Z"
              fill="#9A3412"
              stroke="#7C2D12"
              strokeWidth="1.8"
            />
            <path
              d="M48 45 Q53 48 58 45 T68 47 T76 45"
              stroke="#D97706"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="62" cy="48" r="1.5" fill="#FED7AA" />
            <circle cx="48" cy="49" r="1.2" fill="#FED7AA" />
            {/* Glasses */}
            <rect x="42" y="60" width="14" height="11" rx="3" fill="#1E1B4B" fillOpacity="0.1" stroke="#0F172A" strokeWidth="2" />
            <rect x="64" y="60" width="14" height="11" rx="3" fill="#1E1B4B" fillOpacity="0.1" stroke="#0F172A" strokeWidth="2" />
            <path d="M56 65 L64 65" stroke="#0F172A" strokeWidth="2.2" />
            {/* Eyes behind glasses */}
            <circle cx="49" cy="65" r="2.8" fill="#0F172A" />
            <circle cx="71" cy="65" r="2.8" fill="#0F172A" />
            <circle cx="50" cy="64" r="1" fill="#FFFFFF" />
            <circle cx="72" cy="64" r="1" fill="#FFFFFF" />
            {/* Cheeks */}
            <ellipse cx="40" cy="71" rx="3" ry="1.8" fill="#F43F5E" opacity="0.6" />
            <ellipse cx="80" cy="71" rx="3" ry="1.8" fill="#F43F5E" opacity="0.6" />
            {/* Smile */}
            <path d="M57 73 Q60 76 63 73" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" />
            {/* Laptop / Code Device */}
            <rect x="44" y="78" width="32" height="16" rx="2" fill="#334155" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="47" y="80" width="26" height="10" rx="1" fill="#020617" />
            <path d="M51 85 L54 83 L51 81 M69 85 L66 83 L69 81 M58 87 L62 79" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'caramel':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#FAF5FF" stroke="#F3E8FF" strokeWidth="2" />
            {/* Caramel Body */}
            <path
              d="M34 89 C34 94 86 94 86 89 L80 47 C79 44 41 44 40 47 Z"
              fill="#FDE68A"
              stroke="#D97706"
              strokeWidth="2.5"
            />
            {/* Rich Dripping Caramel Top */}
            <path
              d="M38 46 C38 44 82 44 82 46 C82 53 79 56 76 57 C72 58 70 52 66 58 C62 64 58 60 55 57 C51 53 47 62 43 59 C40 56 38 52 38 46 Z"
              fill="#9A3412"
              stroke="#7C2D12"
              strokeWidth="2"
            />
            {/* Gloss */}
            <path d="M46 48 C54 46 66 46 74 48" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
            {/* Artist Beret */}
            <path
              d="M38 40 C36 30 52 24 66 26 C78 28 84 34 80 41 C76 43 42 43 38 40 Z"
              fill="#EA580C"
              stroke="#9A3412"
              strokeWidth="2"
            />
            <path d="M60 24 L60 20" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="49" cy="68" r="3" fill="#1E293B" />
            <circle cx="71" cy="68" r="3" fill="#1E293B" />
            <circle cx="50" cy="66.5" r="1.2" fill="#FFFFFF" />
            <circle cx="72" cy="66.5" r="1.2" fill="#FFFFFF" />
            {/* Cheeks */}
            <ellipse cx="42" cy="72" rx="3.5" ry="2" fill="#F43F5E" opacity="0.65" />
            <ellipse cx="78" cy="72" rx="3.5" ry="2" fill="#F43F5E" opacity="0.65" />
            {/* Smile */}
            <path d="M57 73 Q60 77 63 73" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            {/* Painter Palette in Hand */}
            <ellipse cx="36" cy="80" rx="9" ry="7" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" transform="rotate(-15 36 80)" />
            <circle cx="33" cy="78" r="1.5" fill="#EF4444" />
            <circle cx="38" cy="77" r="1.5" fill="#3B82F6" />
            <circle cx="35" cy="82" r="1.5" fill="#10B981" />
            {/* Paintbrush */}
            <path d="M80 75 L89 86" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
            <path d="M89 86 L92 90" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'cheese':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#FFFBEB" stroke="#FEF3C7" strokeWidth="2" />
            {/* Cheese Wedge Shape */}
            <path
              d="M32 82 C32 86 86 90 88 84 L76 36 L32 82 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Cheese 3D Side */}
            <path
              d="M76 36 L88 84 C90 84 94 82 92 78 L80 34 L76 36 Z"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="1.8"
            />
            {/* Cheese Holes */}
            <circle cx="48" cy="72" r="4.5" fill="#D97706" fillOpacity="0.4" />
            <circle cx="66" cy="60" r="3" fill="#D97706" fillOpacity="0.4" />
            <circle cx="70" cy="76" r="4" fill="#D97706" fillOpacity="0.4" />
            <circle cx="56" cy="48" r="2.5" fill="#D97706" fillOpacity="0.3" />
            {/* Cute Glasses */}
            <circle cx="50" cy="62" r="5.5" stroke="#1E293B" strokeWidth="1.8" fill="#FFFFFF" fillOpacity="0.3" />
            <circle cx="64" cy="62" r="5.5" stroke="#1E293B" strokeWidth="1.8" fill="#FFFFFF" fillOpacity="0.3" />
            <path d="M55.5 62 L58.5 62" stroke="#1E293B" strokeWidth="1.8" />
            {/* Eyes */}
            <circle cx="50" cy="62" r="2.5" fill="#1E293B" />
            <circle cx="64" cy="62" r="2.5" fill="#1E293B" />
            <circle cx="51" cy="61" r="0.9" fill="#FFFFFF" />
            <circle cx="65" cy="61" r="0.9" fill="#FFFFFF" />
            {/* Cheeks */}
            <ellipse cx="42" cy="67" rx="3" ry="1.8" fill="#FB7185" opacity="0.65" />
            <ellipse cx="72" cy="67" rx="3" ry="1.8" fill="#FB7185" opacity="0.65" />
            {/* Smile */}
            <path d="M55 69 Q57 73 59 69" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" />
            {/* Magnifying Glass */}
            <circle cx="34" cy="76" r="8" stroke="#3B82F6" strokeWidth="2.5" fill="#DBEAFE" fillOpacity="0.6" />
            <path d="M28 82 L22 88" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
            {/* Reflected sparkle inside magnifying glass */}
            <path d="M32 73 L36 77" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'chocolate':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="2" />
            {/* Chocolate Bar Body - Rich Brown */}
            <rect
              x="35"
              y="36"
              width="50"
              height="54"
              rx="8"
              fill="#451A03"
              stroke="#270F02"
              strokeWidth="2.5"
            />
            {/* Chocolate Grid Blocks */}
            <rect x="39" y="40" width="19" height="22" rx="3" fill="#5C2406" stroke="#270F02" strokeWidth="1" />
            <rect x="62" y="40" width="19" height="22" rx="3" fill="#5C2406" stroke="#270F02" strokeWidth="1" />
            <rect x="39" y="65" width="19" height="21" rx="3" fill="#5C2406" stroke="#270F02" strokeWidth="1" />
            <rect x="62" y="65" width="19" height="21" rx="3" fill="#5C2406" stroke="#270F02" strokeWidth="1" />
            {/* Gloss shine on top corners */}
            <ellipse cx="45" cy="44" rx="3" ry="1.5" fill="#78350F" opacity="0.8" />
            <ellipse cx="68" cy="44" rx="3" ry="1.5" fill="#78350F" opacity="0.8" />
            {/* Big Expressive Eyes */}
            <circle cx="48" cy="52" r="3.2" fill="#FFFFFF" />
            <circle cx="72" cy="52" r="3.2" fill="#FFFFFF" />
            <circle cx="48" cy="52" r="2" fill="#1E293B" />
            <circle cx="72" cy="52" r="2" fill="#1E293B" />
            <circle cx="49" cy="51" r="0.9" fill="#FFFFFF" />
            <circle cx="73" cy="51" r="0.9" fill="#FFFFFF" />
            {/* Cheeks */}
            <ellipse cx="41" cy="57" rx="3" ry="1.6" fill="#FB7185" opacity="0.8" />
            <ellipse cx="79" cy="57" rx="3" ry="1.6" fill="#FB7185" opacity="0.8" />
            {/* Cute Smile */}
            <path d="M56 57 Q60 62 64 57" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            {/* White Collar & Red Bowtie/Tie */}
            <path d="M53 72 L60 78 L67 72" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <path d="M60 77 L64 89 L60 91 L56 89 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
            <circle cx="60" cy="78" r="2" fill="#DC2626" />
            {/* Loudspeaker / Megaphone */}
            <path
              d="M80 66 L95 58 L95 82 L80 74 Z"
              fill="#F97316"
              stroke="#C2410C"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect x="74" y="67" width="8" height="6" rx="1.5" fill="#EA580C" stroke="#9A3412" strokeWidth="1.2" />
            <path d="M96 66 Q101 70 96 74" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M99 63 Q106 70 99 77" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-800">
            🍮
          </div>
        );
    }
  };

  return (
    <div className={containerClasses} id={`agent-avatar-${agentId}`}>
      {renderArtwork()}
      {showBadge && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};
