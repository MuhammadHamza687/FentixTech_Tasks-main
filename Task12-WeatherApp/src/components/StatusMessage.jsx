import { AlertCircle, Info, Loader2 } from "lucide-react";

export default function StatusMessage({ type, message }) {
  const isLoading = type === "loading";
  const Icon = isLoading ? Loader2 : type === "notice" ? Info : AlertCircle;

  return (
    <div className={`status-message ${type}`} role={type === "error" ? "alert" : "status"}>
      <Icon className={isLoading ? "spin" : ""} aria-hidden="true" size={20} />
      <span>{message}</span>
    </div>
  );
}
