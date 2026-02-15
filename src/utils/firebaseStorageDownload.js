/**
 * Otwiera plik z Firebase Storage w nowej karcie (bez XHR, więc bez problemów z CORS).
 * URL z getDownloadURL() zawiera token – przeglądarka pobierze/wyświetli plik.
 */
export function openStorageDownloadUrl(url) {
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
