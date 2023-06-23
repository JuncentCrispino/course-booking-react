import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

interface INotifyProps {
  message: string;
  icon: JSX.Element;
  status: string;
}

export default function notify({ message, icon, status }: INotifyProps) {
  toast.custom((t) => (
    <>
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="pointer-events-auto flex w-full max-w-md rounded-lg border-2 border-secondary bg-primary text-white shadow-xl hover:duration-75"
          >
            <div className="w-0 flex-1 p-4">
              <div className="flex items-center">
                <div>{icon}</div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white dark:text-white">
                    {status}
                  </p>
                  <p className="mt-1 text-sm text-white dark:text-white">
                    {message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-secondary">
              <button
                type="button"
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-white duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  ));
}
