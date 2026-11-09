/** Removes stray native dialog nodes (browser Close chip) from older cached bundles. */
export function removeStaleNativeDialogs() {
  if (typeof document === "undefined") return
  document.querySelectorAll("dialog").forEach((node) => {
    const dialog = node as HTMLDialogElement
    try {
      dialog.close()
    } catch {
      /* ignore */
    }
    dialog.remove()
  })
}
