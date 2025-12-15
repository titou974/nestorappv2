import TemplateToast from "@/components/Toast";
import { toast } from "react-toastify";

export default function createToast(
  title: string,
  content: string,
  success: boolean
) {
  return toast(TemplateToast, {
    className:
      "w-full max-w-[90%] sm:min-w-40 !rounded-2xl !bg-surface backdrop-blur-lg shadow-inner shadow-zinc-600 border !border-foreground/20 !text-foreground overflow-visible group !py-4",
    data: {
      title: title,
      content: content,
      success: success,
    },
    closeButton: false,
  });
}
