import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, message, icon }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="p-4 bg-muted/50 rounded-full mb-6">
        {icon || <AlertCircle size={32} className="text-muted-foreground" />}
      </div>
      <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </motion.div>
  );
};

export default EmptyState;
