/**
 * Helper to handle [bracket] placeholders per requirement:
 * "Anything in [brackets] is a TODO: render it as a visibly marked placeholder
 * in development and hide the field in production when empty."
 */

export function isTodoPlaceholder(val: string | undefined | null): boolean {
  if (!val) return false;
  return /\[.*?\]/.test(val.trim());
}

export function renderWithTodo(
  text: string,
  isDev: boolean = process.env.NODE_ENV !== 'production'
): string {
  if (!text) return '';

  return text.replace(/\[(.*?)\]/g, (_match, p1) => {
    if (isDev) {
      return `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono font-medium rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30" title="TODO Placeholder: ${p1}">[TODO: ${p1}]</span>`;
    }
    // In production, hide empty TODO placeholder
    return '';
  });
}
