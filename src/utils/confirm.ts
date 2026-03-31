import { modals } from "@mantine/modals";

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
};

export function confirmAction({
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmOptions) {
  modals.openConfirmModal({
    title,
    centered: true,
    children: message,
    labels: {
      confirm: confirmText,
      cancel: cancelText,
    },
    confirmProps: { color: "dark" },
    onConfirm,
  });
}