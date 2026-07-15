import { motion } from 'framer-motion';

export function LogoMark({ height = 43, className = '' }: { height?: number; className?: string }) {
  return (
    <motion.img
      src="/logo-abapcloud.png"
      alt="ABAPCLOUD"
      style={{ height, width: 'auto', objectFit: 'contain' }}
      className={className}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    />
  );
}

export function LogoMarkDark({ height = 38, className = '' }: { height?: number; className?: string }) {
  return (
    <motion.img
      src="/logo-abapcloud.png"
      alt="ABAPCLOUD"
      style={{ height, width: 'auto', objectFit: 'contain' }}
      className={className}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    />
  );
}
