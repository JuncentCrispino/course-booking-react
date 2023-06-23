import { motion } from 'framer-motion';

export function CircleLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div className="absolute bottom-1/2 right-1/2  translate-x-1/2 translate-y-1/2 transform opacity-100">
        <div className="h-16 w-16 animate-spin  rounded-full border-4 border-solid border-primary border-t-transparent" />
      </div>
    </motion.div>
  );
}
