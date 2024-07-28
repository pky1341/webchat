import { motion } from "framer-motion";
export const ErrorMessage = ({ message }: { message: string }) => (
    <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="text-red-500 text-sm mt-1"
    >
        {message}
    </motion.p>
);