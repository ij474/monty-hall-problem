import { motion } from "framer-motion";
import { CashStack } from "./components/assets/CashStack";
import { EmptyVault } from "./components/assets/EmptyVault";

/**
 * Component: Door
 * Represents a single door in the game.
 * It handles the 3D flip animation and shows either Cash or an Empty Vault.
 */
const Door = ({ 
  id, 
  status, // 'closed' or 'open'
  content, // 'prize' (Money) or 'bust' (Empty)
  isSelected, // Is this the door the user clicked?
  isDisabled, // Should clicking be disabled?
  onClick 
}) => {
  return (
    <div className="flex flex-col items-center gap-4 relative group">
      {/* Selection Tag: Shows "YOUR PICK" above the door if selected */}
      <div className={`h-8 transition-all duration-300 ${isSelected ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
        <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)] tracking-wider">
          YOUR PICK
        </span>
      </div>

      {/* 3D Perspective Container */}
      <div className="relative w-32 h-52 sm:w-40 sm:h-64 perspective-1000">
        {/* The Door Itself (Animated) */}
        <motion.div
          className={`relative w-full h-full cursor-pointer transition-all duration-300 rounded-xl shadow-2xl border-2 ${
            isSelected 
              ? "border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]" 
              : "border-slate-700 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          } ${isDisabled ? "cursor-not-allowed opacity-60" : ""}`}
          onClick={() => !isDisabled && onClick(id)}
          initial={false}
          // Animation: Rotate 180 degrees if status is 'open'
          animate={{
            rotateY: status === 'open' ? 180 : 0,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT SIDE: The Metallic Door */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xl flex flex-col items-center justify-center backface-hidden z-10 overflow-hidden"
            style={{ backfaceVisibility: "hidden" }} // Hides this side when flipped
          >
            {/* Metallic Sheen Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            
            {/* Door Number */}
            <div className="relative z-10 w-16 h-16 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm">
              <span className="text-3xl font-bold text-slate-400 font-mono">{id + 1}</span>
            </div>
            
            {/* Decorative Lines */}
            <div className="absolute bottom-8 w-1/2 h-1 bg-slate-700/50 rounded-full" />
            <div className="absolute bottom-6 w-1/3 h-1 bg-slate-700/50 rounded-full" />
          </div>

          {/* BACK SIDE: The Prize or Empty Vault */}
          <div 
            className="absolute inset-0 bg-slate-900 rounded-xl flex items-center justify-center backface-hidden border-2 border-slate-800"
            style={{ 
              transform: "rotateY(180deg)", // Pre-rotated so it's correct when flipped
              backfaceVisibility: "hidden" 
            }}
          >
            <div className="w-3/4 h-3/4">
              {content === 'prize' ? <CashStack /> : <EmptyVault />}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Floor Reflection/Shadow */}
      <div className="w-32 h-4 bg-black/40 blur-md rounded-[100%] absolute -bottom-2 -z-10" />
    </div>
  );
};

export default Door;
