import { isAxiosError } from "axios";
import type { TFunction } from "i18next";
import { toast } from "sonner";

export function getErrorMessageKey(error: unknown): string {
  if (isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        return "error.bad_request";
      case 401:
        return "auth.unauthorized";
      case 403:
        return "error.forbidden";
      case 404:
        return "error.not_found";
      case 422:
        return "error.validation_failed";
      case 429:
        return "error.too_many_attempts";
      case 500:
        return "error.server_error";
      default:
        return error.response?.data?.message || "error.unexpected";
    }
  }

  if (error instanceof Error) {
    return "error.generic";
  }

  return "error.unknown";
}

export function handleApiError(error: unknown, t: TFunction , toast_popup:boolean = true): string {
  console.error("API Error:", error);

  const keyOrMsg = getErrorMessageKey(error);
  
  const message = t(keyOrMsg);
  if (toast_popup) { 
    toast.error(message);
  }
  return message;
}
