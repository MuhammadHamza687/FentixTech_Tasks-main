import { AlertCircle, Loader2 } from "lucide-react";

export default function StatusMessage({ type, message }) {
  const isLoading = type === "loading";
  const Icon = isLoading ? Loader2 : AlertCircle;

  return (
    <div className={`status-message ${type}`} role={isLoading ? "status" : "alert"}>
      <Icon className={isLoading ? "spin" : ""} aria-hidden="true" size={20} />
      <span>{message}</span>
    </div>
  );
}
