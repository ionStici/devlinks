import { AnimatePresence, motion } from 'framer-motion';

export function Reminder({ newChanges }: { newChanges: boolean }) {
  return (
    <AnimatePresence>
      {newChanges && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-6 md:mx-10 overflow-hidden"
        >
          <p className="text-purple text-center">
            Don't forget to save your changes.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
